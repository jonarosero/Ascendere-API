import { Document, Schema, model } from 'mongoose';
import { Speaker } from './speaker.interface';

 export class Primicia{
  primiciaName: string;
  primiciaDate: Date;
  primiciaContent: string;
  primiciaType: PrimiciaTypes;

 }

 export enum PrimiciaTypes {
   noticia = 'NOTICIA',
   articulo = 'ARTICULO'
 }

 var schema =  new Schema ({
   name : { required: true, type:String},
   date : { required: true, type: Date},
   content : { required: false, type: String},
   primiciaType: {
     type: String,
     default: 'NOTICIA',
     required: true,
     enum: {
       values: [
         'NOTICIA',
         'ARTICULO'
       ],
       message: '{VALUE} is not a valid scoop type'
     }
   }
 });

 export interface PrimiciaDocument extends Primicia, Document {}

 export const PrimiciaModel = model<PrimiciaDocument>('Primicia', schema);
