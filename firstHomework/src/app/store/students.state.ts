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
// export const initialStudentsState: StudentsState = studentAdapter.
// export interface ChatState extends EntityState<Message>{
//   config?: {};
// }

// export const chatAdapter = createEntityAdapter<Message>({
//   selectId: (item) => item.message
// });

// export const initialChatState: ChatState = chatAdapter.getInitialState();
