import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';

import emailjs from '@emailjs/browser';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Toast from '../components/Toast.jsx';
import CustomSelect from "../components/CustomSelect";
import FAQ from "../components/FAQ";

import './ContactPage.css';

function ContactPage() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    customSubject: '',
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

    if (!formData.name.trim())
      newErrors.name = 'Nome obrigatório';

    if (!formData.email.trim()) {

      newErrors.email = 'Email obrigatório';

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {

      newErrors.email = 'Email inválido';

    }

    if (!formData.subject.trim())
      newErrors.subject = 'Assunto obrigatório';

    if (
      formData.subject === 'Outro' &&
      !formData.customSubject.trim()
    ) {

      newErrors.customSubject = 'Informe o assunto';

    }

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

    const finalSubject =
      formData.subject === 'Outro'
        ? formData.customSubject
        : formData.subject;

    try {

      await emailjs.send(

        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,

        {
          name: formData.name,
          email: formData.email,
          title: finalSubject,
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
        customSubject: '',
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
                  <label>Nome Completo</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo"
                  />
                  {errors.name && <span>{errors.name}</span>}
                </div>

                <div>
                  <label>Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seuemail@exemplo.com"
                  />
                  {errors.email && <span>{errors.email}</span>}
                </div>
              </div>

              <div>

                <label>Assunto</label>

                <CustomSelect
                  value={formData.subject}
                  onChange={(value) =>
                    setFormData(prev => ({
                      ...prev,
                      subject: value,
                      customSubject:
                        value === "Outro"
                          ? prev.customSubject
                          : ""
                    }))
                  }
                  placeholder="Selecione um assunto"
                  options={[
                    "Dúvida",
                    "Sugestão",
                    "Correção",
                    "Parceria",
                    "Outro"
                  ]}
                />

                {errors.subject && (
                  <span>{errors.subject}</span>
                )}

                {formData.subject === "Outro" && (

                  <div className="custom-subject">

                    <label style={{ marginTop: '10px' }}>Qual é o assunto?</label>

                    <input
                      type="text"
                      name="customSubject"
                      value={formData.customSubject}
                      onChange={handleChange}
                      placeholder="Digite o assunto"
                    />

                    {errors.customSubject && (
                      <span>{errors.customSubject}</span>
                    )}

                  </div>

                )}

              </div>

              <div>
                <label>Mensagem</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Descreva sua dúvida, sugestão ou mensagem com o máximo de detalhes possível..."
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

        <FAQ />

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