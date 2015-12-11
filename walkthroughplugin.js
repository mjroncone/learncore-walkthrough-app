function walkthrough(elements){
  var InfoBox = {
    name : "",
    color : "black",
    bgcolor : "white",
    text : "",
  };

  var infoBoxArray = [];

  elements.forEach(function(element) {
    InfoBox.name = element.id;
    InfoBox.text = element.text;
    infoBoxArray.push(InfoBox);
  });

  function initHighlight(element) {
    var focus = document.getElementById(element.name);

    focus.style.transition = "all 0.5s linear";
    focus.style.position = 'relative';
    focus.style.zIndex = 9999;
    focus.style.boxShadow = '0 0 0 9999px rgba(0, 0, 0, 0.5)';

    initInfoBox(element, focus);
  }

  function initInfoBox(element, focus) {
    var positionLeft = focus.offsetLeft;
    var positionTop = focus.offsetLeft;
    var elementWidth = focus.offsetWidth;
    var elementHeight = focus.offsetHeight;
    var windowHorizontalMid = window.innerWidth / 2;
    var windowVerticalMid = window.innerHeight / 2;

    function calcPosition(originX, originY, width, height) {
      var positionObj = {};
      var originLeftQuads = originX < windowHorizontalMid ? true : false;
      var originTopQuads = originY < windowVerticalMid ? true : false;
      var exclusiveLeftQuad =  originX + width < windowVerticalMid ? true : false;

      if (originLeftQuads && exclusiveLeftQuad) {
        positionObj.x = originX + width;
        positionObj.y = originY + height/2;
        positionObj.fromDirection = "right";
      } else if (!originLeftQuads) {
        positionObj.x = originX;
        positionObj.y = originY + height/2;
        positionObj.fromDirection = "left";
      } else if (originTopQuads) {
        positionObj.x = originX + width/2;
        positionObj.y = originY + height;
        positionObj.fromDirection = "bottom";
      } else if (!originTopQuads) {
        positionObj.x = originX + width/2;
        positionObj.y = originY;
        positionObj.fromDirection = "top";
      }

    return positionObj;

    }


  }

  initHighlight(infoBoxArray.shift());
}
