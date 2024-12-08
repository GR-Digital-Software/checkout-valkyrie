import TemplatePage from "@/components/TemplatePage";

const SlugPage = async ({ params }: { params: { slug: string } }) => {
  try {
    // Fetch data from the API route
    const res = await fetch(
      `http://localhost:3003/api/template/${params.slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json();
    return <TemplatePage data={data} />;
  } catch (error: any) {
    return <div>Error: {error.message || "An unexpected error occurred."}</div>;
  }
};

export default SlugPage;
