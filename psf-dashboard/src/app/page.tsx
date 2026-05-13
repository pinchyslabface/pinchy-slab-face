import Link from "next/link";

export default function HomePage() {
  return (
    <main className="public-page landing-page">
      <section className="hero-shell" aria-labelledby="home-title">
        <div className="brand-mark" aria-hidden="true">
          PSF
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Pinchy Slab Face</p>
          <h1 id="home-title">Everything indoor climbing. Every week.</h1>
          <p className="lead">
            Every comp. Every reset. Every event worth knowing about, straight
            to your inbox.
          </p>
          <p className="supporting">
            Built for climbers, parents, coaches, gyms, setters, brands, and
            the people who keep the scene moving.
          </p>
          <Link className="primary-cta" href="/subscribe">
            Get on the list
          </Link>
        </div>
      </section>

      <section className="promise-band" aria-label="What PSF will cover">
        <div>
          <h2>Comps</h2>
          <p>State titles, local comps, youth events, and finals worth watching.</p>
        </div>
        <div>
          <h2>Gyms</h2>
          <p>Resets, social nights, clinics, and the useful updates people miss.</p>
        </div>
        <div>
          <h2>Perks</h2>
          <p>Giveaways, partner offers, and early access for the first subscribers.</p>
        </div>
      </section>
    </main>
  );
}
