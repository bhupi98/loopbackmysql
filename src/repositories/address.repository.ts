import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlconnectionDataSource} from '../datasources';
import {Address, AddressRelations, Customer} from '../models';
import {CustomerRepository} from './customer.repository';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.address_id,
  AddressRelations
> {

  public readonly customer: BelongsToAccessor<Customer, typeof Address.prototype.address_id>;

  constructor(
    @inject('datasources.mysqlconnection') dataSource: MysqlconnectionDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(Address, dataSource);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
