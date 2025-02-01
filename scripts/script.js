const themeButtons = document.querySelectorAll('.header__theme-menu-button');

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    themeButtons.forEach((btn) => {
      btn.classList.remove('header__theme-menu-button_active');
      btn.removeAttribute('disabled');
    });
    if (
        [...button.classList].includes('header__theme-menu-button_type_light')
    ) {
      changeTheme('light');
    } else if (
        [...button.classList].includes('header__theme-menu-button_type_dark')
    ) {
      changeTheme('dark');
    } else {
      changeTheme('auto');
    }
    button.classList.add('header__theme-menu-button_active');
    button.setAttribute('disabled', true);
  });
});

function changeTheme(theme) {
  document.body.className = 'page';
  document.body.classList.add(`theme_${theme}`);
  localStorage.setItem('theme', theme);
  applyBackgroundImage(theme);
}

function applyBackgroundImage(theme) {
  const header = document.querySelector('.header');
  if (theme === 'dark') {
    header.style.backgroundImage = 'var(--background-image-dark)';
  } else if (theme === 'light') {
    header.style.backgroundImage = 'var(--background-image-light)';
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    header.style.backgroundImage = prefersDark ? 'var(--background-image-dark)' : 'var(--background-image-light)';
  }
}

function initTheme() {
  const theme = localStorage.getItem('theme') || 'auto';
  changeTheme(theme);
  themeButtons.forEach((btn) => {
    btn.classList.remove('header__theme-menu-button_active');
    btn.removeAttribute('disabled');
  });
  const activeButton = document.querySelector(`.header__theme-menu-button_type_${theme}`);
  if (activeButton) {
    activeButton.classList.add('header__theme-menu-button_active');
    activeButton.setAttribute('disabled', true);
  }
}

initTheme();
