import CreatePageKambing from "@/src/components/KambingPage/CreatePageKambing";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-200 dark:bg-neutral-950 rounded-3xl overflow-hidden">
      <div className="flex-1 p-5">
        <CreatePageKambing />
      </div>
    </div>
  );
};

export default page;
