import Hero from "@/components/home/Hero";
import MealsCategory from "@/components/home/MealsCategory";
import Menus from "./../components/home/Menus";
import ServiceInfo from "@/components/home/ServiceInfo";
import StatsSection from "@/components/home/StatsSection";
import ContactUs from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <ServiceInfo />
      <MealsCategory />
      <Menus />
      <StatsSection />
      <ContactUs />
    </main>
  );
}
