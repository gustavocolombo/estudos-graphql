import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Data required to update a patient',
})
export class UpdatePatientInput {
  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  age?: number;

  @Field()
  socialNumber?: string;

  @Field()
  healthNumberCard?: string;
}
