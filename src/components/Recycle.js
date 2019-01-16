import React from 'react';
import { Segment, Form, Modal, Button } from 'semantic-ui-react';

import web3 from '../service/web3';

class Recycle extends React.Component {
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
          <h3>Recycle</h3>
          <Modal trigger={<Button className="form-row center-button" size="large" color="red" fluid>Burn</Button>}>
            <Modal.Header>Burn</Modal.Header>
            <Modal.Content>
              <Form onSubmit={ this.handleBurnSubmit }>
                <Form.Field>
                  <label className="form-row" htmlFor="burn-value">
                    Value to Burn
                  </label>
                  <input id="burn-value" type="text" name="burn-value" placeholder="Amount of tokens"
                    value={ this.state.burnValue } onChange={this.handleBurnValueChange } />
                </Form.Field>
                <Button className="form-row center-button" type="submit" color="red" fluid>Burn</Button>
              </Form>
            </Modal.Content>
          </Modal>
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
    try {
      await this.props.inst.methods.burn(
        burnValueStr
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }
}

export default Recycle;