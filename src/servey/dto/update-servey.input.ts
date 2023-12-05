import { CreateServeyInput } from './create-servey.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServeyInput extends PartialType(CreateServeyInput) {}
