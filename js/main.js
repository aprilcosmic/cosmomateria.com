(function () {
  var doc = document.documentElement;
  doc.classList.add('js');

  // Menú móvil
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('menu');
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Cerrar' : 'Menú';
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Menú';
    }
  });

  // Nav sólida al bajar
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('solid', window.scrollY > 80); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Año
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // YouTube: carga el reproductor solo al dar clic
  document.querySelectorAll('.yt').forEach(function (box) {
    var a = box.querySelector('.yt-btn');
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + box.dataset.id + '?autoplay=1&rel=0';
      f.title = box.dataset.title;
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true;
      box.innerHTML = '';
      box.appendChild(f);
    });
  });

  // Aparición suave de bloques
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.sec-head, .halves, .constellation li, .full, .svc-item, .series, .poster, .pod, .about-photo, .about-text, .channels li');
  if (!reduce && 'IntersectionObserver' in window) {
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  // Cielo de estrellas en el inicio
  var c = document.getElementById('sky');
  if (!c || !c.getContext) return;
  var ctx = c.getContext('2d');
  var stars = [], w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

  function sparkle(x, y, r) {
    var k = r * 0.12;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.bezierCurveTo(x + k, y - k, x + k, y - k, x + r, y);
    ctx.bezierCurveTo(x + k, y + k, x + k, y + k, x, y + r);
    ctx.bezierCurveTo(x - k, y + k, x - k, y + k, x - r, y);
    ctx.bezierCurveTo(x - k, y - k, x - k, y - k, x, y - r);
    ctx.fill();
  }

  function setup() {
    var r = c.getBoundingClientRect();
    w = r.width; h = r.height;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round((w * h) / 9000);
    stars = [];
    for (var i = 0; i < n; i++) {
      var big = Math.random() < 0.06;
      stars.push({
        x: Math.random() * w, y: Math.random() * h,
        r: big ? 4 + Math.random() * 7 : 0.6 + Math.random() * 1.3,
        big: big, red: big && Math.random() < 0.35,
        p: Math.random() * Math.PI * 2, s: 0.4 + Math.random() * 1.2,
        v: 0.02 + Math.random() * 0.08
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.p + t * 0.001 * s.s));
      if (!reduce) { s.y -= s.v; if (s.y < -12) { s.y = h + 12; s.x = Math.random() * w; } }
      ctx.globalAlpha = s.big ? a * 0.9 : a * 0.7;
      ctx.fillStyle = s.red ? '#d92f18' : '#f3ede6';
      if (s.big) sparkle(s.x, s.y, s.r * (0.8 + 0.2 * a));
      else { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.globalAlpha = 1;
  }

  var running = true;
  function loop(t) { if (running) { draw(t); requestAnimationFrame(loop); } }
  setup();
  if (reduce) { draw(0); } else { requestAnimationFrame(loop); }
  window.addEventListener('resize', function () { setup(); if (reduce) draw(0); });
  if ('IntersectionObserver' in window && !reduce) {
    new IntersectionObserver(function (e) {
      var vis = e[0].isIntersecting;
      if (vis && !running) { running = true; requestAnimationFrame(loop); }
      running = vis;
    }).observe(c);
  }
})();
