import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../context/UserContext.js";

export default function SinglePost() {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [post, setPost] = useState({});
  const [postLikes, setPostLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:5000/api/v1/post/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { post, user } = await res.json();
      setPost(post);

      setPostLikes(post.likes.length);

      setHasLiked(post.likes.includes(user.userId));
    }

    fetchData();
  }, []);

  const { author, content, coverImg, createdAt, title, likes } = post;

  if (!post) return "";

  const handleLike = async () => {
    setHasLiked(true);
    const res = await fetch(`http://localhost:5000/api/v1/post/${id}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    setPostLikes(data.length);
  };

  const handleUnlike = async () => {
    setHasLiked(false);
    const res = await fetch(`http://localhost:5000/api/v1/post/${id}/unlike`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setPostLikes(data.length);
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete the post ? ")) {
      const res = await fetch(`http://localhost:5000/api/v1/post/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        alert("Something went wrong. Please try again later!");
      } else {
        alert("Successfully deleted");
      }
    } else {
      return;
    }
  };

  return (
    <div className="main-container single-blog">
      <p className="date">
        {createdAt && format(new Date(createdAt), "MMM d, yyyy HH:mm")}
      </p>
      <h1>{title}</h1>
      <h3 className="post-actions">
        <div className="action">
          <div>
            <span>Author - </span>
            {author?.username}
          </div>
          {author?._id === userInfo.userId && (
            <div className="edit-and-delete">
              <Link className="edit" to={`/edit/${post._id}`}>
                <ion-icon name="create-outline"></ion-icon>
              </Link>
              <Link className="delete" to="/" onClick={deletePost}>
                <ion-icon name="trash-outline"></ion-icon>
              </Link>
            </div>
          )}
        </div>
        <div className="like">
          <span>{postLikes}</span>
          <div>
            {hasLiked ? (
              <ion-icon name="heart" onClick={handleUnlike}></ion-icon>
            ) : (
              <ion-icon name="heart-outline" onClick={handleLike}></ion-icon>
            )}
          </div>
        </div>
      </h3>
      <img
        src={`http://localhost:5000/${coverImg?.replace("\\", "/")}`}
        alt={`cover img`}
      />
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
