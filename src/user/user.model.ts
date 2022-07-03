import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// export const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   surname: { type: String, required: true },
//   firstName: { type: String, required: true },
//   middleInitial: { type: String, required: true },
//   campus: { type: String, required: true },
//   department: { type: String, required: true },
//   role: { type: String, required: true },
//   natureOfAppointment: { type: String, required: true },
// });

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  surname: string;

  @Prop()
  firstName: string;

  @Prop()
  middleInitial: string;

  @Prop()
  campus: string;

  @Prop()
  department: string;

  @Prop()
  role: string;

  @Prop()
  natureOfAppointment: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
