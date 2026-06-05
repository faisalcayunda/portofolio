import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Expertise from "@/components/sections/Expertise";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingBar from "@/components/ui/FloatingBar";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Expertise />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FloatingBar />
    </>
  );
}
