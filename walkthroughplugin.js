function walkthrough(elements){
  var ToolTip = {
    "name" : "",
    "color" : "black",
    "bgcolor" : "white",
    "text" : "",
  };

  var elementArr = elements;
  var tooltipArray = [];

  elements.forEach(function(element) {
    ToolTip.name = element.id;
    ToolTip.text = element.text;
    tooltipArray.push(ToolTip);
  });

  function initHighlight(element) {
    var focus = document.getElementById(element.name);

    focus.style.transition = "all 1s linear";
    focus.style.position = 'relative';
    focus.style.zIndex = 9999;
    focus.style.boxShadow = '0 0 0 9999px rgba(0, 0, 0, 0.5)';

  }
  initHighlight(tooltipArray.shift());
  console.log(tooltipArray);
}
