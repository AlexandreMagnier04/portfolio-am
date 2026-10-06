document.addEventListener("DOMContentLoaded", function () {
  function checkScreenSize() {
    const isResponsivePage = window.location.pathname.includes("index-responsive.html");

    if (window.innerWidth <= 1200 && !isResponsivePage) {
      window.location.href = "index-responsive.html";
    } else if (window.innerWidth > 1200 && isResponsivePage) {
      window.location.href = "index.html";
    }
  }

  window.addEventListener("load", checkScreenSize);
  window.addEventListener("resize", checkScreenSize);

  const bottomNav = document.getElementById("bottomNav");
  const footer = document.getElementById("footer");

  if (bottomNav && footer) {
    function checkMenuVisibility() {
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top <= window.innerHeight) {
        bottomNav.style.opacity = "0";
      } else {
        bottomNav.style.opacity = "1";
      }
    }
    
    window.addEventListener("scroll", checkMenuVisibility);
    window.addEventListener("resize", checkMenuVisibility);
    window.addEventListener("load", checkMenuVisibility);
  }

  const themeToggleButton = document.getElementById("theme-toggle");
  const userIcon = document.querySelector(".icon[alt='User Icon']");
  const languageIcon = document.querySelector(".icon[alt='Language Icon']");

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-theme", isDark);


    document.querySelectorAll("header, .nav-section, .search-section, .categories-section, .logement-section, footer, .input-field, .nav-tab, .input-label, .logement-rating, .show-more-btn, .footer-links a, .footer-icons span, a").forEach(element => {
      element.classList.toggle("dark-theme", isDark);
    });

    if (isDark) {
      userIcon.src = "img/user-white.png";
      languageIcon.src = "img/world-white.png";
      themeToggleButton.innerHTML = '<img src="img/soleil.png" alt="Soleil" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 5px;"> Mode clair';
    } else {
      userIcon.src = "img/user.png";
      languageIcon.src = "img/explore.png";
      themeToggleButton.innerHTML = '<img src="img/night.png" alt="Lune" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 5px;"> Mode sombre';
    }
  }

  function toggleTheme() {
    const isDarkTheme = document.body.classList.contains("dark-theme");
    applyTheme(isDarkTheme ? "light" : "dark");
  }

  themeToggleButton.addEventListener("click", toggleTheme);

  applyTheme("light");
});