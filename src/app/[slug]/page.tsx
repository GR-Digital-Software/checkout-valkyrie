import Banner from "../../components/Banner";
import CarruselTestimonial from "../../components/CarruselTestimonial";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import Header from "../../components/Header";
import HeaderLine from "../../components/HeaderLine";
import OrderCartDesktop from "../../components/OrderCartDesktop";
import SubHeader from "../../components/SubHeader";

const TemplatePage = async ({ params }: { params: { slug: string } }) => {
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
    return (
      <div className="flex flex-col w-full bg-zinc-200">
        <Header logo={data.checkoutTemplate.logoUrl} />
        <div>
          <SubHeader />
          <HeaderLine />
        </div>
        {data.checkoutTemplate.bannerUrl && (
          <Banner banner={data.checkoutTemplate.bannerUrl} />
        )}
        <div className="flex flex-col gap-8 mt-5">
          <div className="flex flex-row">
            <Form />
            <div className="hidden sm:block">
              <OrderCartDesktop planProducts={data.salesPlan.planProducts} />
            </div>
          </div>
          {/* <CarruselTestimonial /> */}
        </div>
        <Footer store={data.checkoutTemplate.store} />
      </div>
    );
  } catch (error: any) {
    return <div>Error: {error.message || "An unexpected error occurred."}</div>;
  }
};

export default TemplatePage;
