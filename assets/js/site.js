/* ==========================================================================
   site.js — renders /projects.json into the pages and adds the few
   interactions (copy email + toast). Plain JavaScript, no libraries.

   The one rule: any value in projects.json that contains "[FILL" is still
   missing, so it is hidden from the public site. TODO.md lists them.

   Pages ask for content with data attributes:
     data-projects="home|all"   project cards        (Home, Projects)
     data-also                  "Also: ..." links    (Home)
     data-coming-soon           coming-soon note     (Projects, Quest Log)
     data-case-study="slug"     one case study       (projects/<slug>.html)
     data-quest-log             the five stages      (Quest Log)
     data-quest-progress        progress meter       (Quest Log)
     data-quest-summary         "Stage 1 of 5 ..."   (Home)
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

  const stripeTag = () => h('span', { class: 'stripe-tag', 'aria-hidden': 'true' });
  const projectUrl = (project) => `/projects/${project.slug}.html`;
  const visibleResults = (project) => (project.results || []).filter((r) => present(r.text));
  const visibleMetrics = (project) => visibleResults(project).filter((r) => present(r.metric) && present(r.label));
  const visibleTools = (project) => (project.tools || []).filter(present);

  function eyebrow(project) {
    return h('p', { class: 'eyebrow' },
      project.featured && stripeTag(),
      project.featured ? `Featured · ${project.context}` : project.context,
      present(project.status) && h('span', { class: 'status' }, project.status)
    );
  }

  function metricList(metrics, extraClass) {
    return h('ul', { class: `metrics${extraClass ? ` ${extraClass}` : ''}`, role: 'list' },
      metrics.map((m) => h('li', { class: 'metric' },
        h('span', { class: 'v' }, metricValue(m.metric)),
        h('span', { class: 'l' }, m.label)
      ))
    );
  }

  function chipList(tools) {
    if (!tools.length) return null;
    return h('ul', { class: 'chips', role: 'list', 'aria-label': 'Tools' },
      tools.map((tool) => h('li', { class: 'chip' }, tool)));
  }

  /* ---------- project cards (Home, Projects) ---------- */

  // A small version of the case-study diagram for the featured card. It reads
  // the same flow steps, using each step's short label when it has one.
  // BRAND §5: grey context, one inferno highlight, every step labeled.
  function miniFlow(v) {
    if (!v || v.type !== 'flow') return null;
    const steps = (v.steps || []).filter((s) => present(s.label));
    if (steps.length < 2 || steps.length > 4) return null;
    return h('figure', { class: 'flow-mini' },
      h('figcaption', { class: 'label' }, v.title || 'How it works'),
      h('ol', { role: 'list' },
        steps.map((s) => h('li', { class: s.highlight ? 'is-highlight' : null }, rich(present(s.short) ? s.short : s.label)))
      )
    );
  }

  function projectCard(project, headingTag) {
    const metrics = visibleMetrics(project);
    const results = visibleResults(project);

    const title = h(headingTag, { class: 'card-title' }, h('a', { href: projectUrl(project) }, project.title));
    const heading = h('div', null, title, present(project.tagline) && h('p', { class: 'tagline' }, project.tagline));
    const summary = present(project.summary) && h('p', { class: 'summary' }, rich(project.summary));
    const chips = chipList(visibleTools(project));
    const more = h('span', { class: 'more', 'aria-hidden': 'true' }, 'Read the case study →');

    let result = null;
    if (metrics.length) {
      result = h('div', { class: 'result' }, h('p', { class: 'label' }, 'Result'), metricList(metrics));
    } else if (results.length) {
      result = h('div', { class: 'result' }, h('p', { class: 'label' }, 'Result'), h('p', null, rich(results[0].text)));
    }

    const card = h('article', { class: `project-card${project.featured ? ' is-featured' : ''}` });
    if (project.featured) {
      card.append(
        h('div', { class: 'card-main' }, eyebrow(project), heading, summary, chips),
        h('div', { class: 'card-side' }, result, miniFlow(project.visual), more)
      );
    } else {
      card.append(...[eyebrow(project), heading, summary, result, chips, more].filter(Boolean));
    }
    return card;
  }

  function renderCards(root, data) {
    const scope = root.dataset.projects;
    const headingTag = root.dataset.heading || 'h3';
    const projects = data.projects.filter((p) => scope !== 'home' || p.home);
    root.replaceChildren(...projects.map((p) => projectCard(p, headingTag)));
  }

  function renderAlso(root, data) {
    const others = data.projects.filter((p) => !p.home);
    if (!others.length) return;
    const links = [];
    others.forEach((p, i) => {
      if (i > 0) links.push(' · ');
      links.push(h('a', { href: projectUrl(p) }, p.title));
    });
    root.replaceChildren('Also: ', ...links);
    root.hidden = false;
  }

  function renderComingSoon(root, data) {
    if (!present(data.comingSoon)) return;
    const text = root.querySelector('[data-coming-soon-text]') || root;
    text.textContent = data.comingSoon;
    root.hidden = false;
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
    const links = (project.links || []).filter((l) => present(l.href) && present(l.label));

    const meta = [];
    if (present(project.when)) meta.push(h('dt', null, 'When'), h('dd', null, project.when));
    if (tools.length) meta.push(h('dt', null, 'Tools'), h('dd', null, chipList(tools)));

    // The card summary isn't repeated here: the sections below tell the story.
    const head = h('header', { class: 'case-head' },
      eyebrow(project),
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
    if (links.length || present(project.linksNote)) {
      body.append(section('Links',
        links.length > 0 && h('p', { class: 'link-list' }, links.map((l) => h('a', { href: l.href }, l.label))),
        present(project.linksNote) && h('p', { class: 'muted' }, project.linksNote)
      ));
    }

    const count = data.projects.length;
    const prev = data.projects[(index - 1 + count) % count];
    const next = data.projects[(index + 1) % count];
    const nav = h('nav', { class: 'case-nav', 'aria-label': 'More projects' },
      h('a', { class: 'case-nav-prev', href: projectUrl(prev) }, h('span', { class: 'label' }, '← Previous'), prev.title),
      h('a', { class: 'case-nav-next', href: projectUrl(next) }, h('span', { class: 'label' }, 'Next →'), next.title)
    );

    const band = metrics.length > 0 ? metricList(metrics, 'metrics-band') : null;
    root.replaceChildren(...[head, band, body, nav].filter(Boolean));
  }

  /* ---------- Quest Log ---------- */

  const QUEST_STATUS = { done: 'Done', 'in-progress': 'In progress', locked: 'Locked' };
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function icon(paths) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.5');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    for (const d of paths) {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', d);
      svg.append(path);
    }
    return svg;
  }
  const lockIcon = () => icon(['M4.5 7.5h7v6h-7z', 'M6 7.5V5.5a2 2 0 0 1 4 0v2']);
  const checkIcon = () => icon(['M3.5 8.5l3 3 6-7']);

  function bossNode(boss) {
    if (present(boss) && typeof boss === 'string') return boss;
    if (boss && typeof boss === 'object' && present(boss.title)) {
      return present(boss.href) ? h('a', { href: boss.href }, boss.title) : boss.title;
    }
    return null;
  }

  function renderQuestLog(root, data) {
    root.replaceChildren(...data.questLog.stages.map((stage) => {
      const boss = bossNode(stage.boss);
      const meta = [stage.provider, stage.when].filter(present).join(' · ');
      const badge = stage.status === 'in-progress' ? stripeTag()
        : stage.status === 'done' ? checkIcon()
        : lockIcon();
      return h('li', { class: `quest is-${stage.status}` },
        h('span', { class: 'quest-num', 'aria-hidden': 'true' }, String(stage.stage).padStart(2, '0')),
        h('div', { class: 'quest-body' },
          h('h2', { class: 'quest-title' }, h('span', { class: 'visually-hidden' }, `Stage ${stage.stage}: `), stage.title),
          meta && h('p', { class: 'quest-meta' }, meta),
          boss && h('p', { class: 'quest-boss' }, h('span', { class: 'label' }, 'Boss project'), boss)
        ),
        h('p', { class: 'quest-status' }, badge, QUEST_STATUS[stage.status] || stage.status)
      );
    }));
  }

  function renderQuestProgress(root, data) {
    const stages = data.questLog.stages;
    const done = stages.filter((s) => s.status === 'done').length;
    const current = stages.find((s) => s.status === 'in-progress');
    root.replaceChildren(
      h('div', { class: 'quest-meter', 'aria-hidden': 'true' }, stages.map((s) => h('span', { class: `seg is-${s.status}` }))),
      h('p', { class: 'label' }, `${done} of ${stages.length} bosses defeated${current ? ` · now on stage ${current.stage}` : ''}`)
    );
  }

  function renderQuestSummary(root, data) {
    const stages = data.questLog.stages;
    const current = stages.find((s) => s.status === 'in-progress');
    const done = stages.filter((s) => s.status === 'done').length;
    root.textContent = current
      ? `Stage ${current.stage} of ${stages.length} in progress`
      : `${done} of ${stages.length} stages done`;
  }

  /* ---------- load the data once, then render whatever this page asks for ---------- */

  const RENDERERS = [
    ['[data-projects]', renderCards],
    ['[data-also]', renderAlso],
    ['[data-coming-soon]', renderComingSoon],
    ['[data-case-study]', renderCaseStudy],
    ['[data-quest-log]', renderQuestLog],
    ['[data-quest-progress]', renderQuestProgress],
    ['[data-quest-summary]', renderQuestSummary],
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
            if (!node.matches('[data-projects], [data-case-study], [data-quest-log]')) continue;
            node.removeAttribute('aria-busy');
            node.replaceChildren(h('p', { class: 'load-error' },
              'The project details didn’t load. Please refresh the page, or download my résumé from the footer.'));
          }
        });
    }
    setUpCopy();
  }

  /* ---------- copy email + "Email copied" toast ---------- */

  let toastNode = null;
  let toastTimer = 0;

  function toast(message) {
    toastNode.replaceChildren(stripeTag(), message);
    // next frame, so the enter transition runs even right after creation
    requestAnimationFrame(() => toastNode.setAttribute('data-visible', ''));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastNode.removeAttribute('data-visible'), 2200);
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
