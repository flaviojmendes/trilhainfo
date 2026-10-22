import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { ReactNode } from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export { applySocialMeta, pageForPath, siteUrl, socialPages } from '../src/seo/pages';
export type { BlogPost, SocialPage } from '../src/seo/pages';
import { cardSize, PreviewCard } from '../src/seo/pages';

function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(' ', max - 1)).replace(/[,.;:]$/, '')}…`;
}

type Style = Record<string, string | number>;
interface Node {
  type: string;
  props: { style?: Style; children?: Array<Node | string> | Node | string; [key: string]: unknown };
}

const el = (
  type: string,
  style: Style,
  children?: Node['props']['children'],
  extra = {},
): Node => ({
  type,
  props: { style, children, ...extra },
});

let assets: { fonts: Parameters<typeof satori>[1]['fonts']; logo: string } | undefined;

function loadAssets(root: string) {
  if (assets) return assets;
  const font = (pkg: string, file: string) =>
    readFileSync(resolve(root, `node_modules/@fontsource/${pkg}/files/${file}`));
  const logo = readFileSync(resolve(root, 'public/logo.svg'), 'utf8').replace(
    /width="1920" height="1080" viewBox="0 0 1920 1080"/,
    'width="1680" height="280" viewBox="120 400 1680 280"',
  );
  assets = {
    fonts: [
      {
        name: 'Display',
        data: font('bricolage-grotesque', 'bricolage-grotesque-latin-800-normal.woff'),
        weight: 800,
      },
      {
        name: 'Text',
        data: font('hanken-grotesk', 'hanken-grotesk-latin-400-normal.woff'),
        weight: 400,
      },
      {
        name: 'Text',
        data: font('hanken-grotesk', 'hanken-grotesk-latin-600-normal.woff'),
        weight: 600,
      },
    ],
    logo: `data:image/svg+xml;base64,${Buffer.from(logo).toString('base64')}`,
  };
  return assets;
}

function titleSize(title: string): number {
  if (title.length <= 16) return 104;
  if (title.length <= 28) return 84;
  if (title.length <= 44) return 68;
  return 58;
}

export async function renderCard(card: PreviewCard, root: string): Promise<Buffer> {
  const { fonts, logo } = loadAssets(root);
  const tree = el(
    'div',
    {
      width: cardSize.width,
      height: cardSize.height,
      display: 'flex',
      backgroundColor: '#101218',
      backgroundImage:
        'radial-gradient(circle at 8% 0%, rgba(242, 61, 127, 0.42), rgba(16, 18, 24, 0) 58%), radial-gradient(circle at 100% 100%, rgba(110, 231, 200, 0.16), rgba(16, 18, 24, 0) 46%)',
      color: '#f2f4f8',
      fontFamily: 'Text',
    },
    [
      el(
        'div',
        {
          position: 'absolute',
          top: 60,
          left: 76,
          right: 76,
          bottom: 72,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        cardContent(card, logo),
      ),
      el('div', {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 12,
        backgroundImage: 'linear-gradient(90deg, #F23D7F, #ff8ab5 55%, #6EE7C8)',
      }),
    ],
  );
  const svg = await satori(tree as unknown as ReactNode, { ...cardSize, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: cardSize.width } }).render().asPng();
}

function cardContent(card: PreviewCard, logo: string): Node[] {
  return [
    el('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, [
      el('img', { width: 282, height: 47 }, undefined, { src: logo, width: 282, height: 47 }),
      el('div', { fontSize: 26, fontWeight: 600, color: '#a6b0c3' }, 'trilha.info'),
    ]),
    el('div', { display: 'flex', flexDirection: 'column' }, [
      el(
        'div',
        { display: 'flex', alignItems: 'center', fontSize: 28, fontWeight: 600, color: '#ff8ab5' },
        [
          el('div', {
            width: 14,
            height: 14,
            marginRight: 14,
            borderRadius: 7,
            backgroundColor: '#F23D7F',
          }),
          card.kicker,
        ],
      ),
      el(
        'div',
        {
          marginTop: 22,
          maxWidth: 1040,
          fontFamily: 'Display',
          fontWeight: 800,
          fontSize: titleSize(card.title),
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
        },
        card.title,
      ),
      el(
        'div',
        { marginTop: 26, maxWidth: 980, fontSize: 30, lineHeight: 1.42, color: '#dce2ee' },
        clip(card.summary, 150),
      ),
    ]),
    el(
      'div',
      { display: 'flex', alignItems: 'center' },
      card.facts.map((fact, index) =>
        el(
          'div',
          {
            display: 'flex',
            marginLeft: index ? 14 : 0,
            padding: '10px 24px',
            borderRadius: 999,
            border: '2px solid rgba(255, 255, 255, 0.16)',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            fontSize: 25,
            fontWeight: 600,
            color: '#ece4e9',
          },
          fact,
        ),
      ),
    ),
  ];
}
