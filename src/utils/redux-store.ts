import { combineReducers, configureStore } from '@reduxjs/toolkit';
import baseReducer from 'hooks/redux/reducer';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';

const rootReducer = combineReducers({
  ...baseReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    createStateSyncMiddleware({
      whitelist: ['locale/changeLocale']
    })
  ]
});
initMessageListener(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;
