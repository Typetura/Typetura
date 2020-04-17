import PrimaryHeadline from './PrimaryHeadline';
import PrimarySubheadline from './PrimarySubheadline';
import SectionHeadline from './SectionHeadline';
import SectionSubheadline from './SectionSubheadline';
import Meta from './Meta';
import SectionLabel from './SectionLabel';
import Big from './Big';
import Small from './Small';
import Caption from './Caption';
import Blockquote from './Blockquote';
import Pullquote from './Pullquote';
import Context from './Context';
import { typeturaInit } from 'typeturajs';

export const initializeTypetura = (options = {}) => {
  const { withPackage, baseSize, contexts } = options;

  window.contexts = contexts;

  typeturaInit(baseSize);

  if (!withPackage && !withPackage.apiKey && !withPackage.name) {
    return;
  }

  var link = document.createElement('link');

  link.href = `https://cdn.typetura.com/${withPackage.name}/typetura.css?apiKey=${withPackage.apiKey}`;
  link.rel = 'stylesheet';
  link.type = 'text/css';

  document.head.appendChild(link);
};

export default {
  PrimaryHeadline,
  PrimarySubheadline,
  SectionHeadline,
  SectionSubheadline,
  Meta,
  SectionLabel,
  Big,
  Small,
  Caption,
  Blockquote,
  Pullquote,
  Context,
};
