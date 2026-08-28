import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="ddios-hero" aria-label="Apresentação da Ddios">
      <picture className="ddios-hero-photo">
        <source media="(min-width: 768px)" srcSet="/images/ddios-capa-desktop.webp" width="1672" height="941" />
        <img src="/images/ddios-capa-apresentacao.webp"
          alt="Ddios — coleção feminina, conforto e sofisticação em cada detalhe"
          width="1254" height="1254" fetchPriority="high" />
      </picture>
      <div className="ddios-hero-action">
        <div>
          <p className="ddios-hero-label">Bem-vinda à Ddios</p>
          <h1>Moda e conforto para o seu dia.</h1>
        </div>
        <a href="#catalogo" className="ddios-buy">
          Conhecer a coleção <ArrowUpRight size={21} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
