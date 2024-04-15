import { useContext, useEffect, useState } from "react";
import Post from "./Post.js";
import Hero from "./Hero.js";
import { UserContext } from "../context/UserContext.js";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/api/v1/post", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const fetchedData = await res.json();
      const { data } = fetchedData;

      setPosts(data);
    }
    fetchData();
  }, []);

  return (
    <>
      {!userInfo?.username && <Hero />}
      {userInfo?.username && (
        <div className="main-container">
          {posts?.length > 0 &&
            posts.map((post) => <Post el={post} key={post._id} />)}
        </div>
      )}
    </>
  );
}
