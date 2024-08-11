import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import documentReducer from './documentSlice';
import rootSaga from './sagas';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();


// Configure the store
const store = configureStore({
  reducer: {
    document: documentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware) as ReturnType<typeof getDefaultMiddleware>,
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Export types for the state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
