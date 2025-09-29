import "./App.css";
import Todolist from "./components/Todolist";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
});

const maintodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "200 صفحة",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "انهاء صفحة الهبوط",
    details: "تفاصيل المهمة",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "3عنوان المهمة",
    details: "تفاصيل المهمة",
    completed: false,
  },
];

function App() {
  const [todos, settodos] = useState(maintodos);
  return (
    <ThemeProvider theme={theme}>
      <TodosContext.Provider value={{ todos, settodos }}>
        <div
          className="flex items-center justify-center bg-purple-950 w-full h-screen"
          dir="rtl"
        >
          <Todolist />
        </div>
      </TodosContext.Provider>
    </ThemeProvider>
  );
}

export default App;
