"use client";

import Image from "next/image";

import { Marquee } from "@/components/marquee";
import { SectionHeader } from "@/components/section-headers";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  img?: string;
  username: string;
}

const testimonialsRow1: Testimonial[] = [
  {
    id: "1",
    text: "Desde que utilizamos UrbanIQ hemos aumentado un **27% la captación de propietarios en exclusiva** en menos de 3 meses.",
    name: "Laura Gómez",
    username: "Directora · Agencia Tarragona"
  },
  {
    id: "2",
    text: "El sistema de valoración con rango y confianza nos permite justificar el precio ante el cliente con datos reales.",
    name: "Carlos Martín",
    username: "Broker · Barcelona",
    img: "/avatars/avatar-1.jpg"
  },
  {
    id: "3",
    text: "La predicción de intención de venta nos ayuda a priorizar leads con mayor probabilidad de cierre.",
    name: "Marta Ruiz",
    username: "Equipo captación · Reus",
    img: "/avatars/avatar-2.jpg"
  },
  {
    id: "4",
    text: "Gracias al Legal Twin reducimos incidencias jurídicas antes de firmar arras.",
    name: "Jordi Serra",
    username: "Perito judicial · Costa Dorada",
    img: "/avatars/avatar-3.jpg"
  },
  {
    id: "5",
    text: "UrbanIQ nos permite trabajar con datos y no con intuición. **Más decisiones estratégicas, menos improvisación.**",
    name: "Ana López",
    username: "Inversora · Valencia",
    img: "/avatars/avatar-4.jpg"
  },
  {
    id: "6",
    text: "La automatización del scoring de leads nos ahorra horas cada semana.",
    name: "David Navarro",
    username: "Responsable expansión · Madrid",
    img: "/avatars/avatar-6.jpg"
  }
];

const testimonialsRow2: Testimonial[] = [
  {
    id: "7",
    text: "Hemos reducido un **35% el tiempo medio de captación** gracias a la priorización inteligente.",
    name: "Sergio Torres",
    username: "CEO · Agencia independiente"
  },
  {
    id: "8",
    text: "El análisis legal automatizado nos aporta seguridad antes de publicar un activo.",
    name: "Claudia Pérez",
    username: "Departamento jurídico",
    img: "/avatars/avatar-5.jpg"
  },
  {
    id: "9",
    text: "Ahora podemos escalar sin aumentar equipo gracias a los flujos automatizados.",
    name: "Ricardo Molina",
    username: "Director comercial",
    img: "/avatars/avatar-2.jpg"
  },
  {
    id: "10",
    text: "La exclusividad del lead y el control del marketplace marca la diferencia frente a otros portales.",
    name: "Elena Castillo",
    username: "Agente senior",
    img: "/avatars/avatar-7.jpg"
  },
  {
    id: "11",
    text: "Nuestros clientes perciben mayor profesionalidad al presentar informes con datos y scoring.",
    name: "Pedro Sánchez",
    username: "Asesor inmobiliario",
    img: "/avatars/avatar-1.jpg"
  },
  {
    id: "12",
    text: "La arquitectura es sólida y preparada para escalar en multiagencia.",
    name: "Lucía Herrera",
    username: "CTO · PropTech",
    img: "/avatars/avatar-3.jpg"
  }
];

export default function WallOfLove() {
  return (
    <SectionHeader id="wall-of-love">
      <SectionHeader.HeaderContent>
        <SectionHeader.Heading>Lo que opinan profesionales inmobiliarios</SectionHeader.Heading>
        <SectionHeader.Text>
          Agencias, inversores y profesionales que ya trabajan con inteligencia artificial aplicada al sector inmobiliario.
        </SectionHeader.Text>
      </SectionHeader.HeaderContent>

      <SectionHeader.Content>
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-lg">
          <Marquee pauseOnHover>
            {testimonialsRow1.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover>
            {testimonialsRow2.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>

          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l" />
        </div>
      </SectionHeader.Content>
    </SectionHeader>
  );
}

interface AvatarProps {
  img?: string;
  alt: string;
}

function Avatar({ img, alt }: AvatarProps) {
  if (img) {
    return (
      <div className="size-9">
        <Image
          src={img}
          alt={alt}
          width={40}
          height={40}
          loading="lazy"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-lg font-bold">
      {alt.charAt(0).toUpperCase()}
    </div>
  );
}

function formatHighlightedText(text: string) {
  if (!text.includes("**")) {
    return <p className="text-muted-foreground">{text}</p>;
  }

  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <p className="text-muted-foreground">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={i} className="bg-primary/90 px-1 font-medium text-white">
              {part.slice(2, -2)}
            </span>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

interface ReviewCardProps extends Testimonial {}

function ReviewCard({ img, name, username, text }: ReviewCardProps) {
  return (
    <figure className="bg-card text-card-foreground relative w-72 cursor-pointer overflow-hidden rounded-xl border p-4">
      <div className="flex flex-row items-center gap-2">
        <Avatar img={img} alt={name} />

        <div className="flex flex-col">
          <h3 className="text-foreground font-bold">{name}</h3>
          <span className="text-muted-foreground block text-sm">{username}</span>
        </div>
      </div>

      <blockquote className="mt-2 text-sm">{formatHighlightedText(text)}</blockquote>
    </figure>
  );
}
