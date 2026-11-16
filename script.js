/* =========================================
   IBRAHIM SIDDIQ PORTFOLIO
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. CURRENT YEAR
  ===================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =====================================
     2. VISITOR POPUP ELEMENTS
  ===================================== */

  const overlay = document.getElementById("visitorOverlay");
  const choices = document.getElementById("visitorChoices");
  const recruiterPanel = document.getElementById("recruiterPanel");
  const successPanel = document.getElementById("visitorSuccess");
  const errorPanel = document.getElementById("visitorError");

  const exploreBtn = document.getElementById("exploreBtn");
  const skipBtn = document.getElementById("skipBtn");
  const recruiterBtn = document.getElementById("recruiterBtn");
  const closeBtn = document.getElementById("visitorClose");
  const backBtn = document.getElementById("backToChoices");
  const successBtn = document.getElementById("enterAfterSubmit");

  const SESSION_KEY = "ibrahimPortfolioEntered";


  /* =====================================
     3. ENTER PORTFOLIO
  ===================================== */

  function enterPortfolio() {

    if (!overlay) return;

    sessionStorage.setItem(SESSION_KEY, "yes");

    overlay.classList.add("is-hidden");
    document.body.classList.remove("modal-open");
    overlay.hidden = true;

  }


  /* =====================================
     4. SHOW POPUP ONLY ONCE PER TAB
  ===================================== */

  if (overlay) {

    if (sessionStorage.getItem(SESSION_KEY) === "yes") {

      overlay.hidden = true;
      document.body.classList.remove("modal-open");

    } else {

      overlay.hidden = false;
      document.body.classList.add("modal-open");

    }

  }


  /* =====================================
     5. EXPLORE / SKIP / CLOSE
  ===================================== */

  if (exploreBtn) {
    exploreBtn.addEventListener("click", enterPortfolio);
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", enterPortfolio);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", enterPortfolio);
  }

  if (successBtn) {
    successBtn.addEventListener("click", enterPortfolio);
  }


  /* =====================================
     6. RECRUITER BUTTON
     GOOGLE FORMS INTEGRATION
  ===================================== */

  if (recruiterBtn) {

    recruiterBtn.addEventListener("click", () => {

      if (choices) choices.hidden = true;

      if (recruiterPanel) recruiterPanel.hidden = false;

      if (successPanel) successPanel.hidden = true;

      if (errorPanel) errorPanel.hidden = true;

    });

  }


  /* =====================================
     7. BACK BUTTON
  ===================================== */

  if (backBtn) {

    backBtn.addEventListener("click", () => {

      if (recruiterPanel) recruiterPanel.hidden = true;

      if (choices) choices.hidden = false;

      if (errorPanel) errorPanel.hidden = true;

    });

  }


  /* =====================================
     8. ESCAPE KEY SUPPORT
  ===================================== */

  const certLightbox = document.getElementById("certLightbox");

  function closeLightbox() {

    if (!certLightbox) return;

    certLightbox.hidden = true;

    document.body.classList.remove("modal-open");

  }


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      if (overlay && !overlay.hidden) {
        enterPortfolio();
      }

      if (certLightbox && !certLightbox.hidden) {
        closeLightbox();
      }

    }

  });


  /* =====================================
     9. GOOGLE FORMS SUBMISSION
     
     Google Form handles submission directly
     through the embedded iframe.
     
     No FormSubmit fetch request.
     No duplicate HTML form submission.
  ===================================== */


  /* =====================================
     10. PROJECT FILTER TABS
  ===================================== */

  const filterButtons = document.querySelectorAll(
    "#projectFilters .filter-pill"
  );

  const companyGroups = document.querySelectorAll(
    ".company-group[data-group]"
  );

  filterButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

      const selected = btn.dataset.filter;

      filterButtons.forEach((pill) => {

        const isActive = pill === btn;

        pill.classList.toggle("active", isActive);

        pill.setAttribute(
          "aria-pressed",
          isActive ? "true" : "false"
        );

      });

      companyGroups.forEach((group) => {

        const matches =
          selected === "all" ||
          group.dataset.group === selected;

        group.classList.toggle("is-hidden", !matches);

        group.hidden = !matches;

      });

    });

  });


  /* =====================================
     11. CERTIFICATE IMAGE LIGHTBOX
  ===================================== */

  const certLightboxImg = document.getElementById("certLightboxImg");

  const certLightboxClose = document.getElementById(
    "certLightboxClose"
  );

  const certImages = document.querySelectorAll(
    ".cert-image-wrap img"
  );

  certImages.forEach((img) => {

    img.addEventListener("click", () => {

      if (!certLightbox || !certLightboxImg) return;

      certLightboxImg.src = img.src;

      certLightboxImg.alt = img.alt;

      certLightbox.hidden = false;

      document.body.classList.add("modal-open");

    });

  });

  if (certLightboxClose) {
    certLightboxClose.addEventListener("click", closeLightbox);
  }

  if (certLightbox) {

    certLightbox.addEventListener("click", (event) => {

      if (event.target === certLightbox) {
        closeLightbox();
      }

    });

  }


  /* =====================================
     12. TAB SYSTEM
  ===================================== */

  const tabLinks = document.querySelectorAll("[data-tab]");

  const panels = document.querySelectorAll("[data-panel]");

  const VALID_TABS = Array.from(panels).map(
    (panel) => panel.dataset.panel
  );

  const DEFAULT_TAB = "about";


  /* =====================================
     13. ANIMATE STATS
  ===================================== */

  function animateStats() {

    const statNumbers = document.querySelectorAll(
      ".stat-number[data-count]"
    );

    statNumbers.forEach((el) => {

      if (el.dataset.animated === "true") return;

      el.dataset.animated = "true";

      const target = parseInt(el.dataset.count, 10) || 0;

      const suffix = el.dataset.suffix || "";

      const duration = 900;

      const start = performance.now();

      function tick(now) {

        const progress = Math.min(
          (now - start) / duration,
          1
        );

        const eased = 1 - Math.pow(1 - progress, 3);

        const value = Math.round(eased * target);

        el.textContent =
          String(value).padStart(2, "0") + suffix;

        if (progress < 1) {

          requestAnimationFrame(tick);

        } else {

          el.textContent =
            String(target).padStart(2, "0") + suffix;

        }

      }

      requestAnimationFrame(tick);

    });

  }


  /* =====================================
     14. ROADMAP ANIMATION
  ===================================== */

  function playRoadmapAnimation() {

    const roadmap = document.getElementById("roadmap");

    const progress = document.getElementById("roadmapProgress");

    if (!roadmap || !progress) return;

    const nodes = roadmap.querySelectorAll(".roadmap-node");

    nodes.forEach((node) => {
      node.classList.remove("in-view");
    });

    progress.style.transform = "scaleY(0)";

    void roadmap.offsetWidth;

    requestAnimationFrame(() => {
      progress.style.transform = "scaleY(1)";
    });

    nodes.forEach((node, index) => {

      setTimeout(() => {
        node.classList.add("in-view");
      }, 220 + index * 260);

    });

  }


  /* =====================================
     15. ACTIVATE TAB
  ===================================== */

  function activateTab(name, updateHash) {

    const target = VALID_TABS.includes(name)
      ? name
      : DEFAULT_TAB;

    panels.forEach((panel) => {

      panel.hidden = panel.dataset.panel !== target;

    });

    tabLinks.forEach((link) => {

      const isMatch = link.dataset.tab === target;

      link.classList.toggle("active", isMatch);

      if (link.hasAttribute("role")) {

        link.setAttribute(
          "aria-selected",
          isMatch ? "true" : "false"
        );

      }

    });

    if (updateHash !== false) {

      history.replaceState(
        null,
        "",
        "#" + target
      );

    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    if (target === "experience") {
      playRoadmapAnimation();
    }

    if (target === "about") {
      animateStats();
    }

  }


  /* =====================================
     16. TAB CLICK EVENTS
  ===================================== */

  tabLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      event.preventDefault();

      activateTab(link.dataset.tab);

    });

  });


  /* =====================================
     17. HASH CHANGE
  ===================================== */

  window.addEventListener("hashchange", () => {

    const name = location.hash.replace("#", "");

    activateTab(name, false);

  });


  /* =====================================
     18. INITIAL TAB
  ===================================== */

  const initialTab = location.hash
    ? location.hash.replace("#", "")
    : DEFAULT_TAB;

  activateTab(initialTab, false);

  if (
    initialTab === DEFAULT_TAB ||
    !VALID_TABS.includes(initialTab)
  ) {

    animateStats();

  }

});