import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateCompany from "components/Company/CreateCompany/CreateCompany";

class CompanyDialog extends React.Component {
  state = {
    open: false,
    scroll: "paper",
    fullWidth: true,
    maxWidth: "lg",
    hide: true
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    const { ...props } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          scroll={this.props.scroll}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
            Crear Empresa
            <div>{this.props.db_name}</div>
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText> */}
              <CreateCompany
                hide={this.state.hide}
                {...props}
              />
            {/* </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button
              name="close"
              onClick={this.props.handleClose}
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              name="update"
              onClick={this.props.onSubmit}
              color="primary"
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CompanyDialog;
