import { BadRequestException, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { CreatePatientInput } from '../inputs/create-patient.input';
import { PatientRepository } from '../repositories/patient.repository';

@Injectable()
export class CreatePatientService {
  constructor(private patientRepository: PatientRepository) {}

  async execute({
    firstName,
    lastName,
    age,
    healthNumberCard,
    socialNumber,
    email,
    password,
  }: CreatePatientInput): Promise<Patient> {
    const patient = await this.patientRepository.findByHealthCard(
      healthNumberCard,
    );

    if (patient) throw new BadRequestException('Patient already registered');

    const newPatient = await this.patientRepository.create({
      firstName,
      lastName,
      age,
      healthNumberCard,
      socialNumber,
      email,
      password,
    });

    return newPatient;
  }
}
