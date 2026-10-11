"""Run against a live dev or preview server: python tests/browser_check.py [URL]."""
import json
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.sync_api import expect, sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4321/').rstrip('/') + '/'
OUT = Path('test-results')
OUT.mkdir(exist_ok=True)
checks = []
errors = []
bad_responses = []


def record(name):
    checks.append(name)


def visit(page, path=''):
    response = page.goto(urljoin(BASE, path))
    assert response and response.status == 200, (path, response.status if response else None)
    page.wait_for_load_state('networkidle')


def no_overflow(page):
    assert not page.evaluate('document.documentElement.scrollWidth > window.innerWidth'), page.url


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, color_scheme='light', reduced_motion='reduce')
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('response', lambda response: bad_responses.append([response.status, response.url]) if response.status >= 400 else None)

    visit(page)
    expect(page).to_have_title('保持好奇，持续构建 · 鹿屿')
    expect(page.locator('h1')).to_contain_text('保持好奇')
    expect(page.locator('.identity')).to_contain_text('鹿屿')
    expect(page.locator('.social-nav').first).to_have_attribute('href', 'https://github.com/luyvzz')
    no_overflow(page)
    page.screenshot(path=str(OUT / 'desktop-light.png'), full_page=True)
    page.screenshot(path=str(OUT / 'desktop-first-screen.png'))
    record('首页与真实身份信息、桌面排版')

    page.get_by_role('button', name='切换深浅主题', exact=True).click()
    expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
    page.reload()
    page.wait_for_load_state('networkidle')
    expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
    page.screenshot(path=str(OUT / 'desktop-dark.png'), full_page=True)
    page.get_by_role('button', name='切换深浅主题', exact=True).click()
    record('深浅主题切换与刷新持久化')

    page.keyboard.press('Control+k')
    expect(page.get_by_role('dialog')).to_be_visible()
    page.get_by_role('searchbox').fill('不存在的命令')
    expect(page.locator('#command-empty')).to_be_visible()
    page.get_by_role('searchbox').fill('笔记')
    page.keyboard.press('Enter')
    expect(page).to_have_url(urljoin(BASE, 'notes/'))
    expect(page.locator('h1')).to_contain_text('留一点思考')
    record('快捷命令搜索、空结果和 Enter 导航')

    page.get_by_role('button', name='打开快捷命令', exact=True).click()
    page.get_by_role('searchbox').fill('主题')
    page.keyboard.press('ArrowDown')
    expect(page.locator('.command-option.theme-toggle')).to_be_focused()
    page.keyboard.press('Enter')
    expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
    expect(page.get_by_role('dialog')).not_to_be_visible()
    page.get_by_role('button', name='打开快捷命令', exact=True).click()
    page.keyboard.press('Escape')
    expect(page.get_by_role('button', name='打开快捷命令', exact=True)).to_be_focused()
    page.get_by_role('button', name='切换深浅主题', exact=True).click()
    record('命令面板方向键、主题操作与 Escape 焦点恢复')

    for path in ['projects/', 'notes/', 'about/', 'notes/hello-world/', 'notes/small-interactions/', 'notes/write-it-down/']:
        visit(page, path)
        expect(page.locator('h1')).to_be_visible()
        no_overflow(page)
        if path.startswith('notes/') and path != 'notes/':
            expect(page.locator('.article .content-notice')).to_contain_text('示例内容')
    page.screenshot(path=str(OUT / 'article-desktop.png'), full_page=True)
    record('全部 7 个静态页面与文章示例标注')

    visit(page)
    terminal_input = page.get_by_role('textbox', name='输入终端命令')
    def run(command):
        terminal_input.fill(command)
        terminal_input.press('Enter')

    run('help')
    expect(page.locator('#terminal-output')).to_contain_text('这是浏览器里的模拟终端')
    run('about')
    expect(page.locator('#terminal-output')).to_contain_text('张路宇')
    run('hello')
    expect(page.locator('#terminal-output')).to_contain_text('fellow explorer')
    terminal_input.press('ArrowUp')
    expect(terminal_input).to_have_value('hello')
    terminal_input.press('ArrowUp')
    expect(terminal_input).to_have_value('about')
    terminal_input.press('ArrowDown')
    expect(terminal_input).to_have_value('hello')
    terminal_input.press('ArrowDown')
    expect(terminal_input).to_have_value('')
    run('echo <img src=x onerror=alert(1)>')
    expect(page.locator('#terminal-output')).to_contain_text('<img src=x onerror=alert(1)>')
    expect(page.locator('#terminal-output img')).to_have_count(0)
    run('not-a-command')
    expect(page.locator('#terminal-output')).to_contain_text('没有找到命令')
    run('theme')
    expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
    run('theme')
    run('clear')
    expect(page.locator('#terminal-output p')).to_have_count(0)
    page.get_by_role('button', name='banner', exact=True).click()
    expect(page.locator('#terminal-output')).to_contain_text('KEEP EXPLORING')
    run('projects')
    expect(page).to_have_url(urljoin(BASE, 'projects/'))
    record('终端命令、历史记录、清空、跳转和 HTML 文本安全')

    visit(page)
    original = page.locator('#pixel-svg path').get_attribute('d')
    page.get_by_role('button', name='切换像素图案', exact=True).click()
    assert page.locator('#pixel-svg path').get_attribute('d') != original
    expect(page.get_by_role('status')).to_contain_text('能量')
    record('像素彩蛋与可访问反馈')

    # Check every same-origin static link and anchor rather than only the nav.
    for path in ['', 'projects/', 'notes/', 'about/', 'notes/hello-world/', 'notes/small-interactions/', 'notes/write-it-down/']:
        visit(page, path)
        for href in page.locator('a[href]').evaluate_all('(links) => links.map(a => a.href)'):
            parsed = urlparse(href)
            if parsed.netloc != urlparse(BASE).netloc:
                continue
            response = context.request.get(href.split('#')[0])
            assert response.status == 200, href
            if parsed.fragment:
                html = response.text()
                assert f'id="{parsed.fragment}"' in html, href
    record('内部链接及锚点全部有效')

    mobile = context.new_page()
    mobile.set_viewport_size({'width': 390, 'height': 844})
    mobile.on('pageerror', lambda error: errors.append(str(error)))
    visit(mobile)
    expect(mobile.locator('#sidebar')).to_have_attribute('inert', '')
    mobile.screenshot(path=str(OUT / 'mobile-light.png'), full_page=True)
    mobile.screenshot(path=str(OUT / 'mobile-first-screen.png'))
    mobile.get_by_role('button', name='打开导航', exact=True).click()
    expect(mobile.locator('#sidebar')).to_have_class('sidebar is-open')
    expect(mobile.locator('.identity')).to_be_focused()
    mobile.locator('#sidebar .nav-item').filter(has_text='笔记').click()
    expect(mobile).to_have_url(urljoin(BASE, 'notes/'))
    mobile.get_by_role('button', name='打开导航', exact=True).click()
    mobile.keyboard.press('Escape')
    expect(mobile.locator('#sidebar')).to_have_attribute('inert', '')
    expect(mobile.get_by_role('button', name='打开导航', exact=True)).to_be_focused()
    mobile.get_by_role('button', name='打开导航', exact=True).click()
    mobile.get_by_role('button', name='切换深浅主题', exact=True).click()
    expect(mobile.locator('html')).to_have_attribute('data-theme', 'dark')
    mobile.keyboard.press('Escape')
    visit(mobile)
    mobile.screenshot(path=str(OUT / 'mobile-dark.png'), full_page=True)
    record('手机导航、关闭、焦点与主题')

    for width in [320, 390, 520, 760, 820]:
        mobile.set_viewport_size({'width': width, 'height': 844})
        for path in ['', 'projects/', 'notes/', 'about/', 'notes/hello-world/']:
            visit(mobile, path)
            no_overflow(mobile)
    record('320/390/520/760/820 像素屏幕无水平溢出')

    assert not errors, errors
    assert not bad_responses, bad_responses
    result = {'status': 'PASS', 'base_url': BASE, 'checks': checks, 'browser_errors': errors, 'http_errors': bad_responses}
    (OUT / 'checks.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(result, ensure_ascii=False, indent=2))
    browser.close()
