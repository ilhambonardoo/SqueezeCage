import DetailPageKambing from "@/src/components/KambingPage/DetailPageKambing";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-950 rounded-3xl overflow-hidden p-5">
      <DetailPageKambing id={id} />
    </div>
  );
};

export default page;
