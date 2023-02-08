import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Data required to create an address' })
export class CreateAddressInput {
  @Field()
  state: string;

  @Field()
  city: string;

  @Field()
  number: number;

  @Field()
  zipCode: string;

  @Field()
  neighbourhood: string;
}
