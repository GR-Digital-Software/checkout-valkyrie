"use client";

import Banner from "../components/Banner";
import CarruselTestimonial from "../components/CarruselTestimonial";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Header from "../components/Header";
import HeaderLine from "../components/HeaderLine";
import OrderCartDesktop from "../components/OrderCartDesktop";
import SubHeader from "../components/SubHeader";

export default function ViewCheckout() {
  return (
    <div className="flex flex-col w-full bg-zinc-200">
      <Header />
      <div>
        <SubHeader />
        <HeaderLine />
      </div>
      <Banner />
      <div className="flex flex-col gap-8">
        <div className="flex flex-row">
          <Form />
          <div className="hidden sm:block">
            <OrderCartDesktop />
          </div>

        </div>
        <CarruselTestimonial />
      </div>
      <Footer />
    </div>
  )
}