// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { token, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
//       <Link to="/" className="text-xl font-bold">MyApp</Link>
//       <div>
//         {!token ? (
//           <>
//             <Link to="/" className="mr-4">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/dashboard" className="mr-4">Dashboard</Link>
//             <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Styles
  const styles = {
    nav: {
      backgroundColor: "#1a1a2e",
      color: "white",
      padding: "15px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      textDecoration: "none",
      color: "white",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "1rem",
      padding: "8px 12px",
      borderRadius: "4px",
      transition: "all 0.3s ease",
    },
    linkHover: {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    logoutButton: {
      backgroundColor: "#e94560",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "all 0.3s ease",
    },
    logoutButtonHover: {
      backgroundColor: "#ff6b81",
    },
    mobileMenuButton: {
      display: "none",
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    // Media queries will be handled in the style tag
  };

  return (
    <>
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>MyApp</Link>
        
        {/* Mobile menu button */}
        <button 
          style={styles.mobileMenuButton}
          onClick={() => {
            const menu = document.getElementById("nav-links");
            menu.style.display = menu.style.display === "flex" ? "none" : "flex";
          }}
        >
          ☰
        </button>
        
        {/* Navigation links */}
        <div 
          id="nav-links"
          style={{
            ...styles.navLinks,
            // Responsive styles will be added via style tag
          }}
        >
          {!token ? (
            <>
              <Link 
                to="/" 
                style={styles.link}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.linkHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                style={styles.link}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.linkHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/dashboard" 
                style={styles.link}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.linkHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout} 
                style={styles.logoutButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.logoutButton.backgroundColor}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Style tag for responsive design */}
      <style>
        {`
          @media (max-width: 768px) {
            #nav-links {
              display: none;
              flex-direction: column;
              position: absolute;
              top: 70px;
              left: 0;
              right: 0;
              background-color: #1a1a2e;
              padding: 20px;
              gap: 15px;
              align-items: flex-start;
              box-shadow: 0 5px 10px rgba(0,0,0,0.2);
            }
            
            button[style*="mobileMenuButton"] {
              display: block;
            }
            
            .link, .logout-button {
              width: 100%;
              padding: 12px 20px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;