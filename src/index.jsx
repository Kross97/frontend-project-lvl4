import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import thunk from 'redux-thunk';
import faker from 'faker';
import cookie from 'js-cookie';
import Channels from './components/Chanels';
import Form from './components/Form';
import reducer from './reducers';
import * as actions from './actions';

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
      allMessages: window.gon.messages,
      text: '',
    },
    channels: {
      allChannels: window.gon.channels,
      text: '',
      currentChannelId: 1,
    },
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

const socket = io('http://localhost:4000');
socket.on('newMessage', (data) => {
  store.dispatch(actions.addMessageSucces({ message: data.data.attributes }));
});

socket.on('newChannel', (data) => {
  store.dispatch(actions.addChannel({ channel: data.data.attributes }));
});

socket.on('removeChannel', (data) => {
  store.dispatch(actions.removeChannel({ id: data.data.id }));
});

socket.on('renameChannel', (data) => {
  store.dispatch(actions.renameChannel({ channel: data.data.attributes }));
});

ReactDom.render(
  <Provider store={store}>
    <Channels />
  </Provider>,
  document.querySelector('#chanels'),
);

ReactDom.render(
  <Provider store={store}>
    <Form author={name} />
  </Provider>,
  document.querySelector('#chat'),
);
