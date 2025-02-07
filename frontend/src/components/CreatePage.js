import { useState } from "react";
import { Navigate } from "react-router-dom";

import ReactQuillEditor from "./ReactQuillEditor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    e.preventDefault();
    const res = await fetch("/api/v1/post", {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const resData = await res.json();
    if (!res.ok) {
      alert(resData.msg);
    } else {
      setRedirect(true);
    }
    console.log(resData);
  }

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <main className="main-container">
      <form onSubmit={createNewPost} className="form-create">
        <h3>Create Your Blog</h3>
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
        <button className="btn">Post</button>
      </form>
    </main>
  );
}
