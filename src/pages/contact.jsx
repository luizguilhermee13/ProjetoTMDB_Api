import { Link, Album, Link2, Mail, Phone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function ContatoPage() {
  const contatos = [
    {
      title: "Linkedin",
      icon: Link,
      link: "https://www.linkedin.com/in/luiz-delila-56a38a203/",
    },
    {
      title: "GitHub",
      icon: Album,
      link: "https://github.com/luizguilhermee13",
    },
    { title: "Instagram", icon: Link2, link: "https://www.instagram.com/" },
    { title: "E-Mail", icon: Mail, link: "mailto:teste@gmail.com" },
    { title: "Telefone", icon: Phone, link: "tel:1123452344" },
  ];

  return (
    // Removido o 'absolute' e largura fixa, usando w-full e min-h para preencher full a tela sem quebrar
    <div className="w-full min-h-[calc(100vh-2rem)] bg-gradient-to-b from-[#032541] via-[#0d253f] to-[#01b4e4] text-white rounded-2xl p-4 sm:p-8 font-mono shadow-2xl flex flex-col items-center justify-between overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center flex-1 gap-8 my-auto">
        {/* Título */}
        <div className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-md text-center">
          <h1>Contatos</h1>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 w-full place-items-center">
          {contatos.map((contato, index) => (
            <CardsContato key={index} contato={contato} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CardsContato({ contato }) {
  return (
    <Card className="w-full max-w-[220px] h-[200px] flex items-center justify-center bg-[#0d253f] border border-[#01b4e4]/30 text-white shadow-lg shadow-black/50 hover:bg-[#112d4e] hover:border-[#01b4e4] hover:scale-105 transition-all rounded-xl font-mono">
      <CardContent className="p-4 w-full h-full flex items-center justify-center">
        <a
          href={contato.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-2 text-center w-full h-full cursor-pointer"
        >
          <contato.icon size={40} className="text-[#01b4e4] mb-1 flex-shrink-0" />
          <h2 className="font-bold text-base text-white">{contato.title}</h2>
          <span className="text-xs text-blue-200 line-clamp-1 w-full break-all">
            {contato.link.replace("mailto:", "").replace("tel:", "")}
          </span>
        </a>
      </CardContent>
    </Card>
  );
}
