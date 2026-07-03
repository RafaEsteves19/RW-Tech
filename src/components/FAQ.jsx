import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import "./FAQ.css";

const faqItems = [

  {
    question: "Como vocês escolhem os produtos analisados?",
    answer:
      "Selecionamos produtos populares, lançamentos e itens frequentemente solicitados pelos nossos visitantes. Também aceitamos sugestões enviadas pela página de contato."
  },

  {
    question: "As análises são patrocinadas?",
    answer:
      "Não. Nosso objetivo é fornecer avaliações honestas e imparciais. Quando utilizamos links de afiliados, eles ajudam a manter o projeto, mas nunca influenciam nossas opiniões ou recomendações."
  },

  {
    question: "Como vocês atribuem as notas dos produtos?",
    answer:
      "As notas consideram critérios como qualidade, desempenho, custo-benefício, construção, facilidade de uso, recursos oferecidos e comparação com outros produtos da mesma categoria."
  },

  {
    question: "Posso sugerir um produto para review?",
    answer:
      "Sim. Basta acessar a página de contato, selecionar o assunto 'Sugestão' e informar qual produto você gostaria de ver analisado."
  },

  {
    question: "Os links de compra são seguros?",
    answer:
      "Sim. Todos os links direcionam para parceiros e marketplaces confiáveis. A compra é realizada diretamente na loja escolhida."
  },

  {
    question: "Vocês atualizam reviews antigos?",
    answer:
      "Sempre que um produto recebe atualizações importantes ou surgem novos concorrentes relevantes, revisamos o conteúdo para manter as informações atualizadas."
  },

  {
    question: "Posso entrar em contato para parcerias?",
    answer:
      "Sim. Utilize o formulário de contato e selecione 'Parceria' como assunto. Analisaremos sua proposta e responderemos o mais breve possível."
  }

];

function FAQ() {

  const [opened, setOpened] = useState(null);

  function toggle(index) {
    setOpened(opened === index ? null : index);
  }

  return (

    <section
      id="faq"
      className="faq-section"
    >

      <motion.div

        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}

        viewport={{ once: true }}

        transition={{ duration: .5 }}

        className="faq-header"
      >

        <h2>Perguntas Frequentes</h2>

        <p>
          Reunimos as dúvidas mais comuns para facilitar sua experiência.
          Caso ainda precise de ajuda, utilize o formulário de contato acima.
        </p>

      </motion.div>

      <div className="faq-list">

        {faqItems.map((item, index) => (

          <motion.div

            key={index}

            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            transition={{
              delay: index * .05
            }}

            className={`faq-item ${
              opened === index ? "active" : ""
            }`}

          >

            <button

              className="faq-question"

              onClick={() => toggle(index)}

            >

              <span>
                {item.question}
              </span>

              <ChevronDown
                size={22}
                className={
                  opened === index
                    ? "rotate"
                    : ""
                }
              />

            </button>

            <AnimatePresence>

              {opened === index && (

                <motion.div

                  initial={{
                    height: 0,
                    opacity: 0
                  }}

                  animate={{
                    height: "auto",
                    opacity: 1
                  }}

                  exit={{
                    height: 0,
                    opacity: 0
                  }}

                  transition={{
                    duration: .25
                  }}

                  className="faq-answer-wrapper"

                >

                  <div className="faq-answer">

                    {item.answer}

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        ))}

      </div>

    </section>

  );

}

export default FAQ;