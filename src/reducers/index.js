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
      const { allChannels } = state;
      // eslint-disable-next-line no-param-reassign
      state.allChannels = [...allChannels, action.payload.channel];
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.allChannels = state.allChannels.filter((ch) => ch.id !== id);
    },
    renameChannel: (state, action) => {
      const { channel } = action.payload;
      const currentIndex = state.allChannels.findIndex((ch) => ch.id === channel.id);
      const newState = update(state, { allChannels: { [currentIndex]: { $set: channel } } });
      // eslint-disable-next-line no-param-reassign
      state.allChannels = newState.allChannels;
    },
    changeChannelId: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = action.payload.id;
    },
    updateTextChannel: (state, action) => {
      const { payload: { value } } = action;
      // eslint-disable-next-line no-param-reassign
      state.text = value;
    },
    updateTextChannelRename: (state, action) => {
      const { value } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.textRename = value;
    },
    resetTextChannel: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.text = '';
    },
    resetTextChannelRename: (state) => {
      // eslint-disable-next-line no-param-reassign
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
      // eslint-disable-next-line no-param-reassign
      state.allMessages = [...state.allMessages, message];
    },
    updateTextMessage: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.text = action.payload.text;
    },
    resetTextMessage: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.text = '';
    },
  },
  extraReducers: {
    [channels.actions.removeChannel]: (state, action) => {
      const { id } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.allMessages = state.allMessages.filter((mes) => mes.channelId !== id);
    },
  },
});

export default combineReducers({
  messages: messages.reducer,
  channels: channels.reducer,
});
