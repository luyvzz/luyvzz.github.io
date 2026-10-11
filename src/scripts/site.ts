const root = document.documentElement;
const toastElement = document.querySelector<HTMLDivElement>('#toast');
let toastTimeout: ReturnType<typeof setTimeout>;

export function toast(message: string) {
  if (!toastElement) return;
  toastElement.textContent = message;
  toastElement.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toastElement.classList.remove('visible'), 2600);
}

export function toggleTheme() {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = theme;
  try {
    localStorage.setItem('luyu-theme', theme);
  } catch {
    /* Preferences may be unavailable. */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#1c211e' : '#fbfaf7');
  toast(theme === 'dark' ? '夜色已就位，继续保持好奇。' : '回到明亮的一面。');
  return theme;
}

const menu = document.querySelector<HTMLButtonElement>('#mobile-menu');
const sidebar = document.querySelector<HTMLElement>('#sidebar');
const overlay = document.querySelector<HTMLElement>('#mobile-overlay');
let previousOverflow = '';
function setMenu(open: boolean) {
  if (open === sidebar?.classList.contains('is-open')) return;
  sidebar?.classList.toggle('is-open', open);
  menu?.setAttribute('aria-expanded', String(open));
  menu?.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  if (overlay) overlay.hidden = !open;
  if (open) {
    sidebar?.removeAttribute('inert');
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.querySelector<HTMLElement>('.workspace')?.setAttribute('inert', '');
    sidebar?.querySelector<HTMLAnchorElement>('.identity')?.focus();
  } else {
    document.body.style.overflow = previousOverflow;
    document.querySelector<HTMLElement>('.workspace')?.removeAttribute('inert');
    menu?.focus();
  }
}
menu?.addEventListener('click', () => setMenu(!sidebar?.classList.contains('is-open')));
overlay?.addEventListener('click', () => setMenu(false));
sidebar
  ?.querySelectorAll('a')
  .forEach((link) => link.addEventListener('click', () => setMenu(false)));
const mobileQuery = matchMedia('(max-width: 760px)');
function syncSidebar() {
  if (!mobileQuery.matches) setMenu(false);
  if (mobileQuery.matches && !sidebar?.classList.contains('is-open'))
    sidebar?.setAttribute('inert', '');
  else sidebar?.removeAttribute('inert');
}
// The closed off-screen navigation should not receive keyboard focus.
const menuObserver = new MutationObserver(syncSidebar);
if (sidebar) menuObserver.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
mobileQuery.addEventListener('change', syncSidebar);
syncSidebar();

const dialog = document.querySelector<HTMLDialogElement>('#command-dialog');
const search = document.querySelector<HTMLInputElement>('#command-search');
const options = Array.from(document.querySelectorAll<HTMLElement>('.command-option'));
let previousFocus: HTMLElement | null = null;

function filterCommands() {
  const query = search?.value.trim().toLowerCase() || '';
  options.forEach((option) => {
    option.hidden = !(option.dataset.keywords || '').toLowerCase().includes(query);
  });
  const empty = document.querySelector<HTMLElement>('#command-empty');
  if (empty) empty.hidden = options.some((option) => !option.hidden);
}
function closeCommand() {
  dialog?.close();
}
function openCommand() {
  if (!dialog || dialog.open) return;
  if (sidebar?.classList.contains('is-open')) setMenu(false);
  previousFocus = document.activeElement as HTMLElement;
  if (search) search.value = '';
  filterCommands();
  dialog.showModal();
  search?.focus();
}
document
  .querySelectorAll('[data-open-command]')
  .forEach((button) => button.addEventListener('click', openCommand));
document
  .querySelectorAll('[data-close-command]')
  .forEach((button) => button.addEventListener('click', closeCommand));
document.querySelectorAll('.theme-toggle').forEach((button) =>
  button.addEventListener('click', () => {
    toggleTheme();
    closeCommand();
  }),
);
search?.addEventListener('input', filterCommands);
options.forEach((option) => option.addEventListener('click', closeCommand));
dialog?.addEventListener('close', () => {
  previousFocus?.focus();
});
dialog?.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    closeCommand();
});
dialog?.addEventListener('keydown', (event) => {
  const visible = options.filter((option) => !option.hidden);
  if (!visible.length) return;
  const current = visible.indexOf(document.activeElement as HTMLElement);
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    const next =
      event.key === 'ArrowDown'
        ? (current + 1) % visible.length
        : current <= 0
          ? visible.length - 1
          : current - 1;
    visible[next].focus();
  } else if (event.key === 'Enter' && document.activeElement === search) {
    event.preventDefault();
    visible[0].click();
  }
});
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    dialog?.open ? closeCommand() : openCommand();
  }
  if (event.key === 'Escape') setMenu(false);
  if (event.key === 'Tab' && sidebar?.classList.contains('is-open') && !dialog?.open) {
    const elements = Array.from(sidebar.querySelectorAll<HTMLElement>('a,button')).filter(
      (el) => !el.hidden,
    );
    const first = elements[0],
      last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
});

const pixel = document.querySelector<HTMLButtonElement>('#pixel-art');
const pixelPath = document.querySelector<SVGPathElement>('#pixel-svg path');
const caption = document.querySelector<HTMLElement>('#art-caption');
const shapes = [
  {
    path: 'M40 10h20v20h10V20h20v20H70v20h20v20H70V70H60v20H40V70H30v10H10V60h20V40H10V20h20v10h10Z',
    caption: 'stay curious, keep building.',
    message: '✳ 好奇心，重新充满。',
  },
  {
    path: 'M20 20h20v10h20V20h20v10h10v30H80v10H70v10H60v10H40V80H30V70H20V60H10V30h10Z',
    caption: 'made with a little love.',
    message: '♥ 给今天的你一点能量。',
  },
  {
    path: 'M20 20h10v10h40V20h10v10H70v10h10v10h10v30H80V60H70v20H60V70H40v10H30V60H20v20H10V50h10V40h10V30H20Zm10 30v10h10V50Zm30 0v10h10V50Z',
    caption: 'hello, fellow explorer.',
    message: '👾 发现一位同路的探索者！',
  },
];
let shapeIndex = 0;
pixel?.addEventListener('click', () => {
  shapeIndex = (shapeIndex + 1) % shapes.length;
  const shape = shapes[shapeIndex];
  pixelPath?.setAttribute('d', shape.path);
  if (caption) caption.textContent = shape.caption;
  toast(shape.message);
});
