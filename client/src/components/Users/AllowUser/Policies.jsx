import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import cyan from "@material-ui/core/colors/cyan";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  textField: {
    margin: 10
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  inputSim: {
    marginTop: "20px"
  },
  checked: {
    color: cyan[600],
    "&$checked": {
      color: cyan[500]
    }
  }
});

class Policies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      policies: [
        "Acceso a incluir nuevos registros en la base de datos",
        "Acceso a modificar registros en la base de datos",
        "Autorizado a eliminar registros en la base de datos"
      ],
    };

  }

  handleToggle = name => () => {
    console.log("Parameter", name);
  };

  clicked = sum => () => {
    console.log("Value", sum);
  }

  render() {
    // const { classes } = this.props;
    
    return (
      <div>
        <GridContainer>
          <GridItem md={12}>
            <Card>
              <CardBody>
                <List dense >
                  {this.state.policies.map((value, i) => {
                    const labelId = `checkbox-list-secondary-label-${i}`;
                    const sum = i + 1;
                    // const name = 'empresa' + user.userId + '_' + sum;
                    return (
                      <ListItem key={i} button>
                        <ListItemText id={labelId} primary={value} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            onChange={this.handleToggle(value)}
                            onClick={this.props.clicked(sum)}
                            checked={this.state[value]}
                            value={i}
                            color="primary"
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Policies);
