import ContentProfile from "@/src/components/ProfilePage/ContentProfile";
import HeroSectionProfile from "@/src/components/ProfilePage/HeroSectionProfile";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="space-y-6">
      <HeroSectionProfile />
      <Suspense
        fallback={<div className="p-8 text-center"> Memuat profill...</div>}
      >
        <ContentProfile />
      </Suspense>
    </div>
  );
};

export default page;
