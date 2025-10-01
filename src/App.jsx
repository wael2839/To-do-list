import "./App.css";
import Todolist from "./components/Todolist";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/TodosContext";
import { ToastContext } from "./contexts/ToastContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import MySnakeBar from "./components/MySnakeBar";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
});

const maintodos = [
  {
    id: uuidv4(),
    title: "",
    details: "",
    completed: false,
  },
];

function App() {
  const [todos, settodos] = useState(maintodos);
  const [open, setOpen] = useState([false, ""]);

  let msg = "";
  function showhidetoast(messge) {
    const newopen = [true, messge];
    setOpen(newopen);
    setTimeout(() => {
      setOpen([false, ""]);
    }, 2000);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{ showhidetoast }}>
        <div
          className="flex items-center justify-center bg-purple-950 w-full h-screen"
          dir="rtl"
        >
          <MySnakeBar open={open} msg={msg} />
          <TodosContext.Provider value={{ todos, settodos }}>
            <Todolist />
          </TodosContext.Provider>
        </div>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}

export default App;
