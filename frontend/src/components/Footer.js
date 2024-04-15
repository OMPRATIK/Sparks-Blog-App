export default function Footer() {
  return (
    <footer>
      <div className="main-container">
        <div className="footer-col">
          <p className="footer-logo">Sparks</p>
          <div className="socials">
            <ion-icon className="social-icon" name="logo-instagram"></ion-icon>
            <ion-icon className="social-icon" name="logo-facebook"></ion-icon>
            <ion-icon className="social-icon" name="logo-twitter"></ion-icon>
          </div>
          <p className="copyright">
            Copyright &copy; <span className="year">2027</span> by Sparks, Inc.
            All rights reserved.
          </p>
        </div>
        <div className="footer-col">
          <p className="footer-heading">Contact us</p>
          <address className="contacts">
            <p className="address">Phagwara, Punjab</p>
            <p className="footer-contact">
              <a className="footer-link" href="tel:914-201-6370">
                914-201-6370
              </a>

              <a className="footer-link" href="mailto:hello@sparks.com">
                hello@sparks.com
              </a>
            </p>
          </address>
        </div>
        <div className="footer-col">
          <p className="footer-heading">Company</p>
          <p className="generic">About Company</p>
          <p className="generic">Our Story</p>
          <p className="generic">About Our Partners</p>
        </div>
      </div>
    </footer>
  );
}
