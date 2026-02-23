import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2026 SmartTech. All rights reserved.</p>

            <div className="footer-links">
                <a href="mailto:yourmail@gmail.com">brunoristovski@gmail.com</a>
                <a href="https://github.com/brunoristovski" target="_blank" rel="noreferrer">
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/bruno-ristovski-8a1652a9/" target="_blank" rel="noreferrer">
                    LinkedIn
                </a>
            </div>
        </footer>
    );
};

export default Footer;
