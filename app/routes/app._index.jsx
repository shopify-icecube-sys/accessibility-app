import { useRouteLoaderData } from "react-router";
import { useEffect, useRef } from "react";

export default function Index() {
  const data = useRouteLoaderData("routes/app");
  const shop = data?.shop;

  const buttonRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const handleClick = () => {
      if (!shop) {
        alert("Shop not found");
        return;
      }

      const url = `https://${shop}/admin/themes/current/editor?context=apps`;
      window.open(url, "_blank");
    };

    buttonRef.current.addEventListener("click", handleClick);

    return () => {
      buttonRef.current?.removeEventListener("click", handleClick);
    };
  }, [shop]);

  return (
    <s-page heading="Accessibility App - Shopify">

      {/* Welcome */}
      <s-section heading="Welcome 👋">
        <s-paragraph>
          Follow the steps below to enable and start using the Accessibility Widget in your store.
        </s-paragraph>
      </s-section>

      {/* Step 1 */}
      <s-section heading="Step 1: Enable App Embed">
        <s-paragraph>
          You need to enable the widget from your theme settings.
        </s-paragraph>

        <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
          <li>Go to <strong>Online Store → Themes</strong></li>
          <li>Click <strong>Customize</strong></li>
          <li>Open <strong>Theme settings</strong></li>
          <li>Click <strong>App embeds</strong></li>
          <li>Find <strong>Accessibility Widget</strong> and enable it</li>
          <li>Click <strong>Save</strong></li>
        </ul>

        <s-button ref={buttonRef} variant="primary">
          Open Theme Editor
        </s-button>
      </s-section>

      {/* Step 2 */}
      <s-section heading="Step 2: Verify Widget">
        <s-paragraph>
          Visit your storefront and confirm that the widget is visible and working correctly.
        </s-paragraph>
      </s-section>

      {/* Help */}
      <s-section heading="Need Help?">
        <s-paragraph>
          If you’re facing any issues, please contact our support team.
        </s-paragraph>
      </s-section>

    </s-page>
  );
}