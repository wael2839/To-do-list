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
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../contexts/TodosContext";
import Todo from "./Todo";

export default function Todolist() {
  const [titleinput, settitleinput] = useState("");
  const { todos, settodos } = useContext(TodosContext);
  const [alignment, setAlignment] = useState("all");

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
  }

  const todolist = todos.map((todo) => {
    if (alignment === "all") return <Todo key={todo.id} todo={todo} />;
    if (alignment === "done" && todo.completed)
      return <Todo key={todo.id} todo={todo} />;
    if (alignment === "undone" && !todo.completed)
      return <Todo key={todo.id} todo={todo} />;
  });

  function handleAlignment(value, newaligment) {
    setAlignment(newaligment);
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent className="place-items-center flex flex-col items-center overflow-y-auto h-[85vh] ">
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
          <div className="gap-5 flex flex-col w-full">{todolist}</div>
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
  );
}
