import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    var object: { [key: string]: any } = {};
    body.forEach((value, key) => (object[key] = value));
    const cart = JSON.parse(object.cart);
    const { items } = cart;
    const externalIds = items
      .map((item: any) => item.variant_id)
      .map((id: string) => `gid://shopify/ProductVariant/${id}`);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkouts/cart/shopify?externalIds=` +
        externalIds.join(",")
    );
    const data = await res.json();
    const salesPlan = {
      ...data.salesPlans[0],
      planProducts: data.salesPlans.map((plan: any) => {
        const amount = items.find((item: any) =>
          plan.planProducts[0].product.externalId.includes(item.id.toString())
        ).quantity;
        return { ...plan.planProducts[0], amount };
      }),
    };
    const response = NextResponse.redirect(
      new URL(process.env.NEXT_URL + "/checkout", request.url),
      {
        status: 303,
      }
    );

    response.cookies.set("checkoutTemplate", JSON.stringify(data.template), {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 2,
    });
    response.cookies.set("store", JSON.stringify(data.store), {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 2,
    });
    response.cookies.set(
      "salesPlan",
      JSON.stringify({
        ...salesPlan,
        requiresShipping: cart.requires_shipping,
      }),
      {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 2,
      }
    );
    response.cookies.set(
      "shippingOptions",
      JSON.stringify(data.shippingOptions),
      {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 2,
      }
    );

    return response;
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
