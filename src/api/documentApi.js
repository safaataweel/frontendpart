import axiosInstance from './axiosInstance';

export const fetchDocuments = () => axiosInstance.get('/documents');
export const fetchDocumentById = (id) => axiosInstance.get(`/documents/${id}`);
export const updateDocument = (id, data) => axiosInstance.put(`/documents/${id}`, data);
