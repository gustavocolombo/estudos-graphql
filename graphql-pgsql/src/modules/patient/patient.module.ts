import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './repositories/patient.repository';
import { PatientResolver } from './resolvers/patient.resolver';
import { CreatePatientService } from './services/create-patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [],
  providers: [PatientResolver, CreatePatientService, PatientRepository],
})
export class PatientModule {}
