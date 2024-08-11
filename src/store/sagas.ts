// store/sagas.ts
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { setContent, setTitle } from './documentSlice';
import axios from 'axios';

// Define the type for the API response
interface DocumentResponse {
  data: {
    attributes: {
      content: string;
      title: string;
    };
  };
}

// Fetch document from the API
function* fetchDocument() {
  try {
    const response: DocumentResponse = yield call(() =>
      axios.get('http://localhost:1337/api/documents/1') 
    );
    yield put(setContent(response.data.attributes.content));
    yield put(setTitle(response.data.attributes.title));
  } catch (error) {
    console.error('Error fetching document:', error);
  }
}

// Update document on the server
function* updateDocument(action: PayloadAction<{ content: string; title: string }>) {
  try {
    yield call(() =>
      axios.put('http://localhost:1337/api/documents/1', {
        data: {
          content: action.payload.content,
          title: action.payload.title,
        },
      }) // Adjust the URL based on your API
    );
  } catch (error) {
    console.error('Error updating document:', error);
  }
}

// Watch for actions
function* watchFetchDocument() {
  yield takeLatest('FETCH_DOCUMENT', fetchDocument);
}

function* watchUpdateDocument() {
  yield takeLatest('UPDATE_DOCUMENT', updateDocument);
}

// Root saga
export default function* rootSaga() {
  yield all([
    watchFetchDocument(),
    watchUpdateDocument(),
  ]);
}
