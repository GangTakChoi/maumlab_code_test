import { CreateOptionInput } from './create-option.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOptionInput extends PartialType(CreateOptionInput) {}
