# Using typetura

Typetura is a tool to make fluid typography easy. Here is a [demo of typetura in action](http://typetura-js.netlify.com). It enables you to control the font size, line height, margins, padding, variable font settings, and anything that can be animated. The difference is that the keyframes are applied across screen sizes as opposed to time.

# Installing typetura on your website

```bash
npm install --save typeturajs
```

## Via script tag

```html
<script src="https://cdn.jsdelivr.net/gh/scottkellum/typetura.js@master/js/typetura.min.js"></script>
```

## commonJS

```javascript
import 'typeturajs';
```

## Start styling with CSS! :tada:

### Starting with the basics

At its core, Typetura works with [CSS keyframe animations](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) and ties those animations to the width of the page or [an element](#Work-off-the-width-of-an-element-and-more) instead of a timeline. Let’s create keyframes for our `<h1>`.

```css
@keyframes h1 {
  0%,
  20% {
    font-size: 1.2rem;
  }
  100% {
    font-size: 4rem;
  }
}
```

Now that you have your keyframes set up, let’s tell typetura to use those keyframes to scale the text.

```css
h1 {
  --tt-key: h1;
}
```

Awesome! You should be seeing typetura working. But you might be thinking the effect is happening over too wide a range. By default, the keyframes map to a viewport range of `0px` to `1600px` wide. Change the max to `960px` adding `--tt-max: 960;` either locally on the `h1` or globally on the `body`.

So far, your CSS should look something like this:

```css
@keyframes h1 {
  0% {
    font-size: 1.2rem;
  }
  100% {
    font-size: 4rem;
  }
}
h1 {
  --tt-key: h1;
  --tt-max: 960;
}
```

Anything that can be animated can be used in these keyframes like color, transforms, size, margins, padding, variable font properties, etc. The sky is the limit.

### Work off the width of an element and more

By default typetura queries the width of the viewport. You can select any other element by adding the class `typetura` to that element. With this class, all child elements will respond to that parent context.

### Custom easing

Easing works in typetura just like it does with any other animations. However you may want the easing functions you set to inherit and the default timing functions don’t. You can set your timing functions in typetura with `--tt-ease` and that timing function will be inherited by any element underneath it.

### Index

<table>
  <tr>
    <th>Property
    <th>Accepted values
    <th>Inherits
    <th>Default value
<tr>
  <td><code>--tt-key</code>
  <td><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name">The keyframes name (string)</a>
  <td>no
  <td><code>none</code>
<tr>
  <td><code>--tt-max</code>
  <td>Value at witch the animation ends (number)
  <td>yes
  <td><code>1600</code>
<tr>
  <td><code>--tt-ease</code>
  <td><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function">Animation easing function</a>
  <td>yes
  <td><code>linear</code>
<tr>
  <td><code>--tt-bind</code>
  <td>Position of the animation between <code>0s</code> and <code>-1s</code>
  <td>yes
  <td>Auto-generated
</table>

### Browser support

Typetura.js works in Firefox (Gecko), Chrome (Blink), and Safari\* (Webkit). It can be treated as progressive enhancement in all other browsers.

<table>
  <tr>
    <th style="width: 25%">✅ Firefox</th>
    <th style="width: 25%">✅ Chrome</th>
    <th style="width: 25%">✅ Edge</th>
    <th style="width: 25%">✅ Safari/Webkit</th>
  </tr>
<tr>
  <td style="vertical-align: top;">Fully supported</td>
  <td style="vertical-align: top;">Fully supported</td>
  <td style="vertical-align: top;"><p>Supported</p><p>💁‍Edge 44 and below will render elements one time, when they are styled in the DOM. Chromium builds of Edge allow for fluid browser resizing.</p></td>
  <td style="vertical-align: top;"><p>Supported</p><p>💁‍<a href="https://bugs.webkit.org/show_bug.cgi?id=194749"><code>em</code> units compound incorrectly</a>. Use <code>rem</code> instead.</p></td>
  </tr>
</table>

### License

Copyright © 2018–2019 [Typetura LLC](https://typetura.com/). All rights reserved. Commercial licences that allow modification, custom integrations, enhanced features, and/or support are avalible by contacting [info@typetura.com](mailto:info@typetura.com).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to use, copy, publish, and/or distribute copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

- The above copyright notice, license, and this permission notice shall be included in all copies or portions of the Software.
- Modification of the code, such as changing function names, variable names, and/or removing portions of the code, is prohibited.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
