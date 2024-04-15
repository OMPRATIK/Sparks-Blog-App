import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    async function checkLogin() {
      const res = await fetch("http://localhost:5000/api/v1/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (data) {
        setUserInfo(data);
      } else {
        alert(data.msg);
      }
    }

    checkLogin();
  }, [setUserInfo]);

  const logout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      setUserInfo(null);
    }
  };

  const username = userInfo?.username;
  return (
    <header className="main-header">
      <div className="logo">
        <ion-icon name="library-outline"></ion-icon>
        <a href="/" className="logo-text">
          Sparks
        </a>
      </div>

      {username && (
        <nav className="navbar">
          <h4 className="user">
            Hello! {userInfo?.username} <span>👋</span>
          </h4>
          <Link to="/about">About</Link>
          <Link to="/create" className="write-icon">
            <ion-icon name="copy-outline"></ion-icon>
          </Link>
          <Link className="btn-logout" onClick={logout} to="/">
            Logout
          </Link>
        </nav>
      )}

      {!username && (
        <nav className="navbar">
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="register-btn">
            Register
          </Link>
        </nav>
      )}
    </header>
  );
}
