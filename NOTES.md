# Todo Reboot Notes

- ### Why separate JS from HTML?
I've just spent 20 minutes looking for the line of JavaScript
that `showModal()` was called, but could not find it anywhere
in the JavaScript files. I then remembered that I called
`hideModal()`, `showModal()`, and `closeTodo()` directly
in the Pug/HTML file. So, why separate JS from HTML? I think
this mishaps is a great example of why your JavaScript should
be in your JavaScript and nowhere else.

- ### swipe.js >> mobile-events.js