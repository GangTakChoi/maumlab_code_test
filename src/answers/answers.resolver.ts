import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnswersService } from './answers.service';
import { CreateAnswerInput } from './dto/create-answer.input';
// import { UpdateAnswerInput } from './dto/update-answer.input';
import { AnswerSheet } from './entities/answer-sheet.entity';
import GraphQLJSON from 'graphql-type-json';

@Resolver(() => AnswerSheet)
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}

  @Mutation(() => AnswerSheet)
  createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
  ) {
    return this.answersService.create(createAnswerInput);
  }

  @Query(() => [AnswerSheet], { name: 'getAnswerSheetList' })
  getAnswerSheetList() {
    return this.answersService.findAll();
  }

  @Query(() => AnswerSheet, { name: 'getAnswerSheet' })
  getAnswerSheet(@Args('id', { type: () => Int }) id: number) {
    return this.answersService.findOne(id);
  }

  @Mutation(() => GraphQLJSON)
  removeAnswer(@Args('id', { type: () => Int }) id: number) {
    return this.answersService.remove(id);
  }

  // @Mutation(() => Answer)
  // updateAnswer(
  //   @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
  // ) {
  //   return this.answersService.update(updateAnswerInput.id, updateAnswerInput);
  // }
}
