import { MessageCircle } from "lucide-react";

const WA_URL =
  "https://wa.me/51999999999?text=Hola,%20quisiera%20más%20información%20sobre%20los%20libros%20disponibles%20en%20MICH.";

const WhatsAppFab = () => {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-full h-14 w-14 flex items-center justify-center shadow-lg transition-colors"
      aria-label="Contáctanos por WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
};

export default WhatsAppFab;
