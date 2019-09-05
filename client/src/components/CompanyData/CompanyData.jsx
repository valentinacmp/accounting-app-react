import React from "react";
// @material-ui/core components
import TextField from "@material-ui/core/TextField";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";


class CompanyData extends React.Component {

  render() {

    return (
      <div>
        <Card>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  id="standard-full-width"
                  label="Descripción"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={this.props.empresa_des}
                  onChange={this.props.onChange}
                  name="empresa_des"
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default (CompanyData);
