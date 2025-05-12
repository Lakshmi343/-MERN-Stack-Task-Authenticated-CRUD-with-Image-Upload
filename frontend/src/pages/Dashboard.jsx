
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [focusStates, setFocusStates] = useState({
    search: false,
    title: false,
    description: false,
    file: false
  });

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "100vh"
    },
    header: {
      fontSize: "2.2rem",
      fontWeight: "bold",
      marginBottom: "25px",
      color: "#2c3e50",
      borderBottom: "2px solid #3498db",
      paddingBottom: "10px",
      textAlign: "center",
      background: "linear-gradient(90deg, #3498db, #2ecc71)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: "gradient 3s ease infinite",
      backgroundSize: "200% 200%"
    },
    searchContainer: {
      position: "relative",
      marginBottom: "30px",
      maxWidth: "600px",
      marginLeft: "auto",
      marginRight: "auto"
    },
    searchInput: {
      width: "100%",
      padding: "15px 20px",
      paddingLeft: "50px",
      borderRadius: "30px",
      border: "2px solid #e0e0e0",
      fontSize: "16px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      outline: "none",
      background: "#f8f9fa"
    },
    searchInputFocus: {
      borderColor: "#3498db",
      boxShadow: "0 6px 12px rgba(52, 152, 219, 0.2)",
      transform: "scale(1.02)"
    },
    searchIcon: {
      position: "absolute",
      left: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#7f8c8d",
      fontSize: "18px"
    },
    formContainer: {
      background: "white",
      borderRadius: "12px",
      padding: "25px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
      marginBottom: "30px",
      maxWidth: "800px",
      margin: "0 auto 30px",
      transition: "all 0.3s ease"
    },
    formGroup: {
      marginBottom: "20px",
      position: "relative"
    },
    inputLabel: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#2c3e50",
      fontSize: "14px"
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "8px",
      border: "2px solid #e0e0e0",
      fontSize: "16px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
      transition: "all 0.3s ease"
    },
    inputFocus: {
      borderColor: "#3498db",
      boxShadow: "0 4px 8px rgba(52, 152, 219, 0.2)"
    },
    textarea: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "8px",
      border: "2px solid #e0e0e0",
      fontSize: "16px",
      minHeight: "120px",
      resize: "vertical",
      boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
      transition: "all 0.3s ease"
    },
    fileInputContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      border: "2px dashed #e0e0e0",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      margin: "15px 0",
      backgroundColor: "#f8f9fa"
    },
    fileInputContainerHover: {
      borderColor: "#3498db",
      backgroundColor: "#e3f2fd"
    },
    fileInput: {
      display: "none"
    },
    fileInputLabel: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      color: "#7f8c8d",
      fontWeight: "500"
    },
    previewImage: {
      height: "180px",
      width: "100%",
      objectFit: "cover",
      borderRadius: "8px",
      margin: "15px 0",
      border: "2px solid #e0e0e0",
      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease"
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "20px"
    },
    button: {
      padding: "14px 28px",
      borderRadius: "8px",
      border: "none",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "150px"
    },
    primaryButton: {
      background: "linear-gradient(135deg, #3498db, #2ecc71)",
      color: "white",
      boxShadow: "0 4px 6px rgba(52, 152, 219, 0.3)"
    },
    primaryButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 12px rgba(52, 152, 219, 0.4)"
    },
    primaryButtonDisabled: {
      opacity: "0.7",
      cursor: "not-allowed",
      background: "#bdc3c7"
    },
    editButton: {
      background: "linear-gradient(135deg, #f39c12, #f1c40f)",
      color: "white",
      boxShadow: "0 4px 6px rgba(243, 156, 18, 0.3)"
    },
    editButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 12px rgba(243, 156, 18, 0.4)"
    },
    deleteButton: {
      background: "linear-gradient(135deg, #e74c3c, #c0392b)",
      color: "white",
      boxShadow: "0 4px 6px rgba(231, 76, 60, 0.3)"
    },
    deleteButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 12px rgba(231, 76, 60, 0.4)"
    },
    itemsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "25px",
      marginTop: "40px"
    },
    itemCard: {
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      backgroundColor: "white",
      position: "relative"
    },
    itemCardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 15px 30px rgba(0,0,0,0.12)"
    },
    itemImage: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
      transition: "all 0.4s ease"
    },
    itemContent: {
      padding: "20px"
    },
    itemTitle: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "12px",
      color: "#2c3e50",
      transition: "all 0.3s ease"
    },
    itemDescription: {
      color: "#7f8c8d",
      marginBottom: "20px",
      lineHeight: "1.6",
      fontSize: "15px"
    },
    actionButtons: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end"
    },
    loading: {
      textAlign: "center",
      padding: "40px",
      fontSize: "18px",
      color: "#7f8c8d",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    loadingSpinner: {
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #3498db",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: "spin 1s linear infinite",
      marginBottom: "20px"
    },
    emptyState: {
      textAlign: "center",
      padding: "40px",
      color: "#7f8c8d",
      fontSize: "18px"
    },
    floatingActionButton: {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#3498db",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      zIndex: "1000"
    },
    floatingActionButtonHover: {
      transform: "scale(1.1)",
      boxShadow: "0 6px 15px rgba(0,0,0,0.3)"
    }
  };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://mern-stack-task-authenticated-crud-with.onrender.com/api/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
      setFilteredItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCreateOrUpdate = async () => {
    if (!title || !desc) return alert("Title and description are required!");
    
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      if (image) formData.append("image", image);

      const url = editId
        ? `https://mern-stack-task-authenticated-crud-with.onrender.com/api/items/${editId}`
        : "https://mern-stack-task-authenticated-crud-with.onrender.com/api/items";

      const method = editId ? axios.put : axios.post;

      await method(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setDesc("");
      setImage(null);
      setPreview(null);
      setEditId(null);
      fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
      alert("An error occurred while saving the item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDesc(item.description);
    setEditId(item._id);
    setPreview(`https://mern-stack-task-authenticated-crud-with.onrender.com/${item.image}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
    setIsLoading(true);
    try {
      await axios.delete(`https://mern-stack-task-authenticated-crud-with.onrender.com/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred while deleting the item");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleFocus = (field) => {
    setFocusStates(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocusStates(prev => ({ ...prev, [field]: false }));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Dashboard</h1>

      <div style={styles.searchContainer}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search items by title or description..."
          style={{
            ...styles.searchInput,
            ...(focusStates.search && styles.searchInputFocus),
          }}
          onFocus={() => handleFocus('search')}
          onBlur={() => handleBlur('search')}
        />
      </div>

     
      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.inputLabel}>Title</label>
          <input
            style={{
              ...styles.input,
              ...(focusStates.title && styles.inputFocus),
            }}
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter item title"
            onFocus={() => handleFocus('title')}
            onBlur={() => handleBlur('title')}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.inputLabel}>Description</label>
          <textarea
            style={{
              ...styles.textarea,
              ...(focusStates.description && styles.inputFocus),
            }}
            id="description"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Enter detailed description"
            onFocus={() => handleFocus('description')}
            onBlur={() => handleBlur('description')}
          />
        </div>

        
        <div 
          style={{
            ...styles.fileInputContainer,
            ...(focusStates.file && styles.fileInputContainerHover),
          }}
          onMouseEnter={() => handleFocus('file')}
          onMouseLeave={() => handleBlur('file')}
          onClick={() => handleFocus('file')}
        >
          <label style={styles.fileInputLabel}>
            {image ? "Change Image" : "Upload Image"}
            <input
              style={styles.fileInput}
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
            <span style={{ fontSize: "40px", margin: "10px 0" }}>📷</span>
            <span style={{ fontSize: "12px", color: "#95a5a6" }}>Click to browse or drag & drop</span>
          </label>
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={styles.previewImage}
          />
        )}

        <div style={styles.buttonContainer}>
          <button
            style={{
              ...styles.button,
              ...styles.primaryButton,
              ...(!title || !desc) && styles.primaryButtonDisabled,
            }}
            onClick={handleCreateOrUpdate}
            onMouseEnter={(e) => {
              if (!(!title || !desc)) {
                e.target.style.transform = styles.primaryButtonHover.transform;
                e.target.style.boxShadow = styles.primaryButtonHover.boxShadow;
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "none";
              e.target.style.boxShadow = styles.primaryButton.boxShadow;
            }}
            disabled={!title || !desc}
          >
            {editId ? "Update Item" : "Add Item"}
          </button>
        </div>
      </div>

      
      {isLoading ? (
        <div style={styles.loading}>
          <div style={styles.loadingSpinner}></div>
          Loading items...
        </div>
      ) : filteredItems.length === 0 ? (
        <div style={styles.emptyState}>
          {search ? "No items match your search" : "No items found. Add some to get started!"}
        </div>
      ) : (
        <div style={styles.itemsGrid}>
          {filteredItems.map((item) => (
            <div
              key={item._id}
              style={{
                ...styles.itemCard,
                transform: hoveredCard === item._id ? "translateY(-10px)" : "none",
                boxShadow: hoveredCard === item._id ? "0 15px 30px rgba(0,0,0,0.12)" : "0 5px 15px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={() => setHoveredCard(item._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <img
                src={`https://mern-stack-task-authenticated-crud-with.onrender.com/${item.image}`}
                alt={item.title}
                style={{
                  ...styles.itemImage,
                  transform: hoveredCard === item._id ? "scale(1.05)" : "none",
                }}
              />
              <div style={styles.itemContent}>
                <h2 
                  style={{
                    ...styles.itemTitle,
                    color: hoveredCard === item._id ? "#3498db" : "#2c3e50",
                  }}
                >
                  {item.title}
                </h2>
                <p style={styles.itemDescription}>{item.description}</p>
                <div style={styles.actionButtons}>
                  <button
                    style={{
                      ...styles.button,
                      ...styles.editButton,
                      transform: hoveredCard === item._id ? "scale(1.05)" : "none",
                    }}
                    onClick={() => handleEdit(item)}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1)";
                      e.target.style.boxShadow = styles.editButtonHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = hoveredCard === item._id ? "scale(1.05)" : "none";
                      e.target.style.boxShadow = styles.editButton.boxShadow;
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      ...styles.button,
                      ...styles.deleteButton,
                      transform: hoveredCard === item._id ? "scale(1.05)" : "none",
                    }}
                    onClick={() => handleDelete(item._id)}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.1)";
                      e.target.style.boxShadow = styles.deleteButtonHover.boxShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = hoveredCard === item._id ? "scale(1.05)" : "none";
                      e.target.style.boxShadow = styles.deleteButton.boxShadow;
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

   
      <div 
        style={{
          ...styles.floatingActionButton,
          ...(hoveredCard === 'fab' && styles.floatingActionButtonHover),
        }}
        onMouseEnter={() => setHoveredCard('fab')}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </div>

     
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @media (max-width: 768px) {
            .items-grid {
              grid-template-columns: 1fr;
            }
            
            .form-container {
              padding: 15px;
            }
            
            .action-buttons {
              flex-direction: column;
            }
            
            .action-buttons button {
              width: 100%;
            }
            
            .floating-action-button {
              width: 50px;
              height: 50px;
              bottom: 20px;
              right: 20px;
              font-size: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;