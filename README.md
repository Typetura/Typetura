# Typetura.css

Typetura is a CSS library that allows you to create dynamic responsive type systems with ease. [Far more powerful and dynamic than `calc()` and `clamp()`](#the-software), you can interpolate things like color and weight, scale text with an easing curve, and have more control over where design changes happen. The intuitive syntax allows you to specify specific points where a design change starts and ends as well as giving you the flexability to use the CSS values you prefer in your designs.

v4 has numerous changes, including removal of all JavaScript, a new license (MIT), and a few changes to the API.

# [Documentation](https://docs.typetura.com)

## What is Typetura?

Is it [software](#the-software)? Is it a company? Yes.

We started this project when running into limitations with `clamp()` in an effort to make designing editorial websites easier. This core of an approach to typography led to the creation of the company [Typetura](https://typetura.com) where we develop typographic tools and create beautiful websites for people.

### The software

Typetura is an approach to responsive typography that binds CSS keyframes to widths. This has numerous distinct advantages over previous responsive typography techniques.

1. **Interpolation on a curve:** `clamp()` and `calc()` only interpolate values linearly. While text might scale, the nuances of how it scales can’t be well controlled. Interpolating on a curve is particularly valuable when scaling text on your document’s root, allowing it to get quite small for tiny screens like watches, then scaling it up quickly to a more reasonable size on other screens. Headlines tend to look better on and ease-in-out or ease-in curve, where the hirarchy can get more pronounced as screen realestate becomes avalible.
2. **Defining start and end positions:** Online calculators for `clamp()` are so useful because authoring a function that matches your design’s breakpoints can be tedious. With Typetura.css, you can set values for `--from` and `--to` directly in your CSS for these positions. This also avoids issues of breakpoint drift that `clamp()` expereances if a user changes their preferred font size in their browser.
3. **Interpolate anything:** Interpolate color, font weight, unitless line height, and anything else. Use the units and CSS variables you already have in your design system. Unlike `calc()` and `clamp()`, you can interpolate anything.
4. **Familiar syntax:** Typetura uses CSS keyframe animations. If you have ever written a CSS animation, you will feel right at home using Typetura. No math or complex functions, it just works.

## Installation

Add [typetura.css](https://raw.githubusercontent.com/Typetura/Typetura/v4/typetura.css) to your project. Copy and paste it into your CSS file or link to it in your HTML.

## Using Typetura

With Typetura you need to do three things: Identify the container, bind typetura’s styles, and style elements.

### Identifying the container

By default, the container is the viewport. Similar to viewport units, Typetura looks at the width of the viewport to determine what styles to use. You can define your own container by using the utlity class `class="cq"` or by adding `container-type: inline-size;` to any element in your CSS. If you’re fimiliar with container queries, you’ve already got the hang of it.

```html
<div class="cq">
  <h1>Hello, world!</h1>
</div>
```

### Binding Typetura’s Styles

Typetura’s styles are bound to your elements by using the `tt` class.

```html
<div class="cq">
  <h1 class="tt">Hello, world!</h1>
</div>
```

### Styling Elements
Creating keyframes is where you’ll be spending most of your time. These are regular CSS keyframes that you might have used before, but they define how your styles change as the container gets bigger.

```html
<div class="cq">
  <h1 class="tt">Hello, world!</h1>
</div>
```

```css
h1 {
  animation-name: hello-world;
}
@keyframes hello-world {
  from {
    font-size: 1rem;
  }
  to {
    font-size: 4rem;
  }
}
```

## Advanced use of Typetura

Now that you’re up and running you may want to dive a little deeper in to what Typetura can do.

### Identifying the Containers

These are generic [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) and can be defined using `container-type: inline-size;` in your CSS.

```css
.container {
  container-type: inline-size;
}
```

### Binding Typetura’s Styles

We’ve covered the `.tt` class, but you can also add `.rtt` to target the viewport, or root, instead of the container. Additionally `html` has typetura styles bound to it by default.

You can add and change the selector list by modifying [lines 23-26 in the typetura.css](https://github.com/Typetura/Typetura/blob/c7c51a1cadb47ed170f08d52b26f4b5d33f6ff86/typetura.css#L23-L26) file.

### Styling Elements

You’ve created CSS keyframes for your project already, but you might want to adjust the upper and lower limit for where those styles are applied, or adjust the easing function.

Additionally you can use any interpolable CSS property in your keyframes, not just `font-size`.

```css
html {
  --from: 0;
  --to: 40em;
  font-family: sans-serif;
  animation-name: html;
  animation-timing-function: cubic-bezier(0,0.7,0.3,1);
}
@keyframes html {
  0% {
    font-size: 0%; /* To avoid text clipping on absurdly small screens */
  }
  100% {
    font-size: 115%;
  }
}

.heading {
  --from: 320px; /* Accepts any <length> unit */
  --to: 60rem; /* Accepts any <length> unit */
  animation-name: heading;
  animation-timing-function: ease-in-out; /* Accepts any <timing-function> */
}
@keyframes heading {
  from {
    font-size: 100%;
    line-height: 1.2;
    color: black;
  }
  to {
    font-size: 4rem;
    line-height: 1.1;
    color: hotpink;
  }
}
```

## Aknowledgements

Typetura is created and developed by [Scott Kellum](https://scottkellum.com) and Typetura LLC.

Special things to [Ana Monroe](https://anamonroe.com) for all the support and guidance, Gabrielle Kellner for helping communicate the vision, [Jane Ori](https://propjockey.io/) for cracking the `calc()` division problem, and [Roman Komarov](https://kizu.dev/) and [Miriam Suzanne](https://miriamsuzanne.com/) for their trailblazing on the bleeding edge of CSS.

## Patents

Use of this software does not grant licence to any patents held by Typetura LLC. For more information, please contact [Typetura LLC](https://typetura.com) at [info@typetura.com](mailto:info@typetura.com). These patents describe the distribution of typographc systems at scale as well as how design software might be used to create and manage dynamic typographic systems. These patents protect our business usecases for this software and are not intended to restrict the use of the software itself on projects you own, operate, control, or are a part of.

As an example, if `fonts.bigcompany.com` is interested in distributing typographic systems with their fonts, they would need to license the patents. If `Big Design Software` decided to create an interface keyframing out text scaling in their app, they would need to license the patents. If `yourcompany.com` is using Typetura to manage their own typographic system, they would not need to license the patents.

## License (MIT)

Copyright © 2024 [Typetura LLC](https://typetura.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
