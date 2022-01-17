import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MysqlconnectionDataSource} from '../datasources';
import {Address, Customer, CustomerRelations, Order} from '../models';
import {AddressRepository} from './address.repository';
import {OrderRepository} from './order.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.customer_id,
  CustomerRelations
> {

  public readonly orders: HasManyRepositoryFactory<Order, typeof Customer.prototype.customer_id>;

  public readonly address: HasOneRepositoryFactory<Address, typeof Customer.prototype.customer_id>;

  constructor(
    @inject('datasources.mysqlconnection') dataSource: MysqlconnectionDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Customer, dataSource);
    this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }


  async findCustomerByEmailAndId(email:string,id:number):Promise<Customer>{
  const sql='select name from bucket.customer where email='+'"'+email+'"'+' and customer_id='+id+'';
  console.log('sql',sql)

  return <Customer> await this.execute(sql);
  }


}
