import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import routes from '../routes';
import * as actions from '../actions';
import Input from './Form_input';

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
    <Input onSubmit={this.addChannel} onChange={this.changeText} value={text} type="channel" placeholder="название" btnValue="Добавить" />
  );
}
}

export default connect(mapProps, allActions)(AddChanel);
