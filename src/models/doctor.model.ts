import {Entity, model, property, hasMany} from '@loopback/repository';
import {Patient} from './patient.model';
import {Appointment} from './appointment.model';

@model()
export class Doctor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  doctor_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Patient, {through: {model: () => Appointment, keyFrom: 'doctor_id', keyTo: 'patient_id'}})
  patients: Patient[];

  constructor(data?: Partial<Doctor>) {
    super(data);
  }
}

export interface DoctorRelations {
  // describe navigational properties here
}

export type DoctorWithRelations = Doctor & DoctorRelations;
