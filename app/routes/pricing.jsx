import { useFetcher } from "@remix-run/react";

export default function SelectPlan() {
  const fetcher = useFetcher();

  const handleSubmit = async (plan) => {
    const response = await fetcher.submit(
      { plan },
      { method: "POST", action: "/upgrade" }
    );

    if (response?.response?.confirmation_url) {
      window.location.href = response.response.confirmation_url; // Redirect tới trang Shopify billing
    } else {
      console.error("Error with payment redirection.");
    }
  };

  return (
    <div>
      <h1>Choose Your Subscription Plan</h1>
      <div>
        <button onClick={() => handleSubmit("basic")}>
          Select Basic Plan ($9.99/month)
        </button>
      </div>
      <div>
        <button onClick={() => handleSubmit("premium")}>
          Select Premium Plan ($19.99/month)
        </button>
      </div>
    </div>
  );
}
