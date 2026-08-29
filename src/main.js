import './styles.css';

const portfolioUrl = 'https://woaiwangcai.github.io/legal-ai-csm-portfolio/';
const githubProfile = 'https://github.com/woaiwangcai';
const contractRepo = 'https://github.com/woaiwangcai/contract-reviewer';
const invoiceRepo = 'https://github.com/woaiwangcai/invoice';
const pdfRepo = 'https://github.com/woaiwangcai/pdf-scan-split-workbench';

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

function render() {
  document.querySelector('#app').innerHTML = `
    <header class="site-header">
      <a class="brand" href="#top" aria-label="回到首页"><span class="brand-mark">ZH</span><span>LEGAL AI / CSM</span></a>
      <nav class="main-nav" aria-label="主导航">
        <a href="#case">主案例</a><a href="#evaluation">评测方法</a><a href="#success">客户落地</a><a href="#more">辅助证据</a>
      </nav>
      <a class="header-link" href="${githubProfile}" target="_blank" rel="noreferrer">GitHub ${icon('external')}</a>
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

      <section class="evidence-section section-shell reveal">
        <div class="section-label"><span>THE THROUGHLINE</span><span>我如何把问题讲清楚</span></div>
        <div class="evidence-chain"><div class="chain-step"><span class="chain-no">01</span><strong>业务问题</strong><small>人工审查耗时，风险条款容易遗漏</small></div><div class="chain-line"></div><div class="chain-step"><span class="chain-no">02</span><strong>AI 流程</strong><small>解析、路由、规则约束、模型调用</small></div><div class="chain-line"></div><div class="chain-step"><span class="chain-no">03</span><strong>证据输出</strong><small>原文定位、风险后果、可复制条款</small></div><div class="chain-line"></div><div class="chain-step"><span class="chain-no">04</span><strong>客户落地</strong><small>配置、培训、验收、反馈闭环</small></div></div>
      </section>

      <section id="case" class="case-section section-shell">
        <div class="section-heading reveal"><div><p class="eyebrow"><span class="eyebrow-line"></span>主案例 / CASE 01</p><h2>AI 合同审查<br />与知识沉淀工具</h2></div><div class="heading-aside"><span class="case-stamp">个人实践项目</span><p>从合同审查现场出发，设计一条可复核、可沉淀、可交付的 AI 工作流。</p></div></div>
        <div class="case-overview reveal"><div class="case-summary"><span class="label">PROJECT BRIEF</span><p class="large-copy">把律师打开 Word、翻知识库、找风险、写修改意见的重复动作，重新组织成一条有证据链的工作流。</p><div class="case-tags"><span>Python</span><span>LLM API</span><span>Docling</span><span>Markdown / HTML</span></div></div><div class="decision-list"><div><span>问题</span><b>信息散落在合同、参考材料和律师经验里</b></div><div><span>决策</span><b>先结构化与路由，再让模型按规则输出</b></div><div><span>交付</span><b>逐条清单 + 可复制条款 + HTML 改稿台</b></div></div></div>
      </section>

      <section class="deep-dive section-shell reveal"><div class="section-label"><span>CASE STUDY / DEEP DIVE</span><span>可在面试中展开</span></div><div class="tab-layout"><div class="tab-list" role="tablist" aria-label="案例细节"><p class="tab-intro">合同审查不是一次性生成，而是一个需要被业务理解、被评测、被持续运营的产品能力。</p>${projectTabs.map((tab, index) => `<button class="tab-button ${index === 0 ? 'active' : ''}" type="button" data-tab="${tab.id}" role="tab" aria-selected="${index === 0}"><span><small>${tab.eyebrow}</small><b>${tab.label}</b></span>${icon('arrow')}</button>`).join('')}</div><div id="tab-content" class="tab-content"></div></div></section>

      <section id="evaluation" class="evaluation-section section-shell"><div class="section-heading reveal"><div><p class="eyebrow"><span class="eyebrow-line"></span>评测方法 / AI EVALUATION</p><h2>让模型的表现<br />变成产品语言</h2></div><div class="heading-aside"><span class="case-stamp blue-stamp">EVAL READY</span><p>把“模型说得像不像”转成团队可以共同讨论的指标和样本。</p></div></div><div class="evaluation-grid reveal"><div class="eval-principle"><span class="label">MY EVALUATION PRINCIPLE</span><h3>准确不是唯一答案，<br />可复核才是上线前提。</h3><p>法律场景需要把每一条输出放回原文，允许律师快速判断、修改和追问。评测因此需要同时覆盖“找到了什么”和“为什么这样判断”。</p><div class="principle-list"><div><span>01</span><b>先做金标准</b><small>按合同类型与风险类别抽样标注</small></div><div><span>02</span><b>再看证据链</b><small>检查定位、引用和修复文本是否一致</small></div><div><span>03</span><b>最后量人工成本</b><small>观察复核率与失败兜底是否可接受</small></div></div></div><div class="metric-card"><div class="metric-header"><span>Metric board</span><span class="mono">status / drafting</span></div><div class="metric-chart"><div class="axis"><span>覆盖</span><span>证据</span><span>成本</span><span>兜底</span></div><div class="bars"><i style="height: 76%"><em>召回</em></i><i style="height: 62%"><em>引用</em></i><i style="height: 48%"><em>误报</em></i><i style="height: 38%"><em>复核</em></i><i class="bar-muted" style="height: 25%"><em>失败</em></i></div></div><div class="metric-legend"><span><i class="bar-key orange-key"></i>当前已有证据</span><span><i class="bar-key gray-key"></i>待补充样本</span></div></div></div></section>

      <section id="success" class="success-section section-shell"><div class="section-heading reveal"><div><p class="eyebrow"><span class="eyebrow-line"></span>客户成功 / CUSTOMER SUCCESS</p><h2>从“能跑”到<br />“客户愿意用”</h2></div><div class="heading-aside"><span class="case-stamp green-stamp">CSM LOOP</span><p>把交付拆成能被客户感知的阶段，把反馈变成产品迭代的输入。</p></div></div><div class="success-timeline reveal"><div class="timeline-line"></div><div class="timeline-item"><span>01</span><b>访谈</b><p>理解合同审查、用印合规、纠纷处理中的实际动作。</p></div><div class="timeline-item"><span>02</span><b>配置</b><p>按客户身份、合同类型与立场匹配知识与规则。</p></div><div class="timeline-item"><span>03</span><b>培训</b><p>用真实脱敏样本演示“从原文到建议”的完整路径。</p></div><div class="timeline-item"><span>04</span><b>验收</b><p>共同确认召回、定位、报告格式和人工兜底。</p></div><div class="timeline-item"><span>05</span><b>反馈</b><p>沉淀高频问题、误报与好条款，进入下一轮样本。</p></div></div></section>

      <section id="more" class="more-section section-shell"><div class="section-heading reveal"><div><p class="eyebrow"><span class="eyebrow-line"></span>辅助证据 / SUPPORTING WORK</p><h2>我也能把复杂流程<br />做成可用工具</h2></div><div class="heading-aside"><p>这些项目不抢主案例的叙事位置，但证明了我能在业务现场发现问题、拆解流程并交付结果。</p></div></div><div class="support-grid reveal"><article class="support-card"><div class="support-card-top"><span class="support-index">02</span><span class="support-type">DESKTOP TOOL</span></div><h3>律所团队发票核算与归档</h3><p>把读票、命名、目标金额匹配、Excel 回写和 PDF 合并串成一条可确认的流程。</p><div class="support-result"><b>52<span>张</span></b><span>单期发票<br />一次跑完</span><b>1.5h <i>→</i> 5m</b></div><a href="${invoiceRepo}" target="_blank" rel="noreferrer">查看仓库 ${icon('external')}</a></article><article class="support-card dark-card"><div class="support-card-top"><span class="support-index">03</span><span class="support-type">WINDOWS WORKBENCH</span></div><h3>PDF 扫描件拆分工作台</h3><p>面向无法可靠 OCR 的厚扫描卷宗，用页面预览、人工标记和导出校验控制材料边界。</p><div class="support-result"><b>3<span>层</span></b><span>预览 / 命名 /<br />校验导出</span><b>ZIP</b></div><a href="${pdfRepo}" target="_blank" rel="noreferrer">查看仓库 ${icon('external')}</a></article></div></section>

      <section class="closing-section section-shell reveal"><div class="closing-copy"><p class="eyebrow"><span class="eyebrow-line"></span>WHY THIS ROLE</p><h2>我想做的，是让法律 AI<br /><span>真正进入工作流。</span></h2><p>我能听懂法律业务的细节，也愿意把它们翻译成产品、评测和客户成功团队都能协作的语言。</p><div class="closing-actions"><a class="button button-primary" href="${contractRepo}" target="_blank" rel="noreferrer">打开合同审查仓库 ${icon('external')}</a><a class="text-link" href="${githubProfile}" target="_blank" rel="noreferrer">浏览全部 GitHub 项目 ${icon('arrow')}</a></div></div><div class="qr-card"><div class="qr-frame"><img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(portfolioUrl)}" alt="作品集网页二维码" /></div><div><span class="label">SCAN TO VIEW</span><b>手机打开作品集</b><small>GitHub Pages / legal-ai-csm-portfolio</small></div></div></section>
    </main>
    <footer class="site-footer"><div><span class="brand-mark">ZH</span> 郑又洪 / Legal AI CSM Portfolio</div><span>个人实践项目 · 不含真实客户隐私与密钥</span><a href="#top">回到顶部 ${icon('arrow')}</a></footer>
    <div class="toast" role="status" aria-live="polite"></div>
  `;
  renderTab('flow');
  bindInteractions();
}

function renderTab(id) {
  const tab = projectTabs.find((item) => item.id === id) || projectTabs[0];
  const target = document.querySelector('#tab-content');
  target.innerHTML = `<div class="tab-eyebrow">${tab.eyebrow}</div><h3>${tab.title}</h3><p class="tab-copy">${tab.copy}</p>${tab.visual}`;
  document.querySelectorAll('.tab-button').forEach((button) => {
    const active = button.dataset.tab === tab.id;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
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
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

render();
