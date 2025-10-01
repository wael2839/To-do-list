import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

export default function MySnakeBar({ open }) {
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open[0]}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {open[1]}
        </Alert>
      </Snackbar>
    </div>
  );
}
