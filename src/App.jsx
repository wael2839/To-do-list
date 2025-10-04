import "./App.css";
import Todolist from "./components/Todolist";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/TodosContext";
import { ToastProvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/TodosContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            className="flex items-center justify-center bg-purple-950 w-full h-screen"
            dir="rtl"
          >
            <Todolist />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
