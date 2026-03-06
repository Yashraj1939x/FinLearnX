<!--
const canvas = document.getElementById("hero-bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let t = 0;

function draw() {
  ctx.clearRect(0, 0, w, h);

  const grad = ctx.createLinearGradient(
    0,
    0,
    w * Math.cos(t * 0.0004),
    h * Math.sin(t * 0.0003)
  );

  grad.addColorStop(0, "#dcfce7");
  grad.addColorStop(0.5, "#bbf7d0");
  grad.addColorStop(1, "#e0f2fe");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // subtle moving waves
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(34,197,94,0.08)`;
    ctx.lineWidth = 2;

    for (let x = 0; x < w; x += 20) {
      const y =
        h / 2 +
        Math.sin(x * 0.01 + t * 0.002 + i) * 40;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  t += 1;
  requestAnimationFrame(draw);
}

draw();
-->
