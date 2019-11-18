import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { configureStore } from 'redux-starter-kit';
import faker from 'faker';
import gon from 'gon';
import cookie from 'js-cookie';
import Form from './components/Form';
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
  // eslint-disable-next-line no-underscore-dangle
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
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
  },
});

const socket = io('http://localhost:4000');
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
    <Form author={name} />
  </Provider>,
  document.querySelector('#chat'),
);
