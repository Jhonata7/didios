import { CheckCircle2, X } from "lucide-react";

export default function Toast({
  show,
  message,
  onClose,
}) {

  if (!show) return null;

  return (

    <div
      className="
        fixed
        top-6
        right-6
        z-50
        bg-black
        text-white
        rounded-2xl
        shadow-2xl
        px-6
        py-5
        flex
        items-center
        gap-4
        animate-[fadeIn_.3s]
      "
    >

      <CheckCircle2
        size={28}
        className="text-green-400"
      />

      <div className="flex-1">

        <p className="font-bold">

          {message}

        </p>

      </div>

      <button onClick={onClose}>

        <X size={18} />

      </button>

    </div>

  );

}