export const profile = {
  name: '鹿屿',
  fullName: '张路宇',
  handle: 'luyvzz',
  role: '大学生 · 技术爱好者',
  description:
    '喜欢技术，也喜欢把脑海里的小想法，一点一点变成能用的东西。这里是我的个人空间，存放作品、学习记录与未完待续的探索。',
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

export const projects = [
  {
    id: 'personal-space',
    number: '01',
    title: '我的互联网小角落',
    description: '把个人介绍、开发记录和一点小趣味，装进一个轻巧的个人网站。',
    tags: ['Astro', 'TypeScript', 'CSS'],
    type: '个人网站',
    status: '你正在这里',
    preview: 'site',
    href: 'about/#this-site',
  },
  {
    id: 'tiny-terminal',
    number: '02',
    title: 'Tiny Terminal',
    description: '一个藏在网页里的迷你终端。输入几行命令，换一种方式认识我。',
    tags: ['TypeScript', '交互实验'],
    type: '浏览器实验',
    status: '可以试一试',
    preview: 'terminal',
    href: '#terminal',
  },
];

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
