# [DEMO](http://typeturajs.bitballoon.com/)

This is a tool to make fluidly responsive typography easy.

# How to use:

* Link letterset.js in your `<head>`.
* Start styling with CSS.

### Starting with the basics

At its core, Typetura works with [CSS keyframe animations](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) and ties those animations to the width of the page or [an element](#Work-off-the-width-of-an-element-and-more) instead of a timeline. Let’s create keyframes for our `<h1>`.

```css
@keyframes h1 {
  0%,20% {
    font-size: 1.2em;
  }
  100% {
    font-size: 4em;
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

So far, your CSS should look somthing like this:

```css
h1 {
  --tt-key: h1;
  --tt-max:960;
}

@keyframes h1 {
  0% {
    font-size: 1.2em;
  }
  100% {
    font-size: 4em;
  }
}
```

At this point you may be noticing the fluid transition cuts off at that `960px` width we set earlier. This is because the animation has stopped and the normal `h1` value is currently being used. Move the value(s) from the `100%` keyframe to your `h1`. Just like with regular CSS animations, the animation transitions into the values defined on the element so we can safely delete that keyframe and below is our vinal CSS for our `h1`.

```css
h1 {
  font-size: 4em;
  --tt-key: h1;
  --tt-max:960;
}

@keyframes h1 {
  0% {
    font-size: 1.2em;
  }
}
```

Anything that can be animated can be used in these keyframes like color, transforms, size, margins, padding, variable font properties, etc. The sky is the limit.

### Work off the width of an element and more