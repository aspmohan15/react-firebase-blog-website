import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Crazy Blogs</Navbar.Brand>
          <Nav.Link href="/">
            {/* Home */}
            <Link to="/"> Home </Link>
          </Nav.Link>

          {!isAuth ? (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <>
              <Link to="/createpost"> Create Post </Link>
              <Button onClick={signUserOut}> Log Out</Button>
            </>
          )}
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
