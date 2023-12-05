import { Injectable } from '@nestjs/common';
import { CreateServeyInput } from './dto/create-servey.input';
import { UpdateServeyInput } from './dto/update-servey.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Servey } from './entities/servey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServeyService {
  constructor(
    @InjectRepository(Servey)
    private readonly serveyRepository: Repository<Servey>,
  ) {}

  create(createServeyInput: CreateServeyInput) {
    const servey = this.serveyRepository.create(createServeyInput);

    return this.serveyRepository.save(servey);
  }

  findAll(): Promise<Servey[]> {
    return this.serveyRepository.find();
  }

  findOne(id: number): Promise<Servey> {
    return this.serveyRepository.findOneOrFail({ where: { id } });
  }

  update(id: number, updateServeyInput: UpdateServeyInput) {
    return this.serveyRepository.update(id, updateServeyInput);
  }

  remove(id: number) {
    return this.serveyRepository.delete(id);
  }
}
