# [DEMO](http://typeturajs.bitballoon.com/)

This is a tool to make fluidly responsive typography easy with support for font size, line height, and variable fonts.

# How to use:

* Add letterset.js to the end of your `<body>`.
* Start styling with CSS.

### Custom properties

This is powered by CSS custom properties and thus the syntax is different from that in normal CSS. You change the font size with the property `--font-size` and values are structured in an array with `value / breakpoint`. The value can be anything but it needs to be consistent throguhout the array and the breakpoint is in unitless pixel numbers. Note the breakpoints are based on the container width not the viewport width like regular media queries.

```css
h1 {
  --font-size:
    2em / 520,
    6em / 1200
  ;
}
```

I also reccomend you add a fallback. This will overwrite your fallback values across breakpoints so feel free to use media queries as well.

```css
h1 {
  --font-size:
    2em / 520,
    6em / 1200
  ;
  font-size: 2em;
}
```

Variations are simplified down from their normal syntax to `--variation-` + the feature code. Currently typetura supports the `ital`, `opsz`, `slnt`, `wdth`, `wght`, `grad`, and `xhgt` axes.

```css
h1 {
  --variation-wght:
    2 / 500,
    .2 / 1000
  ;
}
```

If you want to add more variation settings you can just add more variation settings

```css
h1 {
  --variation-wght:
    2 / 500,
    .2 / 1000
  ;
  --variation-wdth:
    1.2 / 500,
    .8 / 1000
  ;
}
```

### Modular scales

Modular scales can be calculated at runtime by using the `step` unit on your values.

```css
h1 {
  --font-size: 5step;
}
```

To configure your scale, you can add settings like so that will flow down the cascade.

```css
article {
  --ms-base: 1em;
  --ms-ratio:
    1.1 / 500,
    1.5 / 1000
  ;
}
```

### Customizing selectors and properties

There are three settings that configure where typetura.js looks for styled elements and properties that it will modify. The defaults are listed below:

```js
var lettersetEl = 'body';
```

_this is the selector for the parent element. Choosing the selector closest to the elements you are styling will yeild better performance._

```js
var typeturaSelect = [
  'article',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ol',
  'ul',
  'li',
  'blockquote'
];
```

_Selectors to style_

```js
var typeturaStyles = [
  'ms-base',
  'ms-ratio',
  'margin',
  'padding',
  'font-size',
  'line-height',
  'variation-ital',
  'variation-opsz',
  'variation-slnt',
  'variation-wdth',
  'variation-wght',
  'variation-grad',
  'variation-xhgt'
];
```

_Custom properties to loop through._