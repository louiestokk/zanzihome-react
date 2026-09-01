import React from "react";
import Link from "next/link";

const CoccoLagoonPromo = () => (
  <section className="cocco-lagoon-promo" aria-labelledby="cocco-lagoon-promo-title">
    <div className="cocco-lagoon-promo-image-wrap">
      <img
        src="https://i.ibb.co/9HnnF8H8/Masterplan.png"
        alt="Masterplan for Cocco Lagoon Resort and Spa on Pemba Island"
        className="cocco-lagoon-promo-image"
      />
      <span className="cocco-lagoon-promo-location">Pemba Island, Zanzibar</span>
    </div>

    <div className="cocco-lagoon-promo-content">
      <p className="cocco-lagoon-promo-eyebrow">Featured resort investment</p>
      <h2 id="cocco-lagoon-promo-title">Cocco Lagoon Resort &amp; Spa</h2>
      <p className="cocco-lagoon-promo-lead">
        Own a residence in a luxury 5-star condo resort on Pemba Island, with full title deed ownership and professional rental management.
      </p>

      <dl className="cocco-lagoon-promo-facts">
        <div>
          <dt>From</dt>
          <dd>$125,999</dd>
        </div>
        <div>
          <dt>Rental potential</dt>
          <dd>Est. 18% annual return</dd>
        </div>
        <div>
          <dt>Opening</dt>
          <dd>Q4 2026</dd>
        </div>
      </dl>

      <div className="cocco-lagoon-promo-actions">
        <Link href="/partners/coccolagoon" className="cocco-lagoon-promo-primary">
          Explore the resort
        </Link>
        <Link href="/partners/coccolagoon#properties" className="cocco-lagoon-promo-secondary">
          View available residences
        </Link>
      </div>
    </div>
  </section>
);

export default CoccoLagoonPromo;