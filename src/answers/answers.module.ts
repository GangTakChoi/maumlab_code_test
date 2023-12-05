import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerSheet } from './entities/answer-sheet.entity';
import { Answer } from './entities/answer.entity';
import { ServeyModule } from 'src/servey/servey.module';
import { OptionsModule } from 'src/options/options.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerSheet, Answer]),
    OptionsModule,
    ServeyModule,
  ],
  providers: [AnswersResolver, AnswersService],
})
export class AnswersModule {}
