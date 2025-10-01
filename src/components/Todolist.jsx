import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect, useMemo } from "react";
import { TodosContext } from "../contexts/TodosContext";
import { ToastContext } from "../contexts/ToastContext";
import Todo from "./Todo";

// dialog

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todolist() {
  const [titleinput, settitleinput] = useState("");
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [showEditDialog, setshowEditDialog] = useState(false);
  const [edittodo, setedittodo] = useState({});
  const [idtodelete, setidtodelete] = useState(0);

  const { todos, settodos } = useContext(TodosContext);
  const [alignment, setAlignment] = useState("all");

  const { showhidetoast } = useContext(ToastContext);

  useEffect(() => {
    const localtodos = JSON.parse(localStorage.getItem("todos"));
    if (localtodos) settodos(localtodos);
  }, []);
  function handleaddclick() {
    if (titleinput === "") return alert("من فضلك ادخل عنوان المهمة");
    const newtodo = {
      id: uuidv4(),
      title: titleinput,
      details: "",
      completed: false,
    };
    const updatedtodos = [...todos, newtodo];
    settodos(updatedtodos);
    localStorage.setItem("todos", JSON.stringify(updatedtodos));
    settitleinput("");
    showhidetoast("تم اضافة المهمة بنجاح");
  }

  const completedTodoReady = useMemo(() => {
    console.log("done");
    return todos.filter((t) => {
      return t.completed;
    });
  }, [todos]);

  const nocompletedTodoReady = useMemo(() => {
    console.log("undone");
    return todos.filter((t) => {
      return !t.completed;
    });
  }, [todos]);

  let todosReady = todos;

  if (alignment === "done") {
    todosReady = completedTodoReady;
  } else if (alignment === "undone") {
    todosReady = nocompletedTodoReady;
  } else {
    todosReady = todos;
  }

  const todosToBeRenders = todosReady.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        handledeleteclick={handledeleteclick}
        handleeditclick={handleeditclick}
        handlecheckclick={handlecheckclick}
      />
    );
  });
  function handleAlignment(value, newaligment) {
    setAlignment(newaligment);
  }

  // delete dialog

  function handleagreedelete(idtodelete) {
    settodos(todos.filter((todo) => todo.id !== idtodelete));
    const updatedtodos = todos.filter((todo) => todo.id !== idtodelete);
    localStorage.setItem("todos", JSON.stringify(updatedtodos));
    closeDeleteDialog();
    showhidetoast("تم حذف المهمة بنجاح");
  }
  function handledeleteclick(id) {
    setshowDeleteDialog(true);
    setidtodelete(id);
  }
  function closeDeleteDialog() {
    setshowDeleteDialog(false);
  }
  // delete dialog

  // edit dialog
  function handleeditclick(id) {
    todos.find((todo) => {
      if (todo.id === id) {
        setedittodo(todo);
      }
    });
    setshowEditDialog(true);
  }

  function closeEditDialog() {
    setshowEditDialog(false);
  }

  function handlesave() {
    if (edittodo.title === "") return alert("من فضلك ادخل عنوان المهمة");
    const edittodos = todos.map((t) => {
      if (t.id === edittodo.id) {
        return { ...t, title: edittodo.title, details: edittodo.details };
      } else return t;
    });
    settodos(edittodos);
    localStorage.setItem("todos", JSON.stringify(edittodos));
    closeEditDialog();
    showhidetoast("تم تعديل المهمة بنجاح");
  }
  // edit dialog
  // check handler
  function handlecheckclick(id) {
    settodos(
      todos.map((todo) => {
        if (todo.id == id) {
          todo.completed = !todo.completed;
          showhidetoast(
            `تم ${todo.completed ? "انجاز" : "الغاء انجاز"} المهمة `
          );
        }
        return todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  // check handler

  return (
    <>
      {/* Edit dialog */}
      <Dialog open={showEditDialog} onClose={closeEditDialog} dir="rtl">
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <form id="title">
            <TextField
              required
              margin="dense"
              id="name"
              name="title"
              label="عنوان المهمة"
              value={edittodo.title || ""}
              onChange={(e) => {
                setedittodo({ ...edittodo, title: e.target.value });
              }}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="details"
              name="details"
              label="تفاصيل المهمة"
              value={edittodo.details || ""}
              onChange={(e) => {
                setedittodo({ ...edittodo, details: e.target.value });
              }}
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>اغلاق</Button>
          <Button
            onClick={() => {
              handlesave(edittodo.id);
            }}
            type="submit"
            form="subscription-form"
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit dialog */}
      {/* delete dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد من حذف هذه المهمة"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>لا</Button>
          <Button
            onClick={() => {
              handleagreedelete(idtodelete);
            }}
            autoFocus
          >
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete dialog */}
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent className="place-items-center flex flex-col items-center overflow-y-auto max-h-[80vh]">
            <Typography variant="h3">مهامي</Typography>
            <Divider className=" w-full" />
            {/* filter buttns */}
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
              className="my-5"
            >
              <ToggleButton value="all">الكل</ToggleButton>
              <ToggleButton value="done">المنجز</ToggleButton>
              <ToggleButton value="undone">غير المنجز</ToggleButton>
            </ToggleButtonGroup>
            {/* filter buttns */}
            {/* all todos */}
            <div className="gap-5 flex flex-col w-full">{todosToBeRenders}</div>
            <Grid
              container
              spacing={2}
              sx={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Grid size={{ xs: 6, md: 8 }}>
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمة"
                  value={titleinput}
                  onChange={(e) => {
                    settitleinput(e.target.value);
                  }}
                  variant="outlined"
                  className="w-full"
                />
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <Button
                  onClick={() => {
                    handleaddclick();
                  }}
                  variant="contained"
                  className="w-full! h-14"
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
            {/* all todos */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
