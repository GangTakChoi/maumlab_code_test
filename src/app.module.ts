import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeyModule } from './servey/servey.module';
import { QuestionModule } from './questions/question.module';
import { OptionsModule } from './options/options.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [ServeyModule, QuestionModule, OptionsModule, AnswersModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'local_postgres',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [],
      database: 'maumlab',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    ServeyModule,
    QuestionModule,
    OptionsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
