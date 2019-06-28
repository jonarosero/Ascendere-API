import { Router, Request, Response } from 'express';
import { EncuentroModel } from '@ascendere/intefaces';

export const encuentrosRouter = Router();

/**
 * **Encuentros all**
 *
 * Obtain all `encuentros` to be presented as a Portfolio
 *
 * @query start start of documents for pagination
 * @query limit number of documents per page, used in case of pagination
 * @query encuentroType get all encuentros of the same encuentroType
 *
 * TODO: add correct code status
 * TODO: add total of remaining documents
 */
encuentrosRouter.get('/encuentros', (request: Request, response: Response) => {
  // parse query
  const start = Number(request.query.start) || 0;
  const limit = Number(request.query.limit) || 0;
  const encuentroType = request.query.encuentroType;

  // params validation
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
  if (!encuentroType)
    return response.status(400).json({
      ok: false,
      message: 'Invalid request. No encuentroType query was found'
    });

  // query to fetch specific documents
  const query = {
    encuentroType
  };

  // execute
  EncuentroModel.find(query)
    .skip(start)
    .limit(limit)
    .exec((err, res) => {
      if (err) return response.status(400).json({ ok: false, ...err });

      response.json({
        ok: true,
        start,
        limit,
        encuentroType,
        encuentros: res,
        length: res.length
      });
    });
});

/**
 * **Encuentro Information**
 *
 * Obtain all encuentros to be presented as a Portfolio
 *
 * @param id of specific event document
 *
 * TODO: custom error message and code
 * TODO: add when encuentro was not found
 */
encuentrosRouter.get(
  '/encuentro/:id',
  (request: Request, response: Response) => {
    // parse params
    const id = request.params.id;

    // execute
    EncuentroModel.findById(id).exec((err, res) => {
      if (err) return response.status(400).json({ ok: false, ...err });

      if (!res)
        return response.status(404).json({
          ok: false,
          message: `Encuentro with id ${id} was not found.`
        });

      response.json({
        ok: true,
        encuentro: res
      });
    });
  }
);

/**
 * **Edit Encuentro Information**
 *
 * Obtain all encuentros to be presented as a Portfolio
 *
 * @param id of specific id of document to be updated
 *
 * TODO: custom error message and code
 * TODO: add when encuentro was not found
 * TODO: add transaction
 * TODO: manage deleted documents
 */
encuentrosRouter.put(
  '/encuentro/:id',
  (request: Request, response: Response) => {
    // parse request
    const id = request.params.id;

    const rawBody = request.body;

    const body = {
      name: rawBody.name,
      content: rawBody.content,
      date: rawBody.date,
      postulationsEndDate: rawBody.postulationsEndDate,
      limitOfPeople: rawBody.limitOfPeople,
      encuentroType: rawBody.encuentroType
    };

    const options = {
      new: true,
      runValidators: true
    };

    // clean body from null | undefined values
    for (var propName in body) {
      if (body[propName] === null || body[propName] === undefined) {
        delete body[propName];
      }
    }

    // execute
    EncuentroModel.findByIdAndUpdate(id, body, options).exec((err, res) => {
      if (err) return response.status(400).json({ ok: false, ...err });

      if (!res)
        return response.status(404).json({
          ok: false,
          message: `Encuentro with id ${id} was not found.`
        });

      response.json({
        ok: true,
        message: 'Encuentro updated Successfully',
        encuentro: res
      });
    });
  }
);

/**
 * **Create New Encuentro**
 *
 * Obtain all `encuentros` to be presented as a Portfolio
 *
 * TODO: create transaction
 * TODO: add arts
 * TODO: add speakers
 * TODO: custom error message and code
 */
encuentrosRouter.post('/encuentro', (request: Request, response: Response) => {
  const body = request.body;

  let encuentro = new EncuentroModel({
    name: body.name,
    content: body.content,
    date: body.date,
    postulationsEndDate: body.postulationsEndDate,
    limitOfPeople: body.limitOfPeople,
    encuentroType: body.encuentroType
  });

  encuentro.save((err, res) => {
    if (err) return response.status(400).json({ ok: false, ...err });

    if (!res)
      return response.status(404).json({
        ok: false,
        message: 'Encuentro was not created.'
      });

    response.json({
      oK: true,
      message: 'Encuentro created Successfully',
      encuentro: res
    });
  });
});

/**
 * **Delete Encuentro**
 *
 * Remove 'encuentro' from db, with id
 *
 * @param id of specific event document
 *
 * TODO: custom error message and code
 */
encuentrosRouter.delete(
  '/encuentro/:id',
  (request: Request, response: Response) => {
    // parse params
    const id = request.params.id;

    // execute
    EncuentroModel.findOneAndDelete(id).exec((err, res) => {
      if (err) return response.status(400).json({ ok: false, ...err });

      if (!res)
        return response.status(404).json({
          ok: false,
          message: `Encuentro with id ${id} was not found.`
        });

      response.json({
        ok: true,
        message: 'Encuentro deleted successfully'
      });
    });
  }
);
