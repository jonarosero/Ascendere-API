import { Document, Schema, model } from 'mongoose';

/**
 * @class Special person to talk in a event which is neither a student or teacher.
 * And the information must be stored only for this talk.
 *
 * If recurrent speaker, a user should be created
 */
export class Speaker {
  /**
   * @property ci or passport of Speaker
   */
  identifier: string;

  /**
   * @property speaker name with lastName
   */
  name: string;

  /**
   * @property speaker cv or resume
   */
  resume: string;

  /**
   * @property linkedIn account
   */
  linkedIn: string;

  /**
   * @property mail of the speaker
   */
  email: string;
}

// no necessary to export the schema (keep it private to the module)
let schema = new Schema({
  identifier: { required: true, type: String },
  name: { required: false, type: String },
  resume: { required: true, type: String },
  linkedIn: { required: true, type: String },
  email: {
    required: true,
    type: String,
    unique: true,
    match: /\S+@\S+\.\S+/
  }
});

// register each method at schema
// schema.method('foo', Speaker.prototype.foo);

/**
 * @document interface for speaker module
 */
export interface SpeakerDocument extends Speaker, Document {}

/**
 * @model speaker
 */
export const SpeakerModel = model<SpeakerDocument>('Speaker', schema);
