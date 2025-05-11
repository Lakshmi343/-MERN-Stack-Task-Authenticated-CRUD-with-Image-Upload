import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import itemsApi from '../api/items';
import ItemCard from '../components/ItemCard';
import ItemForm from '../components/ItemForm';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await itemsApi.getItems();
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    };
    fetchItems();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const newItem = await itemsApi.createItem(formData);
      setItems([newItem, ...items]);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create item:', err);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      const updatedItem = await itemsApi.updateItem(id, formData);
      setItems(items.map(item => item._id === id ? updatedItem : item));
      setEditingItem(null);
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await itemsApi.deleteItem(id);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">MERN CRUD Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, {user?.email}</span>
              <button
                onClick={logout}
                className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Items</h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add New Item
          </button>
        </div>

        {showForm && (
          <ItemForm
            item={editingItem}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <ItemCard
              key={item._id}
              item={item}
              onEdit={() => {
                setEditingItem(item);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;