import HeroSectionLanding from "../components/LandingPage/HeroSectionLanding";
import JenisKambing from "../components/LandingPage/JenisKambing";
import KelompokSection from "../components/LandingPage/KelompokSection";
import TentangLanding from "../components/LandingPage/TentangLanding";
import NavbarLanding from "../components/Layouts/NavbarLanding";

const page = () => {
  return (
    <>
      <NavbarLanding />
      <main>
        <HeroSectionLanding />
        <TentangLanding />
        <JenisKambing />
        <KelompokSection />
      </main>
    </>
  );
};

export default page;
