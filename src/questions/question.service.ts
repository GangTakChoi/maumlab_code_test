import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { ServeyService } from 'src/servey/servey.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly serveyService: ServeyService,
  ) {}

  async create(
    serveyId: number,
    createQuestionInput: CreateQuestionInput,
  ): Promise<Question> {
    const servey = await this.serveyService.findOne(serveyId);

    if (!servey) {
      throw new BadRequestException();
    }

    const question = await this.questionRepository.create({
      ...createQuestionInput,
      servey,
    });

    return this.questionRepository.save(question);
  }

  findAllByServey(serveyId: number) {
    return this.questionRepository.find({
      where: { servey: { id: serveyId } },
    });
  }

  findOne(id: number) {
    return this.questionRepository.findOneBy({ id });
  }

  update(id: number, updateQuestionInput: UpdateQuestionInput) {
    return this.questionRepository.update(id, updateQuestionInput);
  }

  remove(id: number) {
    return this.questionRepository.delete({ id });
  }
}
