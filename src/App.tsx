import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { setContent, setTitle } from './store/documentSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { FaSave, FaPen } from 'react-icons/fa'; // Import icons
import axios from 'axios';
import { io } from 'socket.io-client';


const socket = io('https://strapibackend1.onrender.com');

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const content = useSelector((state: RootState) => state.document.content);
  const title = useSelector((state: RootState) => state.document.title);
  const [documentTitle, setDocumentTitle] = useState(title);
  
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get('https://strapibackend1.onrender.com/api/documents/1');

        dispatch(setContent(response.data.data.attributes.content));
        dispatch(setTitle(response.data.data.attributes.title));
        setDocumentTitle(response.data.data.attributes.title);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, [dispatch]);

  useEffect(() => {
    socket.on('documentUpdate', (data) => {
      dispatch(setContent(data.content));
      dispatch(setTitle(data.title));
      setDocumentTitle(data.title);
    });

    return () => {
      socket.off('documentUpdate');
    };
  }, [dispatch]);

  // Update local storage on document change
  const handleChange = (value: string) => {
    dispatch(setContent(value));
    socket.emit('documentUpdated', { content: value, title: documentTitle });
    localStorage.setItem('documentContent', value);
    localStorage.setItem('documentTitle', documentTitle);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setDocumentTitle(newTitle);
    dispatch(setTitle(newTitle));
    socket.emit('documentUpdated', { content, title: newTitle });
    localStorage.setItem('documentTitle', newTitle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-yellow-100 p-6 flex flex-col">
      <header className="flex items-center justify-between mb-6 bg-white shadow-md p-4 rounded-lg">
        <div className="flex items-center">
          <FaPen className="text-pink-600 text-3xl mr-3" title="Edit Document" aria-label="Edit Document" /> {/* Pencil icon */}
          <h1 className="text-4xl font-extrabold font-serif text-pink-700">Document Editor</h1> {/* Title with custom font and bold */}
        </div>
        <button
          className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
          onClick={() => dispatch({ type: 'UPDATE_DOCUMENT', payload: { content, title: documentTitle } })}
          title="Save Document"
          aria-label="Save Document"
        >
          <FaSave className="mr-2" /> Save
        </button>
      </header>
      <div className="mb-4">
        <label htmlFor="document-title" className="block text-lg font-medium text-pink-700">Title</label>
        <input
          id="document-title"
          type="text"
          value={documentTitle}
          onChange={handleTitleChange}
          placeholder="Enter document title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        />
      </div>
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <label htmlFor="document-editor" className="sr-only">Document Editor</label>
        <ReactQuill
          id="document-editor"
          value={content}
          onChange={handleChange}
          theme="snow"
          modules={{
            toolbar: [
              [{ 'font': [] }, { 'size': ['small', 'medium', 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'align': [] }],
              ['link', 'image'],
              [{ 'color': [] }, { 'background': [] }],
              ['clean'] // remove formatting button
            ],
          }}
          className="w-full h-[900px]" // Adjust height here
          placeholder="Start typing your document..."
        />
      </div>
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2 text-pink-700">Preview</h2>
        <div className="whitespace-pre-wrap">
          <h3 className="text-xl font-bold">{documentTitle}</h3>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default App;