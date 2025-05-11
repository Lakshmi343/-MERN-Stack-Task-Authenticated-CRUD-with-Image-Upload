const ItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {item.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="mt-2 text-gray-600">{item.description}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => onEdit(item._id)}
            className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;