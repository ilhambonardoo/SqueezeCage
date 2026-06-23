import HeroSectionLanding from "../components/LandingPage/HeroSectionLanding";
import JenisTernak from "../components/LandingPage/JenisTernak";
import TentangLanding from "../components/LandingPage/TentangLanding";
import NavbarLanding from "../components/Layouts/NavbarLanding";
import Model3DSection from "../components/LandingPage/Model3DSection";
import DocumentationSection from "../components/LandingPage/DocumentationSection";
import FeatureSection from "../components/LandingPage/FeatureSection";
import Footer from "../components/Layouts/Footer";

const page = () => {
  return (
    <>
      <NavbarLanding />
      <main>
        <HeroSectionLanding />
        <TentangLanding />
        <JenisTernak />
        <DocumentationSection />
        <FeatureSection />
        <Model3DSection />
      </main>
      <Footer />
    </>
  );
};

export default page;
