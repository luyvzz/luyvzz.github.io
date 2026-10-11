"""Validate GitHub repository Pages paths against a subpath build."""
import json
import sys
from pathlib import Path
from playwright.sync_api import expect, sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(reduced_motion='reduce')
    failures = []
    page.on('pageerror', lambda error: failures.append(str(error)))
    page.on('response', lambda response: failures.append(response.url) if response.status >= 400 else None)
    for path in ['', 'projects/', 'notes/', 'about/', 'notes/hello-world/']:
        response = page.goto(f'http://127.0.0.1:4323/portfolio/{path}')
        assert response.status == 200
        page.wait_for_load_state('networkidle')
        expect(page.locator('h1')).to_be_visible()
        assert page.locator('body').evaluate("e => getComputedStyle(e).backgroundColor") != 'rgba(0, 0, 0, 0)'
        for href in page.locator('a[href]').evaluate_all('(links) => links.map(a => a.href)'):
            if href.startswith('http://127.0.0.1:4323'):
                assert href.startswith('http://127.0.0.1:4323/portfolio/'), href
    page.goto('http://127.0.0.1:4323/portfolio/')
    terminal = page.get_by_role('textbox', name='输入终端命令')
    terminal.fill('projects')
    terminal.press('Enter')
    expect(page).to_have_url('http://127.0.0.1:4323/portfolio/projects/')
    page.keyboard.press('Control+k')
    page.get_by_role('searchbox').fill('关于')
    page.keyboard.press('Enter')
    expect(page).to_have_url('http://127.0.0.1:4323/portfolio/about/')
    assert not failures, failures
    result = {'status': 'PASS', 'base': '/portfolio/', 'checks': ['页面、样式和脚本正常', '内部链接保留仓库路径', '终端与命令面板导航正常'], 'failures': failures}
    Path('test-results/subpath-checks.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(result, ensure_ascii=False))
    browser.close()
