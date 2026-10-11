export interface Project {
  id: string;
  number: string;
  title: string;
  repoName: string;
  description: string;
  tags: string[];
  type: string;
  status: string;
  preview: 'workflow' | 'eda' | 'telemetry' | 'desktop';
  featured: boolean;
  repository: string;
  revision: string;
  tagline: string;
  problem: string;
  features: { title: string; description: string }[];
  implementation: string;
  requirements: string;
  sources: { path: string; label: string }[];
}

export const projects: Project[] = [
  {
    id: 'ai-solo-toolkit',
    number: '01',
    title: 'AI Solo Toolkit',
    repoName: 'ai-solo-toolkit',
    description:
      '给 AI 辅助开发留下一份可靠的项目记忆：进度交接、功能验证和自动化 Hooks，从新会话继续往前走。',
    tags: ['JavaScript', 'PowerShell', 'Hooks'],
    type: 'AI 开发工作流',
    status: '开源工具包',
    preview: 'workflow',
    featured: true,
    repository: 'https://github.com/luyvzz/ai-solo-toolkit',
    revision: '69f9433c958370844715ce6dce4af1cc0eb5fd5c',
    tagline: '让下一次 AI 会话，接得上这一次的进度。',
    problem:
      '独立开发和学生项目往往启动很快，却容易在多次 AI 会话之间丢失上下文。这个工具包把项目规则、进展记录和可验证的功能清单拆成简单文件，让项目状态能够被阅读、交接和检查。',
    features: [
      {
        title: '项目记忆与交接',
        description: '使用 CLAUDE.md 与 claude-progress.md 模板，分别保存稳定规则和本轮进展。',
      },
      {
        title: '可验证的功能切片',
        description:
          'features.json 模板为功能记录行为、验证方式与完成状态，让下一步任务有明确入口。',
      },
      {
        title: '会话启动快照',
        description: 'PowerShell 与 Shell 启动脚本展示近期进展、Git 提交和未完成的功能。',
      },
      {
        title: '确定性的 Hooks',
        description:
          '命令检查 Hook 用规则匹配常见高风险操作；格式化 Hook 在项目已有 Prettier 时调用本地工具。',
      },
    ],
    implementation:
      '工具包由可复制的 Markdown / JSON 模板、跨平台启动脚本及 JavaScript Hooks 组成。guard.mjs 从标准输入读取工具事件并匹配规则，format.mjs 根据文件类型调用本地格式化工具，两者都不调用模型。',
    requirements:
      '面向 Claude Code 风格的工作流，需要按目标项目修改模板与验证命令。命令检查采用规则匹配，不等同于安全沙箱；格式化需要目标项目已安装 Prettier。',
    sources: [
      { path: 'init.ps1', label: '会话启动与进度读取' },
      { path: '.claude/hooks/guard.mjs', label: '命令检查 Hook' },
      { path: 'features.template.json', label: '功能验证模板' },
    ],
  },
  {
    id: 'lceda-ai-assistant',
    number: '02',
    title: 'AI × EDA Assistant',
    repoName: 'luyv_lceda_ai_demo',
    description:
      '把 AI 对话带进立创 EDA 专业版，结合原理图、PCB、元件和网络上下文，探索硬件设计辅助。',
    tags: ['TypeScript', 'EDA Pro', 'esbuild'],
    type: '电子工程 × AI',
    status: '实验性扩展',
    preview: 'eda',
    featured: true,
    repository: 'https://github.com/luyvzz/luyv_lceda_ai_demo',
    revision: '73d02d61c88563c4a093504f5f62c64040bd2b20',
    tagline: '让 AI 对话，读懂正在设计的电路上下文。',
    problem:
      '向 AI 描述硬件问题时，往往需要反复整理元件、网络和当前文档信息。这个实验性扩展把聊天与建议面板放进 EDA 工作区，并通过 EDA API 采集当前设计上下文。',
    features: [
      {
        title: '工作区内的 AI 面板',
        description: '通过扩展菜单打开对话、设置和快速建议界面，减少在工具之间来回切换。',
      },
      {
        title: '原理图与 PCB 上下文',
        description: '尝试读取文档类型、元件、网络、走线、过孔及焊盘网络映射，组织成结构化上下文。',
      },
      {
        title: '模型接口配置',
        description:
          '支持配置模型与 API 地址，包含 OpenAI 兼容接口等请求实现；设置保存在本地扩展环境。',
      },
      {
        title: '扩展打包流程',
        description: '使用 TypeScript 类型检查与 esbuild 构建，生成用于安装测试的 .eext 扩展包。',
      },
    ],
    implementation:
      'src/index.ts 负责 EDA API 集成和上下文采集，iframe 页面负责聊天、建议和设置。采集逻辑对不同 API 的可用性做容错处理，再把工程上下文传给模型请求。',
    requirements:
      '需要立创 EDA 专业版扩展环境，以及用户自己的模型服务配置。项目处于 Demo 阶段，实际能力受 EDA API 和版本兼容性影响；设计建议仍需结合电路要求进行核对。',
    sources: [
      { path: 'src/index.ts', label: 'EDA 上下文采集' },
      { path: 'iframe/chat.html', label: '聊天面板与模型请求' },
      { path: 'config/build.mjs', label: '扩展构建与打包' },
    ],
  },
  {
    id: '26-skill',
    number: '03',
    title: '26-SKILL',
    repoName: '26-SKILL',
    description: '把平衡球小车的接手、烧录、串口遥测和误差分析整理成可复用的 Agent 调试流程。',
    tags: ['PowerShell', 'Python', 'Embedded'],
    type: '嵌入式 × Agent',
    status: '工程调试技能',
    preview: 'telemetry',
    featured: false,
    repository: 'https://github.com/luyvzz/26-SKILL',
    revision: 'ce56d0b0f7ce26c47196616027490252b606f304',
    tagline: '把一次工程调试的经验，留给下一次接手。',
    problem:
      '竞赛工程的难点往往还包括环境迁移、硬件链路核对和调试记录交接。仓库围绕平衡球小车整理了 Agent Skill、系统说明与辅助脚本，让接手工程时有一条可追踪的操作路径。',
    features: [
      {
        title: '工程接手与迁移',
        description: '以技能说明、系统映射、基线和调试历史文档，保存工程背景与操作依据。',
      },
      {
        title: '编译与烧录辅助',
        description:
          'PowerShell 脚本调用 Keil，检查编译日志、烧录结果与调试器连接，支持有限次数重试。',
      },
      {
        title: '串口遥测采集',
        description: '解析遥测数据包，将控制状态、视觉测量和执行器反馈等字段写入 CSV。',
      },
      {
        title: '分任务误差分析',
        description: 'Python 脚本按任务分析有效采样、最大绝对误差、阈值内比例及路线状态。',
      },
    ],
    implementation:
      '技能文档串联工程检查、Keil 编译烧录、串口采集和 CSV 分析。PowerShell 处理 Windows 工具链与硬件连接，Python 负责遥测数据汇总；相关参数和字段约定来自这套具体工程。',
    requirements:
      '面向特定平衡球小车工程，需要匹配的硬件、Keil 工具链、串口协议和路径配置。移植到其他工程时，应重新核对遥测字段、控制参数与测试条件。',
    sources: [
      {
        path: 'debug-balance-ball-car-skill/debug-balance-ball-car/scripts/keil_build_flash.ps1',
        label: 'Keil 编译与烧录脚本',
      },
      {
        path: 'debug-balance-ball-car-skill/debug-balance-ball-car/scripts/read_balance_telemetry.ps1',
        label: '串口遥测采集',
      },
      {
        path: 'debug-balance-ball-car-skill/debug-balance-ball-car/scripts/analyze_balance_run.py',
        label: '遥测误差分析',
      },
    ],
  },
  {
    id: 'vdmon',
    number: '04',
    title: 'vdmon',
    repoName: 'vdmon',
    description:
      '给 Windows 11 虚拟桌面一个全局视图：查看窗口分布、截取指定桌面，管理桌面名称与数量。',
    tags: ['Python', 'tkinter', 'Windows'],
    type: '桌面效率工具',
    status: 'Windows 11 工具',
    preview: 'desktop',
    featured: false,
    repository: 'https://github.com/luyvzz/vdmon',
    revision: 'bba696a4d051f517a53b7d617ce68c58968de06b',
    tagline: '不再来回切换，也能知道窗口都在哪里。',
    problem:
      '多虚拟桌面工作时，寻找某个窗口或记录指定桌面的状态通常需要逐个切换。vdmon 提供图形界面和命令行入口，把桌面、窗口标题、进程与 PID 集中呈现。',
    features: [
      {
        title: '桌面与窗口总览',
        description: '列出虚拟桌面和窗口，显示窗口标题、进程名、PID 与可见状态。',
      },
      {
        title: '单桌面与批量截图',
        description: '截取指定虚拟桌面，或依次保存所有桌面的 PNG 截图。',
      },
      { title: '桌面管理', description: '提供新建、切换、删除和重命名虚拟桌面的操作。' },
      {
        title: 'GUI 与 CLI 双入口',
        description:
          'tkinter 界面用于日常查看，命令行用于列举、截图及桌面管理。Python 部分只使用标准库。',
      },
    ],
    implementation:
      'Python 主程序通过 ctypes 调用 Windows GDI 截图，以 zlib 编码 PNG，并使用 tkinter 构建界面。独立的 PowerShell 进程通过 COM 桥接虚拟桌面接口，与 Python 交换命令和 JSON 结果。',
    requirements:
      '面向 Windows 11、64 位 Python 3.11+ 与 Windows PowerShell。截图非当前桌面时会短暂切换过去再返回；系统版本和会话环境可能影响虚拟桌面接口兼容性。',
    sources: [
      { path: 'desktop_monitor.pyw', label: '界面、命令行与 GDI 截图' },
      { path: 'vd_api.ps1', label: '虚拟桌面 COM 桥接' },
    ],
  },
];
