// TODO(andre:2016-10-11): permitir passar tamanhos como porcentagem
// TODO(andre:2016-10-11): criar apenas uma tag style (?)
// TODO(andre:2016-10-11): usar 'bordas falsas' para permitir passar seu tamanho como porcentagem
// TODO(andre:2016-10-11): organizar funções 'parseInt' em apenas um lugar

function getAttr(elem, value, def)
{
   return elem.hasAttribute(value) ? elem.getAttribute(value) : def;
}

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
   if(devId === "")
   {
      console.log("Device missing ID attribute");
      console.log(device);
      continue;
   }

   var devWidth = getAttr(device, "dev-width", 360);
   var devHeight = getAttr(device, "dev-height", 640);
   var devColor = getAttr(device, "dev-color", "#000");
   var devBorder = getAttr(device, "dev-border", "0").split(" ");
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
   var devBorderRadius = getAttr(device, "dev-border-radius", "0");

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

      var place = getAttr(component, "dev-place", "top");
      var position = parseInt(getAttr(component, "dev-position", "0"));
      var width = getAttr(component, "dev-width", "16");
      var height = getAttr(component, "dev-height", "16");
      var color = getAttr(component, "dev-color", "#777");
      var borderSize = getAttr(component, "dev-border-size", "0");
      var borderColor = getAttr(component, "dev-border-color", "#000");
      var borderRadius = getAttr(component, "dev-border-radius", "8");

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
