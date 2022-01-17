import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Appointment} from '../models';
import {AppointmentRepository} from '../repositories';

export class AppointmentController {
  constructor(
    @repository(AppointmentRepository)
    public appointmentRepository : AppointmentRepository,
  ) {}

  @post('/appointments')
  @response(200, {
    description: 'Appointment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Appointment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointment, {
            title: 'NewAppointment',
            exclude: ['appointment_id'],
          }),
        },
      },
    })
    appointment: Omit<Appointment, 'appointment_id'>,
  ): Promise<Appointment> {
    return this.appointmentRepository.create(appointment);
  }

  @get('/appointments/count')
  @response(200, {
    description: 'Appointment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Appointment) where?: Where<Appointment>,
  ): Promise<Count> {
    return this.appointmentRepository.count(where);
  }

  @get('/appointments')
  @response(200, {
    description: 'Array of Appointment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Appointment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Appointment) filter?: Filter<Appointment>,
  ): Promise<Appointment[]> {
    return this.appointmentRepository.find(filter);
  }

  @patch('/appointments')
  @response(200, {
    description: 'Appointment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointment, {partial: true}),
        },
      },
    })
    appointment: Appointment,
    @param.where(Appointment) where?: Where<Appointment>,
  ): Promise<Count> {
    return this.appointmentRepository.updateAll(appointment, where);
  }

  @get('/appointments/{id}')
  @response(200, {
    description: 'Appointment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Appointment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Appointment, {exclude: 'where'}) filter?: FilterExcludingWhere<Appointment>
  ): Promise<Appointment> {
    return this.appointmentRepository.findById(id, filter);
  }

  @patch('/appointments/{id}')
  @response(204, {
    description: 'Appointment PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointment, {partial: true}),
        },
      },
    })
    appointment: Appointment,
  ): Promise<void> {
    await this.appointmentRepository.updateById(id, appointment);
  }

  @put('/appointments/{id}')
  @response(204, {
    description: 'Appointment PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() appointment: Appointment,
  ): Promise<void> {
    await this.appointmentRepository.replaceById(id, appointment);
  }

  @del('/appointments/{id}')
  @response(204, {
    description: 'Appointment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.appointmentRepository.deleteById(id);
  }
}
