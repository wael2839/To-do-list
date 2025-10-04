import { createContext, useReducer, useContext } from "react";
import todosReducer from "../reducers/todosReducer";

export const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider value={{ todos, dispatch: todosDispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
export default TodosProvider;
