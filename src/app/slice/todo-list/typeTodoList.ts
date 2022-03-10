export interface TInitialStateTodos {
  todos: TTodosItem[];
}

export interface TTodosItem {
  id: string;
  description: string;
  isFinished: boolean | string;
}
