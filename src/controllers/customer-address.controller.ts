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
  Address,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerAddressController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/address', {
    responses: {
      '200': {
        description: 'Customer has one Address',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Address),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Address>,
  ): Promise<Address> {
    return this.customerRepository.address(id).get(filter);
  }

  @post('/customers/{id}/address', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Address)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.customer_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddressInCustomer',
            exclude: ['address_id'],
            optional: ['customer_id']
          }),
        },
      },
    }) address: Omit<Address, 'address_id'>,
  ): Promise<Address> {
    return this.customerRepository.address(id).create(address);
  }

  @patch('/customers/{id}/address', {
    responses: {
      '200': {
        description: 'Customer.Address PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Partial<Address>,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.customerRepository.address(id).patch(address, where);
  }

  @del('/customers/{id}/address', {
    responses: {
      '200': {
        description: 'Customer.Address DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Address)) where?: Where<Address>,
  ): Promise<Count> {
    return this.customerRepository.address(id).delete(where);
  }
}
