import Brand from "./Brand";
import {
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

import storeConfig from "../config/storeConfig";

export default function Footer() {
  const whatsappUrl =
    `https://wa.me/${storeConfig.contact.whatsappInternational}`;

  return (
    <footer
      className="
        bg-white
        border-t
        mt-16
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto

          py-12
          sm:py-16
          lg:py-20

          px-5
          sm:px-6
          lg:px-8

          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4

          gap-10
          lg:gap-12
        "
      >
        {/* MARCA */}

        <div>
          <h2
            className="
              text-2xl
              sm:text-3xl
              font-black
              tracking-[3px]
              mb-5
            "
          >
            <Brand />
          </h2>

          <p
            className="
              text-gray-500
              leading-7
              max-w-sm
            "
          >
            Moda premium para quem valoriza
            conforto, qualidade e autenticidade.
          </p>

          <div
            className="
              mt-6
              space-y-4
              text-sm
              text-gray-500
            "
          >
            <a
              href={`mailto:${storeConfig.contact.email}`}
              className="
                flex
                items-start
                gap-3
                hover:text-black
                duration-200
              "
            >
              <Mail
                size={18}
                className="mt-0.5 flex-shrink-0"
              />

              {storeConfig.contact.email}
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-start
                gap-3
                hover:text-black
                duration-200
              "
            >
              <MessageCircle
                size={18}
                className="mt-0.5 flex-shrink-0"
              />

              (11) 94037-1900
            </a>

            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <MapPin
                size={18}
                className="mt-0.5 flex-shrink-0"
              />

              <span>
                {
                  storeConfig.address.street
                }
                ,{" "}
                {
                  storeConfig.address.number
                }
                <br />

                {
                  storeConfig.address.district
                }
                ,{" "}
                {
                  storeConfig.address.city
                }
                {" - "}
                {
                  storeConfig.address.state
                }
              </span>
            </div>
          </div>
        </div>

        {/* INSTITUCIONAL */}

        <div>
          <h3 className="font-bold mb-5">
            Institucional
          </h3>

          <ul
            className="
              space-y-3
              text-gray-500
            "
          >
            <li>
              <button className="hover:text-black">
                Quem Somos
              </button>
            </li>

            <li>
              <button className="hover:text-black">
                Nossa História
              </button>
            </li>

            <li>
              <button className="hover:text-black">
                Política de Privacidade
              </button>
            </li>

            <li>
              <button className="hover:text-black">
                Termos de Uso
              </button>
            </li>
          </ul>
        </div>

        {/* ATENDIMENTO */}

        <div>
          <h3 className="font-bold mb-5">
            Atendimento
          </h3>

          <ul
            className="
              space-y-3
              text-gray-500
            "
          >
            <li>
              Trocas e Devoluções
            </li>

            <li>
              Entrega
            </li>

            <li>
              Perguntas Frequentes
            </li>

            <li>
              Contato
            </li>
          </ul>
        </div>

        {/* REDES */}

        <div>
          <h3 className="font-bold mb-5">
            Redes Sociais
          </h3>

          <a
            href={
              storeConfig.contact
                .instagramUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              justify-center

              bg-black
              text-white

              px-6
              py-3

              rounded-full

              font-bold

              hover:bg-gray-800
              hover:scale-105

              transition-all
              duration-300
            "
          >
            Instagram{" "}
            {
              storeConfig.contact
                .instagram
            }
          </a>

          <div
            className="
              mt-7
              bg-gray-50
              rounded-2xl
              p-5
            "
          >
            <p
              className="
                text-xs
                uppercase
                tracking-wider
                text-gray-400
                font-bold
              "
            >
              Atendimento
            </p>

            <p
              className="
                font-black
                mt-2
              "
            >
              Precisa de ajuda?
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                mt-3
                text-sm
                font-bold
                underline
              "
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div
        className="
          border-t
          px-5
          py-6
          text-center
          text-gray-500
          text-xs
          sm:text-sm
        "
      >
        © 2026 Ddios. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}