import ContentProfile from "@/src/components/ProfilePage/ContentProfile";
import HeroSectionProfile from "@/src/components/ProfilePage/HeroSectionProfile";

const page = () => {
  return (
    <div className="space-y-6">
      <HeroSectionProfile />
      <ContentProfile />
    </div>
  );
};

export default page;
