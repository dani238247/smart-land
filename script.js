document.addEventListener("DOMContentLoaded", () => {
  // video audio toggle
  const bgVid = document.getElementById("bgVideo");
  const audioBtn = document.getElementById("toggleAudioBtn");

  if (bgVid && audioBtn) {
    audioBtn.addEventListener("click", () => {
      bgVid.muted = !bgVid.muted;
      audioBtn.innerHTML = bgVid.muted ? "<span>🔇</span> Sound Off" : "<span>🔊</span> Sound On";
    });
  }

  // scroll bar
  const progressBar = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    if (progressBar) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = ((window.scrollY / scrollHeight) * 100) + "%";
    }
  });

  // typewriter
  const typeTarget = document.getElementById("typewriter");
  if (typeTarget) {
    const list = ["AI Systems", "Enterprise Apps", "Healthcare Tech", "Cloud Solutions"];
    let i = 0, j = 0, isDeleting = false;

    function runTypewriter() {
      const current = list[i];
      typeTarget.textContent = isDeleting ? current.substring(0, j - 1) : current.substring(0, j + 1);
      j += isDeleting ? -1 : 1;

      let speed = isDeleting ? 40 : 100;
      if (!isDeleting && j === current.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % list.length;
        speed = 300;
      }
      setTimeout(runTypewriter, speed);
    }
    runTypewriter();
  }

  // network canvas
  const canvas = document.getElementById("neuralCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let dots = [];

    function initCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    initCanvas();
    window.addEventListener("resize", initCanvas);

    for (let k = 0; k < 35; k++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#38bdf8";
      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";

      for (let a = 0; a < dots.length; a++) {
        let p = dots[a];
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let b = a + 1; b < dots.length; b++) {
          let p2 = dots[b];
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // project filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");
      cards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // counters
  const counters = document.querySelectorAll(".counter");
  let counted = false;

  window.addEventListener("scroll", () => {
    const section = document.getElementById("stats");
    if (!section || counted) return;

    if (section.getBoundingClientRect().top < window.innerHeight - 50) {
      counted = true;
      counters.forEach(c => {
        const target = +c.dataset.target;
        let val = 0;
        const inc = target / 60;
        const timer = setInterval(() => {
          val += inc;
          if (val >= target) {
            c.textContent = target;
            clearInterval(timer);
          } else {
            c.textContent = Math.ceil(val);
          }
        }, 20);
      });
    }
  });

  // back to top
  const topBtn = document.getElementById("backToTop");
  if (topBtn) {
    window.addEventListener("scroll", () => {
      topBtn.style.display = window.scrollY > 400 ? "block" : "none";
    });
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});