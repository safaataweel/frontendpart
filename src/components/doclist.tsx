// src/components/DocumentList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentList: React.FC<{ onSelectDocument: (id: number) => void }> = ({ onSelectDocument }) => {
  const [documents, setDocuments] = useState<{ id: number, title: string }[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/documents');
        setDocuments(response.data.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2">Documents</h2>
      <ul>
        {documents.map(doc => (
          <li key={doc.id} className="mb-2">
            <button
              onClick={() => onSelectDocument(doc.id)}
              className="text-blue-500 underline"
            >
              {doc.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
