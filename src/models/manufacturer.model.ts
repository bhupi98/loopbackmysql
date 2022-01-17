import {Entity, model, property} from '@loopback/repository';

@model()
export class Manufacturer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  manufacturer_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'number',
  })
  order_id?: number;

  constructor(data?: Partial<Manufacturer>) {
    super(data);
  }
}

export interface ManufacturerRelations {
  // describe navigational properties here
}

export type ManufacturerWithRelations = Manufacturer & ManufacturerRelations;
