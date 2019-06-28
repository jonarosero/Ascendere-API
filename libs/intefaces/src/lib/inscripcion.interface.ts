import { Document, Schema, model } from 'mongoose';

/**
 * TODO: add documentation
 */
export class Inscripcion {
  encuentroID: string;
  userID: string;
  inscriptionDate: Date;
  inscriptionApproved: Boolean;
}

let schema = new Schema({
  encuentroID: { required: true, type: Schema.Types.ObjectId },
  userID: { required: true, type: Schema.Types.ObjectId },
  inscriptionDate: { required: true, type: Date, default: Date.now() },
  inscriptionApproved: { required: true, type: Boolean, default: false }
});

/**
 * TODO: add documentation
 */
export interface InscripcionDocument extends Inscripcion, Document {}

/**
 * TODO: add documentation
 */
export const InscripcionModel = model<InscripcionDocument>(
  'Inscripcion',
  schema
);
