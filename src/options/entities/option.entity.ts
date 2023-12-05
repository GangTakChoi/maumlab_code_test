import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Answer } from 'src/answers/entities/answer.entity';
import { Question } from 'src/questions/entities/question.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Option {
  @Field(() => Int, { description: '선택지 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '선택지 내용' })
  @Column()
  content: string;

  @Field(() => Int, { description: '선택지 점수' })
  @Column({ type: 'smallint' })
  score: number;

  @Field(() => Question, { nullable: false })
  @ManyToOne(() => Question, (question) => question.options, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  question: Question;

  @Field(() => [Answer], { nullable: true })
  @OneToMany(() => Answer, (answer) => answer.option, {
    cascade: true,
  })
  answers: Answer[];
}
