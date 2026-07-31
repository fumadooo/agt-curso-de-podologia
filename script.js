document.addEventListener('DOMContentLoaded', function () {
  const mainCard = document.querySelector('.specialist-certification-card');
  if (mainCard && 'IntersectionObserver' in window) {
    mainCard.style.opacity = '0';
    mainCard.style.transform = 'translateY(40px)';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(mainCard);
  }

  let activePartId = null;
  let activeModuleId = null;

  function closeModule(moduleId) {
    const moduleCard = document.getElementById(moduleId);
    if (moduleCard) moduleCard.classList.remove('active');
  }

  function closePart(partId) {
    const partCard = document.getElementById(partId);
    if (partCard) partCard.classList.remove('active');
  }

  document.querySelectorAll('[data-part]').forEach((header) => {
    header.addEventListener('click', () => {
      const partId = header.dataset.part;
      const partCard = document.getElementById(partId);
      if (!partCard) return;

      if (activePartId && activePartId !== partId) {
        closePart(activePartId);
        if (activeModuleId && activeModuleId.startsWith(activePartId)) {
          closeModule(activeModuleId);
          activeModuleId = null;
        }
      }

      partCard.classList.toggle('active');
      activePartId = partCard.classList.contains('active') ? partId : null;

      if (!activePartId && activeModuleId && activeModuleId.startsWith(partId)) {
        closeModule(activeModuleId);
        activeModuleId = null;
      }
    });
  });

  document.querySelectorAll('[data-module]').forEach((header) => {
    header.addEventListener('click', (event) => {
      event.stopPropagation();
      const moduleId = header.dataset.module;
      const moduleCard = document.getElementById(moduleId);
      if (!moduleCard) return;

      if (activeModuleId && activeModuleId !== moduleId) {
        closeModule(activeModuleId);
      }

      moduleCard.classList.toggle('active');
      activeModuleId = moduleCard.classList.contains('active') ? moduleId : null;
    });
  });

  const faqItems = document.querySelectorAll('.faq-item-q9r2x');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question-q9r2x');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) otherItem.classList.remove('active');
      });
      item.classList.toggle('active', !isActive);
    });
  });

  const iframe = document.querySelector('.mapa-iframe-m5w8p');
  const overlay = document.querySelector('.loading-overlay-m5w8p');
  if (iframe && overlay) {
    iframe.addEventListener('load', () => {
      setTimeout(() => overlay.classList.add('hidden'), 300);
    });
    setTimeout(() => overlay.classList.add('hidden'), 2000);
  }

  const DATA_CONDICAO = '31 de dezembro de 2026';
  const dataElement = document.getElementById('data-hoje');
  if (dataElement) dataElement.textContent = DATA_CONDICAO;

  const footerBar = document.getElementById('sexualidade-footer-bar');
  function forceFooterVisibility() {
    if (!footerBar) return;
    footerBar.style.setProperty('position', 'fixed', 'important');
    footerBar.style.setProperty('bottom', '0', 'important');
    footerBar.style.setProperty('left', '0', 'important');
    footerBar.style.setProperty('right', '0', 'important');
    footerBar.style.setProperty('display', 'flex', 'important');
    footerBar.style.setProperty('visibility', 'visible', 'important');
    footerBar.style.setProperty('opacity', '1', 'important');
    footerBar.style.setProperty('transform', 'none', 'important');
  }

  forceFooterVisibility();
  window.addEventListener('load', forceFooterVisibility);
  setInterval(forceFooterVisibility, 2000);
});
