import AboutUs from "../AboutUs.jpg";

export default function About() {
  return (
    <div className="about-us-container">
      <div className="about-us-grid">
        <div>
          <h3>This is Sparks!</h3>
          <p>
            Welcome to Sparks, where creativity ignites! We're more than just a
            blogging platform; we're a vibrant community of writers,
            storytellers, and thought leaders coming together to spark
            inspiration and foster meaningful connections. At Sparks, we believe
            that every voice deserves to be heard and every story deserves to be
            shared. That's why we provide a dynamic platform where authors can
            showcase their talent, amplify their voice, and reach a global
            audience.
          </p>
        </div>

        <img src={AboutUs} alt="about us img" />
      </div>
    </div>
  );
}
