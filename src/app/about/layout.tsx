import Footer from "@/src/components/Layouts/Footer";
import NavbarLanding from "@/src/components/Layouts/NavbarLanding";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavbarLanding />
      {children}
      <Footer />
    </section>
  );
}
