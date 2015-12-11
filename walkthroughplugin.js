function walkthrough(elements){

  var elObj = {};
  var highlightsArray = [];

  /*
    loops through the elements argument, extracting/setting the properties
    necessary for initializing our infobox later
  */
  elements.forEach(function(element) {
    elObj.name = element.id;
    elObj.text = element.text;

    // users can supply the following settings or use the default arrangements
    elObj.color = element.color || "#000";
    elObj.bgcolor = element.bgcolor || "#FFF";
    elObj.infoXPos = element.xpos || calcPosition(element).x;
    elObj.infoYpos = element.ypos || calcPosition(element).y;
    elObj.fromDirection = element.fromDirection || calcPosition(element).fromDirection;
    highlightsArray.push(elObj);
    console.log(elObj);
  });

  /*
    returns an object with the x & y coords for our infobox's origin, along with
    the direction from which the infobox should enter the screen based on location
    and size of the element being highlighted.
  */
  function calcPosition(element) {
    var focus = document.getElementById(element.id);
    var positionObj = {};

    var elementXPos = focus.offsetLeft;
    var elementYPos = focus.offsetLeft;
    var elementWidth = focus.offsetWidth;
    var elementHeight = focus.offsetHeight;
    var windowHorizontalMid = window.innerWidth / 2;
    var windowVerticalMid = window.innerHeight / 2;

    // determines if the element's origin is in the 2nd/3rd quadrants or 1st/4th
    var originLeftQuads = elementXPos < windowHorizontalMid ? true : false;
    // determines if the element's origin is in the 1st/2nd quadrants or 3rd/4th
    var originTopQuads = elementYPos < windowVerticalMid ? true : false;
    // determines if element is exclusive to the left quadrants (for entry on right)
    var exclusiveLeftQuad =  elementXPos + elementWidth < windowVerticalMid ? true : false;

    /*
      These conditionals use the quadrant information to assign x/y coordinates based
      on the element's location and size.

      They start with most specific case, element is in the left quads and only left
      which avoids having infoboxes enter from the right for centered elements
      where their origin is in the left quadrants.
    */
    if (originLeftQuads && exclusiveLeftQuad) {
      positionObj.x = elementXPos + elementWidth;
      positionObj.y = elementYPos + elementHeight;
      positionObj.fromDirection = "right";
    } else if (!originLeftQuads) {
      positionObj.x = elementXPos;
      positionObj.y = elementYPos + elementHeight;
      positionObj.fromDirection = "left";
    } else if (originTopQuads) {
      positionObj.x = elementXPos + elementWidth/2;
      positionObj.y = elementYPos + elementHeight;
      positionObj.fromDirection = "bottom";
    } else if (!originTopQuads) {
      positionObj.x = elementXPos + elementWidth/2;
      positionObj.y = elementYPos;
      positionObj.fromDirection = "top";
    }

  return positionObj;

  }

  // wrapper function for toggling the highlighting styles and class
  function toggleHighlight(element) {
    var focus = document.getElementById(element.name);

    styleElement(focus);
    initInfoBox(element);

    // applies the styles needed to fade out everything except the element specified
    function styleElement(focus) {
      focus.style.transition = "all 0.5s linear";
      focus.style.position = 'relative';
      focus.style.zIndex = 9999;
      focus.style.boxShadow = '0 0 0 9999px rgba(0, 0, 0, 0.5)';
    }
  }

  // creates the infobox HTML element that will be placed over the page
  function initInfoBox(element) {

    function createInfoBox(element, focus) {
      var infoBoxHTML = '<div class="info-box ' + element.id + '"style="';
      infoBoxHTML += 'color:' + element.color + ';';
      infoBoxHTML += 'background-color:' + element.bgcolor + ';';
      infoBoxHTML += 'position: absolute;';
      infoBoxHTML += 'left:' ;
    }
  }

  initHighlight(highlightsArray.shift());
}
