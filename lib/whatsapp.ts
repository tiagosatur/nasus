const PHONE = "5541991696767";

const msg = (text: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

// Hero / Header — usuário chegou agora, curiosidade sobre posicionamento
export const WA_DISCOVERY = msg(
  "Olá! Vi o site da Nasus e quero ver se apareço no Google.\n\nMeu negócio: [nome da clínica/escritório]\nCidade: [cidade]"
);

// Process / FinalCTA / Footer — usuário quer o diagnóstico
export const WA_DIAGNOSTIC = msg(
  "Olá! Vi o site da Nasus e quero o diagnóstico gratuito.\n\nMeu negócio: [nome da clínica/escritório]\nCidade: [cidade]"
);
