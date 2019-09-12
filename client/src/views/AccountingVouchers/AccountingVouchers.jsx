import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// @material-ui/core components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

// @material-ui/icons
import CloseIcon from "@material-ui/icons/Close";

import Voucher from "components/AccountingVouchers/Voucher";

import { createBrowserHistory } from 'history';

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AccountingVouchers extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.goToHome()
  };

  componentDidMount() {
    this.handleClickOpen();
  }

  relaoad = () => {
    window.location.reload();
  };

  goToHome = () => {
    const history = createBrowserHistory();
    history.push({ pathname: '/dashboard'});
    window.location.reload();
  }

  render() {
    //const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar style={{ position: "relative", backgroundColor: '#17a2b8' }}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.goToHome}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                style={{flex: 1}}
              >
                Cerrar
              </Typography>
              <Button color="inherit" onClick={this.goToHome}>
                Guardar
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <Voucher />
          </List>
        </Dialog>
      </div>
    );
  }
}

AccountingVouchers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountingVouchers);
