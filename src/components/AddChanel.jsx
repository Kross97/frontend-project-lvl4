import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
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
    <form onSubmit={this.addChannel}>
      <div className="form-group row no-gutters">
        <input onChange={this.changeText} value={text} type="text" className="form-control col-7" placeholder="название" />
        <input type="submit" disabled={text === ''} className="btn btn-info col-5" name="button1" value="Добавить" />
      </div>
    </form>
  );
}
}

export default connect(mapProps, allActions)(AddChanel);
