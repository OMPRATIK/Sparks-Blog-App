import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import ReactQuillEditor from "./ReactQuillEditor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:5000/api/v1/post/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { post } = await res.json();

      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
    }

    fetchData();
  }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("postId", id);

    if (files?.[0]) data.set("file", files?.[0]);

    const res = await fetch(`http://localhost:5000/api/v1/post/${id}`, {
      method: "PATCH",
      body: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const fetchedData = await res.json();
    if (!res.ok) {
      alert(fetchedData.msg);
    }
    if (res.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <main className="main-container">
      <form onSubmit={updatePost} className="form-create">
        <h3>Edit Your Blog</h3>
        <input
          type="title"
          placeholder="Title"
          value={title}
          maxLength={200}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          maxLength={400}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <ReactQuillEditor value={content} onChange={setContent} />
        <button className="btn">Update</button>
      </form>
    </main>
  );
}
