import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlconnectionDataSource} from '../datasources';
import {Order, OrderRelations, Customer, Manufacturer} from '../models';
import {CustomerRepository} from './customer.repository';
import {ManufacturerRepository} from './manufacturer.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.order_id,
  OrderRelations
> {

  public readonly customers: BelongsToAccessor<Customer, typeof Order.prototype.order_id>;

  public readonly manufacturers: HasManyRepositoryFactory<Manufacturer, typeof Order.prototype.order_id>;

  constructor(
    @inject('datasources.mysqlconnection') dataSource: MysqlconnectionDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('ManufacturerRepository') protected manufacturerRepositoryGetter: Getter<ManufacturerRepository>,
  ) {
    super(Order, dataSource);
    this.manufacturers = this.createHasManyRepositoryFactoryFor('manufacturers', manufacturerRepositoryGetter,);
    this.registerInclusionResolver('manufacturers', this.manufacturers.inclusionResolver);
    this.customers = this.createBelongsToAccessorFor('customers', customerRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
