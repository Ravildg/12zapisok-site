import Head from "next/head";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import GamesSection from "@/components/games-section";
import OccasionsSection from "@/components/occasions-section";
import HowItWorksSection from "@/components/how-it-works-section";
import FAQSection from "@/components/faq-section";
import GallerySection from "@/components/gallery-section";
import ReviewsSection from "@/components/reviews-section";
import PricingSection from "@/components/pricing-section";
import Footer from "@/components/footer";
import { useEffect } from "react"; // Добавляем useEffect
import { initMetrika } from "../lib/metrika"; // Импортируем функцию для Метрики

export default function Home() {
  // Инициализация Яндекс Метрики
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      initMetrika();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0A1E] text-white">
      <Head>
        <title>12 записок</title>
        <meta name="description" content="Квест-спектакли с ведущим и актёрами" />
        <link rel="icon" href="public/favicon.ico" key="favicon" />
      </Head>
      <div className="fixed inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5 pointer-events-none"></div>
      <Header />
      <main>
        <HeroSection />
        <GamesSection />
        <OccasionsSection />
        <HowItWorksSection />
        <FAQSection />
        <GallerySection />
        <ReviewsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
