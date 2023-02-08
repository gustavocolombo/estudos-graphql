import { Field, InputType } from '@nestjs/graphql';
import { CreateAddressInput } from '../../address/inputs/create-address.input';

@InputType({
  description: 'Data required to create a patient',
})
export class CreatePatientInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  age: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  socialNumber: string;

  @Field()
  healthNumberCard: string;

  @Field()
  address: CreateAddressInput;
}
