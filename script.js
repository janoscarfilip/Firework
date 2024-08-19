document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    center = { x: canvas.width / 2, y: canvas.height / 2 };
  }

  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();

  var listFire = [];
  var listFirework = [];
  var listText = [];
  var listSpecial = [];
  var listSpark = [];
  var lights = [];
  var fireNumber = 10;
  var center = { x: canvas.width / 2, y: canvas.height / 2 };
  var range = 100;
  var fired = 0;
  var onHold = 0;
  const speedFactor = 0.5; // Control the overall speed of fireworks

  var actions = [
    makeDoubleFullCircleFirework,
    makePlanetCircleFirework,
    makeFullCircleFirework,
    makeDoubleCircleFirework,
    makeHeartFirework,
    makeCircleFirework,
    makeRandomFirework,
  ];

  for (var i = 0; i < fireNumber; i++) {
    var fire = {
      x: (Math.random() * range) / 2 - range / 4 + center.x,
      y: Math.random() * range * 2.5 + canvas.height,
      size: Math.random() + 0.5,
      fill: "#ff3",
      vx: Math.random() - 0.5,
      vy: -(Math.random() + 4),
      ax: Math.random() * 0.06 - 0.03,
      delay: Math.round(Math.random() * range) + range * 4,
      hold: false,
      alpha: 1,
      far: Math.random() * range + (center.y - range),
    };
    fire.base = {
      x: fire.x,
      y: fire.y,
      vx: fire.vx,
      vy: fire.vy,
    };
    listFire.push(fire);
  }

  // Functions for fireworks, sparks, etc., go here...

  (function loop() {
    requestAnimationFrame(loop);
    update();
    draw();
  })();

  function update() {
    // Update logic for fire, fireworks, sparks, etc.
  }

  function draw() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    // Drawing logic for fire, fireworks, sparks, etc.
  }

  // All other necessary functions like makeCircleFirework, makeDoubleCircleFirework, etc.

  function randColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  function initSpark() {
    var x = Math.random() * range * 3 - range * 1.5 + center.x;
    var vx = Math.random() - 0.5;
    var vy = -(Math.random() + 4);
    var ax = Math.random() * 0.04 - 0.02;
    var far = Math.random() * range * 4 - range + center.y;
    var direct = ax * 10 * Math.PI;
    var max = fireNumber * 0.5;
    for (var i = 0; i < max; i++) {
      var special = {
        x: x,
        y: Math.random() * range * 0.25 + canvas.height,
        size: Math.random() + 2,
        fill: "#ff3",
        vx: vx,
        vy: vy,
        ax: ax,
        direct: direct,
        alpha: 1,
      };
      special.far = far - (special.y - canvas.height);
      listSpecial.push(special);
    }
  }

  // Other functions like makeDoubleCircleFirework, makeHeartFirework, etc., go here...

  function makeCircleFirework(fire) {
    var color = randColor();
    var velocity = Math.random() * 2 + 6;
    var max = fireNumber * 5;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.04,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 2,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    return color;
  }

  function makeDoubleCircleFirework(fire) {
    var color = randColor();
    var velocity = Math.random() * 2 + 8;
    var max = fireNumber * 3;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.04,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    color = randColor();
    velocity = Math.random() * 3 + 4;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.04,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    return color;
  }

  function makePlanetCircleFirework(fire) {
    var color = "#aa0609";
    var velocity = Math.random() * 2 + 4;
    var max = fireNumber * 2;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.04,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    max = fireNumber * 4;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity * Math.random(),
        vy: Math.sin(rad) * velocity * Math.random(),
        ay: 0.04,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    max = fireNumber * 3;
    color = "#ff9";
    var rotate = Math.random() * Math.PI * 2;
    var vx = velocity * (Math.random() + 2);
    var vy = velocity * 0.6;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      // calc x, y for ellipse
      var cx = Math.cos(rad) * vx + (Math.random() - 0.5) * 0.5;
      var cy = Math.sin(rad) * vy + (Math.random() - 0.5) * 0.5;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: cx * Math.cos(rotate) - cy * Math.sin(rotate), // rotate x ellipse
        vy: cx * Math.sin(rotate) + cy * Math.cos(rotate), // rotate y ellipse
        ay: 0.02,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    return "#aa0609";
  }

  function makeFullCircleFirework(fire) {
    var color = randColor();
    var velocity = Math.random() * 8 + 8;
    var max = fireNumber * 3;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.06,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    max = fireNumber * Math.round(Math.random() * 4 + 4);
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity * Math.random(),
        vy: Math.sin(rad) * velocity * Math.random(),
        ay: 0.06,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    return color;
  }

  function makeDoubleFullCircleFirework(fire) {
    var color = randColor();
    var velocity = Math.random() * 8 + 8;
    var max = fireNumber * 3;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.04,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    color = randColor();
    velocity = Math.random() * 3 + 4;
    max = fireNumber * 2;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.06,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    max = fireNumber * 4;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * velocity * Math.random(),
        vy: Math.sin(rad) * velocity * Math.random(),
        ay: 0.06,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    return color;
  }

  function makeHeartFirework(fire) {
    var color = randColor();
    var velocity = Math.random() * 3 + 3;
    var max = fireNumber * 5;
    var rotate = Math.random() * Math.PI * 2;
    for (var i = 0; i < max; i++) {
      var rad = (i * Math.PI * 2) / max + rotate;
      var v, p;
      if (rad - rotate < Math.PI * 0.5) {
        p = (rad - rotate) / (Math.PI * 0.5);
        v = velocity + velocity * p;
      } else if (rad - rotate > Math.PI * 0.5 && rad - rotate < Math.PI) {
        p = (rad - rotate - Math.PI * 0.5) / (Math.PI * 0.5);
        v = velocity * (2 - p);
      } else if (rad - rotate > Math.PI && rad - rotate < Math.PI * 1.5) {
        p = (rad - rotate - Math.PI) / (Math.PI * 0.5);
        v = velocity * (1 - p);
      } else if (rad - rotate > Math.PI * 1.5 && rad - rotate < Math.PI * 2) {
        p = (rad - rotate - Math.PI * 1.5) / (Math.PI * 0.5);
        v = velocity * p;
      } else {
        v = velocity;
      }
      v = v + (Math.random() - 0.5) * 0.25;
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.cos(rad) * v,
        vy: Math.sin(rad) * v,
        ay: 0.02,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    return color;
  }

  function makeRandomFirework(fire) {
    var color = randColor();
    for (var i = 0; i < fireNumber * 5; i++) {
      var firework = {
        x: fire.x,
        y: fire.y,
        size: Math.random() + 1.5,
        fill: color,
        vx: Math.random() * 15 - 7.5,
        vy: Math.random() * -15 + 5,
        ay: 0.05,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 2,
      };
      firework.base = {
        life: firework.life,
        size: firework.size,
      };
      listFirework.push(firework);
    }
    return color;
  }

  function makeSpark(special) {
    var color = special.fill;
    var velocity = Math.random() * 6 + 12;
    var max = fireNumber;
    for (var i = 0; i < max; i++) {
      var rad =
        Math.random() * Math.PI * 0.3 +
        Math.PI * 0.35 +
        Math.PI +
        special.direct;
      var spark = {
        x: special.x,
        y: special.y,
        size: Math.random() + 1,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.02,
        alpha: 1,
        rad: rad,
        direct: special.direct,
        chain: Math.round(Math.random() * 2) + 2,
        life: Math.round((Math.random() * range) / 2) + range / 2,
      };
      spark.base = {
        life: spark.life,
        velocity: velocity,
      };
      listSpark.push(spark);
    }
    return color;
  }

  function chainSpark(parentSpark) {
    var color = parentSpark.fill;
    if (parentSpark.chain > 0) {
      var velocity = parentSpark.base.velocity * 0.6;
      var max = Math.round(Math.random() * 5);
      for (var i = 0; i < max; i++) {
        var rad =
          Math.random() * Math.PI * 0.3 -
          Math.PI * 0.15 +
          parentSpark.rad +
          parentSpark.direct;
        var spark = {
          x: parentSpark.x,
          y: parentSpark.y,
          size: parentSpark.size * 0.6,
          fill: color,
          vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
          vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
          ay: 0.02,
          alpha: 1,
          rad: rad,
          direct: parentSpark.direct,
          chain: parentSpark.chain,
          life: parentSpark.base.life * 0.8,
        };
        spark.base = {
          life: spark.life,
          size: spark.size,
          velocity: velocity,
        };
        listSpark.push(spark);
      }
    }
    return color;
  }

  (function loop() {
    requestAnimationFrame(loop);
    update();
    draw();
  })();

  function update() {
    // update fire logic
    for (var i = 0; i < listFire.length; i++) {
      var fire = listFire[i];
      //
      if (fire.y <= fire.far) {
        // case add firework
        fired++;
        var color = actions[Math.floor(Math.random() * actions.length)](fire);
        // light
        lights.push({
          x: fire.x,
          y: fire.y,
          color: color,
          radius: range * 2,
        });
        // reset
        fire.y = fire.base.y;
        fire.x = fire.base.x;
        // special
        if (fired % 33 == 0) {
          initSpark();
        }
        fire.vx = fire.base.vx * speedFactor;
        fire.vy = fire.base.vy * speedFactor;
        fire.ax = (Math.random() * 0.06 - 0.03) * speedFactor;
      }
      //
      if (fire.hold && fire.delay <= 0) {
        onHold--;
        fire.hold = false;
        fire.delay = Math.round(Math.random() * range) + range * 4;
        fire.vx = fire.base.vx;
        fire.vy = fire.base.vy;
        fire.ax = Math.random() * 0.06 - 0.03;
        fire.alpha = 1;
      } else if (fire.hold && fire.delay > 0) {
        fire.delay--;
      } else {
        fire.x += fire.vx;
        fire.y += fire.vy;
        fire.vx += fire.ax;
        fire.alpha = (fire.y - fire.far) / fire.far;
      }
    }

    // update firework logic
    for (var i = listFirework.length - 1; i >= 0; i--) {
      var firework = listFirework[i];
      if (firework) {
        firework.vx *= 0.9;
        firework.vy *= 0.9;
        firework.x += firework.vx;
        firework.y += firework.vy;
        firework.vy += firework.ay;
        firework.alpha = firework.life / firework.base.life;
        firework.size = firework.alpha * firework.base.size;
        firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
        //
        firework.life--;
        if (firework.life <= 0) {
          listFirework.splice(i, 1);
        }
      }
    }

    // update text logic
    for (var i = listText.length - 1; i >= 0; i--) {
      var text = listText[i];
      text.vx *= 0.9;
      text.vy *= 0.9;
      text.direct *= 0.9;
      text.x += text.vx + text.direct;
      text.y += text.vy;
      text.vy += text.ay;
      text.alpha = text.life / text.base.life;
      text.size = text.alpha * text.base.size;
      text.alpha = text.alpha > 0.6 ? 1 : text.alpha;
      //
      text.life--;
      if (text.life <= 0) {
        listText.splice(i, 1);
      }
    }

    // update special logic
    for (var i = listSpecial.length - 1; i >= 0; i--) {
      var special = listSpecial[i];
      if (special.y <= special.far) {
        // light
        lights.push({
          x: special.x,
          y: special.y,
          color: special.fill,
          alpha: 0.02,
          radius: range * 2,
        });
        //
        makeSpark(special);
        // remove from list
        listSpecial.splice(i, 1);
      } else {
        special.x += special.vx;
        special.y += special.vy;
        special.vx += special.ax;
        special.alpha = (special.y - special.far) / special.far;
      }
    }

    // update spark logic
    for (var i = listSpark.length - 1; i >= 0; i--) {
      var spark = listSpark[i];
      if (spark) {
        spark.vx *= 0.9;
        spark.vy *= 0.9;
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += spark.ay;
        spark.alpha = spark.life / spark.base.life + 0.2;
        //
        spark.life--;
        if (spark.life < spark.base.life * 0.8 && spark.life > 0) {
          //
          spark.chain--;
          chainSpark(spark);
        }
        if (spark.life <= 0) {
          listSpark.splice(i, 1);
        }
      }
    }
  }

  function draw() {
    // clear
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000003";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // re-draw
    ctx.globalCompositeOperation = "screen";
    for (var i = 0; i < listFire.length; i++) {
      var fire = listFire[i];
      ctx.globalAlpha = fire.alpha;
      ctx.beginPath();
      ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = fire.fill;
      ctx.fill();
    }

    for (var i = 0; i < listFirework.length; i++) {
      var firework = listFirework[i];
      ctx.globalAlpha = firework.alpha;
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = firework.fill;
      ctx.fill();
    }

    for (var i = 0; i < listSpecial.length; i++) {
      var special = listSpecial[i];
      ctx.globalAlpha = special.alpha;
      // ctx.beginPath();
      // ctx.arc(special.x, special.y, special.size, 0, Math.PI * 2);
      // ctx.closePath();
      // ctx.fill();
      ctx.fillStyle = special.fill;
      ctx.fillRect(
        special.x - special.size,
        special.y - special.size,
        special.size * 2,
        special.size * 2
      );
    }

    for (var i = 0; i < listSpark.length; i++) {
      var spark = listSpark[i];
      ctx.globalAlpha = spark.alpha;
      // ctx.beginPath();
      // ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      // ctx.closePath();
      // ctx.fill();
      ctx.fillStyle = spark.fill;
      ctx.fillRect(
        spark.x - spark.size,
        spark.y - spark.size,
        spark.size * 2,
        spark.size * 2
      );
    }

    // light effect
    while (lights.length) {
      var light = lights.pop();
      var gradient = ctx.createRadialGradient(
        light.x,
        light.y,
        0,
        light.x,
        light.y,
        light.radius
      );
      gradient.addColorStop(0, "#fff");
      gradient.addColorStop(0.2, light.color);
      gradient.addColorStop(0.8, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.globalAlpha = light.alpha ? light.alpha : 0.25;
      ctx.fillStyle = gradient;
      ctx.fillRect(
        light.x - light.radius,
        light.y - light.radius,
        light.radius * 2,
        light.radius * 2
      );
    }
  }
});
