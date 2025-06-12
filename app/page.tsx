import Hero from "@/components/home/Hero";
import Menus from "./../components/home/Menus";
import ServiceInfo from "@/components/home/ServiceInfo";
import StatsSection from "@/components/home/StatsSection";
import ContactUs from "@/components/contact/Contact";
import ContainerWrapper from "@/components/common/ContainerWrapper";
import TopCategories from "@/components/home/TopCategories";
import OurServices from "@/components/home/OurServices";

export default function Home() {
  return (
    <>
      <ContainerWrapper>
        <Hero />
      </ContainerWrapper>
      <ServiceInfo />
      <ContainerWrapper>
        <TopCategories />

        <Menus />
      </ContainerWrapper>
      <StatsSection />
      <OurServices />
      <ContainerWrapper>

        <ContactUs />
      </ContainerWrapper>

    </>
  );
}
