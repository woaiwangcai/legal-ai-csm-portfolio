import './styles.css';
import publishedMarkup from './published-markup.html?raw';

const isLocalPreview = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
const portfolioUrl = isLocalPreview ? '' : `${window.location.origin}${window.location.pathname}`;
const editStorageKey = 'legal-ai-csm-portfolio-edit-v2';

const iconPaths = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  external: '<path d="M14 5h5v5M19 5l-8 8"/><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  copy: '<rect x="9" y="9" width="10" height="10" rx="1"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.7-1.6 6.7-7A5.4 5.4 0 0 0 19.2 4 5 5 0 0 0 19 1.5S17.8 1.1 15 3a13.4 13.4 0 0 0-6 0C6.2 1.1 5 1.5 5 1.5A5 5 0 0 0 4.8 4 5.4 5.4 0 0 0 3.3 7.5c0 5.4 3.4 6.6 6.7 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 18c-4.5 2-5-2-7-2"/>',
  play: '<path d="m8 5 11 7-11 7V5Z"/>',
};

function icon(name, className = '') {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || ''}</svg>`;
}

const projectTabs = [
  {
    id: 'flow',
    label: '流程链路',
    eyebrow: '01 / SYSTEM FLOW',
    title: '让每一条风险都能回到原文',
    copy: '不是把合同扔给模型，而是先把文档变成可检索、可定位、可复核的业务对象，再让模型按法律审查规则工作。',
    visual: `
      <div class="flow-stack">
        <div class="flow-row"><span class="flow-num">01</span><div><strong>DOCX 结构化解析</strong><small>保留标题、表格、修订与批注的上下文</small></div><span class="flow-tag blue">结构</span></div>
        <div class="flow-connector"></div>
        <div class="flow-row"><span class="flow-num">02</span><div><strong>客户与交易类型路由</strong><small>从知识库挑选与本次合同真正相关的经验</small></div><span class="flow-tag orange">检索</span></div>
        <div class="flow-connector"></div>
        <div class="flow-row"><span class="flow-num">03</span><div><strong>规则约束 + 模型审查</strong><small>先全局识别，再按合同顺序组织风险</small></div><span class="flow-tag dark">推理</span></div>
        <div class="flow-connector"></div>
        <div class="flow-row"><span class="flow-num">04</span><div><strong>HTML / Markdown 报告</strong><small>定位关键词、修复条款、批注与处理方式</small></div><span class="flow-tag green">交付</span></div>
      </div>`,
  },
  {
    id: 'eval',
    label: 'AI 评测',
    eyebrow: '02 / EVALUATION',
    title: '把“好不好用”拆成可讨论的指标',
    copy: '法律 AI 的评测不能只看模型回答是否流畅。我的评测框架同时观察风险覆盖、证据质量、人工成本和失败时的可控性。',
    visual: `
      <div class="eval-board">
        <div class="eval-topline"><span>评测维度</span><span class="mono">v0.1 / personal practice</span></div>
        <div class="metric-line"><div><strong>风险召回率</strong><small>金标准中被识别的风险项</small></div><b class="metric-status verified">95%+<em>已有实践口径</em></b></div>
        <div class="metric-line"><div><strong>引用准确性</strong><small>风险是否能回到原文位置</small></div><b class="metric-status baseline">基线待建<em>需标注样本</em></b></div>
        <div class="metric-line"><div><strong>误报率</strong><small>无实质风险却触发的条目</small></div><b class="metric-status baseline">基线待建<em>需人工复核</em></b></div>
        <div class="metric-line"><div><strong>人工复核率</strong><small>最终仍需要律师判断的条目</small></div><b class="metric-status baseline">基线待建<em>按合同类型拆分</em></b></div>
        <div class="eval-foot"><span class="dot orange"></span>已验证结果</span><span><span class="dot gray"></span>下一轮评测任务</span></div>
      </div>`,
  },
  {
    id: 'success',
    label: '客户成功',
    eyebrow: '03 / CUSTOMER SUCCESS',
    title: '交付的不只是报告，而是一套工作方式',
    copy: '从客户访谈开始，把律师的判断转成配置、培训和验收标准，再用反馈反哺规则与知识库，让产品进入日常业务。',
    visual: `
      <div class="success-board">
        <div class="success-kicker">CUSTOMER LOOP</div>
        <div class="success-loop"><span>访谈</span><span>配置</span><span>培训</span><span>验收</span><span>反馈</span></div>
        <div class="success-quote">“这条风险为什么出现？”<br /><b>因为它能回到合同原文、规则卡和可执行的修复文本。</b></div>
        <div class="success-note"><span class="avatar">CS</span><span>每一次客户反馈，都是下一版产品评测样本。</span></div>
      </div>`,
  },
];

const reviewTasks = [
  {
    id: 'risk-1',
    section: '价款与付款',
    level: 'S',
    title: '付款前提未绑定验收',
    previewLocation: '费用结算　/　付款条款',
    location: '第五条第 1 款 · page 03',
    anchor: '乙方完成服务后，甲方一次性支付全部合同款项。',
    consequence: '服务质量有争议时，付款已完成，甲方缺少以验收结果控制付款的抓手。',
    clause: '乙方完成服务并经甲方书面验收确认，且提交符合规定的发票及完整付款资料后，甲方于30个工作日内支付合同款项。',
  },
  {
    id: 'risk-2',
    section: '价款与付款',
    level: 'A',
    title: '收款账户变更责任缺失',
    previewLocation: '指定结算账户',
    location: '第五条第 2 款 · page 03',
    anchor: '甲方将合同款项付至乙方指定账户后，视为履行付款义务。',
    consequence: '账户错误或变更未通知，容易造成错付、迟延，责任边界不清。',
    clause: '乙方应保证收款账户信息真实准确；账户变更应提前7个工作日书面通知甲方，因未及时通知或账户错误造成的损失由乙方承担。',
  },
  {
    id: 'risk-3',
    section: '服务范围',
    level: 'B',
    title: '附件与正文口径不一致',
    previewLocation: '报价单　/　服务范围',
    location: '第一条 / 报价单 · page 02',
    anchor: '本合同服务范围详见报价单。',
    consequence: '附件缺失或口径不清，服务范围、数量和计价方式容易争议。',
    clause: '本合同服务范围以双方盖章确认的附件为准；超出附件约定范围的服务，双方应另行协商并签署书面补充协议。',
  },
];

function renderReviewWorkbench() {
  const outline = ['总览', '主体与签署', '价款与付款', '验收与交付', '违约与解除', '附件一致性'];
  return `<div class="review-workbench reveal" id="contract-demo" data-report>
    <div class="workbench-windowbar"><span class="window-dots"><i></i><i></i><i></i></span><span>合同审查工作台</span><b>LIVE DEMO</b></div>
    <div class="report-contract-info"><div class="contract-info-file"><span class="file-icon">.DOCX</span><div><b>采购服务合同</b><span>客户路由：学校　/　甲方</span></div></div><span class="contract-status">已解析</span></div>
    <div class="report-progress-line" aria-label="解析进度"><span style="width: 78%"></span></div>
    <div class="workbench-layout"><aside class="report-outline"><div class="outline-title"><div><span>审查目录</span></div><em>12 页</em></div>${outline.map((item, index) => `<button type="button" class="outline-item ${index === 0 ? 'active' : ''}" data-outline-section="${item}"><span class="outline-index">${String(index + 1).padStart(2, '0')}</span><span>${item}</span></button>`).join('')}<div class="outline-foot"><span>目录跳转</span><small>右侧按原文顺序呈现</small></div></aside><section class="report-list"><div class="list-head"><div><span class="report-section-label">风险识别结果</span><h4>顺序审查改稿清单</h4></div><span class="list-count"><span>${String(reviewTasks.length).padStart(2, '0')} 条风险</span><b data-report-done class="sr-only">0</b></span></div><div class="report-tasks">${reviewTasks.map((task, index) => `<article class="report-task ${index === 0 ? 'is-active' : ''}" data-section="${task.section}" data-task-id="${task.id}"><button class="report-task-summary" type="button" data-report-open><span class="report-number summary-level-${task.level.toLowerCase()}">${task.level}</span><span class="report-task-title"><b>${task.title}</b><small>定位：${task.previewLocation}</small></span><span class="report-task-arrow">›</span></button><div class="report-task-details"><div class="report-info"><span>定位原文</span><p>${task.anchor}</p><button type="button" data-report-copy="${task.anchor}">复制定位</button></div><div class="report-info"><span>风险后果</span><p>${task.consequence}</p><button type="button" data-report-copy="${task.consequence}">复制后果</button></div><div class="report-info report-recommend"><span>推荐修改条款</span><p>${task.clause}</p><button type="button" class="primary-action" data-report-copy="${task.clause}">复制推荐条款</button></div><button class="report-done" type="button" data-report-done-toggle>标记为已处理</button></div></article>`).join('')}</div><div class="report-evidence-foot"><span><b>✓</b>每一条都带定位、后果和修复文本</span><span>点击风险项查看完整结果</span></div></section></div>
    <div class="workbench-statusbar"><span><span class="live-dot"></span>结构化审查完成</span><span>HTML　/　MARKDOWN</span></div>
  </div>`;
}

function render() {
  const qrMarkup = portfolioUrl
    ? `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(portfolioUrl)}" alt="作品集网页二维码" />`
    : `<div class="qr-offline"><b>本地预览</b><span>部署后生成二维码</span></div>`;
  const app = document.querySelector('#app');
  const savedMarkup = loadEditState();
  app.innerHTML = savedMarkup || publishedMarkup || `
    <header class="site-header">
      <a class="brand" href="#top" aria-label="回到首页"><span class="brand-mark">ZH</span><span>LEGAL AI / CSM</span></a>
      <nav class="main-nav" aria-label="主导航">
        <a href="#case">主案例</a><a href="#evaluation">评测方法</a><a href="#success">客户落地</a><a href="#more">辅助证据</a>
      </nav>
      <a class="header-link" href="?edit=1">编辑文案 ${icon('arrow')}</a>
    </header>

    <main id="top">
      <section class="hero section-shell">
        <div class="hero-copy reveal">
          <p class="eyebrow"><span class="eyebrow-line"></span>郑又洪 / 作品集 2026</p>
          <h1>把法律业务<br /><span>变成可交付的 AI 产品</span></h1>
          <p class="hero-lede">法律业务理解 <i>+</i> AI 产品化 <i>+</i> ToB 客户落地</p>
          <p class="hero-body">我用一线法律实践识别真实流程中的摩擦，再用 Python、LLM 和结构化方法把它做成能被团队使用、评测和持续改进的工具。</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#case">查看主案例 ${icon('arrow')}</a>
            <button class="button button-quiet" type="button" data-copy-pitch>复制 60 秒讲解 ${icon('copy')}</button>
          </div>
          <div class="hero-meta"><span><b>法律职业资格</b> A 证</span><span><b>法学本科</b> 湖南工业大学</span><span><b>当前方向</b> 产品型 CSM</span></div>
        </div>
        <div class="hero-product reveal delay-1" aria-label="合同审查报告演示界面">
          <div class="product-top"><span class="window-dots"><i></i><i></i><i></i></span><span class="product-title">合同审查工作台</span><span class="product-code">LIVE DEMO</span></div>
          <div class="product-body">
            <div class="product-file"><span class="file-icon">.DOCX</span><div><strong>采购服务合同</strong><small>客户路由：学校 / 甲方</small></div><span class="status-chip">已解析</span></div>
            <div class="product-progress"><span style="width: 78%"></span></div>
            <div class="product-grid">
              <div class="product-sidebar"><span class="sidebar-label">审查目录</span><b>总览</b><span>主体与签署</span><span class="active">价款与付款</span><span>验收与交付</span><span>违约与解除</span><span>附件一致性</span></div>
              <div class="product-report"><div class="report-head"><span>顺序审查改稿清单</span><span class="report-count">26 项</span></div><div class="risk-item"><span class="risk-level s">S</span><div><b>付款前提未绑定验收</b><small>定位：费用结算 / 付款条款</small></div><span class="risk-arrow">›</span></div><div class="risk-item"><span class="risk-level a">A</span><div><b>收款账户变更责任缺失</b><small>定位：指定结算账户</small></div><span class="risk-arrow">›</span></div><div class="risk-item"><span class="risk-level b">B</span><div><b>附件与正文口径不一致</b><small>定位：报价单 / 服务范围</small></div><span class="risk-arrow">›</span></div><div class="report-foot"><span class="mini-check">${icon('check')}</span> 每一条都带定位、后果和修复文本</div></div>
            </div>
          </div>
          <div class="product-bottom"><span><span class="live-dot"></span>结构化审查完成</span><span class="mono">HTML / MARKDOWN</span></div>
        </div>
      </section>

      <section class="proof-strip section-shell reveal">
        <div class="proof-item"><b>100<span>+</span></b><span>份真实合同<br />实战测试</span></div>
        <div class="proof-item"><b>1h <span class="to">→</span> 20m</b><span>单份合同初审<br />时间口径</span></div>
        <div class="proof-item"><b>65<span>%+</span></b><span>个人实践提效<br />口径</span></div>
        <div class="proof-item proof-note"><span class="note-mark">/</span><span>所有数字均标注<br />样本与实践范围</span></div>
      </section>

      <section class="evidence-section section-shell reveal" id="product-context">
        <div class="section-label"><span>PRODUCT CONTEXT / 4 QUESTIONS</span><span>先讲清楚为什么做</span></div>
        <div class="context-intro"><div><p class="context-question">WHO</p><h3>给谁用</h3><p>给需要高频处理商事合同的律师、法务和业务协作团队，帮助他们更快找到风险，也更稳地完成人工判断。</p></div><div><p class="context-question">WHERE</p><h3>在哪个场景</h3><p>来自律所合同审查、合同归档和团队协作现场：信息散落在 Word、参考材料和律师经验中。</p></div><div><p class="context-question">WHAT</p><h3>做了什么</h3><p>把 DOCX 解析、知识路由、审查规则、模型调用和 HTML 顺序改稿台串成一条可复核流程。</p></div><div><p class="context-question">WHY</p><h3>为什么做</h3><p>不是替律师下结论，而是降低机械检索和整理成本，把判断依据留在原文、规则与修复条款里。</p></div></div>
        <div class="evidence-chain compact-chain"><div class="chain-step"><span class="chain-no">01</span><strong>业务问题</strong></div><div class="chain-line"></div><div class="chain-step"><span class="chain-no">02</span><strong>AI 流程</strong><small>解析、路由、规则约束、模型调用</small></div><div class="chain-line"></div><div class="chain-step"><span class="chain-no">03</span><strong>证据输出</strong><small>原文定位、风险后果、可复制条款</small></div><div class="chain-line"></div><div class="chain-step"><span class="chain-no">04</span><strong>客户落地</strong><small>配置、培训、验收、反馈闭环</small></div></div>
      </section>

      <section id="case" class="case-section section-shell">
        <div class="section-heading reveal"><div><p class="eyebrow"><span class="eyebrow-line"></span>主案例 / CASE 01</p><h2>AI 合同审查<br />与知识沉淀工具</h2></div><div class="heading-aside"><span class="case-stamp">个人实践项目</span><p>从合同审查现场出发，设计一条可复核、可沉淀、可交付的 AI 工作流。</p></div></div>
        <div class="case-overview reveal"><div class="case-summary"><span class="label">PROJECT BRIEF</span><p class="large-copy">把律师打开 Word、翻知识库、找风险、写修改意见的重复动作，重新组织成一条有证据链的工作流。</p><div class="case-tags"><span>Python</span><span>LLM API</span><span>Docling</span><span>Markdown / HTML</span></div></div><div class="decision-list"><div><span>问题</span><b>信息散落在合同、参考材料和律师经验里</b></div><div><span>决策</span><b>先结构化与路由，再让模型按规则输出</b></div><div><span>交付</span><b>逐条清单 + 可复制条款 + HTML 改稿台</b></div></div></div>
        ${renderReviewWorkbench()}
      </section>

      <section class="deep-dive section-shell reveal"><div class="section-label"><span>CASE STUDY / DEEP DIVE</span><span>可在面试中展开</span></div><div class="tab-layout"><div class="tab-list" role="tablist" aria-label="案例细节"><p class="tab-intro">合同审查不是一次性生成，而是一个需要被业务理解、被评测、被持续运营的产品能力。</p>${projectTabs.map((tab, index) => `<button class="tab-button ${index === 0 ? 'active' : ''}" type="button" data-tab="${tab.id}" role="tab" aria-selected="${index === 0}"><span><small>${tab.eyebrow}</small><b>${tab.label}</b></span>${icon('arrow')}</button>`).join('')}</div><div id="tab-content" class="tab-content"></div></div></section>

      <section id="evaluation" class="evaluation-section section-shell"><div class="section-heading reveal"><div><p class="eyebrow"><span class="eyebrow-line"></span>评测方法 / AI EVALUATION</p><h2>让模型的表现<br />变成产品语言</h2></div><div class="heading-aside"><span class="case-stamp blue-stamp">EVAL READY</span><p>把“模型说得像不像”转成团队可以共同讨论的指标和样本。</p></div></div><div class="evaluation-grid reveal"><div class="eval-principle"><span class="label">MY EVALUATION PRINCIPLE</span><h3>准确不是唯一答案，<br />可复核才是上线前提。</h3><p>法律场景需要把每一条输出放回原文，允许律师快速判断、修改和追问。评测因此需要同时覆盖“找到了什么”和“为什么这样判断”。</p><div class="principle-list"><div><span>01</span><b>先做金标准</b><small>按合同类型与风险类别抽样标注</small></div><div><span>02</span><b>再看证据链</b><small>检查定位、引用和修复文本是否一致</small></div><div><span>03</span><b>最后量人工成本</b><small>观察复核率与失败兜底是否可接受</small></div></div></div><div class="metric-card"><div class="metric-header"><span>评测结果看板</span><span class="mono">个人实践 / 待补样本</span></div><div class="eval-table"><div class="eval-row eval-head"><span>指标</span><span>当前口径</span><span>说明</span></div><div class="eval-row"><b>常规风险识别</b><strong>95%+</strong><span>个人实践口径</span></div><div class="eval-row"><b>单份初审耗时</b><strong>1h → 20m</strong><span>100+ 合同测试样本</span></div><div class="eval-row"><b>引用准确性</b><strong class="pending">待建立基线</strong><span>需逐条核对原文位置</span></div><div class="eval-row"><b>人工复核率</b><strong class="pending">待建立基线</strong><span>按合同类型拆分</span></div><div class="eval-row"><b>失败兜底</b><strong class="ready">必须保留</strong><span>无法定位时回退人工</span></div></div><div class="eval-note"><i></i>数字只用于说明个人实践范围，不包装成商业客户指标。</div></div></div></section>

      <section id="success" class="success-section section-shell"><div class="section-heading reveal"><div><p class="eyebrow"><span class="eyebrow-line"></span>客户成功 / CUSTOMER SUCCESS</p><h2>从“能跑”到<br />“客户愿意用”</h2></div><div class="heading-aside"><span class="case-stamp green-stamp">CSM LOOP</span><p>把交付拆成能被客户感知的阶段，把反馈变成产品迭代的输入。</p></div></div><div class="success-timeline reveal"><div class="timeline-line"></div><div class="timeline-item"><span>01</span><b>访谈</b><p>理解合同审查、用印合规、纠纷处理中的实际动作。</p></div><div class="timeline-item"><span>02</span><b>配置</b><p>按客户身份、合同类型与立场匹配知识与规则。</p></div><div class="timeline-item"><span>03</span><b>培训</b><p>用真实脱敏样本演示“从原文到建议”的完整路径。</p></div><div class="timeline-item"><span>04</span><b>验收</b><p>共同确认召回、定位、报告格式和人工兜底。</p></div><div class="timeline-item"><span>05</span><b>反馈</b><p>沉淀高频问题、误报与好条款，进入下一轮样本。</p></div></div></section>

      <section id="more" class="more-section section-shell"><div class="section-heading reveal"><div><p class="eyebrow"><span class="eyebrow-line"></span>辅助项目 / SUPPORTING PRODUCTS</p><h2>同一套方法，<br />也能落到文件与财务流程。</h2></div><div class="heading-aside"><p>两个辅助项目都遵循同一条表达：先讲清楚使用者和现场，再展示输入、动作和结果。</p></div></div><div class="support-showcase reveal"><article id="pdf-demo" class="support-product"><div class="support-product-copy"><div class="support-card-top"><span class="support-index">02</span><span class="support-type">PDF SCAN WORKBENCH</span></div><h3>PDF 扫描件拆分工作台</h3><p><b>Who</b> 律师助理和案卷整理人员。<br /><b>Where</b> 厚扫描卷宗、页面边界相似且 OCR 不稳定的现场。<br /><b>What</b> 导入、预览、去空白、人工标记页码、拆分导出。<br /><b>Why</b> 把“凭感觉翻页”变成可检查、可撤销、可追溯的归档动作。</p><div class="support-result"><b>4<span>步</span></b><span>导入 / 预览 / 标记 / 导出</span><b>可撤销</b></div><button class="text-link" type="button" data-jump="more">看另一个产品 ${icon('arrow')}</button></div><div class="pdf-screen"><div class="screen-toolbar"><span class="screen-dots"><i></i><i></i><i></i></span><b>PDF 扫描件拆分工作台</b><span>处理状态：已导入</span></div><div class="pdf-screen-body"><div class="pdf-pages"><span class="page-preview selected">01</span><span class="page-preview">02</span><span class="page-preview">03</span><span class="page-preview blank">04</span><span class="page-preview">05</span><span class="page-preview">06</span></div><div class="pdf-controls"><div class="pdf-file-line"><span>.PDF</span><b>证据材料（合并上传版）</b></div><div class="pdf-action-row"><button>删除空白页</button><button>撤销</button><button class="pdf-export">导出拆分结果</button></div><div class="pdf-materials"><div><span>材料名称</span><span>页码</span></div><div><b>一审判决书</b><em>1-8</em></div><div><b>查封、扣押通知书</b><em>9-11</em></div><div><b>二审判决书</b><em>12-20</em></div></div></div></div></div></article><article id="invoice-demo" class="support-product invoice-product"><div class="support-product-copy"><div class="support-card-top"><span class="support-index">03</span><span class="support-type">INVOICE OPERATIONS</span></div><h3>律所团队发票核算与归档</h3><p><b>Who</b> 律所团队行政和财务协作人员。<br /><b>Where</b> 报销批次中，发票、Excel 和 PDF 需要反复对照的现场。<br /><b>What</b> 识别金额与抬头、校验命名、按目标金额匹配、回写 Excel、合并归档。<br /><b>Why</b> 把一次性、易错的手工核算变成可预览、可确认的批处理流程。</p><div class="support-result"><b>52<span>张</span></b><span>单期发票<br />一次跑完</span><b>1.5h <i>→</i> 5m</b></div><button class="text-link" type="button" data-jump="contract-demo">回到合同工作台 ${icon('arrow')}</button></div><div class="invoice-screen"><div class="screen-toolbar"><span class="screen-dots"><i></i><i></i><i></i></span><b>发票核算与归档</b><span>批次：2026-07</span></div><div class="invoice-screen-body"><div class="invoice-kpis"><div><span>待处理</span><b>52</b><small>张发票</small></div><div><span>已识别</span><b>52</b><small>100%</small></div><div><span>归档状态</span><b>完成</b><small>可核对</small></div></div><div class="invoice-table"><div><span>文件名</span><span>金额</span><span>报销人</span><span>状态</span></div><div><b>32.70_交通_郑又洪</b><span>¥32.70</span><span>郑又洪</span><em>已校验</em></div><div><b>128.00_餐费_团队</b><span>¥128.00</span><span>团队</span><em>已匹配</em></div><div><b>86.50_交通_郑又洪</b><span>¥86.50</span><span>郑又洪</span><em>已归档</em></div></div><div class="invoice-footer"><span>Excel 已回写</span><button>确认分配并归档</button></div></div></div></article></div></section>

      <section class="closing-section section-shell reveal"><div class="closing-copy"><p class="eyebrow"><span class="eyebrow-line"></span>WHY THIS ROLE</p><h2>我想做的，是让法律 AI<br /><span>真正进入工作流。</span></h2><p>我能听懂法律业务的细节，也愿意把它们翻译成产品、评测和客户成功团队都能协作的语言。</p><div class="closing-actions"><a class="button button-primary" href="#contract-demo">查看合同工作台 ${icon('arrow')}</a><a class="text-link" href="#product-context">回到产品背景 ${icon('arrow')}</a></div></div><div class="qr-card"><div class="qr-frame">${qrMarkup}</div><div><span class="label">PORTFOLIO ACCESS</span><b>${portfolioUrl ? '手机打开当前作品集' : '本地预览已就绪'}</b><small>${portfolioUrl ? '二维码只指向当前正式页面地址' : '部署公开页面后自动生成可扫码入口'}</small></div></div></section>
    </main>
    <footer class="site-footer"><div><span class="brand-mark">ZH</span> 郑又洪 / Legal AI CSM Portfolio</div><span>个人实践项目 · 不含真实客户隐私与密钥</span><a href="#top">回到顶部 ${icon('arrow')}</a></footer>
    <div class="toast" role="status" aria-live="polite"></div>
  `;
  if (!savedMarkup && !publishedMarkup.trim()) renderTab('flow');
  bindInteractions();
  setupEditMode();
}

