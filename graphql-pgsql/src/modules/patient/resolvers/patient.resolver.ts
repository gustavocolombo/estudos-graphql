import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Patient } from '../entities/patient.entity';
import { CreatePatientInput } from '../inputs/create-patient.input';
import { CreatePatientService } from '../services/create-patient.service';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private createPatientService: CreatePatientService) {}

  @Query(() => String)
  public helloWorld(): string {
    return 'Hello World';
  }

  @Mutation(() => Patient)
  public async createPatient(@Args('data') data: CreatePatientInput) {
    return this.createPatientService.execute(data);
  }
}
