function bindDrawFunctions(idx) {

  var figure = find("figure")[idx];
  var cvs = document.createElement("canvas");
  cvs.width = 200;
  cvs.height = 200;
  var ctx = cvs.getContext("2d");
  figure.appendChild(cvs);
  var button = figure.querySelector("button");
  if(button) { figure.appendChild(button); }

  return {
    getCanvas: function() { return cvs; },

    reset: function() {
      cvs.width = cvs.width;
      ctx.strokeStyle = "black";
      ctx.fillStyle = "none";
    },

    setColor: function(c) {
      ctx.strokeStyle = c;
    },

    noColor: function(c) {
      ctx.strokeStyle = "transparent";
    },

    setRandomColor: function() {
      var r = ((255*Math.random())|0),
          g = ((255*Math.random())|0),
          b = ((255*Math.random())|0);
      ctx.strokeStyle = "rgb("+r+","+g+","+b+")";
    },

    setRandomFill: function(a) {
      a = (typeof a === "undefined") ? 1 : a;
      var r = ((255*Math.random())|0),
          g = ((255*Math.random())|0),
          b = ((255*Math.random())|0);
      ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
    },

    setFill: function(c) {
      ctx.fillStyle = c;
    },

    noFill: function() {
      ctx.fillStyle = "transparent";
    },

    drawSkeleton: function(curve, offset) {
      offset = offset || { x:0, y:0 };
      var pts = curve.points;
      ctx.strokeStyle = "lightgrey";
      this.drawLine(pts[0], pts[1], offset);
      if(pts.length === 3) { this.drawLine(pts[1], pts[2], offset); }
      else {this.drawLine(pts[2], pts[3], offset); }
      ctx.strokeStyle = "black";
      this.drawPoints(pts, offset);
    },

    drawCurve: function(curve, offset) {
      offset = offset || { x:0, y:0 };
      var ox = offset.x;
      var oy = offset.y;
      ctx.beginPath();
      var p = curve.points, i;
      ctx.moveTo(p[0].x + ox, p[0].y + oy);
      if(p.length === 3) {
        ctx.quadraticCurveTo(
          p[1].x + ox, p[1].y + oy,
          p[2].x + ox, p[2].y + oy
        );
      }
      if(p.length === 4) {
        ctx.bezierCurveTo(
          p[1].x + ox, p[1].y + oy,
          p[2].x + ox, p[2].y + oy,
          p[3].x + ox, p[3].y + oy
        );
      }
      ctx.stroke();
      ctx.closePath();
    },

    drawLine: function(p1, p2, offset) {
      offset = offset || { x:0, y:0 };
      var ox = offset.x;
      var oy = offset.y;
      ctx.beginPath();
      ctx.moveTo(p1.x + ox,p1.y + oy);
      ctx.lineTo(p2.x + ox,p2.y + oy);
      ctx.stroke();
    },

    drawPoint: function(p, offset) {
      offset = offset || { x:0, y:0 };
      var ox = offset.x;
      var oy = offset.y;
      ctx.beginPath();
      ctx.arc(p.x + ox, p.y + oy, 5, 0, 2*Math.PI);
      ctx.stroke();
    },

    drawPoints: function(points, offset) {
      offset = offset || { x:0, y:0 };
      points.forEach(function(p) {
        this.drawCircle(p, 3, offset);
      }.bind(this));
    },

    drawArc: function(p, offset) {
      offset = offset || { x:0, y:0 };
      var ox = offset.x;
      var oy = offset.y;
      ctx.beginPath();
      ctx.moveTo(p.x + ox, p.y + oy);
      ctx.arc(p.x + ox, p.y + oy, p.r, p.s, p.e);
      ctx.lineTo(p.x + ox, p.y + oy);
      ctx.fill();
      ctx.stroke();
    },

    drawCircle: function(p, r, offset) {
      offset = offset || { x:0, y:0 };
      var ox = offset.x;
      var oy = offset.y;
      ctx.beginPath();
      ctx.arc(p.x + ox, p.y + oy, r, 0, 2*Math.PI);
      ctx.stroke();
    },

    drawbbox: function(bbox, offset) {
      offset = offset || { x:0, y:0 };
      var ox = offset.x;
      var oy = offset.y;
      ctx.beginPath();
      ctx.moveTo(bbox.x.min + ox, bbox.y.min + oy);
      ctx.lineTo(bbox.x.min + ox, bbox.y.max + oy);
      ctx.lineTo(bbox.x.max + ox, bbox.y.max + oy);
      ctx.lineTo(bbox.x.max + ox, bbox.y.min + oy);
      ctx.closePath();
      ctx.stroke();
    },

    drawShape: function(shape, offset) {
      offset = offset || { x:0, y:0 };
      var order = shape.forward.points.length - 1;
      ctx.beginPath();
      ctx.moveTo(offset.x + shape.startcap.points[0].x, offset.y + shape.startcap.points[0].y);
      ctx.lineTo(offset.x + shape.startcap.points[3].x, offset.y + shape.startcap.points[3].y);
      if(order === 3) {
        ctx.bezierCurveTo(
          offset.x + shape.forward.points[1].x, offset.y + shape.forward.points[1].y,
          offset.x + shape.forward.points[2].x, offset.y + shape.forward.points[2].y,
          offset.x + shape.forward.points[3].x, offset.y + shape.forward.points[3].y
        );
      } else {
        ctx.quadraticCurveTo(
          offset.x + shape.forward.points[1].x, offset.y + shape.forward.points[1].y,
          offset.x + shape.forward.points[2].x, offset.y + shape.forward.points[2].y
        );
      }
      ctx.lineTo(offset.x + shape.endcap.points[3].x, offset.y + shape.endcap.points[3].y);
      if(order === 3) {
        ctx.bezierCurveTo(
          offset.x + shape.back.points[1].x, offset.y + shape.back.points[1].y,
          offset.x + shape.back.points[2].x, offset.y + shape.back.points[2].y,
          offset.x + shape.back.points[3].x, offset.y + shape.back.points[3].y
        );
      } else {
        ctx.quadraticCurveTo(
          offset.x + shape.back.points[1].x, offset.y + shape.back.points[1].y,
          offset.x + shape.back.points[2].x, offset.y + shape.back.points[2].y
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    },

    drawText: function(text, offset) {
      offset = offset || { x:0, y:0 };
      ctx.fillText(text, offset.x, offset.y);
    }
  };
} 