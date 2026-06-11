import HeroSectionLanding from "../components/LandingPage/HeroSectionLanding";
import JenisTernak from "../components/LandingPage/JenisTernak";
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
        <JenisTernak />
        <DocumentationSection />
        <Model3DSection />
      </main>
    </>
  );
};

export default page;
