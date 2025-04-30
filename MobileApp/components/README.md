# Basic Info

This folder contains various components you should try to use when designing your UI. They automatically get their styles from a ThemeProovider, and they should automatically update as soon as the styles are changed.

# Missing components?

These components are simplified versions of the actual react native components. If you need access to features that these simplified versions do not provide or you are just missing a component, you can either add the needed functionality to these components, or use them as a base to create a new component.

# How to use

Every component comes with a default style, however it still acceps a style parameter. You should use the default style for styling (color, font, font size), and you should mostly use the style parameter for layout.

## Text components

### Title
This component is for titles of pages or displaying significant information (e.g.: )

### H1 - H3
These server the same purpose as in HTML. They are for headings and labels.

### P
This component is also similar to its HTML counterpart. It is for displaying regular text.


## Interactive components

### TextBtn
This component is a button which has a piece of text inside it. The text should be put in between the tags (aka like in the Text component). 

This component also has the `onClick` property which expects a function as a value. This function is called when the button is pressed. You can also manually adjust the styling of the text through the `textStyle` property, which works just like the regular `style` property, but only affects the text inside the button. You can also use the `icon` and `iconSize` properties to add and adjust an icon.

### Toggle

This component is for adding toggles (boolean switches) to the screen. It optionally takes a `label` property which displays a text label next to the switch.

Accessing and manipulating the toggle's state is the same as with the regular Switch component: you provide the current state of the switch through `value`, and you provide a function through `onChange` which is called with the current value of the toggle when the toggle is toggled. This means that `onChange` can be directly provided with a setter created through the `useState` hook.