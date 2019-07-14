import { Router, Request, Response } from 'express';
import { PrimiciaModel } from '@ascendere/intefaces';
import { raw } from 'body-parser';

export const primiciasRouter = Router();
/**
 * **Primicias All**
 */
primiciasRouter.get('/primicias', (request: Request, response: Response) => {
  const start = Number(request.query.start) || 0;
  const limit = Number(request.query.limit) || 0;
  const primiciaType = request.query.primiciaType;

  if (start < 0)
    return response.status(400).json({
      ok: false,
      message: 'Invalid request. Fail due to start query being invalid.'
    });
  if (limit < 0)
    return response.status(400).json({
      ok: false,
      message: 'Invalid request. Fail due to limit query being invalid.'
    });
  if (!primiciaType)
    return response.status(400).json({
      ok: false,
      message: 'Invalid request. No primiciaType query was found'
    });

  const query = {
    primiciaType
  };

  PrimiciaModel.find(query)
    .skip(start)
    .limit(limit)
    .exec((err,res) => {
      if (err) return response.status(400).json({ ok: false, ...err });

      response.json({
        ok: true,
        start,
        limit,
        primiciaType,
        primicia: res,
        length: res.length
      })
    })
});
/**
 * **Primicia Information**
 */
primiciasRouter.get(
  '/primicia/:id',
  (request: Request, response: Response) => {
    const id = request.params.id;

    PrimiciaModel.findById(id).exec((err, res) => {
      if (err) return response.status(400).json({ok: false, ...err });

      if(!res)
        return response.status(400).json({
          ok: false,
          message: `Primicia with id ${id} was not found`
        });

      response.json({
        ok: true,
        primicia: res
      });
    });
  }
);

/**
 * **Edit Primicia Information**
 */
primiciasRouter.put(
  '/primicia/:id',
  (request: Request, response: Response) => {
    const id = request.params.id;

    const rawBody = request.body;

    const body = {
      primiciaName: rawBody.primiciaName,
      primiciaDate: new Date(),
      primiciaContent: rawBody.primciaContent,
      primiciaAbstract: rawBody.primiciaContent.match(/\n.*?\n/mg),
      primiciaAuthor: rawBody.primiciaContent.match(/(?:!\[(.*?)\]\((.*?)\))/mg),
      primiciaType: rawBody.primiciaType
    };

    const options = {
      new: true,
      runValidators: true
    };

    for (var propName in body) {
      if (body[propName] === null || body[propName] === undefined){
        delete body[propName];
      }
    }

    PrimiciaModel.findByIdAndUpdate(id, body, options).exec((err, res) => {
      if (err) return response.status(400).json({ ok: false, ...err });

      if(!res)
        return response.status(404).json({
          ok: false,
          message:  `Primicia with id ${id} was not found.`
        });

      response.json({
        ok: true,
        message:  `Primicia updated Successfully`,
        primicia: res
      })
    })
  }
)

/**
 * **Create New Primicia**
 */
primiciasRouter.post('/primicia',(request: Request, response: Response) =>{
  const body = request.body;

  let primicia = new PrimiciaModel({
    primiciaName: body.primiciaName,
    primiciaDate: new Date(),
    primiciaContent: body.primiciaContent,
    primiciaAbstract: body.primiciaAContent.match(/\n.*?\n/mg),
    primiciaImg: body.primiciaContent.match(/(?:!\[(.*?)\]\((.*?)\))/mg),
    primciaAuthor: body.primciaAuthor,
    primiciaType: body.primiciaType
  });

  primicia.save((err, res)=>{
    if (err) return response.status(400).json({ok: false, ...err});

    if (!res)
      return response.status(404).json({
        ok: false,
        message: 'Primicia was not created'
      });

    response.json({
      ok:true,
      message: 'Primicia created Succesfully',
      primicia: res
    });
  });
});

/**
 * **Delete Primicia**
 */
primiciasRouter.delete('/primicia/id:', (request: Request, response: Response) => {

  const id = request.params.id;

  PrimiciaModel.findOneAndDelete(id).exec((err, res) => {
    if (err) return response.status(400).json({ok: false, ...err});

    if (!res)
      return response.status(400).json({ok:false, message: `Primicia with id ${id} was not found.`})

    response.json({
      ok: true,
      message: 'Primcicia deleted succesfully'
     });
  });
});
