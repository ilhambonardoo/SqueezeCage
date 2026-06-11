import DaftarTernak from "@/src/components/TernakPage/DaftarTernak";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-200 dark:bg-neutral-950 rounded-3xl overflow-hidden">
      <div className="flex-1 p-5">
        <DaftarTernak />
      </div>
    </div>
  );
};

export default page;
