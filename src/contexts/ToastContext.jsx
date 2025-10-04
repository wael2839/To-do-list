import { createContext } from "react";
import { useState, useContext } from "react";
import MySnakeBar from "../components/MySnakeBar";
const ToastContext = createContext([]);

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState([false, ""]);

  function showhidetoast(messge) {
    const newopen = [true, messge];
    setOpen(newopen);
    setTimeout(() => {
      setOpen([false, ""]);
    }, 3000);
  }
  return (
    <ToastContext.Provider value={{ open, showhidetoast }}>
      <MySnakeBar open={open} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
