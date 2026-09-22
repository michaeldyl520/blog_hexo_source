(function() {
  'use strict';

  var i18n = (window.__RAPIDS_I18N__ || {});

  /* ---------- header scroll state ---------- */
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function() {
      head.classList.toggle('is-scrolled', window.scrollY > 6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile nav ---------- */
  var nav = document.getElementById('site-nav');
  var navToggle = document.getElementById('nav-toggle');
  if (nav && navToggle) {
    var setNav = function(open) {
      nav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('is-locked', open);
    };
    navToggle.addEventListener('click', function() {
      setNav(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function(e) {
      if (e.target.closest('a')) setNav(false);
    });
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setNav(false);
    });
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 900) setNav(false);
    });
  }

  /* ---------- search ---------- */
  var searchRoot = document.getElementById('search');
  var searchCfg = window.__RAPIDS_SEARCH__;
  if (searchRoot && searchCfg) {
    var searchOpen = document.getElementById('search-open');
    var searchInput = document.getElementById('search-input');
    var searchStatus = document.getElementById('search-status');
    var searchResults = document.getElementById('search-results');
    var indexPromise = null;
    var indexData = null;
    var lastFocus = null;

    var loadIndex = function() {
      if (indexPromise) return indexPromise;
      indexPromise = fetch(searchCfg.index)
        .then(function(res) {
          if (!res.ok) throw new Error('status ' + res.status);
          return res.json();
        })
        .then(function(data) {
          indexData = Array.isArray(data) ? data : (data.posts || []);
          return indexData;
        });
      return indexPromise;
    };

    var escapeHtml = function(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };

    var snippet = function(text, q) {
      var decode = function(s) {
        return s
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&');
      };
      text = decode(String(text || ''));
      var lower = text.toLowerCase();
      var at = lower.indexOf(q);
      if (at < 0) at = 0;
      var start = Math.max(0, at - 36);
      var end = Math.min(text.length, at + q.length + 70);
      var piece = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
      var safe = escapeHtml(piece);
      if (q) {
        var re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig');
        safe = safe.replace(re, function(m) { return '<mark>' + m + '</mark>'; });
      }
      return safe;
    };

    var render = function(results, q) {
      searchResults.innerHTML = '';
      var total = indexData ? indexData.length : 0;
      if (!q) {
        searchStatus.textContent = (searchCfg.i18n.count || '{n}').replace('{n}', total);
        searchStatus.classList.remove('is-error');
        return;
      }
      if (!results.length) {
        searchStatus.textContent = searchCfg.i18n.empty;
        searchStatus.classList.remove('is-error');
        return;
      }
      searchStatus.textContent = (searchCfg.i18n.count || '{n}').replace('{n}', results.length);
      searchStatus.classList.remove('is-error');
      results.slice(0, 20).forEach(function(item) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '/' + item.path.replace(/^\//, '');
        var top = document.createElement('span');
        top.className = 'search__hit-top';
        var title = document.createElement('span');
        title.className = 'search__hit-title';
        title.textContent = item.title;
        var date = document.createElement('time');
        date.className = 'search__hit-date';
        date.textContent = String(item.date || '').slice(0, 10);
        top.appendChild(title);
        top.appendChild(date);
        var text = document.createElement('p');
        text.className = 'search__hit-text';
        text.innerHTML = snippet(item.text || '', q);
        a.appendChild(top);
        a.appendChild(text);
        li.appendChild(a);
        searchResults.appendChild(li);
      });
    };

    var query = function(q) {
      q = q.trim().toLowerCase();
      if (!q) {
        render([], '');
        return;
      }
      var hits = indexData.filter(function(item) {
        var hay = ((item.title || '') + ' ' + (item.text || '') + ' ' +
          (item.tags || []).join(' ')).toLowerCase();
        return hay.indexOf(q) !== -1;
      });
      hits.sort(function(a, b) {
        var at = (a.title || '').toLowerCase().indexOf(q);
        var bt = (b.title || '').toLowerCase().indexOf(q);
        if (at !== bt) return (at < 0 ? 99 : at) - (bt < 0 ? 99 : bt);
        return String(b.date || '').localeCompare(String(a.date || ''));
      });
      render(hits, q);
    };

    var openSearch = function() {
      if (nav && navToggle && nav.classList.contains('is-open')) setNav(false);
      lastFocus = document.activeElement;
      searchRoot.hidden = false;
      document.body.classList.add('is-locked');
      searchInput.value = '';
      searchResults.innerHTML = '';
      searchStatus.textContent = searchCfg.i18n.hint;
      searchStatus.classList.remove('is-error');
      searchInput.focus();
      loadIndex().then(function() {
        if (!searchInput.value) render([], '');
      }).catch(function() {
        searchStatus.textContent = searchCfg.i18n.error;
        searchStatus.classList.add('is-error');
      });
    };

    var closeSearch = function() {
      searchRoot.hidden = true;
      document.body.classList.remove('is-locked');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    if (searchOpen) searchOpen.addEventListener('click', openSearch);
    searchRoot.querySelectorAll('[data-search-close]').forEach(function(el) {
      el.addEventListener('click', closeSearch);
    });
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !searchRoot.hidden) closeSearch();
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) &&
          searchRoot.hidden &&
          !/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName || '')) {
        e.preventDefault();
        openSearch();
      }
    });

    var debounce;
    searchInput.addEventListener('input', function() {
      clearTimeout(debounce);
      var val = searchInput.value;
      debounce = setTimeout(function() {
        if (!indexData) {
          loadIndex().then(function() { query(val); }).catch(function() {
            searchStatus.textContent = searchCfg.i18n.error;
            searchStatus.classList.add('is-error');
          });
        } else {
          query(val);
        }
      }, 120);
    });
  }

  /* ---------- toc scrollspy (CJK ids: never querySelector) ---------- */
  var tocRoot = document.querySelector('.toc');
  if (tocRoot) {
    var tocLinks = Array.prototype.slice.call(tocRoot.querySelectorAll('a[href^="#"]'));
    var pairs = tocLinks.map(function(link) {
      var raw = link.getAttribute('href').slice(1);
      var id = raw;
      try { id = decodeURIComponent(raw); } catch (e) { /* keep raw */ }
      return { link: link, el: document.getElementById(id) };
    }).filter(function(p) { return p.el; });

    if (pairs.length) {
      var ticking = false;
      var spy = function() {
        ticking = false;
        var mark = window.scrollY + 120;
        var current = pairs[0];
        pairs.forEach(function(p) {
          if (p.el.offsetTop <= mark) current = p;
        });
        pairs.forEach(function(p) {
          p.link.classList.toggle('is-current', p === current);
        });
      };
      window.addEventListener('scroll', function() {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(spy);
        }
      }, { passive: true });
      spy();
    }
  }

  /* ---------- code copy ---------- */
  var copyLabel = i18n.copy || '复制';
  var copiedLabel = i18n.copied || '已复制';
  document.querySelectorAll('.content pre').forEach(function(pre) {
    if (pre.querySelector('code') === null && !pre.textContent) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = copyLabel;
    btn.setAttribute('aria-label', copyLabel);
    btn.addEventListener('click', function() {
      var code = pre.querySelector('code');
      var text = code ? code.innerText : pre.innerText;
      var done = function() {
        btn.textContent = copiedLabel;
        btn.classList.add('is-copied');
        setTimeout(function() {
          btn.textContent = copyLabel;
          btn.classList.remove('is-copied');
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function() {});
      }
    });
    pre.appendChild(btn);
  });

  /* ---------- image lightbox ---------- */
  var openLightbox = function(img) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    var clone = document.createElement('img');
    clone.src = img.currentSrc || img.src;
    clone.alt = img.alt || '';
    box.appendChild(clone);
    var close = function() {
      document.body.removeChild(box);
      document.body.classList.remove('is-locked');
    };
    box.addEventListener('click', close);
    window.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape') {
        close();
        window.removeEventListener('keydown', onEsc);
      }
    });
    document.body.appendChild(box);
    document.body.classList.add('is-locked');
    box.focus && box.focus();
  };
  document.querySelectorAll('.content img').forEach(function(img) {
    if (img.closest('a')) return;
    img.addEventListener('click', function() { openLightbox(img); });
  });
})();
