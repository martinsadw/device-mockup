// TODO(andre:2016-10-11): permitir passar tamanhos como porcentagem
// TODO(andre:2016-10-11): criar apenas uma tag style (?)
// TODO(andre:2016-10-11): usar 'bordas falsas' para permitir passar seu tamanho como porcentagem
// TODO(andre:2016-10-11): organizar funções 'parseInt' em apenas um lugar

function calcRatio(a, b)
{
   return (a / b * 100) + "%";
}

function createCSSRule(selector, content)
{
   var rule = selector + "{\n"
   for(var i = 0; i < content.length; ++i)
      rule += "\t" + content[i] + ";\n"
   rule += "}";

   var style = document.createElement("style");
   style.appendChild(document.createTextNode(rule));
   document.head.appendChild(style);
}

var devices = document.getElementsByTagName('DEVICE');
for(var i = 0; i < devices.length; ++i)
{
   var device = devices[i];

   var devId = device.id;

   var devWidth = device.getAttribute("dev-width");
   var devHeight = device.getAttribute("dev-height");
   var devColor = device.getAttribute("dev-color");
   var devBorder = device.getAttribute("dev-border").split(" ");
   var devBorderTop, devBorderRight, devBorderBottom, devBorderLeft;
   switch (devBorder.length) {
      case 1:
         devBorderTop = devBorderRight = devBorderBottom = devBorderLeft = devBorder[0];
         break;
      case 2:
         devBorderTop = devBorderBottom = devBorder[0];
         devBorderRight = devBorderLeft = devBorder[1];
         break;
      case 3:
         devBorderTop = devBorder[0];
         devBorderRight = devBorderLeft = devBorder[1];
         devBorderBottom = devBorder[2];
         break;
      case 4:
         devBorderTop = devBorder[0];
         devBorderRight = devBorder[1];
         devBorderBottom = devBorder[2];
         devBorderLeft = devBorder[3];
         break;
   }
   var devBorderRadius = device.getAttribute("dev-border-radius");

   var devTotalWidth = parseInt(devWidth) + parseInt(devBorderRight) + parseInt(devBorderLeft);
   var devTotalHeight = parseInt(devHeight) + parseInt(devBorderTop) + parseInt(devBorderBottom);

   var devRatio = devTotalHeight / devTotalWidth;

   createCSSRule("#"+devId, [
      "margin: 16px",
      "position: relative",
      "display: " + "block",
      "width: " + devTotalWidth + "px",
      "background-color: " + devColor,
      "border-radius: " + calcRatio(devBorderRadius, devTotalWidth) + " / " + calcRatio(devBorderRadius, devTotalHeight)
   ]);

   createCSSRule("#"+devId+"::after", [
      "content: ''",
      "display: block",
      "width: 100%",
      "padding-top: " + (devRatio * 100) + "%"
   ]);

   var components = device.getElementsByTagName("DEV-COMPONENT")
   for(var j = 0; j < components.length; ++j)
   {
      component = components[j];

      var place = component.getAttribute("dev-place");
      var position = parseInt(component.getAttribute("dev-position")) || 0;
      var width = component.getAttribute("dev-width");
      var height = component.getAttribute("dev-height");
      var color = component.getAttribute("dev-color");
      var borderSize = component.getAttribute("dev-border-size") || 0;
      var borderColor = component.getAttribute("dev-border-color") || "#000";
      var borderRadius = component.getAttribute("dev-border-radius");

      var positionStyle;
      switch (place) {
         case "center":
            positionStyle = "top: " + calcRatio(devBorderTop, devTotalHeight) + "; right: " + calcRatio(devBorderRight, devTotalWidth) + "; bottom: " + calcRatio(devBorderBottom, devTotalHeight) + "; left: " + calcRatio(devBorderLeft, devTotalWidth);
            width = width || devWidth;
            height = height || devHeight;
            break;
         case "top":
            positionStyle = "top: " + calcRatio((devBorderTop - height)/2, devTotalHeight) + "; left: " + calcRatio((devWidth - width)/2 + parseInt(devBorderLeft) + position, devTotalWidth);
            break;
         case "right":
            positionStyle = "right: " + calcRatio((devBorderRight - width)/2, devTotalWidth) + "; top: " + calcRatio((devHeight - height)/2 + parseInt(devBorderTop) + position, devTotalHeight);
            break;
         case "bottom":
            positionStyle = "bottom: " + calcRatio((devBorderBottom - height)/2, devTotalHeight) + "; left: " + calcRatio((devWidth - width)/2 + parseInt(devBorderLeft) + position, devTotalWidth);
            break;
         case "left":
            positionStyle = "left: " + calcRatio((devBorderLeft - width)/2, devTotalWidth) + "; top: " + calcRatio((devHeight - height)/2 + parseInt(devBorderTop) + position, devTotalHeight);
            break;
         default:
            positionStyle = "margin: auto";
      }

      createCSSRule("#"+devId + " dev-component:nth-of-type("+(j+1)+")", [
         "position: absolute",
         positionStyle,
         "display: " + "block",
         "width: " + calcRatio(width, devTotalWidth),
         "height: " + calcRatio(height, devTotalHeight),
         "background-color: " + color,
         "border: " + borderSize + "px solid " + borderColor,
         "border-radius: " + calcRatio(borderRadius, width) + " / " + calcRatio(borderRadius, height)
      ]);
   }
}
