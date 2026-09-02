const posts = [
  { title: '我开始整理自己的 GitHub 开源生态', date: '2026-09-02', tags: ['GitHub', '开源', '成长记录'], excerpt: '以前项目散在不同角落。现在我想把它们放到一个更清楚的位置，让别人能看懂，也让自己能继续往前做。' },
  { title: 'AI × 嵌入式这条线为什么值得记录', date: '2026-09-01', tags: ['AI', '嵌入式', '机器人视觉'], excerpt: '硬件项目有很多细节藏在调试过程里。接口、时序、视觉算法和部署环境都会留下坑，写下来以后，下次会少踩一次。' },
  { title: '给虚拟桌面写一个小工具以后', date: '2026-08-29', tags: ['Windows', '工具', 'vdmon'], excerpt: 'vdmon 最早只是为了看清楚每个虚拟桌面里有什么窗口。做完以后我发现，小工具也可以成为一个完整开源项目。' }
]

const projects = [
  { icon: '🖥️', name: 'vdmon', desc: 'Windows 11 虚拟桌面监视与截图工具。', link: 'https://github.com/luyvzz/vdmon', tags: ['Python', 'Windows'] },
  { icon: '🧰', name: 'ai-solo-toolkit', desc: '面向个人开发者的 AI 辅助工作流工具包。', link: 'https://github.com/luyvzz/ai-solo-toolkit', tags: ['AI', 'Toolkit'] },
  { icon: '🧠', name: '26-SKILL', desc: 'Agent Skill 实验室，用来沉淀可复用的智能体能力。', link: 'https://github.com/luyvzz/26-SKILL', tags: ['Agent', 'Skill'] },
  { icon: '🔌', name: 'luyv_lceda_ai_demo', desc: 'AI × EDA 插件实验项目，探索硬件设计里的 AI 助手。', link: 'https://github.com/luyvzz/luyv_lceda_ai_demo', tags: ['EDA', 'AI'] }
]

const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => Array.from(document.querySelectorAll(selector))

function postCard(post) {
  return `<article class="post-card"><time datetime="${post.date}">${post.date}</time><h3>${post.title}</h3><p>${post.excerpt}</p><div class="post-tags">${post.tags.map(tag => `<span class="post-tag"># ${tag}</span>`).join('')}</div></article>`
}

function projectCard(project) {
  return `<article class="project-card"><span class="project-icon" aria-hidden="true">${project.icon}</span><h3>${project.name}</h3><p>${project.desc}</p><div class="post-tags">${project.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}</div><p><a href="${project.link}">查看项目</a></p></article>`
}

function renderPosts(list = posts) {
  $('#latest-posts').innerHTML = list.slice(0, 3).map(postCard).join('')
  $('#all-posts').innerHTML = list.map(postCard).join('') || '<p class="article-card">没有找到匹配内容。</p>'
}

function renderProjects() {
  $('#home-projects').innerHTML = projects.slice(0, 2).map(projectCard).join('')
  $('#all-projects').innerHTML = projects.map(projectCard).join('')
}

function renderArchives() {
  $('#archive-list').innerHTML = posts.map(post => `<article class="timeline-item"><time datetime="${post.date}">${post.date}</time><h3>${post.title}</h3></article>`).join('')
}

function renderTags() {
  const tags = [...new Set(posts.flatMap(post => post.tags).concat(projects.flatMap(project => project.tags)))].sort()
  const buttons = tags.map(tag => `<button type="button" data-tag="${tag}"># ${tag}</button>`).join('')
  $('#tag-cloud').innerHTML = buttons
  $('#rail-tags').innerHTML = buttons
  $$('.tag-cloud button, .mini-tags button').forEach(button => button.addEventListener('click', () => filter(button.dataset.tag)))
}

function setRoute(route) {
  $$('.view').forEach(view => view.classList.toggle('active', view.id === route))
  $$('.site-nav a').forEach(link => link.classList.toggle('active', link.dataset.route === route))
}

function filter(query) {
  const q = String(query || '').trim().toLowerCase()
  history.replaceState(null, '', '#posts')
  setRoute('posts')
  $('#searchInput').value = query || ''
  const filtered = posts.filter(post => [post.title, post.excerpt, ...post.tags].join(' ').toLowerCase().includes(q))
  renderPosts(q ? filtered : posts)
}

function setupSearch(id) {
  const input = $(id)
  if (!input) return
  input.addEventListener('input', event => filter(event.target.value))
}

function setupTheme() {
  const saved = localStorage.getItem('theme')
  if (saved) document.documentElement.dataset.theme = saved
  $('.theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
  })
}

function setupRouting() {
  $$('[data-route]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault()
    const route = link.dataset.route
    history.replaceState(null, '', `#${route}`)
    setRoute(route)
  }))
  const initial = location.hash.replace('#', '') || 'home'
  setRoute(document.getElementById(initial) ? initial : 'home')
}

renderPosts()
renderProjects()
renderArchives()
renderTags()
setupSearch('#searchInput')
setupSearch('#railSearch')
setupTheme()
setupRouting()
