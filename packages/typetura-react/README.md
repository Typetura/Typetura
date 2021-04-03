<img width="914" alt="Typetura + React" src="https://user-images.githubusercontent.com/377189/77721747-f3946900-6fa8-11ea-9abe-e48d4b921379.png">

<p>
  <a href="https://www.npmjs.com/package/@typetura/react" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@typetura/react.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D8-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D5-blue.svg" />
</p>

[![Edit /@typetura/react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/typeturareact-example-uc8lb?fontsize=14&hidenavigation=1&theme=dark)

Typetura is a different way to typeset your website. It allows you to create headlines, pull quotes, labels, and other text elements that respond to the container they are in, as opposed to the viewport. This means you can use the same headline style everywhere, from your sidebar to your page heading without, no breakpoints or layout specific styling. When used effectively, this can reduce your typographic styles by up to 90% and save 20% of your time as you will write far fewer typographic styles. Typetura also supports variable font adjustments, easing curves, is progressively enhanced, and is styled with CSS to offer the most feature rich and easy to use experience possible. We also offer [pre-typeset packages](https://typetura.com/typography-packages) and [assistance integrating Typetura into your projects](https://typetura.com/typography-services).

# Installation

```
npm install --save @typetura/react
```

# Configuration

Where you initialize your app, add the following configuration:

```javascript
initializeTypetura({
  withPackage: {
    apiKey: '<YOUR_TYPETURA_DOT_COM_API_KEY>',
    name: 'bullseye',
  },
  selectors: [':root', '.typetura', 'main', 'article', 'section', 'aside'], // default: ['.typetura],
});
```

If you have a [Typetura account](https://typetura.com/auth/create-account), configure what package you wish to use in `withPackage`. You can browse packages at [Typetura.com](https://typetura.com/typography-packages). If you do not wish to use a package and want to write custom styles for your typography, then simply leave this setting off.

Contexts create areas of the page that Typetura styling will respond to. For example, if you want headlines to respond to the context of a side bar, add the selector you are using for that side bar here. There are other ways to create these contexts as well that we will go over in [Usage](#usage).

## Using a Typetura package

If you are using a [Typetura package](https://typetura.com/typography-packages), the styles are pre determined on the following components:

```jsx
const ReactExample = () => {
  return (
    <Typetura.Big>Big</Typetura.Big>
    <Typetura.Blockquote>Blockquote</Typetura.Blockquote>
    <Typetura.Caption>Caption</Typetura.Caption>
    <Typetura.Meta>Meta</Typetura.Meta>
    <Typetura.PrimaryHeadline>PrimaryHeadline</Typetura.PrimaryHeadline>
    <Typetura.PrimarySubheadline>PrimarySubheadline</Typetura.PrimarySubheadline>
    <Typetura.Pullquote>Pullquote</Typetura.Pullquote>
    <Typetura.SectionHeadline>SectionHeadline</Typetura.SectionHeadline>
    <Typetura.SectionLabel>SectionLabel</Typetura.SectionLabel>
    <Typetura.SectionSubheadline>SectionSubheadline</Typetura.SectionSubheadline>
    <Typetura.Small>Small</Typetura.Small>
  );
}
```

These components allow you to quickly build typographically rich pages that work in any layout without the need for additional styling. The components themselves also create new contexts for themselves, meaning you can spend less time managing these contexts.

# 📝 License

Copyright © 2018–2020 [Typetura LLC](https://typetura.com/). All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to use, copy, publish, and/or distribute copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

- The above copyright notice, license, and this permission notice shall be included in all copies or portions of the Software.
- Modification of the code, such as changing function names, variable names, and/or removing portions of code, is prohibited.

Commercial licenses that allow modification, custom integrations, enhanced features, and/or support are available by contacting [info@typetura.com](mailto:info@typetura.com).

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
