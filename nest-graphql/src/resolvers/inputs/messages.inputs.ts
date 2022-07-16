import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessagesInput {
  @Field()
  readonly title: string;

  @Field()
  readonly content: string;

  @Field()
  readonly user_id: string;
}
