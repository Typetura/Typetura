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

Awesome! You should be seeing typetura working. But you might be thinking the effect is happening over too wide a range. By default, the keyframes map to a viewport range of `0px` to `1600px` wide. Change the max to `960px` adding `--tt-max:960;` either locally on the `h1` or globally on the `body`.

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

At this point you may be noticing the fluid transition cuts off at that `960px` width we set earlier. This is because the animation has stopped and the normal `h1` value is currently being used. Move the value(s) from the `100%` keyframe to your `h1`. Just like with regular CSS animations, the animation transitions into the values defined on the element so we can safely delete that keyframe and below is our final CSS for our `h1`.

```css
@keyframes h1 {
  0% {
    font-size: 1.2rem;
  }
}
h1 {
  font-size: 4rem;
  --tt-key: h1;
  --tt-max: 960;
}
```

Anything that can be animated can be used in these keyframes like color, transforms, size, margins, padding, variable font properties, etc. The sky is the limit.

### Work off the width of an element and more

By default typetura queries the width of the `body` element but you can select any other element, like an `article` element. To do this, add `id="typetura"` to the element you wish to use as the width reference. This will be applied to typetura globally.

If you wish to have typetura respond to individual element widths, similar to element queries, you can add the class `typetura` to those elements.

Typetura can also work with any unit-less number you feed it. You can bind it to scroll depth, cursor position, device orientation, or ambient light. To do this, pass the values through the CSS property `--tt-bind`. This value inherits so you can set it on the `body` if you want it to be applied everywhere or on a specific element. [Momentum](https://github.com/scottkellum/momentum) is a library that exposes a number of these events for you to use. If you were using [Momentum](https://github.com/scottkellum/momentum) with typetura you could write `body {--tt-bind: var(--scrolly);}` to bind typetura to scroll instead of viewport width.

### Custom easing

Easing works in typetura just like it does with any other animations. However you may want the easing functions you set to inherit and the default timing functions don’t. You can set your timing functions in typetura with `--tt-ease` and that timing function will be inherited by any element underneath it.

### Browser support

Typetura.js works in Firefox (Gecko), Chrome (Blink), and Safari* (Webkit). It can be treated as progressive enhancement in all other browsers. Microsoft Edge is transitioning to Blink/Chromium soon and Typetura will be supported in all major browsers.

[*`em` and `ex` units are calculated improperly in Safari.](https://bugs.webkit.org/show_bug.cgi?id=194749)

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
  <td>Position of the animation between <code>0</code> and <code>--tt-max</code> (number)
  <td>yes
  <td><code>--tt-width</code>
</table>

### License

Copyright © 2018–2019 [Typetura LLC](https://typetura.com/). All rights reserved. Commercial licences are available that allow modification, custom integrations, enhanced features, and/or support by contacting [info@typetura.com](mailto:info@typetura.com).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to use, copy, publish, and/or distribute copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

- The above copyright notice and this permission notice shall be included in all copies or portions of the Software.
- Modification of the code, such as changing function names, variable names, and/or removing portions of the code, is prohibited.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
