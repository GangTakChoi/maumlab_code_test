import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateServeyInput {
  @Field(() => String, { description: '설문지 이름 입력' })
  @IsString()
  name: string;
}
