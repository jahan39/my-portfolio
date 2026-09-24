/**
 * Rifat Hossain Portfolio - Core JavaScript
 * Features: Mobile Nav, ScrollSpy, Typing Effect, Progress Bar,
 *           Project Filter & Modal, Service Autofill, EmailJS Form
 */

document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // 1. MOBILE HAMBURGER MENU
  // =========================
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      navMenu.classList.toggle("open");
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        navMenu.classList.remove("open");
      });
    });

    // Close on resize to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        hamburger.classList.remove("open");
        navMenu.classList.remove("open");
      }
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("open");
        navMenu.classList.remove("open");
      }
    });
  }

  // =========================
  // 2. SCROLLSPY (ACTIVE NAV LINK)
  // =========================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".menu .nav-link");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const nearBottom =
      window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60;

    // If near the bottom of the page, force-activate the last nav link
    if (nearBottom) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + lastSection.getAttribute("id")) {
            link.classList.add("active");
          }
        });
      }
      return;
    }

    sections.forEach(function (section) {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // =========================
  // 3. SCROLL PROGRESS BAR
  // =========================
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    window.addEventListener("scroll", function () {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;
      progressBar.style.width = pct + "%";
    }, { passive: true });
  }

  // =========================
  // 4. BACK TO TOP BUTTON (Auto-vanish after 3s hold)
  // =========================
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    let hideTimer = null;
    let isHovering = false;

    function handleScrollBackToTop() {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;

      // Only show when scrolled past hero section (> 350px)
      if (currentScroll > 350) {
        backToTop.classList.add("show");

        // Clear previous timer on any scroll movement
        if (hideTimer) {
          clearTimeout(hideTimer);
        }

        // Auto vanish after 3 seconds of holding still
        hideTimer = setTimeout(function () {
          if (!isHovering) {
            backToTop.classList.remove("show");
          }
        }, 3000);
      } else {
        // At the top of page, hide immediately
        if (hideTimer) clearTimeout(hideTimer);
        backToTop.classList.remove("show");
      }
    }

    window.addEventListener("scroll", handleScrollBackToTop, { passive: true });

    // Prevent vanishing if user is hovering to click on desktop
    backToTop.addEventListener("mouseenter", function () {
      isHovering = true;
      if (hideTimer) clearTimeout(hideTimer);
      backToTop.classList.add("show");
    });

    backToTop.addEventListener("mouseleave", function () {
      isHovering = false;
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      if (currentScroll > 350) {
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(function () {
          backToTop.classList.remove("show");
        }, 3000);
      }
    });

    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (hideTimer) clearTimeout(hideTimer);
      backToTop.classList.remove("show");
    });
  }

  // =========================
  // 5. SCROLL ANIMATIONS
  // =========================
  const animatedElements = document.querySelectorAll("[data-animate]");
  if (animatedElements.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.getAttribute("data-delay") || "0", 10);
            setTimeout(function () {
              entry.target.classList.add("visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

      animatedElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      animatedElements.forEach(function (el) {
        el.classList.add("visible");
      });
    }
  }

  // =========================
  // 6. TYPING ANIMATION
  // =========================
  const typingTarget = document.getElementById("typing-text");
  if (typingTarget) {
    const words = [
      "Web Developer",
      "Graphic Designer",
      "UI/UX Designer"
    ];
    let wordIndex = 0;
    // Start as if first word is already typed — no glitch on load
    let charIndex = words[0].length;
    let isDeleting = false;
    let delay = 2200; // initial pause before first delete

    // Set the text immediately so there's no blank flash
    typingTarget.textContent = words[0];

    function type() {
      const current = words[wordIndex];

      if (isDeleting) {
        typingTarget.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        delay = 60;
      } else {
        typingTarget.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        delay = 120;
      }

      if (!isDeleting && charIndex === current.length) {
        delay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }

      setTimeout(type, delay);
    }

    // Delay the very first call so page finishes rendering first
    setTimeout(type, 2200);
  }

  // =========================
  // 7. PORTFOLIO FILTERING
  // =========================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(function (card) {
        const category = card.getAttribute("data-category") || "";

        if (filter === "all" || category.includes(filter)) {
          // First remove hide so the element is in the DOM (display:flex/block)
          card.classList.remove("hide");
          // Force style reset BEFORE the next paint
          card.style.transition = "none";
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          // Then on the next frame, re-enable transition and animate in
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              card.style.transition = "";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });
          });
        } else {
          card.classList.add("hide");
          card.style.opacity = "";
          card.style.transform = "";
        }
      });
    });
  });

  // =========================
  // 8. PROJECT DETAILS LIGHTBOX MODAL
  // =========================
  const projectModal = document.getElementById("project-modal");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalClose = document.getElementById("modal-close");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalTags = document.getElementById("modal-tags");
  const modalInquireBtn = document.getElementById("modal-inquire-btn");

  const projectDetails = {
    p1: {
      title: "AURA Visual Identity Suite",
      desc: "Complete corporate identity system including primary & secondary logo marks, stationery system with tactile embossing, custom brand typography guidelines, and packaging layout. Designed for an ultra-premium executive feel.",
      tags: ["Branding", "Stationery", "Packaging", "Visual Guidelines"]
    },
    p2: {
      title: "Digital Growth Campaign",
      desc: "A cohesive high-converting digital design campaign consisting of engaging carousel templates, promotional banners, and social collateral crafted to boost click-through rates and brand awareness.",
      tags: ["Social Media", "Digital Marketing", "Content Strategy"]
    },
    p3: {
      title: "Analytics SaaS Platform UI",
      desc: "Modern responsive web dashboard built with semantic HTML5, CSS3 Grid/Flexbox, and vanilla JavaScript. Features a sleek dark mode, glowing metrics data visualizations, and fluid performance across all viewport sizes.",
      tags: ["Web App", "Frontend Dev", "HTML5 & CSS3", "UI/UX"]
    },
    p4: {
      title: "Editorial Creative Direction",
      desc: "Contemporary editorial layout and poster design series exploring Swiss grid systems, bold contrast typography, and experimental visual hierarchy for print and digital exhibitions.",
      tags: ["Art Direction", "Poster Design", "Typography"]
    }
  };

  function openProjectModal(card) {
    const projectId = card.getAttribute("data-project-id");
    const data = projectDetails[projectId];
    const imgSrc = card.querySelector("img").getAttribute("src");

    if (data && projectModal) {
      modalImg.src = imgSrc;
      modalImg.alt = data.title;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;

      modalTags.innerHTML = "";
      data.tags.forEach(function (tag) {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        modalTags.appendChild(span);
      });

      projectModal.classList.add("open");
      projectModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove("open");
      projectModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  projectCards.forEach(function (card) {
    card.addEventListener("click", function () {
      openProjectModal(card);
    });
    // Keyboard accessibility: Enter or Space opens the modal
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProjectModal(card);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeProjectModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeProjectModal);
  }
  if (modalInquireBtn) {
    modalInquireBtn.addEventListener("click", function () {
      closeProjectModal();
      const subjectInput = document.getElementById("subject");
      if (subjectInput && modalTitle) {
        subjectInput.value = "Inquiry regarding " + modalTitle.textContent;
      }
      // Scroll to contact section after modal closes
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        setTimeout(function () {
          contactSection.scrollIntoView({ behavior: "smooth" });
          setTimeout(function () {
            if (subjectInput) subjectInput.focus();
          }, 600);
        }, 350); // wait for modal close animation
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && projectModal && projectModal.classList.contains("open")) {
      closeProjectModal();
    }
  });

  // =========================
  // 9. SERVICE INQUIRY AUTOFILL
  // =========================
  const serviceItems = document.querySelectorAll(".service-item");
  const subjectField = document.getElementById("subject");
  const messageField = document.getElementById("message");

  serviceItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const serviceTitle = item.getAttribute("data-service-title") || "";
      if (subjectField) {
        subjectField.value = "Inquiry: " + serviceTitle;
      }
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(function () {
          if (messageField) messageField.focus();
        }, 600);
      }
    });
  });

  // =========================
  // 10. EMAILJS CONTACT FORM
  // =========================
  if (typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: "CTcaDp_19xyfZxSfT" });
  }

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const button = contactForm.querySelector(".form-btn");
      const originalBtnHTML = button.innerHTML;

      button.disabled = true;
      button.innerHTML = "<span>Sending message...</span>";
      formStatus.textContent = "";
      formStatus.className = "";

      if (typeof emailjs === "undefined") {
        formStatus.textContent = "Thank you! Your message was received (demo mode).";
        formStatus.className = "success";
        contactForm.reset();
        button.disabled = false;
        button.innerHTML = originalBtnHTML;
        return;
      }

      emailjs.sendForm("service_g8isigb", "template_vvkimzn", contactForm)
        .then(function () {
          formStatus.textContent = "✓ Message sent successfully! I will get back to you shortly.";
          formStatus.className = "success";
          contactForm.reset();
          button.disabled = false;
          button.innerHTML = originalBtnHTML;
        })
        .catch(function (error) {
          console.error("EmailJS Error:", error);
          formStatus.textContent = "✕ Failed to send message. Please email directly at rifatofficial001@gmail.com";
          formStatus.className = "error";
          button.disabled = false;
          button.innerHTML = originalBtnHTML;
        });
    });
  }
});

