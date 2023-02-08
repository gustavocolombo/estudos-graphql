import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { StatusUser } from '../../../shared/enums/status-user.enum';
import { Patient } from '../entities/patient.entity';
import { CrudPatientInterface } from '../implementations/crud-patient.interface';
import { CreatePatientInput } from '../inputs/create-patient.input';
import { UpdatePatientInput } from '../inputs/update-patient.input';

export class PatientRepository implements CrudPatientInterface<Patient> {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
  ) {}

  async create(data: CreatePatientInput): Promise<Patient> {
    try {
      console.log('entrando');
      const patient = this.patientRepository.create(data);

      await this.patientRepository.save(patient);

      return patient;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, data: UpdatePatientInput): Promise<UpdateResult> {
    try {
      const patient = await this.patientRepository.update(id, { ...data });

      return patient;
    } catch (error) {
      throw new Error(error);
    }
  }

  async changeStatus(id: string, status: StatusUser): Promise<UpdateResult> {
    try {
      const patient = await this.patientRepository.update(id, { status });

      return patient;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<Patient> {
    try {
      const patient = await this.patientRepository.findOne({ where: { id } });

      return patient;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByHealthCard(healthNumberCard: string): Promise<Patient> {
    try {
      const patient = await this.patientRepository.findOne({
        where: { healthNumberCard },
      });

      return patient;
    } catch (error) {
      throw new Error(error);
    }
  }
}
