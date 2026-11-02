/* PowerMedia 站点交互 · 无依赖 */
(function () {
  'use strict';

  /* ---------- 1. 顶部导航：滚动阴影 ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. 移动端菜单 ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        mobileNav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- 3. 当前页高亮 ---------- */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === './')) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- 4. 滚动入场 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ---------- 5. 年份 ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 6. 演示预约表单（无后端，生成邮件草稿） ---------- */
  var form = document.getElementById('demo-form');
  if (form) {
    var ok = document.getElementById('form-ok');

    function fieldOf(input) { return input.closest('.field'); }

    function validate() {
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (input) {
        var f = fieldOf(input);
        var v = (input.value || '').trim();
        var bad = !v;
        if (!bad && input.type === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
        if (!bad && input.type === 'tel') bad = v.replace(/[^\d]/g, '').length < 7;
        if (f) f.classList.toggle('is-invalid', bad);
        if (bad && valid) { input.focus(); valid = false; }
      });
      var privacy = form.querySelector('#f-agree');
      if (privacy && !privacy.checked) {
        var pf = privacy.closest('.field');
        if (pf) pf.classList.add('is-invalid');
        valid = false;
      }
      return valid;
    }

    form.addEventListener('input', function (e) {
      var f = fieldOf(e.target);
      if (f && f.classList.contains('is-invalid')) f.classList.remove('is-invalid');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;

      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || '').toString().trim(); };
      var body = [
        '预约 PowerMedia 产品演示',
        '',
        '姓名：' + get('name'),
        '公司 / 单位：' + get('company'),
        '手机 / 电话：' + get('phone'),
        '邮箱：' + get('email'),
        '业务场景：' + get('scene'),
        '预计用户规模：' + (get('scale') || '未填写'),
        '',
        '需求说明：',
        get('message') || '（未填写）',
        '',
        '—— 来自 PowerMedia 子站演示预约表单'
      ].join('\n');

      var href = 'mailto:marketing@powercom.net.cn'
        + '?subject=' + encodeURIComponent('【演示预约】' + get('company') + ' - ' + get('name'))
        + '&body=' + encodeURIComponent(body);

      if (ok) {
        ok.classList.add('is-on');
        ok.innerHTML = '预约邮件草稿已生成，请在邮件客户端中确认并发送；'
          + '若未自动打开，可直接致电 <b>010-62129317</b>，或发送邮件至 '
          + '<b>marketing@powercom.net.cn</b>。';
      }
      window.location.href = href;
    });
  }

  /* ---------- 7. 锚点平滑滚动（补偿吸顶导航） ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
