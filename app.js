/* ===== ELDER CARE - APP.JS ===== */
document.addEventListener('DOMContentLoaded', () => {
  // === Dark Mode ===
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  
  const moonIcon = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  const sunIcon = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

  document.querySelectorAll('.dark-toggle').forEach(btn => {
    btn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      document.querySelectorAll('.dark-toggle').forEach(b => b.innerHTML = next === 'dark' ? sunIcon : moonIcon);
    });
  });

  // === RTL Toggle ===
  const dir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', dir);
  
  document.querySelectorAll('.rtl-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir');
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('dir', next);
    });
  });

  // === Header Scroll ===
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // === Hamburger Menu ===
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // === Scroll Animations ===
  const animateEls = document.querySelectorAll('.animate');
  if (animateEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animateEls.forEach(el => observer.observe(el));
  }

  // === Password Toggle ===
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });

  // === Counter Animation ===
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current).toLocaleString() + suffix;
          }, 16);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

  // === AJAX Contact Form ===
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate AJAX request
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
        showToast('Message sent successfully! We\'ll get back to you soon.');
      }, 1500);
    });
  }

  // === Login Form ===
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Login successful! Redirecting...');
      setTimeout(() => window.location.href = 'user-dashboard.html', 1500);
    });
  }

  // === Register Form ===
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pw = registerForm.querySelector('#password').value;
      const cpw = registerForm.querySelector('#confirmPassword').value;
      if (pw !== cpw) {
        showToast('Passwords do not match!', true);
        return;
      }
      showToast('Account created! Redirecting to login...');
      setTimeout(() => window.location.href = 'login.html', 1500);
    });
  }

  // === Mock Dashboard Chart Bars ===
  const mockBars = document.querySelectorAll('.mock-bar');
  if (mockBars.length) {
    const heights = [60, 80, 45, 90, 70, 55, 85, 40, 75, 65, 50, 95];
    mockBars.forEach((bar, i) => {
      setTimeout(() => {
        bar.style.height = (heights[i] || 50) + '%';
      }, i * 100);
    });
  }

  // === Sidebar Mobile Toggle ===
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  // === Active Nav Highlight ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .sidebar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
  // === Back to Top ===
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // === Dashboard Navigation ===
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a[data-section]');
  const dashSections = document.querySelectorAll('.dash-section-content');
  
  if (sidebarLinks.length && dashSections.length) {
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSectionId = link.getAttribute('data-section');
        const targetSection = document.getElementById(targetSectionId);
        
        if (targetSection) {
          // Update active link
          sidebarLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          
          // Update visible section
          dashSections.forEach(s => s.classList.remove('active'));
          targetSection.classList.add('active');

          // Update Topbar Title
          const topbarTitle = document.querySelector('.topbar-title');
          if (topbarTitle) {
            topbarTitle.textContent = link.textContent.trim().replace(/[^\w\s]/gi, '');
          }

          // Close sidebar on mobile
          const sidebar = document.querySelector('.sidebar');
          const hamburger = document.querySelector('.hamburger');
          if (sidebar && window.innerWidth <= 991) {
            sidebar.classList.remove('open');
          }
        }
      });
    });
  }
});

// === Toast Notification ===
function showToast(msg, isError = false) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast' + (isError ? ' error' : '');
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
