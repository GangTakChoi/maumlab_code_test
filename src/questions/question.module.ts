import { Module, forwardRef } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { ServeyModule } from 'src/servey/servey.module';
import { OptionsModule } from 'src/options/options.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    ServeyModule,
    forwardRef(() => OptionsModule),
  ],
  providers: [QuestionResolver, QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
