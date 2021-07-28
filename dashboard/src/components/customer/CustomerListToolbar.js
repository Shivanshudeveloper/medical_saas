import react, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Dropzone from "react-dropzone";
import { firestore, storage } from "../../Firebase/index";
import { v4 as uuid4 } from "uuid";
import axios from "axios";

const CustomerListToolbar = (props) => {
  const [open, setOpen] = react.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [file, setFile] = useState([]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
    regDate: "",
    description: "",
    image: "",
  });

  const changeEle = (event) => {
    const { name, value } = event.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (file.length > 0) {
      onSubmit();
    } else {
      console.log("N");
    }
  }, [file]);

  const handleDrop = async (acceptedFiles) => {
    setFile(acceptedFiles.map((file) => file));
  };

  const onSubmit = () => {
    if (file.length > 0) {
      file.forEach((file) => {
        const timeStamp = Date.now();
        var uniquetwoKey = uuid4();
        uniquetwoKey = uniquetwoKey + timeStamp;
        const uploadTask = storage
          .ref(`users/${uniquetwoKey}/${file.name}`)
          .put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(`Uploading ${progress} %`);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            // When the Storage gets Completed
            const filePath = await uploadTask.snapshot.ref.getDownloadURL();
            console.log("File Uploaded");
            setUser((prevVal) => ({ ...prevVal, image: filePath }));
          }
        );
      });
    } else {
      console.log("No File Selected Yet");
    }
  };

  const submitUser = () => {
    axios
      .post("http://localhost:5000/api/v1/main/adduser", user)
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log("error");
      });
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button color="primary" variant="contained" onClick={handleClickOpen}>
          Add customer
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add A Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Please provide customer details</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={user.name}
            onChange={changeEle}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={user.email}
            onChange={changeEle}
          />

          <TextField
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            name="location"
            value={user.location}
            onChange={changeEle}
          />

          <TextField
            margin="dense"
            id="title"
            label="Phone"
            type="text"
            fullWidth
            name="phone"
            value={user.phone}
            onChange={changeEle}
          />
          <TextField
            margin="dense"
            id="regDate"
            //label="Registration Date"
            type="date"
            fullWidth
            name="regDate"
            value={user.regDate}
            onChange={changeEle}
          />

          <TextField
            style={{ marginTop: "10px" }}
            id="outlined-multiline-static"
            label="Description (Optional)"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            name="description"
            value={user.description}
            onChange={changeEle}
          />

          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <Button
                  style={{ marginTop: "10px" }}
                  size="large"
                  fullWidth
                  variant="outlined"
                >
                  Upload a Profile Picture
                </Button>
              </div>
            )}
          </Dropzone>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerListToolbar;
