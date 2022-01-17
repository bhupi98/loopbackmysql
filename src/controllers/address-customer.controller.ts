import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Address,
  Customer,
} from '../models';
import {AddressRepository} from '../repositories';

export class AddressCustomerController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @get('/addresses/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Address',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof Address.prototype.address_id,
  ): Promise<Customer> {
    return this.addressRepository.customer(id);
  }
}
