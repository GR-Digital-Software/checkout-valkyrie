import Banner from "./Banner";
import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";
import HeaderLine from "./HeaderLine";
import OrderCartDesktop from "./OrderCartDesktop";
import QueryProvider from "./QueryProvider";
import SubHeader from "./SubHeader";

export default function TemplatePage({ data }: { data: any }) {
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
          <QueryProvider>
            <Form
              planProducts={data.salesPlan.planProducts}
              requiresShipping={data.salesPlan?.requireShipping ?? true}
              shippingOptions={
                data.shippingOptions ?? data.salesPlan.shippingOptions
              }
              storeId={data.store.id ?? data.checkoutTemplate.store.id}
            />
            <div className="hidden sm:block">
              <OrderCartDesktop planProducts={data.salesPlan.planProducts} />
            </div>
          </QueryProvider>
        </div>
        {/* <CarruselTestimonial /> */}
      </div>
      <Footer store={data.store.id ?? data.checkoutTemplate.store} />
    </div>
  );
}
