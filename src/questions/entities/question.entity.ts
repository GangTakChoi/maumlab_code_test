import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Servey } from 'src/servey/entities/servey.entity';
import { Option } from 'src/options/entities/option.entity';

@ObjectType()
@Entity()
export class Question {
  @Field(() => Int, { description: '문항 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '문항 내용' })
  @Column()
  content: string;

  @Field(() => Servey, { nullable: false })
  @ManyToOne(() => Servey, (servey) => servey.questions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  servey: Servey;

  @Field(() => [Option], { nullable: true })
  @OneToMany(() => Option, (option) => option.question, {
    cascade: true,
    eager: true,
  })
  options: Option[];
}
