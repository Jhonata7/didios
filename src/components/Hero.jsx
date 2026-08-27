import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="ddios-hero" aria-label="Moletom Ddios em destaque">
      <div className="ddios-hero-photo">
        <img src="/images/ddios-moletom-frente.jpg"
          alt="Modelo vestindo a Blusa Moletom 2 Cabos Ddios off-white"
          width="864" height="1536" fetchPriority="high" />
      </div>
      <div className="ddios-hero-action">
        <div>
          <p className="ddios-hero-label">Ddios · Moletons</p>
          <h1>Blusa Moletom<br />2 Cabos</h1>
          <p className="ddios-hero-price">R$ 169,99</p>
        </div>
        <Link to="/produto/11" className="ddios-buy">
          Comprar agora <ArrowUpRight size={21} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
