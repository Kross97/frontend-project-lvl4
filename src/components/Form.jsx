import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import routes from '../routes';
import * as actions from '../actions';
import Input from './Form_input';

const Messages = (props) => {
  const { messages } = props;
  const styleDiv = { overflow: 'auto', height: '780px', 'max-height': '780px' };
  return (
    <div className="list-group" style={styleDiv}>
      {messages.length !== 0 && messages.map((mes) => (
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
  const { channels, messages } = state;
  const props = {
    text: messages.text,
    messages: messages.allMessages,
    currentChannelId: channels.currentChannelId,
  };
  return props;
};

const allActions = {
  updateText: actions.updateTextMessage,
  resetText: actions.resetTextMessage,
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
    <div>
      <Form.Messages messages={currentMessages} />
      <Input onSubmit={this.hadleSubmit} onChange={this.changeText} value={text} type="message" placeholder="Введите сообщение" btnValue="Отправить" />
    </div>
  );
}
}

export default connect(mapProps, allActions)(Form);
