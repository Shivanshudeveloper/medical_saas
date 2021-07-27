import react from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from 'react-feather';

const CustomerListToolbar = (props) => {
  const [open, setOpen] = react.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
      >
        Add customer
      </Button>
    </Box>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add A Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide customer details
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
          />
          <TextField
            
            margin="dense"
            id="title"
            label="Phone"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="regDate"
            label="Registration Date"
            type="date"
            fullWidth
          />

          <TextField
            style={{ marginTop: '10px' }}
            id="outlined-multiline-static"
            label="Description (Opstional)"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />

          <Button style={{ marginTop: '10px' }} size="large" fullWidth variant="outlined">Upload a Profile Picture</Button>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
  )
};

export default CustomerListToolbar;
