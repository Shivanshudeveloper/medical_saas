import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@material-ui/core";
import { auth } from "../../Firebase/index";

const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const updatePassword = () => {
    if (values.password !== values.confirm) {
      alert("Passwords do not match");
      return;
    }

    const user = auth.currentUser;

    const updatedPassword = user
      .updatePassword(values.password)
      .then(() => {
        alert("Password Updated");
        setValues({ password: "", confirm: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={updatePassword}>
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsPassword;
