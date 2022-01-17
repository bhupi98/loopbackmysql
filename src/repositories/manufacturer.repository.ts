import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlconnectionDataSource} from '../datasources';
import {Manufacturer, ManufacturerRelations} from '../models';

export class ManufacturerRepository extends DefaultCrudRepository<
  Manufacturer,
  typeof Manufacturer.prototype.manufacturer_id,
  ManufacturerRelations
> {
  constructor(
    @inject('datasources.mysqlconnection') dataSource: MysqlconnectionDataSource,
  ) {
    super(Manufacturer, dataSource);
  }
}
