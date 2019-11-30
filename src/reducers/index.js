/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import update from 'immutability-helper';

export const channels = createSlice({
  name: 'channels',
  initialState: {
    allChannels: [],
    currentChannelId: 1,
    text: '',
    textRename: '',
  },
  reducers: {
    addChannel: (state, action) => {
      const { channel } = action.payload;
      state.allChannels.push(channel);
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      state.allChannels = state.allChannels.filter((ch) => ch.id !== id);
    },
    renameChannel: (state, action) => {
      const { channel } = action.payload;
      const currentIndex = state.allChannels.findIndex((ch) => ch.id === channel.id);
      const newState = update(state, { allChannels: { [currentIndex]: { $set: channel } } });
      state.allChannels = newState.allChannels;
    },
    changeChannelId: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
    updateTextChannel: (state, action) => {
      const { payload: { value } } = action;
      state.text = value;
    },
    updateTextChannelRename: (state, action) => {
      const { value } = action.payload;
      state.textRename = value;
    },
    resetTextChannel: (state) => {
      state.text = '';
    },
    resetTextChannelRename: (state) => {
      state.textRename = '';
    },
  },
});

export const messages = createSlice({
  name: 'messages',
  initialState: { allMessages: [], text: '' },
  reducers: {
    addMessageSucces: (state, action) => {
      const { message } = action.payload;
      state.allMessages = [...state.allMessages, message];
    },
    updateTextMessage: (state, action) => {
      state.text = action.payload.text;
    },
    resetTextMessage: (state) => {
      state.text = '';
    },
  },
  extraReducers: {
    [channels.actions.removeChannel]: (state, action) => {
      const { id } = action.payload;
      state.allMessages = state.allMessages.filter((mes) => mes.channelId !== id);
    },
  },
});

export default combineReducers({
  messages: messages.reducer,
  channels: channels.reducer,
});
