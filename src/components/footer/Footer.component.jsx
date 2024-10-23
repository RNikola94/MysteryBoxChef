import './footer.styles.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src="/icons/facebook.svg" alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src="/icons/instagram.svg" alt="Instagram" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src="/icons/twitter.svg" alt="Twitter" />
            </a>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Subscribe to Our Newsletter</h4>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email for newsletter"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
