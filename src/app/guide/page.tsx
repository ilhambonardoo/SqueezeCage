import GuideBookLandingPage from "@/src/components/LandingPage/GuideBookLandingPage";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <p className="text-slate-500 text-sm animate-pulse">
              Memuat Panduan...
            </p>
          </div>
        }
      >
        <GuideBookLandingPage />
      </Suspense>
    </div>
  );
};

export default page;
