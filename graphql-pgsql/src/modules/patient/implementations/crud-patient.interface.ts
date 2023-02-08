import { UpdateResult } from 'typeorm';
import { StatusUser } from '../../../shared/enums/status-user.enum';
import { Patient } from '../entities/patient.entity';
import { CreatePatientInput } from '../inputs/create-patient.input';
import { UpdatePatientInput } from '../inputs/update-patient.input';

export interface CrudPatientInterface<T> {
  create(data: CreatePatientInput): Promise<Patient>;
  findById(id: string): Promise<Patient | undefined>;
  findByHealthCard(healthNumberCard: string): Promise<Patient | undefined>;
  update(id: string, data: UpdatePatientInput): Promise<UpdateResult>;
  changeStatus(id: string, status: StatusUser): Promise<UpdateResult>;
}
