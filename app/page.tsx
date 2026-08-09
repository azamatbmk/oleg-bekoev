import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import About from "@/components/About/About";
import Faq from "@/components/Faq/Faq";
import VideoReviews from "@/components/VideoReviews/VideoReviews";
import Book from "@/components/Book/Book";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import HomeFaqJsonLd from "@/components/JsonLd/HomeFaqJsonLd";

export default function Home() {
  return (
    <main>
      <HomeFaqJsonLd />
      <SiteHeader />
      <Hero />
      <Services />
      <About />
      <Faq />
      <VideoReviews />
      <Book />
      <SiteFooter />
    </main>
  );
}
