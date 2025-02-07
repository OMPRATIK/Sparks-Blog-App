import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({ el }) {
  return (
    <main>
      <div className="entry">
        <div className="container-img">
          <Link to={`post/${el._id}`}>
            <img src={`/${el.coverImg.replace("\\", "/")}`} alt="random" />
          </Link>
        </div>
        <div className="description">
          <Link to={`post/${el._id}`}>
            <h2>{el.title}</h2>
          </Link>
          <div className="info">
            <div className="info-name">
              <span className="author">{el.author.username}</span>
              <time>{format(new Date(el.createdAt), "MMM d, yyyy HH:mm")}</time>
            </div>
            <div className="likes">{el.likes?.length}💖</div>
          </div>
          <p className="summary">{el.summary}</p>
        </div>
      </div>
    </main>
  );
}
