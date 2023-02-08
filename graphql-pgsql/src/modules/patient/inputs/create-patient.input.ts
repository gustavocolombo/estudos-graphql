import { Field, InputType } from '@nestjs/graphql';

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
}
