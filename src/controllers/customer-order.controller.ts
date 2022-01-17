import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Customer,
  Order,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerOrderController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Customer has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.customerRepository.orders(id).find(filter);
  }

  @post('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.customer_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInCustomer',
            exclude: ['order_id'],
            optional: ['customer_id']
          }),
        },
      },
    }) order: Omit<Order, 'order_id'>,
  ): Promise<Order> {
    return this.customerRepository.orders(id).create(order);
  }

  @patch('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customer.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.customerRepository.orders(id).patch(order, where);
  }

  @del('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customer.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.customerRepository.orders(id).delete(where);
  }
}
