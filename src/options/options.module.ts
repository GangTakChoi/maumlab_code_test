import { Module, forwardRef } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsResolver } from './options.resolver';
import { QuestionModule } from 'src/questions/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { ServeyModule } from 'src/servey/servey.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Option]),
    forwardRef(() => QuestionModule),
    ServeyModule,
  ],
  providers: [OptionsResolver, OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}
