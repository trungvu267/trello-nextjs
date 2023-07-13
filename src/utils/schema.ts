import * as yup from "yup";
import { statusList } from "./dummyData";
export const createTodoSchema = yup.object().shape({
  status: yup.string().oneOf(statusList).required("Status is required"),
  title: yup.string().required("Title is required"),
});
