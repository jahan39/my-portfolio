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
  // 4. BACK TO TOP BUTTON
  // =========================
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }, { passive: true });

    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      "Graphic Designer",
      "Web Developer",
      "Brand Identity Specialist",
      "UI/UX Designer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 120;

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

    type();
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
          card.classList.remove("hide");
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(function () {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.classList.add("hide");
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