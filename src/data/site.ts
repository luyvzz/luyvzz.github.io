export const profile = {
  name: '鹿屿',
  fullName: '张路宇',
  handle: 'luyvzz',
  role: '电子信息工程学生 · 开发者',
  description:
    '山东科技大学电子信息工程学生，探索 AI Agent、嵌入式与 EDA 自动化。喜欢把工程里的重复工作做成工具，让开发、调试和经验交接更容易。',
  github: 'https://github.com/luyvzz',
  email: '',
};

export function url(path = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export const navigation = [
  { label: '首页', file: 'index', path: '', icon: 'home' },
  { label: '项目', file: 'projects', path: 'projects/', icon: 'folder' },
  { label: '笔记', file: 'notes', path: 'notes/', icon: 'file' },
  { label: '关于', file: 'about', path: 'about/', icon: 'user' },
];

export { projects } from './projects';

export const notes = [
  {
    title: '从一个空文件夹，到一个个人网站',
    slug: 'hello-world',
    category: '建站手记',
    date: '2026.10.10',
    minutes: '3 分钟',
    description: '记录这个小站的结构，以及把个人空间搭起来的第一步。',
  },
  {
    title: '让网页上的小交互，刚刚好',
    slug: 'small-interactions',
    category: '界面探索',
    date: '2026.10.10',
    minutes: '2 分钟',
    description: '关于反馈、键盘操作，以及那些不打扰阅读的细节。',
  },
  {
    title: '给未来的自己，留一份 README',
    slug: 'write-it-down',
    category: '学习方法',
    date: '2026.10.10',
    minutes: '2 分钟',
    description: '用简单的结构，记录问题、尝试和下一步。',
  },
];
