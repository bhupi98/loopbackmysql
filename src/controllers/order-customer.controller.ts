import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Order,
  Customer,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderCustomerController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof Order.prototype.order_id,
  ): Promise<Customer> {
    return this.orderRepository.customers(id);
  }
}
