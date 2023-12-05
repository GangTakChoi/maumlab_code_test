import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Repository } from 'typeorm';
import { QuestionService } from 'src/questions/question.service';
import { ServeyService } from 'src/servey/servey.service';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    private readonly questionService: QuestionService,
    private readonly serveyService: ServeyService,
  ) {}

  async create(
    questionId: number,
    createOptionInput: CreateOptionInput,
  ): Promise<Option> {
    const question = await this.questionService.findOne(questionId);

    if (!question) throw new BadRequestException();

    const option = this.optionRepository.create({
      ...createOptionInput,
      question,
    });

    return this.optionRepository.save(option);
  }

  async findAllByQuestion(questionId: number): Promise<Option[]> {
    const question = await this.questionService.findOne(questionId);

    if (!question) throw new BadRequestException();

    return this.optionRepository.find({
      where: { question: { id: question.id } },
    });
  }

  async findAllByServey(serveyId: number) {
    const servey = await this.serveyService.findOne(serveyId);

    if (!servey) throw new BadRequestException();

    return this.optionRepository.find({
      where: { question: { servey: { id: serveyId } } },
      select: { id: true, score: true, question: { id: true } },
    });
  }

  async findOne(id: number) {
    const option = await this.optionRepository.findOneBy({ id });
    if (!option) throw new NotFoundException();
    return option;
  }

  update(id: number, updateOptionInput: UpdateOptionInput) {
    return this.optionRepository.update(id, updateOptionInput);
  }

  remove(id: number) {
    return this.optionRepository.delete(id);
  }
}
