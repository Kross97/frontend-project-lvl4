import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { configureStore } from 'redux-starter-kit';
import faker from 'faker';
import gon from 'gon';
import location from 'location';
import cookie from 'js-cookie';
import Application from './components/Application';
import reducer, { messages, channels } from './reducers';

let name = cookie.get('name');
if (!name) {
  name = cookie.set('name', faker.name.findName());
}

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = configureStore({
  reducer,
  preloadedState: {
    messages: {
      allMessages: gon.messages,
      text: '',
    },
    channels: {
      allChannels: gon.channels,
      text: '',
      currentChannelId: 1,
    },
    channelsActions: {
      showRemove: false,
      showRename: false,
      idRemove: 0,
      idRename: 0,
    },
  },
});

const socket = io(location.href);
socket.on('newMessage', (data) => {
  store.dispatch(messages.actions.addMessageSucces({ message: data.data.attributes }));
});

socket.on('newChannel', (data) => {
  store.dispatch(channels.actions.addChannel({ channel: data.data.attributes }));
});

socket.on('removeChannel', (data) => {
  store.dispatch(channels.actions.removeChannel({ id: data.data.id }));
});

socket.on('renameChannel', (data) => {
  store.dispatch(channels.actions.renameChannel({ channel: data.data.attributes }));
});

ReactDom.render(
  <Provider store={store}>
    <Application author={name} />
  </Provider>,
  document.querySelector('#chat'),
);
