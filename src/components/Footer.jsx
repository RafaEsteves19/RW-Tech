import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"

import logo from '../assets/logo.png';

function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { path: '/', label: 'Home' },
    { path: '/reviews', label: 'Reviews & Produtos' },
    { path: '/about', label: 'Sobre' },
    { path: '/contact', label: 'Contato' },
    { path: "/contact#faq", label: "Perguntas Frequentes" }

  ]

  const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/reviewbrothersrw?igsh=dGFkZ3Q1Njl0dHho' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCluda0kRZfUU7ACC7NIj9oA' }
  ]

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <div>
            <img src={logo} alt="RW Brothers Reviews" className="logo-image" />
            <h2 translate="no">RW Brothers Reviews</h2>
          </div>
          <p>
            Análises técnicas honestas para ajudar na decisão de compra.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h3>Links</h3>
          {footerLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h3>Redes Sociais</h3>
          <div className="social-list">
            {socialLinks.map((social) => (
              <a target="_blank" rel="noopener noreferrer" key={social.label} href={social.href}>
                {social.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © {currentYear} <spam translate="no">RW Brothers Reviews.</spam> Todos os direitos reservados.
        </p>

        {/*<div className="footer-legal">
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
        </div>*/}
      </div>

      {/* DISCLAIMER */}
      <div className="footer-disclaimer">
        <p>
          Aviso: alguns links podem ser de afiliados. Podemos receber comissão sem custo adicional.
        </p>
      </div>

    </footer>
  )
}

export default Footer