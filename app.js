/**
 * Portafolio: tema claro/oscuro, idioma ES/EN y comportamiento de UI.
 * Sin dependencias externas. Contenido en data.js, textos en i18n.js.
 */
(function () {
    'use strict';

    var data = window.PORTFOLIO_DATA || {};
    var dictionary = window.PORTFOLIO_I18N || {};
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lang = 'es';
    var closeDrawerFn = null;

    function $(selector, root) {
        return (root || document).querySelector(selector);
    }

    function $$(selector, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(selector));
    }

    function esc(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
        });
    }

    /** Texto de interfaz con fallback a ES y a la propia clave. */
    function tr(key) {
        var current = dictionary[lang] || {};
        var spanish = dictionary.es || {};
        return current[key] || spanish[key] || key;
    }

    /** Valor de contenido que puede ser string o { es, en }. */
    function t(value) {
        if (value && typeof value === 'object') {
            return value[lang] || value.es || '';
        }
        return value == null ? '' : value;
    }

    /* ---------- Tema ---------- */

    function setupTheme() {
        var button = $('#themeToggle');
        if (!button) return;
        var icon = $('i', button);

        function apply(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            try { localStorage.setItem('portfolio-theme', theme); } catch (error) { /* modo privado */ }

            var isLight = theme === 'light';
            if (icon) icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            button.setAttribute('aria-pressed', String(isLight));
            var label = isLight ? tr('controls.themeToDark') : tr('controls.themeToLight');
            button.setAttribute('aria-label', label);
            button.setAttribute('title', label);

            var meta = $('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', isLight ? '#f7f8fa' : '#0a0c11');
        }

        apply(document.documentElement.getAttribute('data-theme') || 'dark');

        button.addEventListener('click', function () {
            var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            apply(next);
        });

        // Re-aplica los textos del botón cuando cambia el idioma.
        button.refreshLabels = function () {
            apply(document.documentElement.getAttribute('data-theme') || 'dark');
        };
    }

    /* ---------- Idioma ---------- */

    function applyStaticTranslations() {
        $$('[data-i18n]').forEach(function (el) {
            el.textContent = tr(el.getAttribute('data-i18n'));
        });
        $$('[data-i18n-placeholder]').forEach(function (el) {
            el.setAttribute('placeholder', tr(el.getAttribute('data-i18n-placeholder')));
        });
        $$('[data-i18n-alt]').forEach(function (el) {
            el.setAttribute('alt', tr(el.getAttribute('data-i18n-alt')));
        });
        $$('[data-i18n-aria]').forEach(function (el) {
            el.setAttribute('aria-label', tr(el.getAttribute('data-i18n-aria')));
        });

        document.title = tr('meta.title');
        function meta(selector, key) {
            var el = $(selector);
            if (el) el.setAttribute('content', tr(key));
        }
        meta('meta[name="description"]', 'meta.description');
        meta('meta[property="og:title"]', 'meta.ogTitle');
        meta('meta[property="og:description"]', 'meta.ogDescription');
        meta('meta[name="twitter:description"]', 'meta.twitterDescription');

        var locale = $('meta[property="og:locale"]');
        if (locale) locale.setAttribute('content', lang === 'es' ? 'es_ES' : 'en_US');

        var themeToggle = $('#themeToggle');
        if (themeToggle && themeToggle.refreshLabels) themeToggle.refreshLabels();

        var menuToggle = $('#menuToggle');
        if (menuToggle && menuToggle.refreshLabels) menuToggle.refreshLabels();

        var langToggle = $('#langToggle');
        if (langToggle) {
            var label = $('#langToggleLabel');
            if (label) label.textContent = tr('controls.langLabel');
            var targetLabel = lang === 'es' ? tr('controls.langToEn') : tr('controls.langToEs');
            langToggle.setAttribute('aria-label', targetLabel);
            langToggle.setAttribute('title', targetLabel);
            langToggle.setAttribute('aria-pressed', String(lang === 'en'));
        }
    }

    function setupLanguage() {
        var toggle = $('#langToggle');
        if (!toggle) return;

        try {
            var stored = localStorage.getItem('portfolio-lang');
            if (stored === 'es' || stored === 'en') lang = stored;
        } catch (error) { /* modo privado */ }

        function apply(nextLang) {
            lang = nextLang;
            try { localStorage.setItem('portfolio-lang', lang); } catch (error) { /* modo privado */ }
            document.documentElement.setAttribute('lang', lang);

            if (typeof closeDrawerFn === 'function') closeDrawerFn();
            renderAll();
            applyStaticTranslations();
        }

        toggle.addEventListener('click', function () {
            apply(lang === 'es' ? 'en' : 'es');
        });

        apply(lang);
    }

    /* ---------- Render de contenido ---------- */

    function skillTileMarkup(skill) {
        var icon = skill.icon
            ? '<img class="skill-logo' + (skill.invert ? ' invert' : '') + '" src="' + esc(skill.icon) +
              '" alt="" width="19" height="19" loading="lazy">'
            : skill.fa
                ? '<i class="' + esc(skill.fa) + ' skill-fa" aria-hidden="true"></i>'
                : '';

        return '<li class="skill-tile">' +
            '<span class="skill-icon-wrap" aria-hidden="true">' +
            '<span class="skill-mark">' + esc(skill.mark) + '</span>' + icon +
            '</span>' + esc(t(skill.name)) + '</li>';
    }

    function renderSkills() {
        var grid = $('#skillsGrid');
        if (!grid || !Array.isArray(data.skills)) return;

        grid.innerHTML = data.skills.map(function (group, index) {
            var items = Array.isArray(group.items) ? group.items : [];
            return '<article class="skill-group reveal" style="--delay:' + (index * 70) + 'ms">' +
                '<div class="group-head">' +
                '<span class="group-index">0' + (index + 1) + '</span>' +
                '<h3>' + esc(t(group.title)) + '</h3>' +
                '<span class="group-count">' + items.length + '</span>' +
                '</div>' +
                (group.description ? '<p class="group-description">' + esc(t(group.description)) + '</p>' : '') +
                '<ul class="skill-list">' + items.map(skillTileMarkup).join('') + '</ul>' +
                '</article>';
        }).join('');

        $$('.skill-logo', grid).forEach(function (img) {
            img.addEventListener('error', function () { img.hidden = true; });
        });
    }

    function renderProjects() {
        var grid = $('#projectGrid');
        if (!grid || !Array.isArray(data.projects)) return;

        grid.innerHTML = data.projects.map(function (project, index) {
            var tags = Array.isArray(project.tags) ? project.tags : [];
            return '<article class="project-card reveal" style="--delay:' + (index * 80) + 'ms">' +
                '<div class="card-media">' +
                '<span class="card-number">0' + (index + 1) + '</span>' +
                '<img src="' + esc(project.image) + '" alt="' + esc(t(project.alt) || project.name) +
                '" width="' + esc(project.imageWidth || 1200) + '" height="' + esc(project.imageHeight || 750) +
                '" loading="lazy" decoding="async">' +
                '</div>' +
                '<div class="card-body">' +
                '<h3 class="card-title">' + esc(project.name) + '</h3>' +
                '<p class="card-summary">' + esc(t(project.summary)) + '</p>' +
                '<ul class="card-tags">' + tags.map(function (tag) {
                    return '<li>' + esc(tag) + '</li>';
                }).join('') + '</ul>' +
                '<div class="card-footer">' +
                '<div class="card-actions">' +
                '<button class="card-link" type="button" data-project="' + esc(project.id) + '">' +
                esc(tr('projects.details')) + ' <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>' +
                (project.repoUrl
                    ? '<a class="card-repo" href="' + esc(project.repoUrl) + '" target="_blank"' +
                      ' rel="noopener noreferrer" aria-label="' + esc(project.name + ' · ' + tr('projects.repo')) + '">' +
                      '<i class="fa-brands fa-github" aria-hidden="true"></i> ' + esc(tr('projects.repo')) + '</a>'
                    : '') +
                '</div>' +
                '<span class="card-arrow">[ 0' + (index + 1) + ' ]</span>' +
                '</div></div></article>';
        }).join('');
    }

    function renderTimeline() {
        var list = $('#timeline');
        if (!list || !Array.isArray(data.timeline)) return;

        list.innerHTML = data.timeline.map(function (entry, index) {
            var date = t(entry.date);
            return '<article class="timeline-item reveal" style="--delay:' + (index * 60) + 'ms">' +
                '<span class="timeline-marker" aria-hidden="true"></span>' +
                '<div class="timeline-meta">' +
                '<span class="timeline-type">' + esc(t(entry.type)) + '</span>' +
                (date ? '<span class="timeline-date">' + esc(date) + '</span>' : '') +
                (entry.provisional ? '<span class="badge-provisional">' + esc(tr('experience.provisional')) + '</span>' : '') +
                '</div>' +
                '<h3 class="timeline-title">' + esc(t(entry.title)) + '</h3>' +
                '<p class="timeline-org">' + esc(t(entry.org)) + '</p>' +
                '<p class="timeline-desc">' + esc(t(entry.description)) + '</p>' +
                '</article>';
        }).join('');
    }

    function renderProfileDetails() {
        var availability = $('#availability');
        if (availability && data.profile && data.profile.availability) {
            $('#availabilityText').textContent = t(data.profile.availability);
            availability.hidden = false;
        } else if (availability) {
            availability.hidden = true;
        }
        var year = $('#currentYear');
        if (year) year.textContent = String(new Date().getFullYear());
    }

    function renderAll() {
        renderSkills();
        renderProjects();
        renderTimeline();
        renderProfileDetails();
        setupReveal();
    }

    /* ---------- Reveal al hacer scroll ---------- */

    function setupReveal() {
        var targets = $$('.reveal:not(.is-observed)');
        if (!targets.length) return;
        targets.forEach(function (el) { el.classList.add('is-observed'); });

        if (reduceMotion || !('IntersectionObserver' in window)) {
            targets.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        targets.forEach(function (el) { observer.observe(el); });
    }

    /* ---------- Header, progreso y sección activa ---------- */

    function setupScrollUI() {
        var header = $('#siteHeader');
        var progress = $('#scrollProgress');
        var sections = $$('main section[id]');
        var navLinks = $$('.desktop-nav a, .mobile-nav a:not(.btn)');
        var ticking = false;

        function update() {
            var y = window.pageYOffset || document.documentElement.scrollTop;
            var max = document.documentElement.scrollHeight - window.innerHeight;

            if (header) header.classList.toggle('is-scrolled', y > 24);
            if (progress) progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

            var active = sections.length ? sections[0].id : '';
            sections.forEach(function (section) {
                if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
                    active = section.id;
                }
            });
            navLinks.forEach(function (link) {
                if (link.getAttribute('href') === '#' + active) link.setAttribute('aria-current', 'true');
                else link.removeAttribute('aria-current');
            });

            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });

        window.addEventListener('resize', update);
        update();
    }

    /* ---------- Menú móvil ---------- */

    function setupMobileNav() {
        var toggle = $('#menuToggle');
        var nav = $('#mobileNav');
        if (!toggle || !nav) return;

        function setOpen(open) {
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', tr(open ? 'nav.closeMenu' : 'nav.openMenu'));
            nav.hidden = !open;
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        $$('a', nav).forEach(function (link) {
            link.addEventListener('click', function () { setOpen(false); });
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1080) setOpen(false);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
                toggle.focus();
            }
        });

        // El texto del botón también se traduce.
        toggle.refreshLabels = function () {
            setOpen(toggle.getAttribute('aria-expanded') === 'true');
        };
    }

    /* ---------- Panel lateral de proyectos ---------- */

    function setupDrawer() {
        var drawer = $('#projectDrawer');
        var overlay = $('#drawerOverlay');
        var closeButton = $('#drawerClose');
        var body = $('#drawerBody');
        var indexLabel = $('#drawerIndex');
        if (!drawer || !overlay || !closeButton || !body) return;

        var lastFocused = null;

        function drawerLinks(project) {
            var links = '';
            if (project.repoUrl) {
                links += '<a class="btn btn-sm btn-outline" href="' + esc(project.repoUrl) +
                    '" target="_blank" rel="noopener noreferrer">' + esc(tr('drawer.repo')) +
                    ' <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>';
            }
            if (project.demoUrl) {
                links += '<a class="btn btn-sm btn-outline" href="' + esc(project.demoUrl) +
                    '" target="_blank" rel="noopener noreferrer">' + esc(tr('drawer.demo')) +
                    ' <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>';
            }
            if (data.profile && data.profile.github) {
                links += '<a class="btn btn-sm btn-outline" href="' + esc(data.profile.github) +
                    '" target="_blank" rel="noopener noreferrer">' + esc(tr('drawer.github')) +
                    ' <i class="fa-brands fa-github" aria-hidden="true"></i></a>';
            }

            var note = (!project.repoUrl && !project.demoUrl)
                ? '<p class="drawer-note">' + esc(tr('drawer.noLinks')) + '</p>'
                : '';
            return '<div class="drawer-links">' + links + '</div>' + note;
        }

        function open(projectId) {
            var projects = Array.isArray(data.projects) ? data.projects : [];
            var position = -1;
            for (var i = 0; i < projects.length; i += 1) {
                if (projects[i].id === projectId) { position = i; break; }
            }
            if (position === -1) return;

            var project = projects[position];
            var features = Array.isArray(project.features) ? project.features : [];
            var tags = Array.isArray(project.tags) ? project.tags : [];
            lastFocused = document.activeElement;

            // Misma captura en tarjeta y panel; el CSS evita recortes y zoom.
            var fullImage = project.image;
            var fullWidth = project.imageWidth || 1200;
            var fullHeight = project.imageHeight || 750;

            indexLabel.textContent = tr('drawer.project') + ' 0' + (position + 1) + ' / 0' + projects.length;
            body.innerHTML =
                '<figure class="drawer-figure"><img src="' + esc(fullImage) + '" alt="' +
                esc(t(project.alt) || project.name) + '" width="' + esc(fullWidth) +
                '" height="' + esc(fullHeight) + '" loading="eager" decoding="async"></figure>' +
                '<h2 class="drawer-title" id="drawerTitle">' + esc(project.name) + '</h2>' +
                '<p class="drawer-summary" id="drawerSummary">' + esc(t(project.summary)) + '</p>' +
                '<section class="drawer-section"><h3>' + esc(tr('drawer.features')) + '</h3>' +
                '<ul class="feature-list">' + features.map(function (feature) {
                    return '<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>' +
                        esc(t(feature)) + '</span></li>';
                }).join('') + '</ul></section>' +
                '<section class="drawer-section"><h3>' + esc(tr('drawer.technologies')) + '</h3>' +
                '<ul class="drawer-tags">' + tags.map(function (tag) {
                    return '<li>' + esc(tag) + '</li>';
                }).join('') + '</ul></section>' +
                '<section class="drawer-section"><h3>' + esc(tr('drawer.links')) + '</h3>' + drawerLinks(project) + '</section>';

            overlay.hidden = false;
            drawer.hidden = false;
            document.body.style.overflow = 'hidden';

            window.requestAnimationFrame(function () {
                overlay.classList.add('is-open');
                drawer.classList.add('is-open');
                closeButton.focus();
            });
        }

        function close() {
            if (drawer.hidden) return;
            overlay.classList.remove('is-open');
            drawer.classList.remove('is-open');
            document.body.style.overflow = '';

            function finish() {
                overlay.hidden = true;
                drawer.hidden = true;
            }
            if (reduceMotion) finish();
            else window.setTimeout(finish, 380);

            if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
        }

        closeDrawerFn = close;

        document.addEventListener('click', function (event) {
            var trigger = event.target.closest('[data-project]');
            if (trigger) open(trigger.getAttribute('data-project'));
        });

        closeButton.addEventListener('click', close);
        overlay.addEventListener('click', close);

        document.addEventListener('keydown', function (event) {
            if (drawer.hidden) return;

            if (event.key === 'Escape') {
                close();
                return;
            }
            if (event.key !== 'Tab') return;

            var focusable = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', drawer)
                .filter(function (el) { return el.offsetParent !== null; });
            if (!focusable.length) return;

            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    }

    /* ---------- Formulario de contacto (mailto real) ---------- */

    function setupContactForm() {
        var form = $('#contactForm');
        if (!form) return;
        var status = $('#formStatus');

        var rules = {
            name: function (value) {
                return value.trim().length >= 2 ? '' : tr('contact.errorName');
            },
            email: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : tr('contact.errorEmail');
            },
            message: function (value) {
                return value.trim().length >= 10 ? '' : tr('contact.errorMessage');
            },
        };

        function validateField(name) {
            var input = form.elements[name];
            var error = $('#error' + name.charAt(0).toUpperCase() + name.slice(1));
            if (!input || !error) return false;
            var message = rules[name](input.value);
            error.textContent = message;
            input.closest('.field').classList.toggle('has-error', Boolean(message));
            input.setAttribute('aria-invalid', message ? 'true' : 'false');
            return !message;
        }

        Object.keys(rules).forEach(function (name) {
            var input = form.elements[name];
            input.addEventListener('input', function () {
                if (input.closest('.field').classList.contains('has-error')) validateField(name);
            });
            input.addEventListener('blur', function () { validateField(name); });
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var invalid = Object.keys(rules).filter(function (name) { return !validateField(name); });

            if (invalid.length) {
                status.textContent = tr('contact.invalid');
                form.elements[invalid[0]].focus();
                return;
            }
            if (status.textContent) status.textContent = '';

            var name = form.elements.name.value.trim();
            var email = form.elements.email.value.trim();
            var subject = form.elements.subject.value.trim();
            var message = form.elements.message.value.trim();

            var mailto = 'mailto:billysmithbro@gmail.com' +
                '?subject=' + encodeURIComponent(subject || tr('contact.subjectMail') + name) +
                '&body=' + encodeURIComponent('Nombre / Name: ' + name + '\nCorreo / Email: ' + email + '\n\n' + message);

            status.textContent = tr('contact.opening');
            window.location.href = mailto;
        });
    }

    /* ---------- Inicio ---------- */

    function init() {
        setupTheme();
        setupLanguage();
        setupScrollUI();
        setupMobileNav();
        setupDrawer();
        setupContactForm();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
