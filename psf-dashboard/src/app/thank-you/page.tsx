import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="public-page thank-you-page">
      <section className="thank-you-panel" aria-labelledby="thank-you-title">
        <p className="eyebrow">Pinchy Slab Face</p>
        <h1 id="thank-you-title">You are on the list.</h1>
        <p className="lead">
          Thanks for joining. We will send a short welcome note and let you know
          when PSF goes live.
        </p>
        <p className="supporting">
          First emails are coming soon, with comps, resets, events, giveaways,
          and useful climbing scene updates.
        </p>
        <Link className="secondary-cta" href="/">
          Back to homepage
        </Link>
      </section>
    </main>
  );
}
