import { Router, Request, Response } from 'express';
import { EncuentroModel, InscripcionModel } from '@ascendere/intefaces';

export const inscripcionEncuentroRouter = Router();

/**
 * **Inscripcion Encuentro**
 *
 * TODO: add documentation
 * TODO: user can inscribe once
 */
inscripcionEncuentroRouter.get(
  '/inscripcion/:id',
  (request: Request, response: Response) => {
    const id = request.params.id;
    const body = request.body;

    EncuentroModel.findById(id).exec((error, encuentro) => {
      if (error)
        return response
          .status(400)
          .json({ ok: false, ...error, message: 'An error ocurred' });

      if (!encuentro)
        return response.status(404).json({
          ok: false,
          ...error,
          message: `Encuentro with id ${id} was not found`
        });

      // TODO: validate user can inscribe in the same day
      // TODO: correct status code
      // if (encuentro.postulationsEndDate.getDate() < Date.now())
      //   return response.status(400).json({
      //     ok: false,
      //     message: 'Encuentro inscriptions already finished.'
      //   });

      // TODO: add user id
      let inscripcion = new InscripcionModel({
        encuentroID: id,
        userID: body.uid
      });

      inscripcion.save((err, res) => {
        if (err)
          return response.status(400).json({
            ok: false,
            ...err,
            message:
              'An error ocurred during inscription. Cant inscribe at this moment'
          });

        if (!res)
          return response.status(400).json({
            ok: false,
            message: 'Inscription was not created'
          });

        response.json({
          ok: true,
          inscripcion: res,
          message: 'Inscription Successfully created'
        });
      });
    });
  }
);
