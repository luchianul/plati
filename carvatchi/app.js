(function () {
  var P = {
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    panel: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h3M8 12h3M8 16h3M14 8h2M14 12h2M14 16h2"/>',
    plug: '<path d="M9 2v5M15 2v5M6 7h12v3a6 6 0 0 1-12 0zM12 16v6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
    car: '<path d="M5 16v-4l2-5h10l2 5v4M3 16h18M7 19v-3M17 19v-3"/><path d="M12 9l-1.5 2.5h3L12 14"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    building: '<path d="M4 21V5l8-2v18M12 9h8v12M7 9h2M7 13h2M7 17h2M15 13h2M15 17h2"/>',
    check: '<path d="M5 12l4 4 10-10"/>'
  };
  function svg(name) {
    return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || '') + '</svg>';
  }
  document.querySelectorAll('[data-i]').forEach(function (el) {
    el.insertAdjacentHTML('afterbegin', svg(el.getAttribute('data-i')));
  });

  /* ---------- galerie ---------- */
  var grid = document.getElementById('gallery');
  if (grid) {
    var items = [
      { c: 'tablouri', g: 'g1', i: 'panel', t: 'Tablou electric modernizat', d: 'Înlocuire tablou vechi cu siguranțe automate și diferențial.' },
      { c: 'iluminat', g: 'g2', i: 'bulb', t: 'Iluminat LED living', d: 'Spoturi încastrate și bandă LED cu dimmer.' },
      { c: 'rezidential', g: 'g3', i: 'home', t: 'Instalație completă apartament', d: 'Traseu nou de cabluri, prize și întrerupătoare, la cheie.' },
      { c: 'verde', g: 'g4', i: 'sun', t: 'Sistem fotovoltaic', d: 'Panouri solare cu invertor și racordare la rețea.' },
      { c: 'verde', g: 'g6', i: 'car', t: 'Stație încărcare mașină electrică', d: 'Wallbox montat în garaj cu protecții dedicate.' },
      { c: 'comercial', g: 'g5', i: 'building', t: 'Spațiu comercial', d: 'Iluminat, prize și tablou pentru un magazin nou.' },
      { c: 'rezidential', g: 'g1', i: 'plug', t: 'Prize și întrerupătoare', d: 'Montaj de prize smart și USB-C în bucătărie.' },
      { c: 'iluminat', g: 'g3', i: 'sun', t: 'Iluminat exterior grădină', d: 'Corpuri de iluminat cu senzor de mișcare și crepuscular.' },
      { c: 'tablouri', g: 'g5', i: 'shield', t: 'Protecție la supratensiune', d: 'Descărcătoare și împământare verificate cu măsurători.' }
    ];
    var labels = { tablouri: 'Tablouri', iluminat: 'Iluminat', rezidential: 'Locuințe', verde: 'Energie verde', comercial: 'Comercial' };
    grid.innerHTML = items.map(function (it, n) {
      return '<button class="item glass" data-c="' + it.c + '" data-n="' + n + '" type="button" aria-label="Deschide: ' + it.t + '">' +
        '<div class="shot ' + it.g + '"><div class="orb">' + svg(it.i) + '</div><span class="tag">' + labels[it.c] + '</span></div>' +
        '<h3>' + it.t + '</h3><p>' + it.d + '</p></button>';
    }).join('');

    var btns = document.querySelectorAll('.filters button');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        var f = b.getAttribute('data-f');
        grid.querySelectorAll('.item').forEach(function (el) {
          el.hidden = !(f === 'toate' || el.getAttribute('data-c') === f);
        });
      });
    });

    var lb = document.getElementById('lb');
    var cur = 0;
    function show(n) {
      var vis = Array.prototype.filter.call(grid.querySelectorAll('.item'), function (e) { return !e.hidden; });
      if (!vis.length) return;
      cur = (n + vis.length) % vis.length;
      var it = items[+vis[cur].getAttribute('data-n')];
      lb.querySelector('.shot').className = 'shot ' + it.g;
      lb.querySelector('.orb').innerHTML = svg(it.i);
      lb.querySelector('.tag').textContent = labels[it.c];
      lb.querySelector('h3').textContent = it.t;
      lb.querySelector('.lb-text').textContent = it.d;
      lb.classList.add('open');
      lb.querySelector('[data-close]').focus();
    }
    grid.addEventListener('click', function (e) {
      var el = e.target.closest('.item');
      if (!el) return;
      var vis = Array.prototype.filter.call(grid.querySelectorAll('.item'), function (x) { return !x.hidden; });
      show(vis.indexOf(el));
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.hasAttribute('data-close')) lb.classList.remove('open');
      if (e.target.hasAttribute('data-prev')) show(cur - 1);
      if (e.target.hasAttribute('data-next')) show(cur + 1);
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') lb.classList.remove('open');
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* ---------- formular ---------- */
  var form = document.getElementById('cerere');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = document.getElementById('nume').value.trim();
      var ok = document.getElementById('ok');
      ok.textContent = 'Mulțumim' + (n ? ', ' + n : '') + '! Formularul este demonstrativ. Până îl conectezi la un serviciu de email, sună la numărul de mai sus.';
      ok.hidden = false;
      form.reset();
    });
  }
})();

