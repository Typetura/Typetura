# [DEMO](http://skscratch.bitballoon.com/)

THIS PROJECT IS NOT FINISHED YET AND IS SUBJECT TO CHANGE

This is a tool to make fluidly responsive typography easy with support for font size, line height, and variable fonts.

# How to use:

* Add letterset.js to the end of your `body` tag
* Add the id `letterset` to your article, or whatever you want to be the container of your text
* Start styling with CSS

### Custom properties

This is powered by CSS custom properties and thus the syntax is different from that in normal CSS. You change the font size with the property `--font-size` and values are structured in an array with `value » breakpoint`. The value can be anything but it needs to be consistent throguhout the array and the breakpoint is in unitless pixel numbers. Note the breakpoints are based on the container width not the viewport width like regular media queries.

```css
h1 {
  --font-size:
    2em » 520,
    6em » 1200
  ;
}
```

I also reccomend you add a fallback. This will overwrite your fallback values across breakpoints so feel free to use media queries as well.

```css
h1 {
  --font-size:
    2em » 520,
    6em » 1200
  ;
  font-size: 2em;
}
```

Variations are simplified down from their normal syntax to `--variation-` + the feature code.

```css
h1 {
  --variation-wght:
    2 » 500,
    .2 » 1000
  ;
}
```

If you want to add more variation settings you can just add more variation settings

```css
h1 {
  --variation-wght:
    2 » 500,
    .2 » 1000
  ;
  --variation-wdth:
    1.2 » 500,
    .8 » 1000
  ;
}
```
