import "./App.css";
import IndexPage from "./components/IndexPage.js";

import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import { UserContextProvider } from "./context/UserContext.js";
import CreatePost from "./components/CreatePage.js";
import SinglePost from "./components/SinglePost.js";
import EditPost from "./components/EditPost.js";
import About from "./components/About.js";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
