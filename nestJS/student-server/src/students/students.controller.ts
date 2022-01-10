import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

export interface Istudent {
  id: number;
  lastName: string;
  name: string;
  patronymic: string;
  birthDate: string;
  score: number;
  deleted: boolean;
  inRange: boolean;
}

export interface IstudentEdit {
  lastName: string;
  name: string;
  patronymic: string;
  birthDate: string;
  score: number;
}

@Controller('students')
export class StudentsController {
  public students: Istudent[] = [
    {
      id: 1,
      lastName: 'Онлайнов',
      name: 'Онлайн',
      patronymic: 'Онлайнович',
      birthDate: '27.08.1994',
      score: 3,
      deleted: false,
      inRange: true,
    },
    {
      id: 2,
      lastName: 'Онлайн',
      name: 'василий',
      patronymic: 'васильевич',
      birthDate: '01.01.1994',
      score: 5,
      deleted: false,
      inRange: true,
    },
  ];
  @Get()
  getAll() {
    return this.students;
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return 'getOne ' + id;
  }

  @Post()
  newStudent(@Body() body: Istudent): any {
    this.students.push(body);
    return this.students;
  }

  @Patch(':id')
  editStudent(@Param('id') id: string, @Body() body: IstudentEdit) {
    const studentToEdit = this.students.findIndex(
      (el) => el.id === +id && el.deleted !== true,
    );
    this.students[studentToEdit].name = body.name;
    this.students[studentToEdit].lastName = body.lastName;
    this.students[studentToEdit].patronymic = body.patronymic;
    this.students[studentToEdit].birthDate = body.birthDate;
    this.students[studentToEdit].score = +body.score;
    return this.students;
  }

  @Get(':id/del')
  delStudent(@Param('id') id: string) {
    const studentToEdit = this.students.findIndex(
      (el) => el.id === +id && el.deleted !== true,
    );
    this.students[studentToEdit].deleted = true;
    return this.students;
  }
}
