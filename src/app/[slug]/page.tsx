import TemplatePage from "@/components/TemplatePage";

const SlugPage = async ({ params }: { params: { slug: string } }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_URL}/api/template/${params.slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json();
    return <TemplatePage data={{ ...data }} />;
  } catch (error: any) {
    return <div>Error: {error.message || "An unexpected error occurred."}</div>;
  }
};

export default SlugPage;
