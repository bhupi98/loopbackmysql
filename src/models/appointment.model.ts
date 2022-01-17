import {Entity, model, property} from '@loopback/repository';

@model()
export class Appointment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  appointment_id?: number;

  @property({
    type: 'number',
  })
  doctor_id?: number;

  @property({
    type: 'number',
  })
  patient_id?: number;

  constructor(data?: Partial<Appointment>) {
    super(data);
  }
}

export interface AppointmentRelations {
  // describe navigational properties here
}

export type AppointmentWithRelations = Appointment & AppointmentRelations;
