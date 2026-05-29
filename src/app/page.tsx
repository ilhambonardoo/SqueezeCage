import HeroSectionLanding from "../components/LandingPage/HeroSectionLanding";
import JenisKambing from "../components/LandingPage/JenisKambing";
import TentangLanding from "../components/LandingPage/TentangLanding";
import NavbarLanding from "../components/Layouts/NavbarLanding";
import Model3DSection from "../components/LandingPage/Model3DSection";
import DocumentationSection from "../components/LandingPage/DocumentationSection";

const page = () => {
  return (
    <>
      <NavbarLanding />
      <main>
        <HeroSectionLanding />
        <TentangLanding />
        <JenisKambing />
        <DocumentationSection />
        <Model3DSection />
      </main>
    </>
  );
};

export default page;
