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
    elObj.infoYPos = element.ypos || calcPosition(element).y;
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
    createInfoBox(element);

    function createInfoBox(element) {
      var infoBoxDiv = document.createElement('div');

      infoBoxDiv.className = element.name + ' infobox';

      infoBoxDiv.style.color = element.color;
      infoBoxDiv.style.backgroundColor = element.bgcolor;
      infoBoxDiv.style.position = 'absolute';
      infoBoxDiv.style.left = element.infoXPos + 'px';
      infoBoxDiv.style.top = element.infoYPos + 'px';
      infoBoxDiv.style.zIndex = 9999;

      infoBoxDiv.innerHTML = '<p>' + element.text + '</p>';

      appendInfoBox(infoBoxDiv);
    }

    function appendInfoBox(infoBoxDiv) {
      document.getElementsByTagName('body')[0].appendChild(infoBoxDiv);
    }
  }

  toggleHighlight(highlightsArray.shift());
}
