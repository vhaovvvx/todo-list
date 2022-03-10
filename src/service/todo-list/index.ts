import { TTodosItem } from "../../app/slice/todo-list/typeTodoList";
import httpService from "../http.service";
import endPoints from "./url";

const todoList = {
  getAllTodo: (request: {}, token: string) => {
    const uri = endPoints.getAll;
    return httpService.GET<{}, any>({
      uri,
      request,
      token,
    });
  },
  postTodo: (request: TTodosItem, token: string) => {
    const uri = endPoints.getAll;
    return httpService.POST<TTodosItem, any>({
      uri,
      request,
      token,
    });
  },
  deleteTodo: (request: { id: string }, token: string, id: string) => {
    const uri = endPoints.getAll + id;
    return httpService.DELETE<{ id: string }, any>({
      uri,
      request,
      token,
    });
  },
  editTodo: (request: TTodosItem, token: string, id: string) => {
    const uri = endPoints.getAll + id;
    return httpService.PUT<TTodosItem, any>({
      uri,
      request,
      token,
    });
  },
};

export default todoList;