/* ================= EFECTE ================= */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* bara de progres + nav compact */
  var bar = document.createElement('div');
  bar.className = 'progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  var shell = document.querySelector('.nav-shell');
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ')';
    if (shell) shell.classList.toggle('scrolled', window.scrollY > 24);
    if (!reduce) {
      document.querySelectorAll('.aurora span').forEach(function (s) {
        var k = parseFloat(getComputedStyle(s).getPropertyValue('--k')) || 1;
        s.style.setProperty('--ty', (-window.scrollY * 0.12 * k + (s._my || 0)) + 'px');
      });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* parallax fundal la mouse */
  if (fine && !reduce) {
    window.addEventListener('mousemove', function (e) {
      var nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
      document.querySelectorAll('.aurora span').forEach(function (s) {
        var k = parseFloat(getComputedStyle(s).getPropertyValue('--k')) || 1;
        s._my = ny * 60 * k;
        s.style.setProperty('--tx', nx * 80 * k + 'px');
        s.style.setProperty('--ty', (-window.scrollY * 0.12 * k + s._my) + 'px');
      });
    }, { passive: true });
  }

  /* tranziții între pagini */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname === location.pathname) return;
    if (reduce) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(function () { location.href = a.href; }, 270);
  });
  window.addEventListener('pageshow', function () { document.body.classList.remove('leaving'); });

  /* apariții: ce e deja vizibil intră la încărcare, restul la scroll */
  var sel = '.banner, .stats > *, .page-head > *, .filters, .sec-head, .card, .panel, .preview a, .item, .contact-card, .cta, .contact > .glass';
  var els = Array.prototype.slice.call(document.querySelectorAll(sel));
  var io = 'IntersectionObserver' in window && !reduce ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { var t = en.target; t.classList.add('in'); io.unobserve(t); setTimeout(function () { t.classList.remove('rv', 'in'); }, 1000); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;
  els.forEach(function (el) {
    var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--d', Math.min(idx, 6) * 80 + 'ms');
    if (reduce || !io) return;
    if (el.getBoundingClientRect().top < window.innerHeight - 20) el.classList.add('enter');
    else { el.classList.add('rv'); io.observe(el); }
  });

  /* filtre galerie: reapar cu întârziere */
  document.querySelectorAll('.filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      if (reduce) return;
      var n = 0;
      document.querySelectorAll('.item:not([hidden])').forEach(function (it) {
        it.classList.remove('enter', 'rv');
        it.style.setProperty('--d', n++ * 60 + 'ms');
        void it.offsetWidth;
        it.classList.add('enter');
      });
    });
  });

  /* reflector + înclinare 3D pe carduri */
  if (fine && !reduce) {
    document.querySelectorAll('.card, .item, .panel, .stat, .contact-card, .hero-card').forEach(function (el) {
      el.classList.add('fx');
      var tilt = el.matches('.card, .item, .stat');
      if (tilt) el.classList.add('tilt');
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left, y = e.clientY - r.top;
        el.style.setProperty('--px', x + 'px');
        el.style.setProperty('--py', y + 'px');
        if (tilt) el.style.transform = 'translateY(-4px) perspective(800px) rotateX(' + ((0.5 - y / r.height) * 7).toFixed(2) + 'deg) rotateY(' + ((x / r.width - 0.5) * 9).toFixed(2) + 'deg)';
      });
      el.addEventListener('mouseleave', function () { if (tilt) el.style.transform = ''; });
    });
  }

  /* fundal: curent electric care circulă pe un circuit */
  var cv = document.createElement('canvas');
  cv.className = 'circuit';
  cv.setAttribute('aria-hidden', 'true');
  var au = document.querySelector('.aurora');
  if (au) au.after(cv); else document.body.prepend(cv);
  var ctx = cv.getContext('2d');
  var G = 64, W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var pulses = [], mouse = { x: -999, y: -999 };
  var COLORS = [[10, 124, 255], [255, 184, 0], [31, 184, 119]];

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

  function spawn() {
    var horiz = Math.random() < 0.5, dir = Math.random() < 0.5 ? 1 : -1;
    var p = { trail: [], c: COLORS[Math.floor(Math.random() * COLORS.length)], sp: 90 + Math.random() * 110 };
    if (horiz) {
      p.x = dir > 0 ? -10 : W + 10; p.y = Math.round(Math.random() * (H / G)) * G; p.dx = dir; p.dy = 0;
    } else {
      p.y = dir > 0 ? -10 : H + 10; p.x = Math.round(Math.random() * (W / G)) * G; p.dx = 0; p.dy = dir;
    }
    return p;
  }
  var count = W < 700 ? 7 : 14;
  for (var i = 0; i < count; i++) {
    var p = spawn();
    p.x = Math.round(Math.random() * (W / G)) * G; p.y = Math.round(Math.random() * (H / G)) * G;
    pulses.push(p);
  }

  function drawGrid() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(10,124,255,0.07)';
    ctx.beginPath();
    for (var x = 0; x <= W; x += G) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); }
    for (var y = 0; y <= H; y += G) { ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); }
    ctx.stroke();
    for (var gx = 0; gx <= W; gx += G) {
      for (var gy = 0; gy <= H; gy += G) {
        var d = Math.hypot(gx - mouse.x, gy - mouse.y);
        var near = Math.max(0, 1 - d / 200);
        ctx.fillStyle = near > 0 ? 'rgba(10,124,255,' + (0.18 + near * 0.6) + ')' : 'rgba(10,124,255,0.18)';
        ctx.beginPath(); ctx.arc(gx, gy, 2 + near * 3, 0, 6.283); ctx.fill();
      }
    }
  }

  var last = performance.now();
  function frame(t) {
    var dt = Math.min(0.05, (t - last) / 1000); last = t;
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    pulses.forEach(function (p, n) {
      var px = p.x, py = p.y;
      p.x += p.dx * p.sp * dt; p.y += p.dy * p.sp * dt;
      /* la intersecție, uneori virează */
      var crossed = p.dx ? Math.floor(px / G) !== Math.floor(p.x / G) : Math.floor(py / G) !== Math.floor(p.y / G);
      if (crossed) {
        p.x = Math.round(p.x / G) * G; p.y = Math.round(p.y / G) * G;
        if (Math.random() < 0.35) {
          var s = Math.random() < 0.5 ? 1 : -1;
          if (p.dx) { p.dy = s; p.dx = 0; } else { p.dx = s; p.dy = 0; }
        }
      }
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 26) p.trail.shift();
      var c = p.c;
      for (var i = 1; i < p.trail.length; i++) {
        var a = i / p.trail.length;
        ctx.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (a * 0.65).toFixed(3) + ')';
        ctx.lineWidth = 1 + a * 2.2;
        ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(p.trail[i - 1].x, p.trail[i - 1].y); ctx.lineTo(p.trail[i].x, p.trail[i].y); ctx.stroke();
      }
      ctx.save();
      ctx.shadowColor = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.9)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
      ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, 6.283); ctx.fill();
      ctx.restore();
      if (p.x < -40 || p.x > W + 40 || p.y < -40 || p.y > H + 40) pulses[n] = spawn();
    });
    if (!reduce && !document.hidden) requestAnimationFrame(frame);
    else if (!reduce) setTimeout(function () { requestAnimationFrame(frame); }, 500);
  }
  if (reduce) { drawGrid(); } else { requestAnimationFrame(frame); }
})();

