import { Level, LinkType, LinkContentType } from '../entity/RoadmapModel';
import { controleDeVersao } from './items/controleDeVersao';
import { css } from './items/css';
import { html } from './items/html';
import { http } from './items/http';
import { javascript } from './items/javascript';
import { python } from './items/python';
import { go } from './items/go';
import { rust } from './items/rust';
import { ruby } from './items/ruby';
import { db } from './items/db';
import { SO } from './items/SO';
import { cloudComputing } from './items/cloudComputing';
import { containers } from './items/containers';
import { packageManager } from './items/packageManager';
import { frameworksCSS } from './items/frameworksCSS';
import { frontendFramework } from './items/frontendFramework';
import { backendLanguages } from './items/backendLanguages';
import { apis } from './items/apis';
import { security } from './items/security';
import { monitoring } from './items/monitoring';
import { cicd } from './items/cicd';
import { configManagement } from './items/configManagement';
import { infrastructureProvisioning } from './items/infrastructureProvisioning';
export const data: Level[] = [
  {
    label: 'Conhecimento básico sobre internet',
    description:
      'Para ser uma pessoa desenvolvedora backend ou frontend, independente da tecnologia que você ira utilizar, é importante saber os conceitos básicos sobre a internet.',
    items: [http],
  },
  {
    label: 'Conhecimento básico de Frontend',
    description: '',
    items: [html, css, javascript],
  },
  packageManager,
  { items: [controleDeVersao] },
  frameworksCSS,
  frontendFramework,
  backendLanguages,
  db,
  apis,
  security,
  { items: [SO] },
  { items: [cloudComputing] },
  monitoring,
  cicd,
  { items: [configManagement] },
  { items: [infrastructureProvisioning] },
];
