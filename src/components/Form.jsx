import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import routes from '../routes';
import Channels from './Chanels';
import { messages } from '../reducers';

const Messages = (props) => {
  const { allMessages } = props;
  const styleDiv = { overflow: 'auto', height: '780px', 'max-height': '780px' };
  return (
    <div className="list-group" style={styleDiv}>
      {allMessages.length !== 0 && allMessages.map((mes) => (
        <div key={mes.id} className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{mes.author}</h5>
            <small>{mes.time}</small>
          </div>
          <p className="mb-1">{mes.text}</p>
        </div>
      ))}
    </div>
  );
};

const mapProps = (state) => {
  const { channels } = state;
  const props = {
    text: state.messages.text,
    messages: state.messages.allMessages,
    currentChannelId: channels.currentChannelId,
  };
  return props;
};

const allActions = {
  updateText: messages.actions.updateTextMessage,
  resetText: messages.actions.resetTextMessage,
};

class Form extends React.Component {
 hadleSubmit = async (e) => {
   e.preventDefault();
   const {
     resetText,
     text,
     author,
     currentChannelId,
   } = this.props;
   const time = new Date();
   const message = {
     text,
     author,
     time,
     channelId: currentChannelId,
   };
   await axios.post(routes.channelMessagesPath(currentChannelId),
     { data: { attributes: message } });
   resetText();
 }

 changeText = (e) => {
   const { updateText } = this.props;
   updateText({ text: e.target.value });
 }

static Messages = Messages;

render() {
  const { messages, text, currentChannelId } = this.props;
  const currentMessages = messages.filter((mes) => mes.channelId === currentChannelId);
  return (
    <div className="container-fluid row no-gutters">
      <Channels />
      <div className="col-10">
        <Form.Messages allMessages={currentMessages} />
        <form onSubmit={this.hadleSubmit}>
          <div className="form-group row no-gutters">
            <input onChange={this.changeText} value={text} type="text" className="form-control col-9" placeholder="Введите сообщение" />
            <input type="submit" disabled={text === ''} className="btn btn-info col-3" name="button1" value="Отправить" />
          </div>
        </form>
      </div>
    </div>
  );
}
}

export default connect(mapProps, allActions)(Form);
