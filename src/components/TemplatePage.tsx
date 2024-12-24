"use client";
import Banner from "./Banner";
import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";
import HeaderLine from "./HeaderLine";
import OrderCartDesktop from "./OrderCartDesktop";
import QueryProvider from "./QueryProvider";
import SubHeader from "./SubHeader";

export default function TemplatePage({ data }: { data: any }) {
  const { checkoutTemplate } = data;
  return (
    <div
      className="flex flex-col w-full"
      style={{
        backgroundColor: checkoutTemplate.backgroundColor,
      }}
    >
      <QueryProvider>
        <Header
          logoAlignment={checkoutTemplate.logoAlignment}
          logo={checkoutTemplate.logoUrl}
          planProducts={data.salesPlan.planProducts}
        />
        <div>
          <SubHeader
            background={checkoutTemplate.accentBackgroundColor}
            color={checkoutTemplate.accentForegroundColor}
            message={checkoutTemplate.topPromoMessage}
          />
          <HeaderLine colors={checkoutTemplate.gradientBarColors} />
        </div>
        {checkoutTemplate.primaryBannerUrl && (
          <Banner
            banner={checkoutTemplate.primaryBannerUrl}
            secondaryBanner={checkoutTemplate.secondaryBannerUrl}
            videoUrl={checkoutTemplate.videoUrl}
            backgroundColor={checkoutTemplate.backgroundColor}
          />
        )}
        <div className="flex flex-col gap-8 -top-20 mt-5">
          <div className="flex flex-row gap-8">
            <Form
              planProducts={data.salesPlan.planProducts}
              requiresShipping={!checkoutTemplate.disableAddress}
              shippingOptions={
                data.shippingOptions ?? data.salesPlan.shippingOptions
              }
              storeId={data.store?.id ?? checkoutTemplate.storeId}
            />
            <div className="hidden sm:block">
              <OrderCartDesktop planProducts={data.salesPlan.planProducts} />
            </div>
          </div>
          {/* <CarruselTestimonial /> */}
        </div>
        <Footer
          backgroundColor={checkoutTemplate.footerBackgroundColor}
          color={checkoutTemplate.footerForegroundColor}
          address={
            checkoutTemplate.showStoreAddress
              ? checkoutTemplate.storeAddress
              : undefined
          }
          phone={
            checkoutTemplate.showStoreWhatsappNumber
              ? checkoutTemplate.storeWhatsappNumber
              : undefined
          }
          document={
            checkoutTemplate.showStoreTaxId
              ? checkoutTemplate.storeTaxId
              : undefined
          }
          email={
            checkoutTemplate.showStoreEmail
              ? checkoutTemplate.storeMail
              : undefined
          }
          name={
            checkoutTemplate.showStoreName ? data.store?.name ?? "" : undefined
          }
          privacyPolicy={
            checkoutTemplate.showStorePrivacyPolicyUrl
              ? checkoutTemplate.storePrivacyPolicyUrl
              : undefined
          }
          showPayment={checkoutTemplate.showSupportedPaymentMethods}
          termsOfUse={
            checkoutTemplate.showStorePrivacyPolicyUrl
              ? checkoutTemplate.storePrivacyPolicyUrl
              : undefined
          }
          tradesAndReturns={
            checkoutTemplate.showStoreReturnAndRefundPolicyUrl
              ? checkoutTemplate.storeReturnAndRefundPolicyUrl
              : undefined
          }
        />
      </QueryProvider>
    </div>
  );
}
