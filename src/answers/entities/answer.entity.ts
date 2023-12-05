import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AnswerSheet } from './answer-sheet.entity';
import { Option } from 'src/options/entities/option.entity';

@ObjectType()
@Entity()
export class Answer {
  @Field(() => Int, { description: '답변 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => AnswerSheet, { nullable: false })
  @ManyToOne(() => AnswerSheet, (answerSheet) => answerSheet.answers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  answerSheet: AnswerSheet;

  @Field(() => Option, { nullable: false })
  @ManyToOne(() => Option, (option) => option.answers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  option: Option;
}
