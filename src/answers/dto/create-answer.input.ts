import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsNumber, Min, ValidateNested } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field(() => Int, { description: '설문지 아이디' })
  @IsNumber()
  @Min(0)
  serveyId: number;

  @Field(() => [AnswerInputBundle], { description: '답변 내용' })
  @IsArray()
  answers: AnswerInputBundle[];
}

@InputType()
export class AnswerInputBundle {
  @Field(() => Int, { description: '문항 아이디' })
  @IsNumber()
  @Min(0)
  questionId: number;

  @Field(() => Int, { description: '선택지 아이디' })
  @IsNumber()
  @Min(0)
  optionId: number;
}
