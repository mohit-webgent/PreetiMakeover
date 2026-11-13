import React from 'react';
import { brandCategories } from '../../data/brandsData';

/** The professional brands used in the studio, grouped by treatment. Plain, scannable text. */
export default function BrandsShowcase({ content = {} }) {
  const title = content?.title && !/^\{.*\}$/.test(content.title) ? content.title : 'Professional products we use';
  const groups = brandCategories.filter((c) => !/bridal/i.test(c.shortName));

  return (
    <div>
      <h3 className="text-h3">{title}</h3>
      <dl className="mt-5 grid gap-5 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.shortName} className="rounded-card bg-rose-light px-5 py-4">
            <dt className="text-small font-semibold text-gold-deep">{group.shortName}</dt>
            <dd className="mt-1 text-ink">{group.brands.map((b) => b.name.replace(/ Professional$/, '')).join(', ')}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
