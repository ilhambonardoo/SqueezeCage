import Footer from "@/src/components/Layouts/Footer";
import NavbarLanding from "@/src/components/Layouts/NavbarLanding";

export default function QuestionLayout({
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
