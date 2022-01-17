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
  Order,
  Manufacturer,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderManufacturerController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/manufacturers', {
    responses: {
      '200': {
        description: 'Array of Order has many Manufacturer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manufacturer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Manufacturer>,
  ): Promise<Manufacturer[]> {
    return this.orderRepository.manufacturers(id).find(filter);
  }

  @post('/orders/{id}/manufacturers', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manufacturer)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Order.prototype.order_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufacturer, {
            title: 'NewManufacturerInOrder',
            exclude: ['manufacturer_id'],
            optional: ['order_id']
          }),
        },
      },
    }) manufacturer: Omit<Manufacturer, 'manufacturer_id'>,
  ): Promise<Manufacturer> {
    return this.orderRepository.manufacturers(id).create(manufacturer);
  }

  @patch('/orders/{id}/manufacturers', {
    responses: {
      '200': {
        description: 'Order.Manufacturer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufacturer, {partial: true}),
        },
      },
    })
    manufacturer: Partial<Manufacturer>,
    @param.query.object('where', getWhereSchemaFor(Manufacturer)) where?: Where<Manufacturer>,
  ): Promise<Count> {
    return this.orderRepository.manufacturers(id).patch(manufacturer, where);
  }

  @del('/orders/{id}/manufacturers', {
    responses: {
      '200': {
        description: 'Order.Manufacturer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Manufacturer)) where?: Where<Manufacturer>,
  ): Promise<Count> {
    return this.orderRepository.manufacturers(id).delete(where);
  }
}
