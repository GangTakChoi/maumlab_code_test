import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class CreateOptionInput {
  @Field(() => String, { description: '선택지 내용' })
  @IsString()
  content: string;

  @Field(() => Int, { description: '선택지 점수' })
  @IsNumber()
  @Min(0)
  score: number;
}

@InputType()
export class OptionIdInput {
  @Field(() => String)
  @IsNotEmpty()
  id: string;
}
