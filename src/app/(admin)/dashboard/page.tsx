import CardInfoTernak from "@/src/components/DashboardPage/CardInfoTernak";
import HeroSectionDashboard from "@/src/components/DashboardPage/HeroSectionDashboard";
import PrediksiTernak from "@/src/components/DashboardPage/PrediksiTernak";

const page = () => {
  return (
    <>
      <div className="bg-neutral-200 dark:bg-neutral-950 rounded-3xl">
        <HeroSectionDashboard />
        <PrediksiTernak />
        <CardInfoTernak />
      </div>
    </>
  );
};

export default page;
