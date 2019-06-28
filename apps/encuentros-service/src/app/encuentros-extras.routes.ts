import { Router, Request, Response } from 'express';
import { EncuentroModel } from '@ascendere/intefaces';

export const montlyEncuentrosRouter = Router();

/**
 * **Encuentros Bulletin**
 *
 * Obtain recent and relevant encuentros of same type to be presented as a billboard.
 * TODO: add limit and start
 */
montlyEncuentrosRouter.get(
  '/bulletin-encuentros',
  (request: Request, response: Response) => {
    const yesterday_date = new Date();
    yesterday_date.setDate(yesterday_date.getDate() - 1);

    const encuentroType = request.query.encuentroType;
    console.log(encuentroType);

    EncuentroModel.find(
      { date: { $gt: yesterday_date }, encuentroType: encuentroType },
      'name arts date limitOfPeople encuentroType'
    ).exec((err, res) => {
      if (err)
        return response
          .status(400)
          .json({ ok: false, ...err, message: 'Could not fetch documents' });

      response.json({
        oK: true,
        encuentros: res,
        length: res.length,
        encuentroType
      });
    });
  }
);

/**
 * **Monthly Encuentros**
 *
 * Obtain all `encuentros` within the current month and upcoming events.
 * TODO: add limit and start
 */
montlyEncuentrosRouter.get(
  '/montly-encuentros',
  (request: Request, response: Response) => {
    let yesterday_date = new Date();
    yesterday_date.setDate(yesterday_date.getDate() - 1);

    EncuentroModel.find(
      { date: { $gt: yesterday_date } },
      'name arts date limitOfPeople encuentroType'
    ).exec((err, res) => {
      if (err)
        return response
          .status(400)
          .json({ ok: false, ...err, message: 'Could not fetch documents' });

      response.json({ oK: true, encuentros: res, length: res.length });
    });
  }
);

/**
 * TODO: Encuentro Portfolio
 *
 * Get all encuentros of any type to be presented in a portfolio, separated by month and year
 */
