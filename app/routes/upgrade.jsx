import { redirect } from "@remix-run/node";

export const loader = async ({ request }) => {
  try {
    // Dynamically import server-side logic only when server-side is running
    const { authenticate, MONTHLY_PLAN } = await import("~/models/shopify.server");

    const { billing, session } = await authenticate.admin(request);
    let { shop } = session;
    let myShop = shop.replace(".myshopify.com", "");

    await billing.require({
      plans: [MONTHLY_PLAN],
      onFailure: async () => {
        return billing.request({
          plan: MONTHLY_PLAN,
          isTest: true,
          returnUrl: `https://admin.shopify.com/store/${myShop}/apps/billingapp-10/app/pricing`,
        });
      },
    });

    return redirect(`/success`); // Redirect user to a success endpoint after logic completes
  } catch (error) {
    console.error("Billing error", error);
    return redirect(`/error`);
  }
};
