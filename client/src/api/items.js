import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const createItem = async (formData) => {
  const config = {
    ...getAuthHeaders(),
    'Content-Type': 'multipart/form-data',
  };
  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

const getItems = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

const updateItem = async (id, formData) => {
  const config = {
    ...getAuthHeaders(),
    'Content-Type': 'multipart/form-data',
  };
  const response = await axios.put(`${API_URL}/${id}`, formData, config);
  return response.data;
};

const deleteItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export default { createItem, getItems, updateItem, deleteItem };