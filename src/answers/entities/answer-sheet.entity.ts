import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Servey } from 'src/servey/entities/servey.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';

@ObjectType()
@Entity()
export class AnswerSheet {
  @Field(() => Int, { description: '답변지 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Servey, { nullable: false })
  @ManyToOne(() => Servey, (servey) => servey.answerSheets, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  servey: Servey;

  @Field(() => [Answer], { nullable: true })
  @OneToMany(() => Answer, (answer) => answer.answerSheet, {
    cascade: true,
    eager: true,
  })
  answers: Answer[];

  @Field(() => Int, { description: '답변지 합산 점수' })
  @Column({
    type: 'smallint',
    default: 0,
  })
  score: number;
}
