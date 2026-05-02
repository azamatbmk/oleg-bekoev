import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Specializations from "@/components/Specializations/Specializations";
import Book from "@/components/Book/Book";
import SiteHeader from "@/components/SiteHeader/SiteHeader";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <About />
      <Specializations />
      <Book />
    </main>
  );
}
