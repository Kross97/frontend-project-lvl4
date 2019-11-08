import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import routes from '../routes';
import * as actions from '../actions';

const mapProps = ({ channels: { text } }) => {
  const props = { text };
  return props;
};

const allActions = {
  updateText: actions.updateTextChannel,
  resetText: actions.resetTextChannel,
};

class AddChanel extends React.Component {
addChannel = async (e) => {
  e.preventDefault();
  const { resetText, text } = this.props;
  await axios.post(routes.channelsPath(), { data: { attributes: { name: text } } });
  resetText();
}

changeText = (e) => {
  const { updateText } = this.props;
  const { value } = e.target;
  updateText({ value });
};

render() {
  const { text } = this.props;
  return (
    <Form className="form-group row no-gutters" onSubmit={this.addChannel}>
      <Form.Control onChange={this.changeText} value={text} type="text" className="form-control col-7" placeholder="название" />
      <Button type="submit" className="btn btn-info col-5" disabled={text === ''}>Добавить</Button>
    </Form>
  );
}
}

export default connect(mapProps, allActions)(AddChanel);
