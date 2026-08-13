import HeroSectionLanding from "../components/LandingPage/HeroSectionLanding";
import TentangLanding from "../components/LandingPage/TentangLanding";
import NavbarLanding from "../components/Layouts/NavbarLanding";
import Footer from "../components/Layouts/Footer";

const page = () => {
  return (
    <>
      <NavbarLanding />
      <main>
        <HeroSectionLanding />
        <TentangLanding />
      </main>
      <Footer />
    </>
  );
};

export default page;
