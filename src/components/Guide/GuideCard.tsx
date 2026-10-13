import { IconType } from 'react-icons';
import {
  PiArrowRight,
  PiBrowser,
  PiDatabase,
  PiGauge,
  PiPlugsConnected,
  PiUsersThree,
} from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { DevFlip } from '../../devmode/DevFlip';
import { categoryOf, GuideCategoryId, GuideMeta } from '../../guides';

export const categoryIcons: Record<GuideCategoryId, IconType> = {
  web: PiBrowser,
  apis: PiPlugsConnected,
  dados: PiDatabase,
  operacao: PiGauge,
  carreira: PiUsersThree,
};

export function GuideCard({ guide, as: Heading = 'h3' }: { guide: GuideMeta; as?: 'h2' | 'h3' }) {
  const Icon = categoryIcons[guide.category];
  return (
    <DevFlip id="guide-card" label={guide.title} data={guide}>
      <Link className="guide-tile" to={`/guide/${guide.id}`} data-category={guide.category}>
        <span className="guide-tile-top">
          <span className="guide-tile-icon" aria-hidden="true">
            <Icon />
          </span>
          <span className="guide-tile-meta">
            {categoryOf(guide).title} · {guide.minutes} min
          </span>
        </span>
        <Heading className="guide-tile-title">{guide.title}</Heading>
        <span className="guide-tile-summary">{guide.summary}</span>
        <span className="guide-tile-foot">
          {guide.level}
          <PiArrowRight aria-hidden="true" />
        </span>
      </Link>
    </DevFlip>
  );
}
