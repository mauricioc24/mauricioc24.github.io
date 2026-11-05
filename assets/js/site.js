/* ==========================================================================
   site.js: renders /projects.json into the pages and adds the few
   interactions (project filters, copy email + toast). Plain JavaScript,
   no libraries.

   The one rule: any value in projects.json that contains "[FILL" is still
   missing, so it is hidden from the public site. TODO.md lists them.

   Pages ask for content with data attributes:
     data-showcase="home|past|planned"  project entries (Home, Projects)
     data-filters                       filter chips      (Projects)
     data-matrix                        skills by project (Projects)
     data-case-study="slug"             one case study    (projects/<slug>.html)
     data-channels                      La IAma links     (Home)
   ========================================================================== */
(() => {
  'use strict';

  const DATA_URL = '/projects.json';

  /* ---------- small helpers ---------- */

  const isFill = (value) => typeof value === 'string' && value.includes('[FILL');
  const present = (value) => (typeof value === 'string' ? value.trim() !== '' && !isFill(value) : value != null);

  // Build DOM nodes without innerHTML, so text from the JSON is never parsed as HTML.
  function h(tag, attrs, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs || {})) {
      if (value == null || value === false) continue;
      if (key === 'class') node.className = value;
      else node.setAttribute(key, value === true ? '' : value);
    }
    for (const child of children.flat()) {
      if (child == null || child === false || child === '') continue;
      node.append(child instanceof Node ? child : String(child));
    }
    return node;
  }

  const SVG_NS = 'http://www.w3.org/2000/svg';
  function svg(viewBox, parts) {
    const root = document.createElementNS(SVG_NS, 'svg');
    root.setAttribute('viewBox', viewBox);
    root.setAttribute('aria-hidden', 'true');
    root.setAttribute('focusable', 'false');
    for (const [tag, attrs] of parts) {
      const el = document.createElementNS(SVG_NS, tag);
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      root.append(el);
    }
    return root;
  }

  // Text where `backticks` become <code>.
  function rich(text) {
    const fragment = document.createDocumentFragment();
    for (const part of String(text).split(/(`[^`]+`)/)) {
      if (!part) continue;
      const isCode = part.length > 1 && part.startsWith('`') && part.endsWith('`');
      fragment.append(isCode ? h('code', null, part.slice(1, -1)) : part);
    }
    return fragment;
  }

  // "27% → 24%": the arrow is visual; screen readers hear "27% to 24%".
  // Each side stays on one line; the spaces around the arrow are the only
  // places a narrow tile may wrap.
  function metricValue(value) {
    const fragment = document.createDocumentFragment();
    value.split('→').forEach((part, index) => {
      if (index > 0) {
        fragment.append(
          ' ',
          h('span', { class: 'metric-arrow', 'aria-hidden': 'true' }, '→'),
          h('span', { class: 'visually-hidden' }, 'to'),
          ' '
        );
      }
      fragment.append(h('span', { class: 'metric-part' }, part.trim()));
    });
    return fragment;
  }

  const caseUrl = (project) => `/projects/${project.slug}.html`;
  const visibleResults = (project) => (project.results || []).filter((r) => present(r.text));
  const visibleMetrics = (project) => visibleResults(project).filter((r) => present(r.metric) && present(r.label));
  const visibleTools = (project) => (project.tools || []).filter(present);
  const visibleLinks = (project) => (project.links || []).filter((l) => present(l.href) && present(l.label));

  function typeLabel(project, planned) {
    if (planned) return ['Planned', project.target].filter(present).join(' · ');
    return [project.type, project.status].filter(present).join(' · ');
  }

  function chipList(tools) {
    if (!tools.length) return null;
    return h('ul', { class: 'chips', role: 'list', 'aria-label': 'Tools' },
      tools.map((tool) => h('li', { class: 'chip' }, tool)));
  }

  function metricList(metrics, extraClass) {
    return h('ul', { class: `metrics${extraClass ? ` ${extraClass}` : ''}`, role: 'list' },
      metrics.map((m) => h('li', { class: 'metric' },
        h('span', { class: 'v' }, metricValue(m.metric)),
        h('span', { class: 'l' }, m.label)
      ))
    );
  }

  // One line on how AI was used and checked. Only the parts that are filled in.
  function aiLine(project, className) {
    const ai = project.ai || {};
    const parts = [ai.used, ai.checked].filter(present);
    if (!present(ai.used)) return null;
    return h('p', { class: className }, h('span', { class: 'label' }, 'AI use'), ' ', parts.join(' '));
  }

  /* ---------- thumbnails: only real content (BRAND §5, CONTENT.md) ---------- */

  // The small diagram: same steps as the case study, short labels when given.
  function miniFlow(visual) {
    if (!visual || visual.type !== 'flow') return null;
    const steps = (visual.steps || []).filter((s) => present(s.label));
    if (steps.length < 2 || steps.length > 4) return null;
    return h('ol', { class: 'flow-mini', role: 'list', 'aria-label': visual.title || 'How it works' },
      steps.map((s) => h('li', { class: s.highlight ? 'is-highlight' : null }, rich(present(s.short) ? s.short : s.label)))
    );
  }

  function thumbContent(project, planned) {
    const thumb = project.thumb || {};
    if (thumb.kind === 'metrics') {
      const metrics = visibleMetrics(project).slice(0, 2);
      if (metrics.length) {
        return h('div', { class: 'thumb-metrics' },
          metrics.map((m, i) => h('p', { class: i === 0 ? 'thumb-metric is-main' : 'thumb-metric' },
            h('span', { class: 'v' }, metricValue(m.metric)),
            h('span', { class: 'l' }, m.label)
          ))
        );
      }
    }
    if (thumb.kind === 'flow') {
      const flow = miniFlow(project.visual);
      if (flow) return flow;
    }
    return h('div', { class: 'thumb-type' },
      h('span', { class: `thumb-word${thumb.mono ? ' is-mono' : ''}` }, present(thumb.text) ? thumb.text : project.title)
    );
  }

  /* ---------- showcase entries (Home "Selected work", Projects) ---------- */

  function entry(project, planned, headingTag) {
    const url = planned ? null : caseUrl(project);
    const links = [];
    if (url) {
      links.push(h('a', { class: 'pill-link', href: url }, 'Case study', h('span', { class: 'visually-hidden' }, `: ${project.title}`)));
    }
    for (const l of planned ? [] : visibleLinks(project)) {
      links.push(h('a', { class: 'pill-link', href: l.href }, l.label, h('span', { class: 'visually-hidden' }, `: ${project.title}`)));
    }

    const thumbInner = thumbContent(project, planned);
    // The thumbnail repeats the title link for the mouse; keyboard and screen
    // readers use the title link, so the thumbnail is skipped by them.
    const thumb = url
      ? h('a', { class: 'entry-thumb', href: url, tabindex: '-1', 'aria-hidden': 'true' }, thumbInner)
      : h('div', { class: 'entry-thumb', 'aria-hidden': 'true' }, thumbInner);

    const roles = (project.roles || []).filter(present);
    const type = planned ? 'Planned' : project.type;

    return h('li', { class: 'entry', 'data-type': type },
      h('article', { class: 'entry-body' },
        thumb,
        h('p', { class: 'entry-type label' }, typeLabel(project, planned)),
        h(headingTag, { class: 'entry-title' }, url ? h('a', { href: url }, project.title) : project.title),
        present(project.summary) && h('p', { class: 'entry-desc' }, rich(project.summary)),
        planned && present(project.details) && h('p', { class: 'entry-desc' }, project.details),
        roles.length > 0 && h('p', { class: 'entry-roles' }, h('span', { class: 'label' }, 'Roles'), ' ', roles.join(', ')),
        chipList(visibleTools(project)),
        planned && present(project.measure) && h('p', { class: 'entry-roles' }, h('span', { class: 'label' }, 'Measure'), ' ', project.measure),
        aiLine(project, 'entry-ai'),
        links.length > 0 && h('p', { class: 'entry-links' }, links)
      )
    );
  }

  function renderShowcase(root, data) {
    const which = root.dataset.showcase;
    const headingTag = root.dataset.heading || 'h3';
    let items;
    if (which === 'planned') items = (data.planned || []).map((p) => entry(p, true, headingTag));
    else {
      const list = which === 'home' ? data.projects.filter((p) => p.home) : data.projects;
      items = list.map((p) => entry(p, false, headingTag));
    }
    root.replaceChildren(...items);
  }

  /* ---------- filter chips (Projects). No animation: BRAND §6 ---------- */

  function renderFilters(root, data) {
    const types = ['All', ...new Set(data.projects.map((p) => p.type))];
    if ((data.planned || []).length) types.push('Planned');
    const status = document.querySelector('[data-filter-status]');
    const buttons = types.map((t) => h('button', { class: 'filter-chip', type: 'button', 'aria-pressed': t === 'All' ? 'true' : 'false', 'data-filter': t }, t));
    root.replaceChildren(h('span', { class: 'label', id: 'filter-label' }, 'Show'), ...buttons);
    root.setAttribute('role', 'group');
    root.setAttribute('aria-labelledby', 'filter-label');
    root.hidden = false;

    root.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      const chosen = button.dataset.filter;
      for (const b of buttons) b.setAttribute('aria-pressed', String(b === button));
      let shown = 0;
      document.querySelectorAll('[data-showcase] .entry').forEach((li) => {
        const match = chosen === 'All' || li.dataset.type === chosen;
        li.hidden = !match;
        if (match) shown += 1;
      });
      document.querySelectorAll('[data-filter-section]').forEach((section) => {
        section.hidden = !section.querySelector('.entry:not([hidden])');
      });
      if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'project' : 'projects'}`;
    });
  }

  /* ---------- skills by project (Projects) ---------- */

  const SKILLS = [
    ['SQL', /\bSQL\b/],
    ['Power BI', /Power BI/],
    ['DAX', /\bDAX\b/],
    ['Power Query', /Power Query/],
    ['Power Automate', /Power Automate/],
    ['Copilot Studio', /Copilot Studio/],
    ['Python', /Python/],
    ['Excel', /Excel/],
    ['Tableau', /Tableau/],
    ['AI / LLMs', /Anthropic API|Structured outputs|AI agent|AI commentary|LLM/],
  ];

  function renderMatrix(root, data) {
    const rows = [
      ...data.projects.map((p) => ({ title: p.title, planned: false, tools: visibleTools(p) })),
      ...(data.planned || []).map((p) => ({ title: p.title, planned: true, tools: visibleTools(p) })),
    ].map((r) => ({ ...r, hits: SKILLS.map(([, re]) => r.tools.some((t) => re.test(t))) }))
      .filter((r) => r.hits.some(Boolean));
    const used = SKILLS.map((_, i) => rows.some((r) => r.hits[i]));
    const cols = SKILLS.filter((_, i) => used[i]);

    const table = h('table', { class: 'matrix' },
      h('caption', { class: 'visually-hidden' }, 'Tools used in each project'),
      h('thead', null, h('tr', null,
        h('th', { scope: 'col' }, 'Project'),
        cols.map(([name]) => h('th', { scope: 'col' }, name))
      )),
      h('tbody', null, rows.map((r) => h('tr', { class: r.planned ? 'is-planned' : null },
        h('th', { scope: 'row' }, r.title, r.planned && h('span', { class: 'matrix-planned' }, ' Planned')),
        r.hits.filter((_, i) => used[i]).map((hit) => h('td', null,
          hit && h('span', { class: 'matrix-dot', 'aria-hidden': 'true' }),
          hit && h('span', { class: 'visually-hidden' }, 'Yes')
        ))
      )))
    );
    root.replaceChildren(table);
  }

  /* ---------- case study (projects/<slug>.html) ---------- */

  function section(title, ...content) {
    return h('section', { class: 'case-section' },
      h('h2', null, title),
      h('div', { class: 'case-content' }, ...content)
    );
  }

  function visual(v) {
    if (!v) return null;
    if (v.type === 'image') {
      if (!present(v.src)) return null;
      return h('figure', { class: 'case-figure' },
        h('img', { src: v.src, alt: v.alt || '', loading: 'lazy', decoding: 'async', width: v.width, height: v.height }),
        present(v.caption) && h('figcaption', { class: 'label' }, v.caption)
      );
    }
    if (v.type === 'flow') {
      const steps = (v.steps || []).filter((s) => present(s.label));
      if (!steps.length) return null;
      return h('figure', { class: 'flow' },
        h('figcaption', { class: 'label' }, v.title || 'How it works'),
        h('ol', { class: 'flow-steps', role: 'list' },
          steps.map((s) => h('li', { class: `flow-step${s.highlight ? ' is-highlight' : ''}` },
            h('span', { class: 'flow-label' }, rich(s.label)),
            present(s.detail) && h('span', { class: 'flow-detail' }, rich(s.detail)),
            present(s.status) && h('span', { class: 'flow-status' }, s.status)
          ))
        )
      );
    }
    return null;
  }

  function renderCaseStudy(root, data) {
    const index = data.projects.findIndex((p) => p.slug === root.dataset.caseStudy);
    if (index === -1) throw new Error(`No project "${root.dataset.caseStudy}" in projects.json`);
    const project = data.projects[index];
    const results = visibleResults(project);
    const metrics = visibleMetrics(project);
    const tools = visibleTools(project);
    const links = visibleLinks(project);
    const roles = (project.roles || []).filter(present);

    const meta = [];
    if (present(project.when)) meta.push(h('dt', null, 'When'), h('dd', null, project.when));
    if (roles.length) meta.push(h('dt', null, 'Roles'), h('dd', null, roles.join(', ')));
    if (tools.length) meta.push(h('dt', null, 'Tools'), h('dd', null, chipList(tools)));

    const head = h('header', { class: 'case-head' },
      h('p', { class: 'eyebrow' }, [project.type, project.context, project.status].filter(present).join(' · ')),
      h('h1', null, project.title),
      present(project.tagline) && h('p', { class: 'case-tagline' }, project.tagline),
      meta.length > 0 && h('dl', { class: 'case-meta' }, meta)
    );

    const body = h('div', { class: 'case-body' });
    if (present(project.problem)) body.append(section('Problem', h('p', null, rich(project.problem))));
    if (present(project.built)) body.append(section('What I built', h('p', null, rich(project.built))));
    if (present(project.role)) body.append(section('My role', h('p', null, rich(project.role))));
    const figure = visual(project.visual);
    if (figure) body.append(figure);
    if (results.length === 1) body.append(section('Result', h('p', null, rich(results[0].text))));
    if (results.length > 1) {
      body.append(section('Result', h('ul', { class: 'result-list' }, results.map((r) => h('li', null, rich(r.text))))));
    }
    const ai = project.ai || {};
    if (present(ai.used)) body.append(section('AI use', h('p', null, [ai.used, ai.checked].filter(present).join(' '))));
    if (links.length || present(project.linksNote)) {
      body.append(section('Links',
        links.length > 0 && h('p', { class: 'link-list' }, links.map((l) => h('a', { class: 'pill-link', href: l.href }, l.label))),
        present(project.linksNote) && h('p', { class: 'muted' }, project.linksNote)
      ));
    }

    const count = data.projects.length;
    const prev = data.projects[(index - 1 + count) % count];
    const next = data.projects[(index + 1) % count];
    const nav = h('nav', { class: 'case-nav', 'aria-label': 'More projects' },
      h('a', { class: 'case-nav-prev', href: caseUrl(prev) }, h('span', { class: 'label' }, 'Previous project'), prev.title),
      h('a', { class: 'case-nav-next', href: caseUrl(next) }, h('span', { class: 'label' }, 'Next project'), next.title)
    );

    const band = metrics.length > 0 ? metricList(metrics, 'metrics-band') : null;
    root.replaceChildren(...[head, band, body, nav].filter(Boolean));
  }

  /* ---------- La IAma channel links (Home) ---------- */

  // Simple monochrome icons, drawn with plain shapes (no brand-coloured logos).
  const ICONS = {
    instagram: () => svg('0 0 24 24', [
      ['rect', { x: '3', y: '3', width: '18', height: '18', rx: '5', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8' }],
      ['circle', { cx: '12', cy: '12', r: '4', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8' }],
      ['circle', { cx: '17.3', cy: '6.7', r: '1.2', fill: 'currentColor' }],
    ]),
    tiktok: () => svg('0 0 24 24', [
      ['path', { d: 'M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round' }],
      ['path', { d: 'M14 3c.4 2.6 2.2 4.4 5 4.6', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round' }],
    ]),
    youtube: () => svg('0 0 24 24', [
      ['rect', { x: '2.5', y: '5.5', width: '19', height: '13', rx: '3.5', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8' }],
      ['path', { d: 'M10 9.2v5.6l4.8-2.8z', fill: 'currentColor' }],
    ]),
    linkedin: () => svg('0 0 24 24', [
      ['rect', { x: '3', y: '3', width: '18', height: '18', rx: '3', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8' }],
      ['path', { d: 'M8 10.5v6M8 7.5v.01M11.5 16.5v-3.5a2 2 0 0 1 4 0v3.5M11.5 10.5v6', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round' }],
    ]),
  };

  function renderChannels(root, data) {
    const channels = ((data.laIama || {}).channels || []).filter((c) => present(c.href) && present(c.label));
    if (!channels.length) return;
    root.replaceChildren(...channels.map((c) => h('li', null,
      h('a', { class: 'channel-link', href: c.href, target: '_blank', rel: 'noopener' },
        ICONS[c.icon] ? ICONS[c.icon]() : null,
        c.label,
        h('span', { class: 'visually-hidden' }, ' (opens in a new tab)')
      )
    )));
    root.hidden = false;
  }

  /* ---------- load the data once, then render whatever this page asks for ---------- */

  const RENDERERS = [
    ['[data-showcase]', renderShowcase],
    ['[data-filters]', renderFilters],
    ['[data-matrix]', renderMatrix],
    ['[data-case-study]', renderCaseStudy],
    ['[data-channels]', renderChannels],
  ];

  function boot() {
    const jobs = RENDERERS.flatMap(([selector, render]) =>
      [...document.querySelectorAll(selector)].map((node) => [node, render]));
    if (jobs.length) {
      fetch(DATA_URL, { credentials: 'same-origin' })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then((data) => {
          for (const [node, render] of jobs) {
            render(node, data);
            node.removeAttribute('aria-busy');
          }
        })
        .catch((error) => {
          console.error('Could not load projects.json:', error);
          for (const [node] of jobs) {
            if (!node.matches('[data-showcase], [data-case-study]')) continue;
            node.removeAttribute('aria-busy');
            node.replaceChildren(h('p', { class: 'load-error' },
              'The project details didn’t load. Please refresh the page, or download my résumé from the footer.'));
          }
        });
    }
    setUpCopy();
  }

  /* ---------- copy email + "Email copied" toast ----------
     Sonner's patterns, without the library: one toast updated in place
     (never stacked), 4 seconds on screen, the timer pauses while the tab is
     hidden or the toast is hovered, a click dismisses it, and it enters and
     leaves through the same edge with transitions (see site.css). */

  const TOAST_MS = 4000;
  let toastNode = null;
  let timer = 0;
  let remaining = TOAST_MS;
  let startedAt = 0;

  function hideToast() {
    clearTimeout(timer);
    toastNode.removeAttribute('data-visible');
  }
  function pauseToast() {
    if (!toastNode.hasAttribute('data-visible')) return;
    clearTimeout(timer);
    remaining -= Date.now() - startedAt;
  }
  function resumeToast() {
    if (!toastNode.hasAttribute('data-visible')) return;
    startedAt = Date.now();
    clearTimeout(timer);
    timer = setTimeout(hideToast, Math.max(remaining, 600));
  }

  function toast(message) {
    toastNode.replaceChildren(message);
    remaining = TOAST_MS;
    // next frame, so the enter transition runs even right after creation
    requestAnimationFrame(() => {
      toastNode.setAttribute('data-visible', '');
      if (document.visibilityState === 'visible') resumeToast();
    });
  }

  function legacyCopy(text) {
    const field = h('textarea', { readonly: true, 'aria-hidden': 'true', style: 'position:fixed;top:0;left:0;opacity:0;pointer-events:none' });
    field.value = text;
    document.body.append(field);
    field.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    field.remove();
    return ok;
  }

  function setUpCopy() {
    if (!document.querySelector('[data-copy]')) return;
    // The live region exists before anything is announced, so screen readers pick it up.
    toastNode = h('div', { class: 'toast', role: 'status', 'aria-live': 'polite' });
    document.body.append(toastNode);
    toastNode.addEventListener('pointerenter', pauseToast);
    toastNode.addEventListener('pointerleave', resumeToast);
    toastNode.addEventListener('click', hideToast);
    document.addEventListener('visibilitychange', () => (document.hidden ? pauseToast() : resumeToast()));

    document.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-copy]');
      if (!button) return;
      const text = button.dataset.copy;
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        ok = legacyCopy(text);
      }
      toast(ok ? 'Email copied' : `Couldn’t copy. The email is ${text}`);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
