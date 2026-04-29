import CardInfoKambing from "@/src/components/DashboardPage/CardInfoKambing";
import HeroSectionDashboard from "@/src/components/DashboardPage/HeroSectionDashboard";
import PrediksiKambing from "@/src/components/DashboardPage/PrediksiKambing";

const page = () => {
  return (
    <>
      <div className="bg-neutral-200 dark:bg-neutral-950 rounded-3xl">
        <HeroSectionDashboard />
        <PrediksiKambing />
        <CardInfoKambing />
      </div>
    </>
  );
};

export default page;
