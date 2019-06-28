import { Document, Schema, model } from 'mongoose';
import { Speaker } from './speaker.interface';



/**
 * @class containing all the information related to this event
 *
 * TODO: add published attribute for encuentro
 */
export class Encuentro {
  /**
   * @property name of the event
   */
  name: string;

  /**
   * @property content of the event in markdown text format.
   */
  content: string;

  /**
   * @property art designed for this event.
   */
  arts: EncuentrosArts;

  /**
   * @property date when the even will take place
   */
  date: Date;

  /**
   * @property date when postulation will be closed.
   */
  postulationsEndDate: Date;

  /**
   * @property number of person that can postulate to this event.
   */
  limitOfPeople: number;

  /**
   * @property speakers who are going to drive the event, this can also be a teacher or student.
   */
  speakers: Array<Speaker | User>;

  /**
   *@property type of encuentro, since there are different types
   */
  encuentroType: EncuentroTypes;
}

/**
 * @enum Different types of events considered as encuentros
 */
export enum EncuentroTypes {
  cafeCientifico = 'CAFE-CIENTIFICO',
  vitaminaI = 'VITAMINA-I',
  debateEstudiantil = 'DEBATE-ESTUDIANTIL',
  talleresAcademicos = 'TALLERES-ACADEMICOS'
}

class EncuentrosArts {
  /**
   * @property low resolution image used to be displayed on mobile phone
   */
  mobile: string;

  /**
   * @property image used for metadata in social media like: Facebook, Twitter and SEO
   */
  social: string;

  /**
   * @property high resolution image banner of the event
   */
  banner: string;

  /**
   * @property large image
   */
  slider: string;
}

/**
 * TODO: remove this dummy class
 */
class User {}

// no necessary to export the schema (keep it private to the module)
var schema = new Schema({
  name: { required: true, type: String },
  content: { required: false, type: String },
  arts: { required: false, type: Schema.Types.ObjectId },
  date: { required: true, type: Date },
  postulationsEndDate: { required: false, type: Date },
  limitOfPeople: { required: false, type: Number },
  speakers: {
    required: false,
    type: [Schema.Types.Mixed]
  },
  encuentroType: {
    type: String,
    default: 'CAFE-CIENTIFICO',
    required: true,
    enum: {
      values: [
        'CAFE-CIENTIFICO',
        'VITAMINA-I',
        'DEBATE-ESTUDIANTIL',
        'TALLERES-ACADEMICOS'
      ],
      message: '{VALUE} is not a valid event type'
    }
  }
});
// register each method at schema
// schema.method('foo', User.prototype.foo);

// 2) Document
export interface EncuentroDocument extends Encuentro, Document {}

// 3) MODEL
export const EncuentroModel = model<EncuentroDocument>('Encuentro', schema);
