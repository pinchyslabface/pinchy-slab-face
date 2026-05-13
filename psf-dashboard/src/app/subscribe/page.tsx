const states = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const roles = [
  "Climber",
  "Competitor",
  "Parent",
  "Coach",
  "Setter",
  "Gym owner or staff",
  "Brand or sponsor",
  "Supporter",
];

export default function SubscribePage() {
  return (
    <main className="public-page form-page">
      <section className="signup-panel" aria-labelledby="subscribe-title">
        <div className="signup-intro">
          <p className="eyebrow">Pinchy Slab Face</p>
          <h1 id="subscribe-title">Get on the list</h1>
          <p className="lead">
            Tell us where you are and how you fit into the climbing scene so
            PSF can send more useful updates when it goes live.
          </p>
        </div>

        <form className="signup-form" action="/thank-you" method="get">
          <label>
            Name
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            State or territory
            <select name="state" required defaultValue="">
              <option value="" disabled>
                Select your state
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          <label>
            I am a
            <select name="role" required defaultValue="">
              <option value="" disabled>
                Select your role
              </option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>

          <button className="primary-cta" type="submit">
            Join the list
          </button>
        </form>
      </section>
    </main>
  );
}
