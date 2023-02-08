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
    address,
  }: CreatePatientInput): Promise<Patient> {
    const checkPatientHealtCard = await this.patientRepository.findByHealthCard(
      healthNumberCard,
    );

    const checkPatientEmail = await this.patientRepository.findByEmail(email);

    if (checkPatientHealtCard || checkPatientEmail)
      throw new BadRequestException('Patient already registered');

    const patient = await this.patientRepository.create({
      firstName,
      lastName,
      age,
      healthNumberCard,
      socialNumber,
      email,
      password,
      address,
    });

    return patient;
  }
}
