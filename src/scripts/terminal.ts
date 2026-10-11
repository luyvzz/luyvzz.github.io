import { toggleTheme } from './site';

const form = document.querySelector<HTMLFormElement>('#terminal-form');
const input = document.querySelector<HTMLInputElement>('#terminal-input');
const output = document.querySelector<HTMLElement>('#terminal-output');
const terminal = document.querySelector<HTMLElement>('.terminal-window');
const terminalName = terminal?.dataset.name || '鹿屿';
const fullName = terminal?.dataset.fullname || terminalName;
const github = terminal?.dataset.github || '';
const history: string[] = [];
let historyIndex = 0;
let draft = '';

function print(text: string, className = 'terminal-line-result') {
  if (!output) return;
  const line = document.createElement('p');
  line.className = className;
  line.textContent = text;
  output.appendChild(line);
  while (output.children.length > 100) output.firstElementChild?.remove();
  output.scrollTop = output.scrollHeight;
}
function clear() {
  if (output) output.replaceChildren();
}
function navigate(path: string) {
  location.href = `${document.body.dataset.base || '/'}${path}`;
}
function execute(raw: string) {
  const command = raw.trim();
  if (!command) return;
  if (history[history.length - 1] !== command) history.push(command);
  if (history.length > 50) history.shift();
  historyIndex = history.length;
  draft = '';
  print(`visitor ~ ❯ ${command}`, 'terminal-line-command');
  const [name, ...args] = command.toLowerCase().split(/\s+/);
  if (args.length && name !== 'echo') {
    print('这个命令不需要参数。输入 help 查看用法。', 'terminal-line-error');
    return;
  }
  switch (name) {
    case 'help':
      print(
        'about      认识一下我\nprojects   打开项目页面\nnotes      阅读学习笔记\ntheme      切换深浅主题\nhello      打个招呼\nbanner     一份像素小礼物\necho 文本  把文字回显出来\nclear      清空终端\n\n提示：↑ ↓ 可查看历史命令。这是浏览器里的模拟终端。',
      );
      break;
    case 'about':
      print(
        `你好，我是${terminalName}，也叫${fullName}。\n一名热爱技术与开发的大学生。\n喜欢把想法变成作品，也在学习中持续探索。\nGitHub: ${github}`,
      );
      break;
    case 'projects':
      navigate('projects/');
      break;
    case 'notes':
      navigate('notes/');
      break;
    case 'home':
      navigate('');
      break;
    case 'theme':
      print(toggleTheme() === 'dark' ? '✓ 已切换到深色主题。' : '✓ 已切换到浅色主题。');
      break;
    case 'hello':
    case 'hi':
      print('Hello, fellow explorer! 很高兴你找到这里。\n愿今天的 bug 少一点，灵感多一点 :)');
      break;
    case 'banner':
      print('   ▄   ▄\n  ▄█▄█▄█▄\n █ ▀███▀ █\n ▀ ▀   ▀ ▀\n\n  KEEP EXPLORING.');
      break;
    case 'echo':
      print(command.slice(4).trim());
      break;
    case 'clear':
      clear();
      break;
    case 'sudo':
      print('不需要超级权限，好奇心就够了 :)');
      break;
    default:
      print(`没有找到命令「${command}」。试试 help？`, 'terminal-line-error');
  }
}
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!input) return;
  const value = input.value;
  input.value = '';
  execute(value);
  input.focus();
});
input?.addEventListener('keydown', (event) => {
  if (event.isComposing || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return;
  event.preventDefault();
  if (historyIndex === history.length) draft = input.value;
  historyIndex =
    event.key === 'ArrowUp'
      ? Math.max(0, historyIndex - 1)
      : Math.min(history.length, historyIndex + 1);
  input.value = historyIndex === history.length ? draft : history[historyIndex];
  input.setSelectionRange(input.value.length, input.value.length);
});
document.querySelector('#terminal-clear')?.addEventListener('click', () => {
  clear();
  input?.focus();
});
document.querySelectorAll<HTMLButtonElement>('[data-command]').forEach((button) =>
  button.addEventListener('click', () => {
    execute(button.dataset.command || 'help');
    input?.focus();
  }),
);
