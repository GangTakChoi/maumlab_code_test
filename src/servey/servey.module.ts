import { Module } from '@nestjs/common';
import { ServeyService } from './servey.service';
import { ServeyResolver } from './servey.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servey } from './entities/servey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servey])],
  providers: [ServeyResolver, ServeyService],
  exports: [ServeyService],
})
export class ServeyModule {}
