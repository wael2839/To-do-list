import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function Todo({
  todo,
  handledeleteclick,
  handleeditclick,
  handlecheckclick,
}) {
  return (
    <>
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
