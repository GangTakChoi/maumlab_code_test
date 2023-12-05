import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { Option } from './entities/option.entity';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import GraphQLJSON from 'graphql-type-json';

@Resolver(() => Option)
export class OptionsResolver {
  constructor(private readonly optionsService: OptionsService) {}

  @Mutation(() => Option)
  createOption(
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('createOptionInput') createOptionInput: CreateOptionInput,
  ) {
    return this.optionsService.create(questionId, createOptionInput);
  }

  @Query(() => [Option], { name: 'getOptionList' })
  getOptionList(@Args('questionId', { type: () => Int }) questionId: number) {
    return this.optionsService.findAllByQuestion(questionId);
  }

  @Query(() => Option, { name: 'getOption' })
  getOption(@Args('id', { type: () => Int }) id: number) {
    return this.optionsService.findOne(id);
  }

  @Mutation(() => GraphQLJSON)
  updateOption(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput,
  ) {
    return this.optionsService.update(id, updateOptionInput);
  }

  @Mutation(() => GraphQLJSON)
  removeOption(@Args('id', { type: () => Int }) id: number) {
    return this.optionsService.remove(id);
  }
}
