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
    apiKey: "<YOUR_TYPETURA_DOT_COM_API_KEY>",
    name: "bullseye"
  },
  contexts: [
    ":root",
    ".typetura",
    "main",
    "article",
    "section",
    "aside"
  ]
});
```

If you have a [Typetura account](https://typetura.com/auth/create-account), configure what package you wish to use in `withPackage`. You can browse packages at [Typetura.com](https://typetura.com/typography-packages). If you do not wish to use a package and want to write custom styles for your typography, then simply leave this setting off.

Contexts create areas of the page that Typetura styling will respond to. For example, if you want headlines to respond to the context of a side bar, add the selector you are using for that side bar here. There are other ways to create these contexts as well that we will go over in [Usage](#usage).

# Usage

To get Typetura to work effectively, we need to do two things; [defining contexts](#defining-contexts) and [authoring styles](#authoring-styles) for your typographic components. Combined, these components will respond to your contexts and you will have a robust and responsive typographic system that will work regardless of the device or layout it’s used in.

## Defining contexts

By default, the viewport is a context. Additional contexts can be added to a page with the `<Typetura.Context>` component. Additionally, elements inside of a `<Typetura.Context>`, matching selectors defined in the `contexts` section of the configuration will become new contexts. We recommend you create a new context everywhere you have a new column of text.

## Authoring styles

Typetura styles are written using [CSS Keyframe animation syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) in your styles. So a good place to start is to define how the text might look at the smallest size possible and how it looks when the context is at its largest size. You can add any [animatable CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties) to these keyframes, and yes, this means you can manipulate variable fonts as well!.

```css
@keyframes typetura-headline {
  0% {
    font-size: 1rem;
    line-height: 1.15;
    font-weight: 700;
  }
  100% {
    font-size: 5rem;
    line-height: 1;
    font-weight: 300;
  }
}
```

Now, we need to attach these keyframes to the element we wish to style. For this we have a CSS custom property. Let’s also add some fallback styles just in case there is an issue with Typetura.

```css
.typetura-headline {
  --tt-key: typetura-headline;
  font-size: 1.6rem;
  line-height: 1.05;
  font-weight: 600;
}
```

Now, your headline will fluidly respond to layout changes. But you may not be satisfied with how it is changing in certain places. You can change the maximum width using `--tt-max` to a value that is the maximum width of your context. If your text column only gets as wide as 800px, set it to `--tt-max: 800;`. You may also want to adjust the rate at which your text scales. To do this use `--tt-ease`. These additional properties along with the keyframes will look like this:

```css
.typetura-headline {
  --tt-key: typetura-headline;
  --tt-max: 800;
  --tt-ease: ease-out;
  font-size: 1.6rem;
  line-height: 1.05;
  font-weight: 600;
}
@keyframes typetura-headline {
  0% {
    font-size: 1rem;
    line-height: 1.15;
    font-weight: 700;
  }
  100% {
    font-size: 5rem;
    line-height: 1;
    font-weight: 300;
  }
}
```

If you need help building stylesheets, you can use [app.typetura.com](https://app.typetura.com/).

[![Edit /@typetura/react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/typeturareact-example-r3t6u?fontsize=14&hidenavigation=1&theme=dark)

## Using a Typetura package

If you are using a [Typetura package](https://typetura.com/typography-packages), the styles are pre determined on the following components:

```jsx
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
```

These components allow you to quickly build typographically rich pages that work in any layout without the need for additional styling. The components themselves also create new contexts for themselves, meaning you can spend less time managing these contexts.

[![Edit /@typetura/react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/typeturareact-example-uc8lb?fontsize=14&hidenavigation=1&theme=dark)

# 📝 License

Copyright © 2018–2020 [Typetura LLC](https://typetura.com/). All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to use, copy, publish, and/or distribute copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

- The above copyright notice, license, and this permission notice shall be included in all copies or portions of the Software.
- Modification of the code, such as changing function names, variable names, and/or removing portions of code, is prohibited.

Commercial licenses that allow modification, custom integrations, enhanced features, and/or support are available by contacting [info@typetura.com](mailto:info@typetura.com).

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
