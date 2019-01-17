import React from 'react';

import { Modal, Button } from 'semantic-ui-react';

class ConfirmPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.open = this.open.bind(this);
    this.close = this.open.close(this);
  }

  render() {
    return (
      <Modal
        open={ this.state.open }
        size='small'
        trigger={
          <Button>
            { this.props.triggerText }
          </Button>
        }
      >
        <Modal.Header>
          Check and Confirm
        </Modal.Header>
        <Modal.Content>
          { this.props.children }
        </Modal.Content>
        <Modal.Actions>
          <Button
            color={ this.props.color }
            onClick={ this.props.handleConfirm }
          >
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  open() {
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open: false
    });
  }
}

export default ConfirmPrompt;