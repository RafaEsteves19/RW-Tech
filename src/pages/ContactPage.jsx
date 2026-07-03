import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';

import emailjs from '@emailjs/browser';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Toast from '../components/Toast.jsx';

import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  function showToast(type, title, description) {
    setToast({ type, title, description });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: null
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Nome obrigatório';

    if (!formData.email.trim()) {
      newErrors.email = 'Email obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.subject.trim()) newErrors.subject = 'Assunto obrigatório';

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem obrigatória';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Mensagem muito curta';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString('pt-BR')
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      showToast(
        'success',
        'Mensagem enviada!',
        'Sua mensagem foi enviada com sucesso. Em breve entraremos em contato.'
      );

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error(error);

      showToast(
        'error',
        'Erro ao enviar',
        'Não foi possível enviar sua mensagem. Tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Contato</title>
        <meta name="description" content="Página de contato" />
      </Helmet>

      <div className="contact-page">
        <Header />

        <section className="contact-section">
          <motion.div
            className="contact-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Entre em contato</h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Envie dúvidas ou sugestões
            </motion.p>
          </motion.div>

          <div className="contact-info-grid">
            <motion.div
              className="contact-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Mail />
              <h2>Email</h2>
              <p>Contato direto</p>
              <a href="mailto:rwreviews19@gmail.com" target="_blank" rel="noopener noreferrer">
                rwreviews19@gmail.com
              </a>
            </motion.div>

            <motion.div
              className="contact-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <MessageSquare />
              <h2>Redes sociais</h2>
              <p>Atualizações e novidades</p>

              <div className="social-links">
                <a href="https://www.instagram.com/reviewbrothersrw?igsh=dGFkZ3Q1Njl0dHho" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.youtube.com/channel/UCluda0kRZfUU7ACC7NIj9oA" target="_blank" rel="noopener noreferrer">YouTube</a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>Enviar mensagem</h2>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="grid-2">
                <div>
                  <label>Nome</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span>{errors.name}</span>}
                </div>

                <div>
                  <label>Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span>{errors.email}</span>}
                </div>
              </div>

              <div>
                <label>Assunto</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
                {errors.subject && <span>{errors.subject}</span>}
              </div>

              <div>
                <label>Mensagem</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                />
                {errors.message && <span>{errors.message}</span>}
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : (
                  <>
                    Enviar mensagem
                    <Send />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </section>

        <Footer />

        {toast && (
          <Toast
            type={toast.type}
            title={toast.title}
            description={toast.description}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
}

export default ContactPage;