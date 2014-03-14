#The Lone Range

Takes a range input and converts it to a radio button group.

This was created because I needed something to work nicely in browsers that don't support the range input type - and remained usable and keyboard accessible.

Most slider replacements I've tried didn't work well or didn't work well on keyboard. The default fallback of a range input is a standard text input. This is not useful.


##How's it work?

Do this:

Call it to run on an element which contains range inputs. In this case, the markup is something like:

```html
<div class="range-slider">
    <input type="range" step="1" min="0" max="3" value="0" id="inputId">
    <label for="inputId"></label>
</div>
```

Call the plugin to run on the container element, with optional settings:

```javascript
$('.range-slider').range({
    lowValueLabel: 'Not at all', //forms part of an overall label for the radio group
    highValueLabel: 'Very much', //as above
    labelClass: 'radioLabel'     //class applied to the label element for each individual radio button
});
```

##Requirements

* This runs a Modernizr inputtypes test to see if the browser running supports range inputs, make sure you load this before TheLoneRange!
* jQuery. Obviously.
