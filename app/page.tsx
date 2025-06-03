import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Menu from "@/components/home/Menu";
import PopularDish from "@/components/home/PopularDish";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Hero />
      <PopularDish />
      <Menu />
    </main>
  );
}
