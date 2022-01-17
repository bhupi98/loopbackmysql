import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Order} from './order.model';
import {Address} from './address.model';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  customer_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @hasMany(() => Order, {keyTo: 'customer_id'})
  orders: Order[];

  @hasOne(() => Address, {keyTo: 'customer_id'})
  address: Address;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
