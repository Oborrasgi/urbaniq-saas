import CTA from "./components/cta";
import Demo from "./components/demo";
import FAQ from "./components/faq";
import Features from "./components/features";
import Gallery from "./components/gallery";
import Hero from "./components/hero";
import Pricing from "./components/pricing";
import Process from "./components/process";
import Testimonial from "./components/testimonial";
import TrustedBy from "./components/trusted-by";

export default function Landing1Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrustedBy />
      <Features />
      <Process />
      <Demo />
      <Gallery />
      <Pricing />
      <FAQ />
      <Testimonial />
      <CTA />
    </main>
  );
}