/* ===== slider banner ===== */
(function () {
  var b = document.getElementById('banner');
  if (!b) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var track = b.querySelector('.track'), slides = b.querySelectorAll('.slide'), dotsBox = b.querySelector('.dots');
  var n = slides.length, cur = 0, timer = null, DUR = 6000;
  b.style.setProperty('--dur', DUR + 'ms');
  var dots = [];
  for (var i = 0; i < n; i++) {
    (function (k) {
      var d = document.createElement('button');
      d.type = 'button'; d.setAttribute('role', 'tab'); d.setAttribute('aria-label', 'Slide ' + (k + 1));
      d.addEventListener('click', function () { go(k); });
      dotsBox.appendChild(d); dots.push(d);
    })(i);
  }
  function go(k) {
    cur = (k + n) % n;
    track.style.transform = 'translateX(' + (-cur * 100) + '%)';
    slides.forEach(function (s, j) { s.classList.toggle('active', j === cur); s.setAttribute('aria-hidden', j === cur ? 'false' : 'true'); });
    dots.forEach(function (d, j) {
      d.setAttribute('aria-selected', j === cur ? 'true' : 'false');
      if (j === cur) { d.style.animation = 'none'; void d.offsetWidth; d.style.animation = ''; }
    });
    restart();
  }
  function restart() {
    clearTimeout(timer);
    if (reduce || b.classList.contains('paused')) return;
    timer = setTimeout(function () { go(cur + 1); }, DUR);
  }
  b.querySelector('.prev').addEventListener('click', function () { go(cur - 1); });
  b.querySelector('.next').addEventListener('click', function () { go(cur + 1); });
  function pause() { b.classList.add('paused'); clearTimeout(timer); }
  function resume() { b.classList.remove('paused'); go(cur); }
  b.addEventListener('mouseenter', pause); b.addEventListener('mouseleave', resume);
  b.addEventListener('focusin', pause); b.addEventListener('focusout', resume);
  /* swipe */
  var x0 = null;
  b.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
  b.addEventListener('pointerup', function (e) {
    if (x0 === null) return;
    var dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
  });
  b.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') go(cur - 1);
    if (e.key === 'ArrowRight') go(cur + 1);
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); else resume(); });
  go(0);
})();
