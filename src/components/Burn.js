import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

import web3 from '../service/web3';

class Mint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      burnValue: ''
    }
    this.handleBurnValueChange = this.handleBurnValueChange.bind(this);
    this.handleBurnSubmit = this.handleBurnSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Burn</h3>
          <Form onSubmit={ this.handleBurnSubmit }>
            <Form.Field>
              <label className="form-row" htmlFor="burn-value">
                Value to Burn
              </label>
              <input id="burn-value" type="text" name="burn-value" placeholder="Amount of tokens"
                value={ this.state.burnValue } onChange={this.handleBurnValueChange } />
            </Form.Field>
            <Button className="form-row center-button" type="submit" primary fluid>Burn</Button>
          </Form>
        </Segment>
      </div>
    );
  }

  handleBurnValueChange(event) {
    this.setState({
      burnValue: event.target.value
    });
  }

  async handleBurnSubmit(event) {
    event.preventDefault();
    const burnValueStr = web3.utils.toWei(this.state.burnValue, 'mwei').toString();
    await this.props.inst.methods.burn(
      burnValueStr
    ).send({
      from: this.props.currentAccount
    });
  }
}

export default Mint;