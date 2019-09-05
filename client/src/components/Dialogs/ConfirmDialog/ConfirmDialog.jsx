
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmDialog extends React.Component {

  constructor(props){
    super(props);
  }

  handleClickOpen() {
    setOpen(true);
  }

  handleClose() {
    setOpen(false);
  }

  render(){

    const [open, setOpen] = React.useState(false);

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open alert dialog
      </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.textAlert}
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.cancel} color="primary">
              No
            </Button>
            <Button onClick={this.props.confirm} color="primary" autoFocus>
              Si
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog;
