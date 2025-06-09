import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import PopularDish from "@/components/home/PopularDish";
import Menus from "./../components/home/Menus";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Hero />
      <PopularDish />
      <Menus />
      <Footer />
    </main>
  );
}
