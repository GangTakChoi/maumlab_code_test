import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(() => String, { description: '문항 내용' })
  @IsString()
  content: string;
}