function renderTab(id) {
  const tab = projectTabs.find((item) => item.id === id) || projectTabs[0];
  const target = document.querySelector('#tab-content');
  target.innerHTML = `<div class="tab-eyebrow">${tab.eyebrow}</div><h3>${tab.title}</h3><p class="tab-copy">${tab.copy}</p>${tab.visual}`;
  if (new URLSearchParams(window.location.search).get('edit') === '1') {
    markEditable(target);
    markResizable(target);
  }
  document.querySelectorAll('.tab-button').forEach((button) => {
    const active = button.dataset.tab === tab.id;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  persistEditState();
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

async function copyPitch() {
  const pitch = '我是郑又洪，法学本科并持有法律职业资格A证。过去在律所参与商事合同审查、诉讼文书和法院程序，也在真实业务中用 Python 和大模型搭建了合同审查与知识沉淀工具。这个项目不是简单把合同交给模型，而是把 DOCX 结构化解析、客户与交易类型路由、知识库、规则约束、模型调用和可复核报告串成一条工作流。我希望把这种既理解法律场景、又能把 AI 做成产品并推动客户使用的能力，带到法律 AI 的客户成功岗位中。';
  try {
    await navigator.clipboard.writeText(pitch);
    showToast('60 秒项目讲解已复制');
  } catch {
    showToast('浏览器未允许自动复制，请直接从页面讲解');
  }
}

function bindInteractions() {
  document.querySelectorAll('.tab-button').forEach((button) => button.addEventListener('click', () => renderTab(button.dataset.tab)));
  document.querySelector('[data-copy-pitch]').addEventListener('click', copyPitch);
  document.querySelectorAll('[data-jump]').forEach((button) => button.addEventListener('click', () => {
    document.getElementById(button.dataset.jump)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  document.querySelectorAll('[data-report-open]').forEach((button) => button.addEventListener('click', () => {
    const task = button.closest('.report-task');
    document.querySelectorAll('.report-task.is-open').forEach((item) => { if (item !== task) item.classList.remove('is-open'); });
    task.classList.toggle('is-open');
  }));
  document.querySelectorAll('[data-report-copy]').forEach((button) => button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.reportCopy);
      showToast('内容已复制');
    } catch {
      showToast('浏览器未允许自动复制');
    }
  }));
  document.querySelectorAll('[data-report-done-toggle]').forEach((button) => button.addEventListener('click', () => {
    const task = button.closest('.report-task');
    task.classList.toggle('is-done');
    button.textContent = task.classList.contains('is-done') ? '已处理' : '未处理';
    refreshReportProgress();
  }));
  document.querySelectorAll('[data-report-filter]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('.report-task').forEach((task) => { task.style.display = ''; });
    document.querySelectorAll('[data-outline-section]').forEach((item) => item.classList.toggle('active', item.dataset.outlineSection === '总览'));
  }));
  document.querySelectorAll('[data-outline-section]').forEach((button) => button.addEventListener('click', () => {
    const section = button.dataset.outlineSection;
    document.querySelectorAll('[data-outline-section]').forEach((item) => item.classList.toggle('active', item === button));
    const matching = [...document.querySelectorAll('.report-task')].filter((task) => section === '总览' || task.dataset.section === section);
    document.querySelectorAll('.report-task').forEach((task) => { task.style.display = matching.includes(task) ? '' : 'none'; });
    const first = matching[0];
    document.querySelectorAll('.report-task.is-open').forEach((task) => task.classList.remove('is-open'));
    if (first) {
      first.classList.add('is-open');
      first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      showToast(`${section}暂无识别风险`);
    }
  }));
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

function refreshReportProgress() {
  const tasks = [...document.querySelectorAll('.report-task')];
  const done = tasks.filter((task) => task.classList.contains('is-done')).length;
  const progress = document.querySelector('[data-report-done]');
  if (progress) progress.textContent = String(done);
  const next = tasks.find((task) => !task.classList.contains('is-done'));
  tasks.forEach((task) => task.classList.toggle('is-active', task === next));
  const hint = document.querySelector('[data-report-hint]');
  if (hint) {
    if (next) hint.textContent = `当前第 ${tasks.indexOf(next) + 1} 条 · 处理完成后进入下一条`;
    else hint.textContent = '全部风险已处理，可导出最终改稿';
  }
}

function markEditable(root = document) {
  const candidates = root.querySelectorAll('h1, h2, h3, h4, p, b, strong, small, span');
  candidates.forEach((element) => {
    const insideControl = element.closest('button, a, svg, .edit-strip, .window-dots');
    const nestedInEditable = element.parentElement?.closest('[data-editable="true"]');
    if (insideControl || nestedInEditable || !element.textContent.trim()) return;
    element.contentEditable = 'true';
    element.spellcheck = false;
    element.dataset.editable = 'true';
  });
}

function markResizable(root = document) {
  const targets = [
    ['.hero-product', '右侧合同审查演示'],
    ['.review-workbench', '合同审查工作台'],
    ['.tab-content', '案例详情面板'],
    ['.pdf-screen', 'PDF 扫描工作台'],
    ['.invoice-screen', '发票核算工作台'],
    ['.qr-frame', '二维码'],
    ['.contract-info-file .file-icon', '合同文件图标'],
    ['.contract-paper', '合同原文预览'],
    ['.support-product-copy', '辅助项目说明'],
    ['.metric-card', '评测结果看板'],
    ['img', '图片'],
  ];
  targets.forEach(([selector, label]) => root.querySelectorAll(selector).forEach((element) => {
    element.dataset.editTarget = 'true';
    element.dataset.editLabel = label;
  }));
}

function setupEditMode() {
  if (new URLSearchParams(window.location.search).get('edit') !== '1') return;
  document.body.classList.add('edit-mode');
  const strip = document.createElement('div');
  strip.className = 'edit-strip';
  strip.innerHTML = `<div class="edit-strip-title"><b>编辑模式</b><span>点击文字直接修改；点击虚线区域调整尺寸</span></div><div class="edit-strip-selection"><span data-edit-selected>未选择元素</span><label>字号 <input data-edit-size type="number" min="10" max="96" step="1" disabled /></label><label>宽度 <input data-edit-width type="number" min="40" max="1600" step="1" disabled /></label><label>高度 <input data-edit-height type="number" min="24" max="1200" step="1" disabled /></label><button type="button" data-edit-reset disabled>恢复尺寸</button><button type="button" data-edit-delete disabled>删除所选</button></div><div class="edit-strip-actions"><button type="button" data-edit-save>保存修改</button><button type="button" data-edit-download>下载当前 HTML</button><button type="button" data-edit-clear>清除本地修改</button><button type="button" data-edit-exit>退出</button></div>`;
  document.body.prepend(strip);
  markEditable();
  markResizable();
  let selected = null;
  const selectedLabel = strip.querySelector('[data-edit-selected]');
  const sizeInput = strip.querySelector('[data-edit-size]');
  const widthInput = strip.querySelector('[data-edit-width]');
  const heightInput = strip.querySelector('[data-edit-height]');
  const resetButton = strip.querySelector('[data-edit-reset]');
  const deleteButton = strip.querySelector('[data-edit-delete]');

  const updateControls = (element) => {
    selected = element;
    document.querySelectorAll('.edit-selected').forEach((item) => item.classList.remove('edit-selected'));
    if (!element) {
      selectedLabel.textContent = '未选择元素';
      [sizeInput, widthInput, heightInput, resetButton, deleteButton].forEach((input) => { input.disabled = true; });
      return;
    }
    element.classList.add('edit-selected');
    const rect = element.getBoundingClientRect();
    selectedLabel.textContent = element.dataset.editLabel || element.textContent.trim().slice(0, 18) || '当前元素';
    sizeInput.value = Math.round(parseFloat(getComputedStyle(element).fontSize));
    widthInput.value = Math.round(rect.width);
    heightInput.value = Math.round(rect.height);
    [sizeInput, widthInput, heightInput, resetButton, deleteButton].forEach((input) => { input.disabled = false; });
  };

  document.addEventListener('focusin', (event) => {
    if (event.target.matches('[data-editable="true"]')) updateControls(event.target);
  });
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-editable="true"]')) return;
    const target = event.target.closest('[data-edit-target]');
    if (target && !event.target.closest('.edit-strip')) updateControls(target);
  });
  document.addEventListener('input', (event) => {
    if (!event.target.closest('.edit-strip')) persistEditState();
  });
  sizeInput.addEventListener('input', () => { if (selected) { selected.style.fontSize = `${sizeInput.value}px`; persistEditState(); } });
  widthInput.addEventListener('input', () => { if (selected) { selected.style.width = `${widthInput.value}px`; persistEditState(); } });
  heightInput.addEventListener('input', () => { if (selected) { selected.style.height = `${heightInput.value}px`; persistEditState(); } });
  resetButton.addEventListener('click', () => {
    if (!selected) return;
    selected.style.removeProperty('font-size');
    selected.style.removeProperty('width');
    selected.style.removeProperty('height');
    updateControls(selected);
    persistEditState();
  });
  deleteButton.addEventListener('click', () => {
    if (!selected || !window.confirm('删除当前选中的文字或区域？')) return;
    selected.remove();
    updateControls(null);
    persistEditState();
    showToast('已删除所选内容');
  });
  strip.querySelector('[data-edit-save]').addEventListener('click', () => {
    persistEditState();
    showToast('修改已保存到本机');
  });
  strip.querySelector('[data-edit-download]').addEventListener('click', downloadEditableSnapshot);
  strip.querySelector('[data-edit-clear]').addEventListener('click', () => {
    if (!window.confirm('清除本机保存的编辑内容并恢复默认页面？')) return;
    localStorage.removeItem(editStorageKey);
    window.location.reload();
  });
  strip.querySelector('[data-edit-exit]').addEventListener('click', () => {
    window.location.href = window.location.pathname + window.location.hash;
  });
}

