import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { TodosContext } from "../contexts/TodosContext";
import { Key } from "@mui/icons-material";

export default function Todo({ todo }) {
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [showEditDialog, setshowEditDialog] = useState(false);
  const [edittodo, setedittodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, settodos } = useContext(TodosContext);

  function handlecheckclick(id) {
    settodos(
      todos.map((todo) => {
        if (todo.id == id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function handleagreedelete(id) {
    settodos(todos.filter((todo) => todo.id !== id));
    const updatedtodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedtodos));
  }
  // delete dialog
  function handledeleteclick() {
    setshowDeleteDialog(true);
  }
  function closeDeleteDialog() {
    setshowDeleteDialog(false);
  }
  // delete dialog

  // edit dialog
  function handleeditclick() {
    setshowEditDialog(true);
  }

  function closeEditDialog() {
    setshowEditDialog(false);
  }

  function handlesave() {
    if (edittodo.title === "") return alert("من فضلك ادخل عنوان المهمة");
    const edittodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: edittodo.title, details: edittodo.details };
      } else return t;
    });
    settodos(edittodos);
    localStorage.setItem("todos", JSON.stringify(edittodos));
    closeEditDialog();
  }
  // edit dialog
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
              handlesave(todo.id);
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
          <DialogContentText id="alert-dialog-description">
            {todo.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>لا</Button>
          <Button
            onClick={() => {
              handleagreedelete(todo.id);
            }}
            autoFocus
          >
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete dialog */}
      <Card
        sx={{ minWidth: 275, background: "#283593", color: "white" }}
        className="w-100/100 hover:py-3 transition-all! duration-300! ease-in-out! hover:shadow-lg! shadow-black/70"
      >
        <CardContent className="place-items-center flex flex-col items-center">
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid size={{ xs: 6, md: 8 }}>
              <Typography
                variant="h5"
                textAlign={"right"}
                className={todo.completed ? "line-through" : ""}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                textAlign={"right"}
                className={`text-gray-300! text-sm! mt-2! ${
                  todo.completed ? "line-through" : ""
                }`}
                style={{ fontWeight: "400" }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <div className="flex flex-row justify-evenly">
                <IconButton
                  aria-label="completed"
                  onClick={() => {
                    handlecheckclick(todo.id);
                  }}
                  className={`${
                    todo.completed ? "text-white!" : "text-green-500!"
                  } ${
                    todo.completed ? "bg-green-500!" : "bg-white!"
                  } border-2! border-green-600!  ${
                    todo.completed
                      ? "hover:bg-green-700!"
                      : "hover:bg-green-100!"
                  } transition-all! duration-300! ease-in-out! hover:shadow-lg! shadow-green-500/50`}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  aria-label="Edit"
                  onClick={() => {
                    handleeditclick(todo.id);
                  }}
                  className="text-blue-500! bg-white! border-2! border-blue-600! hover:bg-blue-200! transition-all! duration-300! ease-in-out! hover:shadow-lg! shadow-blue-500/50 w-auto!"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    handledeleteclick(todo.id);
                  }}
                  aria-label="delete"
                  className="text-red-500! bg-white! border-2! border-red-600! hover:bg-red-200! transition-all! duration-300! ease-in-out! hover:shadow-lg! shadow-red-500/50"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
