import { Document, Schema, model } from 'mongoose';

/**
 * TODO: add documentation
 */
export class Proyecto {
  creatorID: String;

  projectType: ProjectType;
  projectName: String;
  createdDate: Date;
  projectResources: any; //TODO: add type
  projectPeriod: String; // TODO: add table utpl Pediods
  projectState: ProjectState;
  projectDocumentation: Array<ProjectDocumentation>;
  projectModality: ProjectModality;
  // TODO: add presupuesto
  projectCollaborator: Array<ProjectCollaborator>;
}

/**
 * TODO: add documentation
 */
export enum ProjectModality {} // TODO: create table
export enum ProjectType {}
export enum ProjectState {}
export class ProjectDocumentation {}
export class ProjectCollaborator {
  userID: String;



  get user() {
    return null;
  }
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
export interface ProyectoDocument extends Proyecto, Document {}

/**
 * TODO: add documentation
 */
export const ProyectoModel = model<ProyectoDocument>('Proyecto', schema);
