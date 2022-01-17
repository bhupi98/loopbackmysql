import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlconnectionDataSource} from '../datasources';
import {Doctor, DoctorRelations, Patient, Appointment} from '../models';
import {AppointmentRepository} from './appointment.repository';
import {PatientRepository} from './patient.repository';

export class DoctorRepository extends DefaultCrudRepository<
  Doctor,
  typeof Doctor.prototype.doctor_id,
  DoctorRelations
> {

  public readonly patients: HasManyThroughRepositoryFactory<Patient, typeof Patient.prototype.patient_id,
          Appointment,
          typeof Doctor.prototype.doctor_id
        >;

  constructor(
    @inject('datasources.mysqlconnection') dataSource: MysqlconnectionDataSource, @repository.getter('AppointmentRepository') protected appointmentRepositoryGetter: Getter<AppointmentRepository>, @repository.getter('PatientRepository') protected patientRepositoryGetter: Getter<PatientRepository>,
  ) {
    super(Doctor, dataSource);
    this.patients = this.createHasManyThroughRepositoryFactoryFor('patients', patientRepositoryGetter, appointmentRepositoryGetter,);
    this.registerInclusionResolver('patients', this.patients.inclusionResolver);
  }
}
