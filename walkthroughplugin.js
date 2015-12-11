function walkthrough(elements){

  /*
    arrays will contain ElementObjects, with highlightsArray being a todo list of sorts,
    and highlightedArray a "done" list, so we can navigate back to them;
  */
  var ElementObject = function() {};
  var highlightsArray = [];
  var highlightedArray = [];

  /*
    loops through the elements argument, extracting/setting the properties
    necessary for initializing our infobox later
  */
  elements.forEach(function(element) {
    var newElement = new ElementObject();
    newElement.name = element.id;
    newElement.text = element.text;

    // users can supply the following settings or use the default arrangements
    newElement.color = element.color || "#000";
    newElement.bgcolor = element.bgcolor || "#FFF";
    newElement.infoXPos = element.xpos || calcPosition(element).x;
    newElement.infoYPos = element.ypos || calcPosition(element).y;
    newElement.fromDirection = element.fromDirection || calcPosition(element).fromDirection;
    highlightsArray.push(newElement);
  });

  /*
    returns an object with the x & y coords for our infobox's origin, along with
    the direction from which the infobox should enter the screen based on location
    and size of the element being highlighted.
  */
  function calcPosition(element) {
    var focus = document.getElementById(element.id);
    var positionObj = {};

    var elementPos = focus.getBoundingClientRect();
    var windowHorizontalMid = window.innerWidth / 2;
    var windowVerticalMid = window.innerHeight / 2;

    // determines if the element's origin is in the 2nd/3rd quadrants or 1st/4th
    var originLeftQuads = elementPos.left < windowHorizontalMid ? true : false;
    // determines if the element's origin is in the 1st/2nd quadrants or 3rd/4th
    var originTopQuads = elementPos.top < windowVerticalMid ? true : false;
    // determines if element is exclusive to the left quadrants (for entry on right)
    var exclusiveLeftQuad =  elementPos.right < windowHorizontalMid ? true : false;

    /*
      These conditionals use the quadrant information to assign x/y coordinates based
      on the element's location and size.

      They start with most specific case, element is in the left quads and only left
      which avoids having infoboxes enter from the right for centered elements
      where their origin is in the left quadrants.
    */
    // TODO: fix horizontal centering of box from top/bottom
    if (originLeftQuads && exclusiveLeftQuad) {
      positionObj.x = elementPos.right;
      positionObj.y = elementPos.top;
      positionObj.fromDirection = "right";
    } else if (!originLeftQuads) {
      positionObj.x = elementPos.left;
      positionObj.y = elementPos.top;
      positionObj.fromDirection = "left";
    } else if (originTopQuads) {
      positionObj.x = elementPos.left + elementPos.width/2;
      positionObj.y = elementPos.bottom;
      positionObj.fromDirection = "bottom";
    } else if (!originTopQuads) {
      positionObj.x = elementPos.left + elementPos.width/2;
      positionObj.y = elementPos.top;
      positionObj.fromDirection = "top";
    }

  return positionObj;

  }

  // wrapper function for toggling the highlighting styles and class
  function toggleHighlight(element) {
    var focus = document.getElementById(element.name);
    var isHighlighted = focus.className.indexOf('highlighted') >= 0;

    if (isHighlighted) {
      removeInfoBox(element);
      toggleElementStyles(focus);
      focus.className = focus.className.replace(' highlighted', '');
    } else {
      toggleElementStyles(focus);
      focus.className += ' highlighted';
      initInfoBox(element);
    }

    // applies the styles needed to fade out everything except the element specified
    function toggleElementStyles(focus) {
      focus.style.transition = "all 0.5s linear";
      focus.style.position = isHighlighted ? '' : 'relative';
      focus.style.zIndex = isHighlighted ? '' : 9999;
      focus.style.boxShadow = isHighlighted ? '' : '0 0 0 9999px rgba(0, 0, 0, 0.5)';
    }
  }

  // creates the infobox HTML element that will be placed over the page
  function initInfoBox(element) {
    createInfoBox(element);

    function createInfoBox(element) {
      var infoBoxDiv = document.createElement('div');

      infoBoxDiv.id = element.name + '-info';

      infoBoxDiv.style.color = element.color;
      infoBoxDiv.style.backgroundColor = element.bgcolor;
      infoBoxDiv.style.position = 'absolute';
      infoBoxDiv.style.left = element.infoXPos + 'px';
      infoBoxDiv.style.top = element.infoYPos + 'px';
      infoBoxDiv.style.zIndex = 9999;
      infoBoxDiv.style.margin = '15px';
      infoBoxDiv.style.padding = '15px';
      infoBoxDiv.style.minWidth = "25%";
      infoBoxDiv.style.maxWidth = "50%";

      var infoBoxHTML = '';
        infoBoxHTML = '<div><p>' + element.text + '</p></div><div>';

      if (highlightedArray.length > 0) {
        infoBoxHTML += '<button id="previous" class="previous-btn" style="float:left;">Previous</button>';
      }
      if (highlightsArray.length <= 1) {
        infoBoxHTML += '<button id="finish" class="finish-btn">Finished</button>';
      } else {
        infoBoxHTML += '<button id="next" class="next-btn" style="float:right;">Next</button>';
      }

      infoBoxDiv.innerHTML = infoBoxHTML;

      appendInfoBox(infoBoxDiv);
    }

    function appendInfoBox(infoBoxDiv) {
      document.getElementsByTagName('body')[0].appendChild(infoBoxDiv);

      if (document.getElementById('previous')) {
        document.getElementById('previous').addEventListener('click', changeHighlight);
      }
      if (document.getElementById('next')) {
        document.getElementById('next').addEventListener('click', changeHighlight);
      }
      if (document.getElementById('finish')) {
        document.getElementById('finish').addEventListener('click', changeHighlight);
      }
    }
  }

  function removeInfoBox(element) {
    var infoBoxDiv = document.getElementById(element.name + '-info');
    infoBoxDiv.parentElement.removeChild(infoBoxDiv);
  }

  function changeHighlight(message) {
    var input = message;
    var id = input.srcElement ? input.srcElement.id : input;
    var current = highlightsArray[0];
    var next = highlightsArray[1];
    var previous = highlightedArray[0];

    // turns on the highlight in the initial run, but turns off in all other cases.
    toggleHighlight(current);

    switch (id) {

      case ('next'):
        // move the currently displayed box from the todo to done arrays;
        highlightedArray.unshift(highlightsArray.shift());

        // turn on the next box
        toggleHighlight(next);
        break;

      case ('previous'):
        highlightsArray.unshift(highlightedArray.shift());

        toggleHighlight(previous);
        break;
    }
  }

  changeHighlight('start');
}

walkthrough([{id: 'css', text:'Im some text'}, {id: 'html', text:'Im some html'}, {id : 'javascript', text: 'im some javascript'}]);
