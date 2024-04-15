import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-container">
        <h1>Sparks</h1>
        <p>
          Unleashing Your Creative Potential.
          <span> Spark your curiosity with Sparks. </span>
          Igniting Ideas, Inspiring Minds.
        </p>
        <Link to="/login" className="btn">
          Discover &rarr;
        </Link>
      </div>
    </div>
  );
}
