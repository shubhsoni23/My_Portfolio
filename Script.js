
// ── CANVAS WAVE ──
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, t = 0;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function wave(y, amp, freq, phase, alpha, color) {
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 3) {
    const yw = y + Math.sin(x * freq + phase + t) * amp
              + Math.sin(x * freq * 1.7 + phase * 1.3 + t * 0.7) * amp * 0.4;
    ctx.lineTo(x, yw);
  }
  ctx.lineTo(W, H); ctx.lineTo(0, H);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, y - amp, 0, H);
  grad.addColorStop(0, color.replace('A', alpha));
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fill();
}

function ribbon(x, y, len, width, color, phase) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(t * 0.3 + phase) * 0.08);
  const grad = ctx.createLinearGradient(-len/2, 0, len/2, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.3, color);
  grad.addColorStop(0.7, color);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath();
  for (let i = -len/2; i <= len/2; i += 2) {
    const yw = Math.sin((i / len) * Math.PI * 2 + t * 0.5 + phase) * (width * 1.5);
    if (i === -len/2) ctx.moveTo(i, yw);
    else ctx.lineTo(i, yw);
  }
  ctx.strokeStyle = grad;
  ctx.lineWidth = width;
  ctx.globalAlpha = 0.18;
  ctx.stroke();
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  wave(H * 0.55, 60, 0.004, 0, 0.06, 'rgba(99,179,237,A)');
  wave(H * 0.65, 45, 0.006, 2, 0.04, 'rgba(126,232,162,A)');
  wave(H * 0.75, 35, 0.005, 4, 0.03, 'rgba(99,179,237,A)');
  ribbon(W * 0.25, H * 0.35, W * 0.7, 3, 'rgba(99,179,237,0.4)', 0);
  ribbon(W * 0.6,  H * 0.55, W * 0.5, 2, 'rgba(126,232,162,0.35)', 2);
  ribbon(W * 0.4,  H * 0.2,  W * 0.4, 2, 'rgba(246,173,85,0.2)', 4);
  t += 0.008;
  requestAnimationFrame(draw);
}
draw();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.05) + 's';
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));
