# Plain JS walkthrough module

The purpose of this module is to provide an easy way for pages to highlight certain elements, appending a tooltip with additional information.

It was created for a technical ability assessment with LearnCore in Chicago.

### How to use

At the moment there is only one way to use the module, and that is to load the script into your site, then call the walkthrough function passing in an array of objects containing the ids of each element that you want to highlight as well as the text that you would like to display in the tooltip.

For instance, in your main app.js file you could put:

```javascript
  walkthrough([
              {id: 'newElement1', text: 'Awesome new element that does cool things!'},
              {id: 'newElement2', text: 'This element will blow you away!'}
            ]);
```

And the walkthrough module would step through each of the two new elements, fading out everything besides the element in question, then appending an information window containing your text and a next, previous, or finish button where applicable.

The module determines the best location for the information window based on element location and size.

Optionally, you can pass in additional key/value pairs in your objects of colorr, bgcolor, xpos, and ypos to manually set the style and location of the information windows.

### Pending changes

 * I would like to make the module more customizable for users by passing in additional arguments.
  - On the other hand, I could also make it so that the module runs without arguments but fetches all necessary information about an element through classes and data attributes.

 * I would like to get css animation transitions working for the information windows. Currently the module determines the "best" location for the infobox as well as the direction that it should fly in from off-screen. Currently this fly-in functionality is disabled/removed as it was not functioning properly.

 * Better default styling needs to be added.
