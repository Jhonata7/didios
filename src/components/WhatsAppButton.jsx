import { MessageCircle } from "lucide-react";

import storeConfig from "../config/storeConfig";

export default function WhatsAppButton() {
  const message =
    "Olá! Vim pelo site da diDios e gostaria de tirar uma dúvida.";

  const whatsappUrl =
    `https://wa.me/${storeConfig.contact.whatsappInternational}` +
    `?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a diDios pelo WhatsApp"
      title="Fale conosco pelo WhatsApp"
      className="
        fixed
        right-4
        sm:right-6

        bottom-4
        sm:bottom-6

        z-[9999]

        flex
        items-center
        justify-center

        w-14
        h-14

        sm:w-16
        sm:h-16

        rounded-full

        bg-green-500
        text-white

        shadow-[0_8px_30px_rgba(0,0,0,0.25)]

        hover:bg-green-600
        hover:scale-110

        active:scale-95

        transition-all
        duration-300
      "
    >
      <MessageCircle
        size={30}
        strokeWidth={2.4}
      />

      {/* PONTO DE ATENDIMENTO */}

      <span
        className="
          absolute
          top-0
          right-0

          w-4
          h-4

          bg-red-500
          border-2
          border-white

          rounded-full
        "
      />

      {/* EFEITO */}

      <span
        className="
          absolute
          inset-0

          rounded-full

          bg-green-400

          opacity-20

          animate-ping

          pointer-events-none

          -z-10
        "
      />
    </a>
  );
}