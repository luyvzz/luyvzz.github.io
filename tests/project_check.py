"""Verify portfolio routes and links: python tests/project_check.py [base URL]."""
import json
import subprocess
import sys
from pathlib import Path
from urllib.parse import urljoin
from playwright.sync_api import expect, sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
base = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4322/').rstrip('/') + '/'
projects = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', "import {projects} from './src/data/projects.ts'; console.log(JSON.stringify(projects));"], text=True, encoding='utf-8'))
out = Path('test-results')
out.mkdir(exist_ok=True)
failures = []
checks = []
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 1000}, color_scheme='light', reduced_motion='reduce')
    page.on('pageerror', lambda error: failures.append(str(error)))
    page.on('response', lambda response: failures.append(f'{response.status} {response.url}') if response.status >= 400 else None)

    def visit(path):
        response = page.goto(urljoin(base, path), wait_until='networkidle', timeout=60000)
        assert response and response.status == 200, path

    visit('')
    expect(page.locator('.project-card')).to_have_count(sum(item['featured'] for item in projects))
    expect(page.locator('.hero-description')).to_contain_text('电子信息工程')
    page.locator('.project-card').first.click()
    expect(page).to_have_url(urljoin(base, 'projects/ai-solo-toolkit/'))
    page.get_by_role('link', name='返回全部项目').click()
    expect(page).to_have_url(urljoin(base, 'projects/'))
    expect(page.locator('.project-card')).to_have_count(len(projects))
    expect(page.locator('.page-count')).to_contain_text(f'{len(projects):02d} OPEN-SOURCE PROJECTS')
    page.screenshot(path=str(out / 'projects-desktop.png'), full_page=True)
    checks.append('首页精选两项、项目列表五项、卡片跳转与返回')

    for index, project in enumerate(projects):
        path = f"projects/{project['id']}/"
        visit(path)
        expect(page.locator('h1')).to_contain_text(project['title'])
        expect(page.locator('.feature-item')).to_have_count(4)
        expect(page.get_by_role('link', name='查看 GitHub 源码')).to_have_attribute('href', project['repository'])
        expect(page.get_by_role('link', name='运行与安装说明')).to_have_attribute('href', project['repository'] + '#readme')
        expect(page.locator('.source-list a')).to_have_count(len(project['sources']))
        for i, source in enumerate(project['sources']):
            expected = f"{project['repository']}/blob/{project['revision']}/{source['path']}"
            expect(page.locator('.source-list a').nth(i)).to_have_attribute('href', expected)
            local_repo = out / 'github-research' / project['repoName']
            if local_repo.exists():
                subprocess.run(['git', '-C', str(local_repo), 'cat-file', '-e', f"{project['revision']}:{source['path']}"], check=True, capture_output=True)
        expected_next = projects[(index + 1) % len(projects)]['id']
        page.locator('.next-project').click()
        expect(page).to_have_url(urljoin(base, f'projects/{expected_next}/'))
    checks.append('五个详情页、功能介绍、GitHub 入口与固定版本源码文件')

    visit('projects/lceda-ai-assistant/')
    expect(page.locator('.detail-tags')).to_contain_text('实验性扩展')
    page.screenshot(path=str(out / 'project-detail-desktop.png'), full_page=True)
    page.get_by_role('button', name='切换深浅主题', exact=True).click()
    visit('projects/')
    expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
    page.screenshot(path=str(out / 'projects-dark.png'), full_page=True)
    page.get_by_role('button', name='切换深浅主题', exact=True).click()
    checks.append('实验阶段说明、深浅主题和封面')

    for width in [320, 390, 820]:
        page.set_viewport_size({'width': width, 'height': 844})
        for path in ['', 'projects/'] + [f"projects/{item['id']}/" for item in projects]:
            visit(path)
            assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), (width, path)
        if width == 390:
            visit('projects/')
            page.screenshot(path=str(out / 'projects-mobile.png'), full_page=True)
            visit('projects/26-skill/')
            page.screenshot(path=str(out / 'project-detail-mobile.png'), full_page=True)
    checks.append('320、390、820 像素页面及长源码路径无横向溢出')
    assert not failures, failures
    result = {'status': 'PASS', 'url': base, 'checks': checks, 'errors': failures}
    (out / ('projects-live-checks.json' if base.startswith('https:') else 'projects-checks.json')).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(result, ensure_ascii=False, indent=2))
    browser.close()
