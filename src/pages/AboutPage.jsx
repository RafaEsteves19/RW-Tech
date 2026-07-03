import { Helmet } from "react-helmet";
import { color, motion } from "framer-motion";
import { FlaskConical, Scale, ShieldCheck } from "lucide-react";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import "./AboutPage.css";

function AboutPage() {

    const values = [

        {
            icon: FlaskConical,
            title: "Testes Reais",
            description:
                "Todos os produtos são avaliados considerando qualidade, desempenho, custo-benefício e experiência de uso."
        },

        {
            icon: Scale,
            title: "Avaliação Imparcial",
            description:
                "Cada produto é analisado utilizando os mesmos critérios, sem favorecimento de marcas ou fabricantes."
        },

        {
            icon: ShieldCheck,
            title: "Conteúdo Atualizado",
            description:
                "As análises são revisadas sempre que novos modelos, versões ou informações relevantes são disponibilizados."
        }

    ];

    return (

        <>

            <Helmet>

                <title translate="no">Sobre - RW Brothers Reviews</title>

                <meta translate="no"
                    name="description"
                    content="Conheça a proposta do RW Brothers Reviews."
                />

            </Helmet>

            <Header />

            <main className="about-page">

                {/* HERO */}

                <motion.div
                    className="about-hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                >

                    <h1 translate="no">Sobre o RW Brothers Reviews</h1>

                    <p style={{ color: '#9a9999' }}>

                        O <strong translate="no">RW Brothers Reviews</strong> foi criado com um
                        objetivo simples: ajudar consumidores a encontrarem os
                        melhores produtos através de análises detalhadas,
                        honestas e imparciais.

                        <br /><br />

                        Nosso foco é apresentar informações claras, destacar os
                        pontos fortes e fracos de cada produto e facilitar sua
                        decisão de compra, independentemente da categoria.

                    </p>

                </motion.div>

                {/* MISSÃO */}

                <section className="about-section">

                    <h2>Nossa Missão</h2>

                    <p>

                        Escolher um bom produto pode ser uma tarefa difícil
                        diante da enorme quantidade de opções disponíveis no
                        mercado.

                        <br /><br />

                        Nosso trabalho é reunir as informações mais importantes,
                        realizar análises detalhadas e apresentar tudo de forma
                        organizada para que você possa comparar produtos e fazer
                        uma compra com muito mais confiança.

                    </p>

                </section>

                {/* VALORES */}

                <section className="about-section">

                    <h2>Como Avaliamos os Produtos</h2>

                    <div className="values-grid">

                        {values.map((value, index) => {

                            const Icon = value.icon;

                            return (

                                <motion.div

                                    key={value.title}

                                    className="value-card"

                                    initial={{ opacity: 0, y: 20 }}

                                    whileInView={{ opacity: 1, y: 0 }}

                                    viewport={{ once: true }}

                                    transition={{
                                        duration: .5,
                                        delay: index * .1
                                    }}

                                >

                                    <Icon size={42} />

                                    <h3>{value.title}</h3>

                                    <p>{value.description}</p>

                                </motion.div>

                            );

                        })}

                    </div>

                </section>

                {/* COMPROMISSO */}

                <section className="about-section">

                    <h2>Nosso Compromisso</h2>

                    <p>

                        Nosso compromisso é produzir conteúdo confiável,
                        transparente e fácil de entender.

                        <br /><br />

                        Procuramos destacar tanto os pontos positivos quanto as
                        limitações de cada produto, permitindo que cada pessoa
                        decida qual opção realmente atende às suas necessidades.

                    </p>

                </section>

                {/* TRANSPARÊNCIA */}

                <section className="about-section transparency">

                    <h2>Transparência</h2>

                    <p>

                        O <spam translate="no">RW Brothers Reviews</spam> utiliza links de afiliados para
                        manter o projeto funcionando.

                    </p>

                    <p>

                        Caso você realize uma compra através de um dos nossos
                        links, poderemos receber uma pequena comissão.

                    </p>

                    <p>

                        Essa comissão não altera o preço pago pelo consumidor e
                        nunca influencia nossas análises, avaliações ou
                        recomendações.

                    </p>

                </section>

            </main>

            <Footer />

        </>

    );

}

export default AboutPage;