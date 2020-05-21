import React from 'react';
import renderer from 'react-test-renderer';

import Typetura from '../';

jest.mock('typeturajs');

describe('PrimaryHeadline', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.PrimaryHeadline>PrimaryHeadline</Typetura.PrimaryHeadline>);

    expect(tree).toMatchSnapshot();
  });
});
describe('PrimarySubheadline', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.PrimarySubheadline>PrimarySubheadline</Typetura.PrimarySubheadline>);

    expect(tree).toMatchSnapshot();
  });
});
describe('SectionHeadline', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.SectionHeadline>SectionHeadline</Typetura.SectionHeadline>);

    expect(tree).toMatchSnapshot();
  });
});
describe('SectionSubheadline', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.SectionSubheadline>SectionSubheadline</Typetura.SectionSubheadline>);

    expect(tree).toMatchSnapshot();
  });
});
describe('Meta', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.Meta>Meta</Typetura.Meta>);

    expect(tree).toMatchSnapshot();
  });
});
describe('SectionLabel', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.SectionLabel>SectionLabel</Typetura.SectionLabel>);

    expect(tree).toMatchSnapshot();
  });
});
describe('Big', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.Big>Big</Typetura.Big>);

    expect(tree).toMatchSnapshot();
  });
});
describe('Small', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.Small>Small</Typetura.Small>);

    expect(tree).toMatchSnapshot();
  });
});
describe('Caption', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.Caption>Caption</Typetura.Caption>);

    expect(tree).toMatchSnapshot();
  });
});
describe('Blockquote', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.Blockquote>Blockquote</Typetura.Blockquote>);

    expect(tree).toMatchSnapshot();
  });
});
describe('Pullquote', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.Pullquote>Pullquote</Typetura.Pullquote>);

    expect(tree).toMatchSnapshot();
  });
});
describe('Context', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Typetura.Context>Context</Typetura.Context>);

    expect(tree).toMatchSnapshot();
  });
});
