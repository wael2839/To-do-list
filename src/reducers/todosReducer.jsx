import { v4 as uuidv4 } from "uuid";
export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "ADD": {
      const newtodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        completed: false,
      };
      const updatedtodos = [...currentTodos, newtodo];
      localStorage.setItem("todos", JSON.stringify(updatedtodos));

      return updatedtodos;
    }
    case "Delete": {
      const updatedtodos = currentTodos.filter(
        (todo) => todo.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedtodos));

      return updatedtodos;
    }
    case "Edit": {
      const edittodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else return t;
      });
      localStorage.setItem("todos", JSON.stringify(edittodos));
      return edittodos;
    }
    case "Check": {
      const newstatus = currentTodos.map((todo) => {
        if (todo.id == action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(newstatus));
      return newstatus;
    }
    case "git": {
      const localtodos = JSON.parse(localStorage.getItem("todos"));
      if (localtodos) {
        return localtodos;
      } else {
        return [];
      }
    }
    default: {
      throw Error(`Unkown action ${action.type}`);
    }
  }
}
