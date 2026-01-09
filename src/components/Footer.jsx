import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Employee Management System</h3>
        <p>Streamlining workforce management with modern technology</p>
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Contact Us</a>
        </div>
        <div className="footer-bottom">
          © 2026 Employee Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;