import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });
  const navigate = useNavigate();

  
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
      padding: "40px",
      width: "100%",
      maxWidth: "400px",
      transition: "all 0.3s ease"
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "30px",
      textAlign: "center",
      background: "linear-gradient(90deg, #3498db, #2ecc71)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundSize: "200% 200%",
      animation: "gradient 3s ease infinite"
    },
    inputContainer: {
      marginBottom: "20px",
      width: "100%"
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      color: "#7f8c8d",
      fontWeight: "600"
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "8px",
      border: "2px solid #e0e0e0",
      fontSize: "16px",
      transition: "all 0.3s ease",
      outline: "none",
      backgroundColor: "#f8f9fa"
    },
    inputFocus: {
      borderColor: "#3498db",
      boxShadow: "0 0 0 3px rgba(52, 152, 219, 0.2)"
    },
    button: {
      width: "100%",
      padding: "14px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#3498db",
      color: "white",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    buttonHover: {
      backgroundColor: "#2980b9",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(41, 128, 185, 0.3)"
    },
    buttonDisabled: {
      backgroundColor: "#bdc3c7",
      cursor: "not-allowed",
      opacity: "0.7"
    },
    loadingSpinner: {
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderTop: "3px solid white",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      animation: "spin 1s linear infinite",
      marginRight: "10px"
    },
    footer: {
      marginTop: "20px",
      textAlign: "center",
      color: "#7f8c8d",
      fontSize: "14px"
    },
    link: {
      color: "#3498db",
      textDecoration: "none",
      fontWeight: "600",
      cursor: "pointer"
    }
  };

  const handleLogin = async () => {
    if (!email || !password) return;
    
    setIsLoading(true);
    try {
      const res = await axios.post("https://mern-stack-task-authenticated-crud-with.onrender.com/api/auth/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        
        <div style={styles.inputContainer}>
          <label style={styles.label}>Email</label>
          <input
            style={{
              ...styles.input,
              ...(isFocused.email && styles.inputFocus)
            }}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
          />
        </div>
        
        <div style={styles.inputContainer}>
          <label style={styles.label}>Password</label>
          <input
            style={{
              ...styles.input,
              ...(isFocused.password && styles.inputFocus)
            }}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
          />
        </div>
        
        <button
          style={{
            ...styles.button,
            ...(!isLoading && !(!email || !password) && styles.buttonHover),
            ...(!email || !password) && styles.buttonDisabled
          }}
          onClick={handleLogin}
          onMouseEnter={(e) => {
            if (email && password && !isLoading) {
              e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
              e.target.style.transform = styles.buttonHover.transform;
              e.target.style.boxShadow = styles.buttonHover.boxShadow;
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = styles.button.backgroundColor;
            e.target.style.transform = "none";
            e.target.style.boxShadow = "none";
          }}
          disabled={!email || !password || isLoading}
        >
          {isLoading ? (
            <>
              <span style={styles.loadingSpinner}></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
        
        <div style={styles.footer}>
          Don't have an account?{' '}
          <span 
            style={styles.link}
            onClick={() => navigate("/register")}
            onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
            onMouseLeave={(e) => e.target.style.textDecoration = "none"}
          >
            Register
          </span>
        </div>
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
        `}
      </style>
    </div>
  );
};

export default Login;