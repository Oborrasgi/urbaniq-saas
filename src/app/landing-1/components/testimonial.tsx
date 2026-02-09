import { MotionDiv } from "@/components/motion-elements";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Carlos M.",
    role: "Agente inmobiliario",
    avatar: "/avatars/avatar-1.jpg",
    rating: 5,
    text: "UrbanIQ me permite priorizar propietarios con intención real de venta. El scoring y la valoración automática me ahorran horas cada semana."
  },
  {
    name: "Laura G.",
    role: "Inversora inmobiliaria",
    avatar: "/avatars/avatar-2.jpg",
    rating: 5,
    text: "El análisis legal y el rango de valoración con confianza son clave para decidir rápido. UrbanIQ filtra oportunidades que realmente valen la pena."
  },
  {
    name: "Jordi P.",
    role: "Propietario",
    avatar: "/avatars/avatar-3.jpg",
    rating: 5,
    text: "Por primera vez entiendo el valor real de mi vivienda y los riesgos legales antes de vender. Todo es claro y automatizado."
  },
  {
    name: "Marta R.",
    role: "Directora de agencia",
    avatar: "/avatars/avatar-4.jpg",
    rating: 5,
    text: "Hemos mejorado la conversión de leads y reducido visitas inútiles. UrbanIQ nos da foco y datos, no intuiciones."
  },
  {
    name: "David S.",
    role: "Broker hipotecario",
    avatar: "/avatars/avatar-5.jpg",
    rating: 5,
    text: "La cualificación previa del cliente y su situación legal nos permite acelerar operaciones y reducir fricción."
  },
  {
    name: "Ana L.",
    role: "Asset Manager",
    avatar: "/avatars/avatar-6.jpg",
    rating: 5,
    text: "El Property Health Score es una métrica brutal para priorizar carteras y justificar decisiones frente a comité."
  },
  {
    name: "Miguel T.",
    role: "Promotor inmobiliario",
    avatar: "/avatars/avatar-7.jpg",
    rating: 5,
    text: "UrbanIQ conecta captación, legal y valoración en un solo flujo. Es exactamente lo que faltaba en el sector."
  },
  {
    name: "Sofía N.",
    role: "Consultora inmobiliaria",
    avatar: "/avatars/avatar-3.jpg",
    rating: 5,
    text: "La trazabilidad y el enfoque en compliance marcan la diferencia frente a otros CRMs o portales."
  },
  {
    name: "Alberto V.",
    role: "Inversor patrimonial",
    avatar: "/avatars/avatar-2.jpg",
    rating: 5,
    text: "Decidir con datos reales y probabilidad de venta cambia completamente la estrategia de inversión."
  }
];

export default function Testimonial() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <MotionDiv
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl space-y-3 pb-12 text-center md:pb-16"
        >
          <h3 className="text-3xl font-bold sm:text-4xl">Qué opinan los profesionales inmobiliarios</h3>
          <p className="text-muted-foreground">
            Agentes, inversores y propietarios explican cómo UrbanIQ mejora la captación, la valoración y la toma de decisiones.
          </p>
        </MotionDiv>

        <div className="relative grid gap-6 lg:grid-cols-3">
          <div className="space-y-6">
            {testimonials.slice(1, 4).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          <div className="hidden space-y-6 lg:block">
            {testimonials.slice(4, 7).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          <div className="hidden space-y-6 lg:block">
            {testimonials.slice(7).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          <div className="from-background pointer-events-none absolute inset-y-0 bottom-0 h-full w-full bg-linear-to-t to-transparent" />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <MotionDiv
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
      className="bg-card rounded-2xl p-6"
    >
      <div className="space-y-4">
        <div className="flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <p className="text-sm leading-relaxed">{testimonial.text}</p>

        <div className="flex items-center gap-3">
          <Avatar className="size-10 rounded-full">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-semibold">{testimonial.name}</p>
            <p className="text-muted-foreground text-xs">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
