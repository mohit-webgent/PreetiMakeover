import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import ArchFrame from '../common/Arch';
import Photo from '../common/Photo';
import { WhatsAppIcon } from '../common/icons';
import { useBusiness } from '../../context/SiteDataContext';

/** CMS values may still contain an unfilled "{placeholder}" from early seeds; ignore those. */
const pick = (value, fallback) => (value && !/^\{.*\}$/.test(String(value).trim()) ? value : fallback);
const delay = (ms) => ({ animationDelay: `${ms}ms` });

export default function Hero({ content = {}, stats = [] }) {
  const biz = useBusiness();

  const line1 = pick(content.headingLine1, 'Bridal makeup & beauty care');
  const line2 = pick(content.headingLine2, 'in Badarpur');
  const description = pick(
    content.description,
    `HD bridal looks, hair treatments and facials by ${biz.ownerName}, with genuine sealed products and freshly sanitised tools for every client.`
  );
  const photo = pick(content.modelImage, '/hero-bridal.jpg');
  const caption = pick(content.badgeService, 'HD bridal makeover');
  const btnBook = pick(content.btnAppointment, 'Book a visit');

  const rating = stats.find((s) => /rating/i.test(s.label));
  const brides = stats.find((s) => /bride/i.test(s.label));

  return (
    <section className="overflow-hidden">
      <div className="container-x grid grid-cols-1 items-center gap-10 pb-14 pt-6 sm:pt-10 lg:grid-cols-12 lg:gap-16 lg:pb-20 lg:pt-14">
        {/* Photo first on phones: the bridal look is the most persuasive thing we have */}
        <figure className="flex flex-col items-center lg:order-last lg:col-span-5">
          <ArchFrame className="enter-photo aspect-[4/5] w-[min(100%,37vh,24rem)] sm:w-[min(100%,26rem)] lg:w-[min(100%,30rem)]">
            <Photo
              src={photo}
              alt={`${caption} by ${biz.businessName}`}
              priority
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 416px, 80vw"
              width="480"
              height="600"
              className="h-full w-full object-cover object-top"
            />
          </ArchFrame>
          <figcaption className="enter mt-5 text-small text-ink-soft" style={delay(500)}>
            {caption} by {biz.ownerName}
          </figcaption>
        </figure>

        <div className="lg:col-span-7">
          <p lang="hi" className="enter font-display text-xl text-gold-deep sm:text-2xl" style={delay(80)}>
            आपकी सुंदरता, हमारी ज़िम्मेदारी
          </p>
          <h1 className="enter mt-3 text-h1" style={delay(160)}>
            {line1} {line2}
          </h1>
          <p className="enter lead mt-5" style={delay(260)}>{description}</p>

          <div className="enter mt-8 flex flex-col gap-3 sm:flex-row" style={delay(340)}>
            <Link to="/contact" className="btn-primary">{btnBook}</Link>
            <a
              href={biz.wa('Hello Preeti Makeover! I would like to book an appointment.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <WhatsAppIcon className="h-5 w-5 text-wa" /> Chat on WhatsApp
            </a>
          </div>

          {(rating || brides) && (
            <ul className="enter mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-small text-ink-soft" style={delay(420)}>
              {rating && (
                <li className="flex items-center gap-2">
                  <span className="stars" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </span>
                  <span><strong className="font-semibold text-ink">{rating.number.replace('★', '')}</strong> {rating.label.toLowerCase()}</span>
                </li>
              )}
              {brides && (
                <li>
                  <strong className="font-semibold text-ink">{brides.number}</strong> {brides.label.toLowerCase()}
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
