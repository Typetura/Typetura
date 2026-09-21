# Typetura.css

Typetura is a CSS library that allows you to create dynamic responsive type systems with ease. [Far more powerful and dynamic than `calc()` and `clamp()`](#the-software), you can interpolate things like color and weight, scale text with an easing curve, and have more control over where design changes happen. The intuitive syntax allows you to specify specific points where a design change starts and ends as well as giving you the flexibility to use the CSS values you prefer in your designs.

v4 has numerous changes, including removal of all JavaScript, a new license (MIT), and a few changes to the API.

# [Documentation](https://docs.typetura.com)

## What is Typetura?

Is it [software](#the-software)? Is it a company? Yes.

We started this project when running into limitations with `clamp()` in an effort to make designing editorial websites easier. This core of an approach to typography led to the creation of the company [Typetura](https://typetura.com) where we develop typographic tools and create beautiful websites for people.

### The software

Typetura is an approach to responsive typography that binds CSS keyframes to widths. This has numerous distinct advantages over previous responsive typography techniques.

1. **Interpolation on a curve:** `clamp()` and `calc()` only interpolate values linearly. While text might scale, the nuances of how it scales can’t be well controlled. Interpolating on a curve is particularly valuable when scaling text on your document’s root, allowing it to get quite small for tiny screens like watches, then scaling it up quickly to a more reasonable size on other screens. Headlines tend to look better on and ease-in-out or ease-in curve, where the hierarchy can get more pronounced as screen real estate becomes available.
2. **Defining start and end positions:** Online calculators for `clamp()` are so useful because authoring a function that matches your design’s breakpoints can be tedious. With Typetura.css, you can set values for `--from` and `--to` directly in your CSS for these positions. This also avoids issues of breakpoint drift that `clamp()` experiences if a user changes their preferred font size in their browser.
3. **Interpolate anything:** Interpolate color, font weight, unitless line height, and anything else. Use the units and CSS variables you already have in your design system. Unlike `calc()` and `clamp()`, you can interpolate anything.
4. **Familiar syntax:** Typetura uses CSS keyframe animations. If you have ever written a CSS animation, you will feel right at home using Typetura. No math or complex functions, it just works.

## Installation

Add [typetura.css](https://raw.githubusercontent.com/Typetura/Typetura/v4/typetura.css) to your project. Copy and paste it into your CSS file or link to it in your HTML.

## Using Typetura

With Typetura you need to do three things: Identify the container, bind typetura’s styles, and style elements.

### Identifying the container

By default, the container is the viewport. Similar to viewport units, Typetura looks at the width of the viewport to determine what styles to use. You can define your own container by using the utility class `class="cq"` or by adding `container-type: inline-size;` to any element in your CSS. If you’re familiar with container queries, you’ve already got the hang of it.

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

You can also invoke Typetura’s styles by adding the style `--tt: var(--on)` to any element in your CSS.

```css
h1 {
  --tt: var(--on);
}
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

## Acknowledgments

Typetura is created and developed by [Scott Kellum](https://scottkellum.com) and Typetura LLC.

Special things to [Ana Monroe](https://anamonroe.com) for all the support and guidance, Gabrielle Kellner for helping communicate the vision, [Jane Ori](https://propjockey.io/) for cracking the `calc()` division problem, and [Roman Komarov](https://kizu.dev/) and [Miriam Suzanne](https://miriamsuzanne.com/) for their trailblazing on the bleeding edge of CSS.

## Patents

Use of this software does not grant license to any patents held by Typetura LLC. For more information, please contact [Typetura LLC](https://typetura.com) at [info@typetura.com](mailto:info@typetura.com). These patents describe the distribution of typographic systems at scale as well as how design software might be used to create and manage dynamic typographic systems. These patents protect our business use-cases for this software and are not intended to restrict the use of the software itself on projects you own, operate, control, or are a part of.

As an example, if `fonts.bigcompany.com` is interested in distributing typographic systems with their fonts, they would need to license the patents. If `Big Design Software` decided to create an interface keyframing out text scaling in their app, they would need to license the patents. If `yourcompany.com` is using Typetura to manage their own typographic system, they would not need to license the patents.

## License (MIT)

Copyright © 2024 [Typetura LLC](https://typetura.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**


## 🌐 Web Resources & Aesthetic Symbols Index
- [GAMING WEAPONS](https://sanrio-style-symbols-24.pages.dev/gaming-weapons/)
- [SYM 26FA](https://pure-dot-symbols-31.pages.dev/symbol/sym-26fa/)
- [SYM 2615](https://chibi-emotion-faces-74.pages.dev/symbol/sym-2615/)
- [SYM 26B1](https://balletcore-bio-symbols-63.pages.dev/symbol/sym-26b1/)
- [SYM 2675](https://vintage-lace-text-53.pages.dev/symbol/sym-2675/)
- [BRACKETS](https://anime-sparkle-text-92.pages.dev/ru/brackets/)
- [SYM 1F643](https://vintage-bow-fonts-72.pages.dev/symbol/sym-1f643/)
- [SYM 26FC](https://vintage-runic-symbols-53.pages.dev/symbol/sym-26fc/)
- [TIKTOK CAPTIONS](https://gothic-bio-fonts-22.pages.dev/tiktok-captions/)
- [SYM 1F601](https://baroque-aesthetic-symbols-59.pages.dev/symbol/sym-1f601/)
- [SYM 2662](https://mecha-glitch-fonts-82.pages.dev/symbol/sym-2662/)
- [SYM 1D44A](https://kawaii-kaomoji-hub-70.pages.dev/symbol/sym-1d44a/)
- [AQUARIUS ZODIAC WATER BEARER](https://anime-sparkle-text-76.pages.dev/symbol/aquarius-zodiac-water-bearer/)
- [SYM 1F611](https://kawaii-kaomoji-hub-70.pages.dev/symbol/sym-1f611/)
- [SYM 1D435](https://minimal-star-symbols-31.pages.dev/symbol/sym-1d435/)
- [SYM 1F612](https://simple-line-fonts-11.pages.dev/symbol/sym-1f612/)
- [BLACK FOUR POINT STAR](https://kawaii-kaomoji-hub-12.pages.dev/symbol/black-four-point-star/)
- [TAURUS ZODIAC BULL](https://kawaii-kaomoji-hub-70.pages.dev/symbol/taurus-zodiac-bull/)
- [LEFT RIGHT EXCHANGE ARROWS](https://simple-line-fonts-11.pages.dev/symbol/left-right-exchange-arrows/)
- [SYM 1F628](https://subtle-sparkle-text-86.pages.dev/symbol/sym-1f628/)
- [SYM 1F974](https://angel-core-bios-50.pages.dev/symbol/sym-1f974/)
- [SYM 1D40E](https://synthwave-bio-maker-62.pages.dev/symbol/sym-1d40e/)
- [SYM 26EA](https://gothic-bio-fonts-87.pages.dev/symbol/sym-26ea/)
- [SYM 2626](https://anime-sparkle-text-76.pages.dev/symbol/sym-2626/)
- [SYM 267F](https://synth-crosshair-text-47.pages.dev/symbol/sym-267f/)
- [CLOUD WEATHER SYMBOL](https://kawaii-kaomoji-hub-70.pages.dev/symbol/cloud-weather-symbol/)
- [SYM 26BD](https://vintage-runes-text-35.pages.dev/symbol/sym-26bd/)
- [SYM 2682](https://anime-sparkle-text-92.pages.dev/symbol/sym-2682/)
- [SYM 1F498](https://angel-core-bios-50.pages.dev/symbol/sym-1f498/)
- [DISCORD STATUS](https://kawaii-kaomoji-hub-70.pages.dev/ru/discord-status/)
- [SYM 2672](https://clean-space-text-47.pages.dev/symbol/sym-2672/)
- [LEFT MATHEMATICAL WHITE SQUARE BRACKET](https://simple-line-fonts-11.pages.dev/symbol/left-mathematical-white-square-bracket/)
- [SYM 2748](https://minimal-star-symbols-95.pages.dev/symbol/sym-2748/)
- [LOVING HEART EYES KAOMOJI](https://delicate-pink-text-22.pages.dev/symbol/loving-heart-eyes-kaomoji/)
- [SYM 1F92E](https://moe-star-emoticons-13.pages.dev/symbol/sym-1f92e/)
- [SYM 1F92F](https://vintage-runes-text-35.pages.dev/symbol/sym-1f92f/)
- [SYM 274B](https://vintage-lace-text-53.pages.dev/symbol/sym-274b/)
- [SYM 26BE](https://simple-line-fonts-11.pages.dev/symbol/sym-26be/)
- [SYM 1D418](https://vintage-bow-fonts-72.pages.dev/symbol/sym-1d418/)
- [SYM 2745](https://vintage-runes-text-35.pages.dev/symbol/sym-2745/)
- [SWIMMING FISH LEFT](https://neon-matrix-fonts-47.pages.dev/symbol/swimming-fish-left/)
- [SYM 1D493](https://mystic-occult-fonts-26.pages.dev/symbol/sym-1d493/)
- [SYM 2629](https://tech-glitch-symbols-36.pages.dev/symbol/sym-2629/)
- [SYM 1D46B](https://gothic-bio-fonts-24.pages.dev/symbol/sym-1d46b/)
- [SYM 2678](https://vintage-runes-text-35.pages.dev/symbol/sym-2678/)
- [SYM 26B0](https://gothic-bio-fonts-24.pages.dev/symbol/sym-26b0/)
- [SKULL AND CROSSBONES](https://tech-glitch-symbols-36.pages.dev/symbol/skull-and-crossbones/)
- [RIGHT MATHEMATICAL WHITE SQUARE BRACKET](https://zen-unicode-text-24.pages.dev/symbol/right-mathematical-white-square-bracket/)
- [SYM 2746](https://tech-glitch-symbols-36.pages.dev/symbol/sym-2746/)
- [FLOWER GIRL SMILE KAOMOJI](https://anime-sparkle-text-76.pages.dev/symbol/flower-girl-smile-kaomoji/)
- [SYM 1D456](https://subtle-sparkle-text-86.pages.dev/symbol/sym-1d456/)
- [DOWNWARD DIAGONAL ARROW](https://kawaii-kaomoji-hub-70.pages.dev/symbol/downward-diagonal-arrow/)
- [CLOCKWISE OPEN CIRCLE ARROW](https://anime-sparkle-text-76.pages.dev/symbol/clockwise-open-circle-arrow/)
- [SYM 2636](https://simple-line-fonts-11.pages.dev/symbol/sym-2636/)
- [SYM 2656](https://alchemy-occult-symbols-55.pages.dev/symbol/sym-2656/)
- [SYM 1F49F](https://gothic-bio-fonts-24.pages.dev/symbol/sym-1f49f/)
- [SYM 26FA](https://clean-space-text-47.pages.dev/symbol/sym-26fa/)
- [CUTE BUNNY RABBIT FACE](https://subtle-sparkle-text-86.pages.dev/symbol/cute-bunny-rabbit-face/)
- [SYM 1D49D](https://neon-glitch-symbols-29.pages.dev/symbol/sym-1d49d/)
- [SYM 26B3](https://baroque-aesthetic-symbols-59.pages.dev/symbol/sym-26b3/)
- [SYM 1D4A5](https://mystic-occult-fonts-26.pages.dev/symbol/sym-1d4a5/)
- [SYM 1D445](https://cyber-clan-tags-24.pages.dev/symbol/sym-1d445/)
- [SYM 26A2](https://coquette-aesthetic-symbols-58.pages.dev/symbol/sym-26a2/)
- [SYM 1D450](https://gothic-bio-fonts-87.pages.dev/symbol/sym-1d450/)
- [WHITE HEART](https://moe-star-emoticons-13.pages.dev/symbol/white-heart/)
- [SYM 1D470](https://neon-matrix-fonts-47.pages.dev/symbol/sym-1d470/)
- [SYM 26FB](https://chibi-emoticon-vault-78.pages.dev/symbol/sym-26fb/)
- [SYM 26DE](https://simple-line-fonts-11.pages.dev/symbol/sym-26de/)
- [FREE FIRE CLAN EMPEROR CROWN](https://kawaii-kaomoji-hub-70.pages.dev/symbol/free-fire-clan-emperor-crown/)
- [SYM 26B4](https://gothic-bio-fonts-87.pages.dev/symbol/sym-26b4/)
- [LITTLE CAT PAWS KAOMOJI](https://kawaii-kaomoji-hub-70.pages.dev/symbol/little-cat-paws-kaomoji/)
- [OPEN CENTRE STAR](https://manga-bubble-symbols-94.pages.dev/symbol/open-centre-star/)
- [SYM 1F47A](https://coquette-aesthetic-symbols-88.pages.dev/symbol/sym-1f47a/)
- [SYM 1F49F](https://vintage-lace-text-53.pages.dev/symbol/sym-1f49f/)
- [SYM 1F922](https://kawaii-kaomoji-hub-70.pages.dev/symbol/sym-1f922/)
- [INSTAGRAM BIO](https://synthwave-bio-maker-62.pages.dev/instagram-bio/)
- [SYM 1F614](https://minimal-star-symbols-63.pages.dev/symbol/sym-1f614/)
- [SYM 1F617](https://anime-sparkle-text-76.pages.dev/symbol/sym-1f617/)
- [SYM 265B](https://cyber-clan-tags-24.pages.dev/symbol/sym-265b/)
- [SYM 1F49B](https://vintage-bow-fonts-72.pages.dev/symbol/sym-1f49b/)
- [SYM 2627](https://minimal-star-symbols-63.pages.dev/symbol/sym-2627/)
- [SYM 2643](https://angel-core-bios-50.pages.dev/symbol/sym-2643/)
- [SYM 2638](https://kawaii-kaomoji-hub-45.pages.dev/symbol/sym-2638/)
- [SYM 1F62F](https://zen-unicode-text-24.pages.dev/symbol/sym-1f62f/)
- [SYM 2663](https://simple-line-fonts-11.pages.dev/symbol/sym-2663/)
- [SYM 26E6](https://minimal-star-symbols-31.pages.dev/symbol/sym-26e6/)
- [SYM 1D491](https://neon-glitch-symbols-29.pages.dev/symbol/sym-1d491/)
- [PINWHEEL STAR](https://tech-glitch-symbols-36.pages.dev/symbol/pinwheel-star/)
- [AESTHETIC MINIMAL CLOUD](https://tech-glitch-symbols-36.pages.dev/symbol/aesthetic-minimal-cloud/)
- [SYM 2633](https://clean-space-text-47.pages.dev/symbol/sym-2633/)
- [MUSIC SHARP SIGN](https://minimal-star-symbols-63.pages.dev/symbol/music-sharp-sign/)
- [SYM 1D467](https://vintage-bow-fonts-72.pages.dev/symbol/sym-1d467/)
- [SYM 1D4A0](https://mystic-occult-fonts-26.pages.dev/symbol/sym-1d4a0/)
- [SYM 1F618](https://anime-sparkle-text-76.pages.dev/symbol/sym-1f618/)
- [SYM 2674](https://anime-sparkle-text-76.pages.dev/symbol/sym-2674/)
- [SYM 2722](https://tech-glitch-symbols-36.pages.dev/symbol/sym-2722/)
- [SYM 262E](https://tech-glitch-symbols-36.pages.dev/symbol/sym-262e/)
- [SYM 1F479](https://vintage-runic-symbols-53.pages.dev/symbol/sym-1f479/)
- [SYM 2614](https://neon-matrix-fonts-47.pages.dev/symbol/sym-2614/)
- [CUTE BUNNY RABBIT FACE](https://delicate-pink-text-22.pages.dev/symbol/cute-bunny-rabbit-face/)
- [SYM 1D47B](https://chibi-emoticon-vault-78.pages.dev/symbol/sym-1d47b/)
- [SYM 26C4](https://anime-sparkle-text-24.pages.dev/symbol/sym-26c4/)
- [CYBER PHANTOM GLYPH](https://moe-star-emoticons-13.pages.dev/symbol/cyber-phantom-glyph/)
- [GEORGIAN LOVE HEART](https://moe-star-emoticons-13.pages.dev/symbol/georgian-love-heart/)
- [SYM 1F63E](https://gothic-bio-fonts-84.pages.dev/symbol/sym-1f63e/)
- [SYM 1F92C](https://minimal-star-symbols-63.pages.dev/symbol/sym-1f92c/)
- [SWIMMING FISH RIGHT](https://pastel-kaomoji-vault-54.pages.dev/symbol/swimming-fish-right/)
- [BORDERS DIVIDERS](https://kawaii-kaomoji-hub-70.pages.dev/borders-dividers/)
- [SYM 2634](https://anime-sparkle-text-76.pages.dev/symbol/sym-2634/)
- [SYM 1F49F](https://kawaii-kaomoji-hub-97.pages.dev/symbol/sym-1f49f/)
- [SYM 26E3](https://vintage-bow-fonts-72.pages.dev/symbol/sym-26e3/)
- [OPEN CENTRE STAR](https://scholarly-unicode-vault-92.pages.dev/symbol/open-centre-star/)
- [SYM 1FAE3](https://gothic-bio-fonts-84.pages.dev/symbol/sym-1fae3/)
- [CANCER ZODIAC CRAB](https://chibi-emotion-faces-74.pages.dev/symbol/cancer-zodiac-crab/)
- [SINGLE EIGHTH MUSICAL NOTE](https://simple-line-fonts-11.pages.dev/symbol/single-eighth-musical-note/)
- [HIGH VOLTAGE LIGHTNING](https://synthwave-fancy-text-33.pages.dev/symbol/high-voltage-lightning/)
- [SYM 26EB](https://cyber-clan-tags-80.pages.dev/symbol/sym-26eb/)
- [SYM 1D46E](https://angel-core-bios-50.pages.dev/symbol/sym-1d46e/)
- [SYM 2675](https://cyber-clan-tags-24.pages.dev/symbol/sym-2675/)
- [SYM 1F925](https://anime-sparkle-text-92.pages.dev/symbol/sym-1f925/)
- [SYM 2627](https://delicate-pink-text-22.pages.dev/symbol/sym-2627/)
- [SYM 26E6](https://gothic-bio-fonts-87.pages.dev/symbol/sym-26e6/)
- [SYM 2656](https://vintage-runic-symbols-53.pages.dev/symbol/sym-2656/)
- [SYM 26C0](https://chibi-emoticon-vault-78.pages.dev/symbol/sym-26c0/)
- [SYM 26CD](https://neon-glitch-fonts-25.pages.dev/symbol/sym-26cd/)
- [LEFT WHITE CORNER BRACKET](https://chibi-emoticon-vault-78.pages.dev/symbol/left-white-corner-bracket/)
- [INSTAGRAM BIO](https://kawaii-kaomoji-hub-70.pages.dev/es/instagram-bio/)
- [SYM 1F611](https://manga-bubble-symbols-94.pages.dev/symbol/sym-1f611/)
- [SYM 2639](https://scholarly-unicode-vault-92.pages.dev/symbol/sym-2639/)
- [SYM 26BD](https://gothic-bio-fonts-24.pages.dev/symbol/sym-26bd/)
