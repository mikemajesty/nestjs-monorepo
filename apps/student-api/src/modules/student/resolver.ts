import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateStudentInput } from './dto';
import { Student } from './entity';
import { StudentService } from './service';

@Resolver('Student')
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student])
  async getAll(): Promise<Student[]> {
    return await this.studentService.findAll();
  }

  @Mutation(() => Student)
  async createStudent(@Args('data') data: CreateStudentInput): Promise<Student> {
    return await this.studentService.createStudent(data);
  }
}
