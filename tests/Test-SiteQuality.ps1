param()
$ErrorActionPreference = "Stop"

function Pass($name) { Write-Output "PASS:$name" }
function Fail($name) { throw "FAIL:$name" }

foreach ($file in @("index.html", "assets/css/styles.css", "assets/js/main.js", "assets/images/avatar.jpg", "assets/images/avatar-cyber.png", "assets/images/avatar-gpt-image-2.png", "assets/images/avatar-gpt-image-2.webp", "assets/images/avatar-gpt-image-2-icon.png", "assets/images/hero-embodied-ai-lab.png", "assets/images/hero-embodied-ai-lab.webp", "README.md", ".nojekyll")) {
  if (Test-Path $file) { Pass "file:$file" } else { Fail "file:$file" }
}

$html = Get-Content -Raw -Encoding UTF8 index.html
foreach ($needle in @("鹿屿の博客", "luyvzz", "具身智能", "AI", "机器人视觉", "avatar-gpt-image-2.webp", "hero-embodied-ai-lab.webp", "gpt-image-2 visual", "MCP connected", "neuralCanvas", "关于我", "个人随笔", "开源项目", "归档", "友链")) {
  if ($html.Contains($needle)) { Pass "html:$needle" } else { Fail "html:$needle" }
}

$css = Get-Content -Raw -Encoding UTF8 assets/css/styles.css
foreach ($needle in @("prefers-reduced-motion", "@media", "color-scheme", "--accent", "conic-gradient", "scan-line", "terminal-card", "sensor-core", "model-badge", "hero-embodied-ai-lab.webp")) {
  if ($css.Contains($needle)) { Pass "css:$needle" } else { Fail "css:$needle" }
}

$js = Get-Content -Raw -Encoding UTF8 assets/js/main.js
foreach ($needle in @("const posts", "const projects", "setupTheme", "setupRouting", "setupNeuralCanvas", "具身智能")) {
  if ($js.Contains($needle)) { Pass "js:$needle" } else { Fail "js:$needle" }
}

$readme = Get-Content -Raw -Encoding UTF8 README.md
foreach ($needle in @("鹿屿の博客", "https://luyvzz.github.io/", "GitHub Pages", "具身智能", "gpt-image-2", "micu-gpt-image-2", "本地验证")) {
  if ($readme.Contains($needle)) { Pass "readme:$needle" } else { Fail "readme:$needle" }
}

node --check ./assets/js/main.js
if ($LASTEXITCODE -eq 0) { Pass "node:js-syntax" } else { Fail "node:js-syntax" }

python -c "from PIL import Image; paths=['assets/images/avatar.jpg','assets/images/avatar-cyber.png','assets/images/avatar-gpt-image-2.png','assets/images/avatar-gpt-image-2.webp','assets/images/avatar-gpt-image-2-icon.png','assets/images/hero-embodied-ai-lab.png','assets/images/hero-embodied-ai-lab.webp']; [Image.open(p).verify() for p in paths]; print('PASS:image:valid')"
if ($LASTEXITCODE -eq 0) { Pass "python:image-assets" } else { Fail "python:image-assets" }
