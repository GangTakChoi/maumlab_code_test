import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnswerInput } from './dto/create-answer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerSheet } from './entities/answer-sheet.entity';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { OptionsService } from 'src/options/options.service';
import { ServeyService } from 'src/servey/servey.service';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerSheet)
    private readonly answerSheetRepository: Repository<AnswerSheet>,
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly optionService: OptionsService,
    private readonly serveyService: ServeyService,
  ) {}

  async create(createAnswerInput: CreateAnswerInput) {
    const options = await this.optionService.findAllByServey(
      createAnswerInput.serveyId,
    );

    if (!options) throw new BadRequestException();

    const servey = await this.serveyService.findOne(createAnswerInput.serveyId);

    const tempAnswerSheet = this.answerSheetRepository.create({
      servey,
    });

    const answerSheet = await this.answerSheetRepository.save(tempAnswerSheet);

    const { answers } = createAnswerInput;
    let totalScore = 0;
    const insertAnswer: Answer[] = [];

    for (const option of options) {
      for (const answer of answers) {
        if (option.id == answer.optionId) {
          totalScore = totalScore + option.score;
          insertAnswer.push(
            this.answerRepository.create({
              answerSheet,
              option,
            }),
          );
        }
      }
    }

    await this.answerRepository.insert(insertAnswer);

    await this.answerSheetRepository.update(answerSheet.id, {
      score: totalScore,
    });

    return this.answerSheetRepository.findOneBy({ id: answerSheet.id });
  }

  findAll() {
    return this.answerSheetRepository.find({
      relations: ['answers', 'answers.option', 'servey'],
    });
  }

  findOne(id: number) {
    return this.answerSheetRepository.findOne({
      where: {
        id,
      },
      relations: ['answers', 'answers.option', 'servey'],
    });
  }

  remove(id: number) {
    return this.answerSheetRepository.delete(id);
  }
}
