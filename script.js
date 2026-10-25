document.addEventListener("DOMContentLoaded", () => {
  const progress = document.getElementById("scrollProgress");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const toast = document.getElementById("toast");

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const open =
      menuToggle.getAttribute("aria-expanded") !== "true";

    menuToggle.setAttribute("aria-expanded", String(open));
    nav?.classList.toggle("open", open);

    menuToggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  // Scroll progress bar
  function updateProgress() {
    if (!progress) return;

    const max =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage =
      max > 0 ? (window.scrollY / max) * 100 : 0;

    progress.style.width = `${percentage}%`;
  }

  window.addEventListener("scroll", updateProgress, {
    passive: true
  });

  updateProgress();

  // Animated hero headline
  const typeTarget = document.getElementById("typewriter");

  const phrases = [
    "smart solutions.",
    "digital products.",
    "intelligent systems."
  ];

  if (
    typeTarget &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    let phraseIndex = 0;

    window.setInterval(() => {
      phraseIndex = (phraseIndex + 1) % phrases.length;

      typeTarget.animate(
        [
          { opacity: 0, transform: "translateY(7px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 420,
          easing: "ease-out"
        }
      );

      typeTarget.textContent = phrases[phraseIndex];
    }, 3200);
  }

  // Reveal elements when scrolling
  const revealItems = document.querySelectorAll(".reveal");

  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => {
      item.classList.add("is-visible");
    });
  }

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(item => {
        item.classList.toggle("active", item === button);
      });

      const category = button.dataset.filter;

      projectCards.forEach(card => {
        const show =
          category === "all" ||
          card.dataset.category === category;

        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Project information
  const projects = {
    "smart-signal": {
      category: "Artificial intelligence · Accessibility",
      title: "Smart Signal",
      description:
        "A computer-vision mobile concept that detects sign language " +
        "and translates it into real-time text and synthesized speech. " +
        "The experience is designed to make everyday communication " +
        "more accessible.",
      tech: [
        "Computer Vision",
        "PyTorch",
        "Text-to-Speech",
        "Mobile"
      ]
    },

    "mykey": {
      category: "Marketplace · Enterprise",
      title: "MyKey Platform",
      description:
        "A digital marketplace concept connecting users around " +
        "real-estate and automotive opportunities, with an emphasis " +
        "on verified listings and secure interactions.",
      tech: [
        "Microservices",
        "PostgreSQL",
        "Security",
        "Marketplace"
      ]
    },

    "sada": {
      category: "Education technology",
      title: "Sada E-Learning",
      description:
        "A virtual learning platform concept featuring interactive " +
        "virtual classrooms and student performance analytics to " +
        "support online learning experiences.",
      tech: [
        "WebRTC",
        "Streaming",
        "Analytics",
        "E-learning"
      ]
    },

    "welcome": {
      category: "E-commerce · Mobile",
      title: "Welcome App",
      description:
        "A multi-vendor shopping application concept bringing " +
        "product discovery, integrated digital payments, and " +
        "delivery tracking together in one experience.",
      tech: [
        "REST API",
        "Digital payments",
        "Delivery tracking",
        "Mobile"
      ]
    },

    "hospital": {
      category: "Healthcare IT · Enterprise",
      title: "Hospital Management System",
      description:
        "A hospital management solution concept for patient " +
        "records, clinic appointments, doctor schedules, and " +
        "supporting administrative workflows.",
      tech: [
        "FHIR standard",
        "Patient records",
        "Appointments",
        "Triage"
      ]
    }
  };

  // Open project details
  document.querySelectorAll("[data-open-project]").forEach(button => {
    button.addEventListener("click", () => {
      const project = projects[button.dataset.openProject];

      if (!project || !modal) return;

      document.getElementById("modalCategory").textContent =
        project.category;

      document.getElementById("modalTitle").textContent =
        project.title;

      document.getElementById("modalDescription").textContent =
        project.description;

      const techContainer =
        document.getElementById("modalTech");

      techContainer.replaceChildren(
        ...project.tech.map(label => {
          const item = document.createElement("span");
          item.textContent = label;
          return item;
        })
      );

      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.setAttribute("open", "");
      }

      document.body.classList.add("modal-open");
    });
  });

  // Close project modal
  function closeModal() {
    if (modal?.open && typeof modal.close === "function") {
      modal.close();
    } else {
      modal?.removeAttribute("open");
    }

    document.body.classList.remove("modal-open");
  }

  modalClose?.addEventListener("click", closeModal);

  modal?.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  modal?.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Contact form
  // Replace this address with the company's real email.
  const contactEmail = "hello@smartland.example";

  const form = document.getElementById("contactForm");

  form?.addEventListener("submit", event => {
    event.preventDefault();

    const name =
      document.getElementById("name").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const message =
      document.getElementById("message").value.trim();

    const subject = encodeURIComponent(
      `Smart Land enquiry from ${name}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href =
      `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    if (toast) {
      toast.textContent = "Opening your email app…";
      toast.classList.add("show");

      window.setTimeout(() => {
        toast.classList.remove("show");
      }, 2600);
    }
  });

  // Dynamic copyright year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});