function downloadEditableSnapshot() {
  const clone = document.documentElement.cloneNode(true);
  clone.querySelectorAll('.edit-strip').forEach((node) => node.remove());
  clone.body.classList.remove('edit-mode');
  clone.querySelectorAll('[contenteditable]').forEach((node) => {
    node.removeAttribute('contenteditable');
    node.removeAttribute('spellcheck');
    node.removeAttribute('data-editable');
  });
  clone.querySelectorAll('script').forEach((node) => node.remove());
  const styleText = [...document.styleSheets].map((sheet) => {
    try { return [...sheet.cssRules].map((rule) => rule.cssText).join('\n'); } catch { return ''; }
  }).join('\n');
  const style = document.createElement('style');
  style.textContent = styleText;
  clone.head.append(style);
  const html = `<!doctype html>\n${clone.outerHTML}`;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'legal-ai-csm-portfolio-edited.html';
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('HTML 快照已下载');
}

function persistEditState() {
  if (new URLSearchParams(window.location.search).get('edit') !== '1') return;
  const app = document.querySelector('#app');
  if (!app) return;
  const clone = app.cloneNode(true);
  clone.querySelectorAll('[contenteditable]').forEach((node) => {
    node.removeAttribute('contenteditable');
    node.removeAttribute('spellcheck');
    node.removeAttribute('data-editable');
  });
  clone.querySelectorAll('[data-edit-target]').forEach((node) => {
    node.removeAttribute('data-edit-target');
    node.removeAttribute('data-edit-label');
    node.classList.remove('edit-selected');
  });
  localStorage.setItem(editStorageKey, clone.innerHTML);
}

function loadEditState() {
  try {
    const markup = localStorage.getItem(editStorageKey);
    if (!markup || !markup.includes('site-header') || !markup.includes('合同审查工作台')) return '';
    const doc = new DOMParser().parseFromString(markup, 'text/html');
    doc.querySelector('.compact-chain .chain-step:first-child small')?.remove();
    return doc.body.innerHTML;
  } catch {
    return '';
  }
}

render();
