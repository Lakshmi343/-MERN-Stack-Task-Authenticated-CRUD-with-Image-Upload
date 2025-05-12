import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      padding: "20px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
      padding: "40px",
      width: "100%",
      maxWidth: "400px",
      transition: "all 0.3s ease",
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
      animation: "gradient 3s ease infinite",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: "8px",
      border: "2px solid #e0e0e0",
      fontSize: "16px",
      backgroundColor: "#f8f9fa",
      marginBottom: "20px",
      outline: "none",
      transition: "all 0.3s ease",
    },
    button: {
      width: "100%",
      padding: "14px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#2ecc71",
      color: "white",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#27ae60",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(39, 174, 96, 0.3)",
    },
    footer: {
      marginTop: "20px",
      textAlign: "center",
      color: "#7f8c8d",
      fontSize: "14px",
    },
    link: {
      color: "#3498db",
      textDecoration: "none",
      fontWeight: "600",
      cursor: "pointer",
    },
    spinner: {
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderTop: "3px solid white",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      animation: "spin 1s linear infinite",
      marginRight: "10px",
    },
  };

  const handleRegister = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", { email, password });
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Register</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button
          style={{
            ...styles.button,
            ...(email && password && !isLoading ? styles.buttonHover : {}),
          }}
          onClick={handleRegister}
          disabled={!email || !password || isLoading}
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
        >
          {isLoading ? (
            <>
              <span style={styles.spinner}></span> Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
        <div style={styles.footer}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Login
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

export default Register;
