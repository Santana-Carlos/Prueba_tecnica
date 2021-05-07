import { withStyles } from "@material-ui/core/styles";
import {
  Container,
  Button,
  OutlinedInput,
  TextField,
  Checkbox,
} from "@material-ui/core";

export const OrangeButton = withStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    color: "#FFFFFF",
    fontSize: "1.1rem",
    margin: 0,
    fontWeight: 400,
    textAlign: "center",
    backgroundColor: "#ff5f58",
    "&:hover": {
      backgroundColor: "#d8352d",
    },
  },
}))(Button);

export const StyledCheckbox = withStyles((theme) => ({
  colorPrimary: {
    padding: "0 0 0 0.5rem",
    "&.Mui-checked": {
      color: "#ff5f58",
    },
  },
}))(Checkbox);

export const StyledTextField = withStyles((theme) => ({
  root: {
    margin: "0 0 0 0.5rem",
    padding: 0,
    maxWidth: "4rem",
    textAlign: "right",
    backgroundColor: "#fff",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#ff5f58",
      },
    },
  },
}))(TextField);

export const StyledInput = withStyles((theme) => ({
  root: {
    fontSize: "1.05rem",
    fontWeight: "500",
    lineHeight: "2rem",
    padding: "1.5rem 0",
    borderRadius: "0 0 5px 5px",
    color: "#4f4f4f",
    backgroundColor: "#fff",
  },
  notchedOutline: {
    border: "none",
  },
  input: {
    padding: "0 1.1rem",
  },
}))(OutlinedInput);

export const StyledContainer = withStyles((theme) => ({
  maxWidthMd: {
    maxWidth: "46rem",
    minHeight: "100%",
  },
}))(Container);
