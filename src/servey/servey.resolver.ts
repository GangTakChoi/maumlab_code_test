import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServeyService } from './servey.service';
import { Servey } from './entities/servey.entity';
import { CreateServeyInput } from './dto/create-servey.input';
import { UpdateServeyInput } from './dto/update-servey.input';
import GraphQLJSON from 'graphql-type-json';

@Resolver(() => Servey)
export class ServeyResolver {
  constructor(private readonly serveyService: ServeyService) {}

  @Mutation(() => Servey)
  createServey(
    @Args('createServeyInput') createServeyInput: CreateServeyInput,
  ) {
    return this.serveyService.create(createServeyInput);
  }

  @Query(() => [Servey], { name: 'getServeyList' })
  getServeyList() {
    return this.serveyService.findAll();
  }

  @Query(() => Servey, { name: 'getServey' })
  getServey(@Args('id', { type: () => Int }) id: number) {
    return this.serveyService.findOne(id);
  }

  @Mutation(() => GraphQLJSON)
  updateServey(
    @Args('id') id: number,
    @Args('updateServeyInput') updateServeyInput: UpdateServeyInput,
  ) {
    return this.serveyService.update(id, updateServeyInput);
  }

  @Mutation(() => GraphQLJSON)
  removeServey(@Args('id', { type: () => Int }) id: number) {
    return this.serveyService.remove(id);
  }
}