// =============================================================
// HERO AURORA BACKGROUND — Demo 1 effect (works on all devices)
// =============================================================
(function () {
  const canvas = document.getElementById("hero-bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W, H, particles = [];

  // ── Reduce particle count on mobile for performance ──
  const isMobile = () => window.innerWidth < 768;

  function resize() {
    const section = canvas.parentElement;
    W = canvas.width = section.offsetWidth;
    H = canvas.height = section.offsetHeight;
  }

  // ── Floating Dust Particles ──
  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.r = Math.random() * 1.5 + 0.4;
      this.speed = Math.random() * 0.45 + 0.15;
      this.alpha = Math.random() * 0.55 + 0.2;
      this.hue = Math.random() < 0.6 ? 74 : 190; // lime-yellow or cyan
      this.drift = (Math.random() - 0.5) * 0.35;
    }
    update() {
      this.y -= this.speed;
      this.x += this.drift;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    // Mobile: fewer particles to keep 60fps
    const count = isMobile()
      ? Math.min(60, Math.floor((W * H) / 14000))
      : Math.min(180, Math.floor((W * H) / 7000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  // ── Aurora Orbs ──
  const orbs = [
    { ox: 0.15, oy: 0.35, r: 0.55, hue: 74, speed: 0.00022, phase: 0 },
    { ox: 0.78, oy: 0.55, r: 0.50, hue: 190, speed: 0.00018, phase: 2 },
    { ox: 0.50, oy: 0.18, r: 0.44, hue: 74, speed: 0.00015, phase: 4 },
    { ox: 0.88, oy: 0.22, r: 0.36, hue: 265, speed: 0.00020, phase: 1 },
  ];

  function drawAurora(ts) {
    for (const o of orbs) {
      const cx = (o.ox + Math.sin(ts * o.speed + o.phase) * 0.13) * W;
      const cy = (o.oy + Math.cos(ts * o.speed * 1.3 + o.phase) * 0.10) * H;
      const rad = o.r * Math.min(W, H);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0, `hsla(${o.hue}, 100%, 60%, 0.40)`);
      g.addColorStop(0.5, `hsla(${o.hue},  95%, 50%, 0.14)`);
      g.addColorStop(1, `hsla(${o.hue},  80%, 35%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rad, rad * 0.65, ts * 0.0001, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.045)";
    ctx.lineWidth = 1;
    const step = isMobile() ? 60 : 80;
    for (let x = 0; x <= W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y <= H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.restore();
  }

  // ── Render Loop ──
  let lastTs = 0;
  function render(ts) {
    requestAnimationFrame(render);
    if (ts - lastTs < 16) return; // cap ~60fps
    lastTs = ts;
    ctx.clearRect(0, 0, W, H);
    // Use same bg color as site root
    ctx.fillStyle = "#0c0d11";
    ctx.fillRect(0, 0, W, H);
    drawAurora(ts);
    drawGrid();
    for (const p of particles) { p.update(); p.draw(); }
  }

  // ── Init ──
  resize();
  initParticles();
  requestAnimationFrame(render);

  // Resize gracefully (debounced)
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      initParticles();
    }, 150);
  });
})();

// =============================================================
// DRAGGABLE WHATSAPP BUTTON (PC Mouse & Mobile Touch Support)
// =============================================================
function initDraggableWhatsApp() {
  const btn = document.querySelector(".whatsapp-btn");
  if (!btn) return;

  // Prevent default browser drag on links
  btn.setAttribute("draggable", "false");
  btn.addEventListener("dragstart", function (e) { e.preventDefault(); });

  let isDragging = false;
  let hasMoved = false;
  let startX = 0, startY = 0;
  let startLeft = 0, startTop = 0;

  // Restore saved position if valid
  const saved = localStorage.getItem("wa_btn_pos");
  if (saved) {
    try {
      const pos = JSON.parse(saved);
      if (typeof pos.x === "number" && typeof pos.y === "number") {
        const maxX = window.innerWidth - (btn.offsetWidth || 52) - 10;
        const maxY = window.innerHeight - (btn.offsetHeight || 52) - 10;
        const posX = Math.max(10, Math.min(maxX, pos.x));
        const posY = Math.max(10, Math.min(maxY, pos.y));
        btn.style.left = posX + "px";
        btn.style.top = posY + "px";
        btn.style.right = "auto";
        btn.style.bottom = "auto";
      }
    } catch (e) { }
  }

  function onPointerDown(e) {
    // Only primary button (left mouse click) or touch
    if (e.button !== undefined && e.button !== 0) return;

    isDragging = true;
    hasMoved = false;
    startX = e.clientX;
    startY = e.clientY;

    const rect = btn.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;

    btn.classList.add("dragging");
    try {
      btn.setPointerCapture(e.pointerId);
    } catch (err) { }
  }

  function onPointerMove(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // 5px threshold to separate drag from click
    if (!hasMoved && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      hasMoved = true;
    }

    if (hasMoved) {
      const btnW = btn.offsetWidth || 52;
      const btnH = btn.offsetHeight || 52;
      const minX = 8;
      const maxX = window.innerWidth - btnW - 8;
      const minY = 8;
      const maxY = window.innerHeight - btnH - 8;

      let targetX = startLeft + deltaX;
      let targetY = startTop + deltaY;

      targetX = Math.max(minX, Math.min(maxX, targetX));
      targetY = Math.max(minY, Math.min(maxY, targetY));

      btn.style.left = targetX + "px";
      btn.style.top = targetY + "px";
      btn.style.right = "auto";
      btn.style.bottom = "auto";
    }
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    btn.classList.remove("dragging");

    try {
      btn.releasePointerCapture(e.pointerId);
    } catch (err) { }

    if (hasMoved) {
      // Save position
      const rect = btn.getBoundingClientRect();
      try {
        localStorage.setItem("wa_btn_pos", JSON.stringify({ x: rect.left, y: rect.top }));
      } catch (err) { }

      // Suppress opening WhatsApp link after drag
      const suppress = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
      };
      btn.addEventListener("click", suppress, { capture: true, once: true });
      setTimeout(function () {
        hasMoved = false;
      }, 100);
    }
  }

  btn.addEventListener("pointerdown", onPointerDown);

  // pointermove must be non-passive so we can cancel page scroll during drag
  window.addEventListener("pointermove", function (e) {
    if (isDragging) {
      onPointerMove(e);
    }
  });

  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);

  // Prevent page from scrolling under the finger while dragging on mobile
  btn.addEventListener("touchmove", function (e) {
    if (isDragging) e.preventDefault();
  }, { passive: false });

  // Keep inside viewport on window resize / orientation change
  window.addEventListener("resize", function () {
    if (btn.style.left && btn.style.left !== "auto") {
      const rect = btn.getBoundingClientRect();
      const maxX = window.innerWidth - (btn.offsetWidth || 52) - 8;
      const maxY = window.innerHeight - (btn.offsetHeight || 52) - 8;
      if (rect.left > maxX || rect.top > maxY) {
        btn.style.left = Math.max(8, Math.min(maxX, rect.left)) + "px";
        btn.style.top = Math.max(8, Math.min(maxY, rect.top)) + "px";
      }
    }
  });
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDraggableWhatsApp);
} else {
  initDraggableWhatsApp();
}