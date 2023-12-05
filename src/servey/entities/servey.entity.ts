import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { AnswerSheet } from 'src/answers/entities/answer-sheet.entity';

@ObjectType()
@Entity()
export class Servey {
  @Field(() => Int, { description: '설문지 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '설문지 이름' })
  @Column()
  name: string;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.servey, {
    cascade: true,
    eager: true,
  })
  questions: Question[];

  @Field(() => [AnswerSheet], { nullable: true })
  @OneToMany(() => AnswerSheet, (answerSheet) => answerSheet.servey, {
    cascade: true,
    eager: true,
  })
  answerSheets: AnswerSheet[];
}
