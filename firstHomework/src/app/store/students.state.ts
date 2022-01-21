import { Istudent } from "../TableFormModule/services/studentsOffline.service";
import { createEntityAdapter } from "@ngrx/entity";

export interface StudentsState{ // extends EntityState<Istudent>
  students: Istudent[];
}

export const studentAdapter = createEntityAdapter<Istudent>({
  selectId: (student) => student.id
});

export const initialStudentsState: StudentsState = {
  students: []
};

