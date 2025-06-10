import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import PopularDish from "@/components/home/PopularDish";
import Menus from "./../components/home/Menus";
import ServiceInfo from "@/components/home/ServiceInfo";
import StatsSection from "@/components/home/StatsSection";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Hero />
      <ServiceInfo />
      <PopularDish />
      <Menus />
      <StatsSection />
      <Footer />
    </main>
  );
}
