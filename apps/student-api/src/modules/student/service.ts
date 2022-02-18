import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from 'libs/utils';
import { Repository } from 'typeorm';

import { CreateStudentInput } from './dto';
import { Student } from './entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private userRepository: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return await this.userRepository.find();
  }

  async createStudent(data: CreateStudentInput): Promise<Student> {
    const student = this.userRepository.create(data);
    const studentSaved = await this.userRepository.save(student);

    if (!studentSaved) {
      throw new ApiException('Error on create student');
    }

    return studentSaved;
  }
}
