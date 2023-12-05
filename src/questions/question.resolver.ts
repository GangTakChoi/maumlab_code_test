import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import GraphQLJSON from 'graphql-type-json';
import { OptionsService } from 'src/options/options.service';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(
    private readonly questionService: QuestionService,
    private readonly optionsService: OptionsService,
  ) {}

  @Mutation(() => Question)
  createQuestion(
    @Args('serveyId', { type: () => Int }) serveyId: number,
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionService.create(serveyId, createQuestionInput);
  }

  @Query(() => [Question], { name: 'getQuestionList' })
  getQuestionList(@Args('serveyId', { type: () => Int }) serveyId: number) {
    return this.questionService.findAllByServey(serveyId);
  }

  @Query(() => Question, { name: 'getQuestion' })
  getQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.findOne(id);
  }

  @Mutation(() => GraphQLJSON)
  updateQuestion(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionService.update(id, updateQuestionInput);
  }

  @Mutation(() => GraphQLJSON)
  removeQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.remove(id);
  }

  @ResolveField()
  async options(@Parent() question: Question) {
    const { id } = question;
    return this.optionsService.findAllByQuestion(id);
  }
}
