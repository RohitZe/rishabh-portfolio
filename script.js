  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navlinks = document.getElementById('navlinks');
  navToggle.addEventListener('click', () => navlinks.classList.toggle('open'));
  navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

  // scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  reveals.forEach(el => io.observe(el));

  // skill bars
  const bars = document.querySelectorAll('.bar');
  const barIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const bar = e.target;
        bar.style.width = bar.dataset.pct + '%';
        barIo.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barIo.observe(b));

  // hero scatter animation
  function initScatter(){
    const svg = document.getElementById('scatter');
    const ns = 'http://www.w3.org/2000/svg';
    const points = [
      [60,170],[80,150],[95,165],[115,140],[130,150],[150,120],
      [165,130],[185,100],[205,110],[225,85],[245,90],[265,65],
      [285,75],[305,50],[325,55]
    ];
    points.forEach((p, i) => {
      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('cx', p[0]);
      c.setAttribute('cy', p[1]);
      c.setAttribute('r', 4);
      c.setAttribute('class', 'scatter-dot');
      c.style.transition = 'opacity .4s ease';
      c.style.transitionDelay = (i * 45) + 'ms';
      svg.appendChild(c);
      requestAnimationFrame(() => { c.style.opacity = 1; });
    });
    const line = document.getElementById('regLine');
    setTimeout(() => { line.style.transition = 'stroke-dashoffset 1.3s ease'; line.style.strokeDashoffset = 0; }, points.length * 45 + 150);
  }
  window.addEventListener('DOMContentLoaded', initScatter);

  // contact form (front-end only demo)
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    note.textContent = 'Thanks — your message is ready. Opening your email client...';
    note.style.color = 'var(--teal)';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const subject = encodeURIComponent('Training inquiry from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = `mailto:rishabhraj7120@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });

  // back to top button
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 500);
  });
  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
