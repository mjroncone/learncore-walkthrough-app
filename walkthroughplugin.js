function walkthrough(elements){
  var elObj = {};

  var highlightsArray = [];

  elements.forEach(function(element) {
    elObj.name = element.id;
    elObj.text = element.text;
    elObj.color = element.color || "#000";
    elObj.bgcolor = element.bgcolor || "#FFF";
    elObj.infoXPos = element.xpos || calcPosition(element).x;
    elObj.infoYpos = element.ypos || calcPosition(element).y;
    elObj.fromDirection = element.fromDirection || calcPosition(element).fromDirection;
    highlightsArray.push(elObj);
    console.log(elObj);
  });

  function calcPosition(element) {
    var focus = document.getElementById(element.id);

    var originX = focus.offsetLeft;
    var originY = focus.offsetLeft;
    var elWidth = focus.offsetWidth;
    var elHeight = focus.offsetHeight;
    var windowHorizontalMid = window.innerWidth / 2;
    var windowVerticalMid = window.innerHeight / 2;

    var positionObj = {};
    var originLeftQuads = originX < windowHorizontalMid ? true : false;
    var originTopQuads = originY < windowVerticalMid ? true : false;
    var exclusiveLeftQuad =  originX + elWidth < windowVerticalMid ? true : false;

    if (originLeftQuads && exclusiveLeftQuad) {
      positionObj.x = originX + elWidth;
      positionObj.y = originY + elHeight;
      positionObj.fromDirection = "right";
    } else if (!originLeftQuads) {
      positionObj.x = originX;
      positionObj.y = originY + elHeight;
      positionObj.fromDirection = "left";
    } else if (originTopQuads) {
      positionObj.x = originX + elWidth/2;
      positionObj.y = originY + elHeight;
      positionObj.fromDirection = "bottom";
    } else if (!originTopQuads) {
      positionObj.x = originX + elWidth/2;
      positionObj.y = originY;
      positionObj.fromDirection = "top";
    }

  return positionObj;

  }

  function initHighlight(element) {
    var focus = document.getElementById(element.name);

    focus.style.transition = "all 0.5s linear";
    focus.style.position = 'relative';
    focus.style.zIndex = 9999;
    focus.style.boxShadow = '0 0 0 9999px rgba(0, 0, 0, 0.5)';

    initInfoBox(focus);
  }

  function initInfoBox(element, focus) {

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
