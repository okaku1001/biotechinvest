export interface PipelineItem {
  name: string;
  target: string;
  indication: string;
  stage: string;
}

export interface Company {
  slug: string;
  name: string;
  nameEn: string;
  ticker: string;
  otherTickers?: string[];
  sector: string;
  description: string;
  marketCap?: string;
  revenue2024?: string;
  keyHighlight: string;
  coreProducts: {
    name: string;
    description: string;
    revenue?: string;
    status: string;
  }[];
  pipeline: PipelineItem[];
  financials: {
    label: string;
    value: string;
  }[];
  catalysts: string[];
}

export const companies: Company[] = [
  {
    slug: "beigene",
    name: "百济神州",
    nameEn: "BeOne Medicines (BeiGene)",
    ticker: "ONC (NASDAQ)",
    otherTickers: ["6160.HK", "688235.SS"],
    sector: "肿瘤学",
    description:
      "全球性肿瘤学公司，专注于发现、开发和商业化创新抗癌疗法。核心产品泽布替尼（BRUKINSA）已成为全球销量第一的 BTK 抑制剂，2024年全球收入达26亿美元。三地上市（纳斯达克、港交所、科创板），2025年上半年首次实现半年度盈利。",
    marketCap: "~$250亿",
    revenue2024: "$38.1亿",
    keyHighlight: "2024年收入增长55%，BRUKINSA成为美国新患者启动数最多的BTK抑制剂",
    coreProducts: [
      {
        name: "泽布替尼 (BRUKINSA / zanubrutinib)",
        description:
          "新一代 BTK 抑制剂，唯一在头对头试验中证明优于伊布替尼的 BTKi。已在70+市场获批，覆盖CLL/SLL、MCL、WM、MZL、FL等适应症。",
        revenue: "2024: $26亿 (+105% YoY)",
        status: "已上市 · 全球第一BTKi",
      },
      {
        name: "替雷利珠单抗 (百泽安 / Tevimbra / tislelizumab)",
        description:
          "PD-1 单抗，已在47个市场获批。2024年 FDA 批准食管鳞癌和一线胃癌适应症，EU 获批 NSCLC 三项适应症。",
        revenue: "2024: $6.21亿 (+16% YoY)",
        status: "已上市 · 全球扩展中",
      },
    ],
    pipeline: [
      {
        name: "BGB-16673",
        target: "BTK 降解剂 (CDAC)",
        indication: "CLL/SLL",
        stage: "关键性试验",
      },
      {
        name: "Sonrotoclax",
        target: "BCL2 抑制剂",
        indication: "血液肿瘤",
        stage: "Phase 3",
      },
      {
        name: "BGB-43395",
        target: "CDK4 选择性抑制剂",
        indication: "乳腺癌等实体瘤",
        stage: "Phase 2/3",
      },
      {
        name: "Ociperlimab",
        target: "Anti-TIGIT",
        indication: "NSCLC/SCLC",
        stage: "Phase 3",
      },
    ],
    financials: [
      { label: "2024年总收入", value: "$38.1亿 (+55% YoY)" },
      { label: "BRUKINSA 收入", value: "$26亿 (+105% YoY)" },
      { label: "2025年收入指引", value: "$49-53亿" },
      { label: "盈利里程碑", value: "2025 H1 首次半年盈利" },
    ],
    catalysts: [
      "2025全年预计实现正 GAAP 经营利润",
      "BGB-16673 (BTK降解剂) 关键性试验数据",
      "BGB-43395 (CDK4抑制剂) 内部峰值销售预估$50亿/年",
      "ADC 平台首批候选药物进入临床",
    ],
  },
  {
    slug: "legend-biotech",
    name: "传奇生物",
    nameEn: "Legend Biotech",
    ticker: "LEGN (NASDAQ)",
    sector: "细胞治疗",
    description:
      "全球性生物制药公司，专注于 CAR-T 细胞疗法。核心产品 CARVYKTI（西达基奥仑赛）与强生合作开发，是首个也是唯一一个获批用于多发性骨髓瘤一线复发的 BCMA 靶向 CAR-T 疗法。母公司为金斯瑞生物科技（1548.HK）。",
    marketCap: "~$31亿",
    revenue2024: "~$9.63亿 (CARVYKTI净贸易销售额)",
    keyHighlight: "CARVYKTI Q3 2025单季销售$5.24亿，LTM收入达$17亿",
    coreProducts: [
      {
        name: "CARVYKTI (西达基奥仑赛 / cilta-cel)",
        description:
          "BCMA 靶向 CAR-T 细胞疗法，用于复发/难治性多发性骨髓瘤。2024年4月 FDA 扩展批准至二线（首次复发后即可使用），NCCN Category 1 推荐。已在14个全球市场、279+治疗中心上市。",
        revenue: "2024 FY: ~$9.63亿; Q3 2025: $5.24亿",
        status: "已上市 · 适应症持续扩展",
      },
    ],
    pipeline: [
      {
        name: "CARTITUDE-10",
        target: "CARVYKTI 前线",
        indication: "新诊断多发性骨髓瘤",
        stage: "Phase 2",
      },
      {
        name: "In Vivo CAR-T",
        target: "CD20/CD19 双靶点",
        indication: "非霍奇金淋巴瘤",
        stage: "FIH 进行中",
      },
      {
        name: "LB2102",
        target: "DLL3 靶向 CAR-T",
        indication: "小细胞肺癌",
        stage: "与诺华合作",
      },
    ],
    financials: [
      { label: "CARVYKTI 2024 FY 销售", value: "~$9.63亿" },
      { label: "Q3 2025 季度销售", value: "$5.24亿 (创CAR-T记录)" },
      { label: "LTM 销售额", value: "~$17亿" },
      { label: "现金储备", value: "~$10亿 (2025.09)" },
    ],
    catalysts: [
      "CARVYKTI 特许经营权 2025 全年盈利",
      "预计 2026 年实现公司层面经营利润",
      "比利时 Ghent 工厂投产，产能目标 1万剂/年",
      "In Vivo CAR-T 首批人体数据预计 2026 H2",
    ],
  },
  {
    slug: "innovent",
    name: "信达生物",
    nameEn: "Innovent Biologics",
    ticker: "1801.HK",
    sector: "肿瘤 / 代谢",
    description:
      "创新型生物制药公司，已有15款产品获批上市。旗舰产品信迪利单抗（达伯舒）为国产 PD-1 领军者，GLP-1/GCG 双靶点激动剂玛仕度肽（Xinermei）是全球首个获批的此类减重药物。2025年与武田制药达成$114亿总价值的全球合作。2025年11月纳入恒生指数成分股。",
    marketCap: "~$90亿",
    revenue2024: "RMB 94.2亿 (~$13亿)",
    keyHighlight: "2024收入增长52%，Non-IFRS首次实现全年盈利",
    coreProducts: [
      {
        name: "信迪利单抗 (达伯舒 / TYVYT / sintilimab)",
        description:
          "PD-1 单抗，已获批8-10项适应症（NSCLC、HCC、胃癌、食管癌、子宫内膜癌等），为中国 PD-1 市场领导者之一。",
        revenue: "2024: ~RMB 38亿 (占产品收入46%)",
        status: "已上市 · 多适应症扩展",
      },
      {
        name: "玛仕度肽 (Xinermei / mazdutide)",
        description:
          "全球首个获批的 GCG/GLP-1 双靶点受体激动剂。2025年6月获批减重适应症，9月获批2型糖尿病。GLORY-2 试验显示 9mg 剂量可实现 20.1% 减重。DREAMS-3 头对头试验优于司美格鲁肽。",
        status: "已上市 · 持续扩展适应症",
      },
    ],
    pipeline: [
      {
        name: "IBI363",
        target: "PD-1/IL-2α 双特异性抗体",
        indication: "IO 耐药实体瘤",
        stage: "Phase 1b/2 · 武田合作",
      },
      {
        name: "IBI343",
        target: "CLDN18.2 ADC",
        indication: "胃癌 / 胰腺癌",
        stage: "Phase 3 · 武田合作",
      },
      {
        name: "IBI3001",
        target: "EGFR/B7H3 ADC",
        indication: "实体瘤",
        stage: "Phase 1 · 武田选择权",
      },
      {
        name: "IBI3032",
        target: "口服 GLP-1",
        indication: "肥胖 / 代谢疾病",
        stage: "Phase 1",
      },
    ],
    financials: [
      { label: "2024年总收入", value: "RMB 94.2亿 (+51.8% YoY)" },
      { label: "产品收入", value: "RMB 82.3亿 (+43.6% YoY)" },
      { label: "毛利率", value: "84.9%" },
      { label: "Non-IFRS 净利润", value: "RMB 3.32亿 (首次盈利)" },
    ],
    catalysts: [
      "武田合作总价值$114亿（$12亿首付款）",
      "赛诺菲$3.08亿投资共同开发两款肿瘤药",
      "玛仕度肽 9mg 剂量 NDA 在准备中",
      "2027年产品收入目标 RMB 200亿",
    ],
  },
  {
    slug: "akeso",
    name: "康方生物",
    nameEn: "Akeso Inc",
    ticker: "9926.HK",
    sector: "双特异性抗体",
    description:
      "中国领先的创新双特异性抗体公司，总部位于广东中山。已有7款药物上市销售，24个候选药物处于临床阶段（含15个双特异/多特异性抗体和双抗ADC）。核心产品依沃西单抗（AK112）是全球首个 PD-1/VEGF 双特异性抗体，已在中国获批多项NSCLC适应症，BLA 已获 FDA 受理。",
    marketCap: "~HK$500亿",
    revenue2024: "RMB 20亿 (+24.9% YoY)",
    keyHighlight: "依沃西单抗BLA获FDA受理，PDUFA日期2026年11月14日",
    coreProducts: [
      {
        name: "依沃西单抗 (AK112 / ivonescimab)",
        description:
          "全球首个 PD-1/VEGF 双特异性抗体。中国已获批3项适应症：EGFR突变NSCLC（TKI后）、PD-L1阳性NSCLC一线、晚期鳞状NSCLC一线。HARMONi-2 头对头击败帕博利珠单抗（PFS HR=0.51）。Summit Therapeutics 获中国以外全球授权。",
        status: "已上市(中国) · FDA BLA审评中",
      },
      {
        name: "卡度尼利单抗 (AK104 / cadonilimab / 开坦尼)",
        description:
          "PD-1/CTLA-4 双特异性抗体。已获批二线宫颈癌（2022）、一线胃癌（2024）、一线宫颈癌（2025）。2025 CSCO胃癌指南 Category I 推荐（IA 级证据）。",
        status: "已上市(中国) · 全球III期进行中",
      },
    ],
    pipeline: [
      {
        name: "Ligufalimab (AK117)",
        target: "CD47",
        indication: "一线头颈癌",
        stage: "Phase 3",
      },
      {
        name: "AK138D1",
        target: "HER-3 ADC",
        indication: "实体瘤",
        stage: "Phase 1 (澳洲)",
      },
      {
        name: "AK146D1",
        target: "Trop2/Nectin4 双抗ADC",
        indication: "实体瘤",
        stage: "早期临床",
      },
      {
        name: "AK139",
        target: "IL-4Rα/ST2 双特异性抗体",
        indication: "自免疾病",
        stage: "IND 获受理",
      },
    ],
    financials: [
      { label: "2024年商业化销售", value: "RMB 20亿 (+24.9% YoY)" },
      { label: "2025 H1 销售", value: "RMB 14亿 (+49.2% YoY)" },
      { label: "已上市药物", value: "7款" },
      { label: "临床管线", value: "24个候选药物" },
    ],
    catalysts: [
      "依沃西单抗 FDA PDUFA日期 2026/11/14",
      "HARMONi-3 (全人群NSCLC一线 vs 帕博利珠单抗) 数据",
      "与辉瑞合作：依沃西单抗+辉瑞ADC联合用药",
      "与GSK合作：依沃西单抗+B7-H3 ADC (SCLC)",
    ],
  },
  {
    slug: "wuxi-biologics",
    name: "药明生物",
    nameEn: "WuXi Biologics",
    ticker: "2269.HK",
    sector: "CRDMO 服务",
    description:
      "全球领先的生物药合同研发生产组织（CRDMO），提供从药物发现到商业化生产的端到端解决方案。客户覆盖全球主要制药和生物技术公司，在管项目817个，总订单积压185亿美元。在中国、美国、欧洲、新加坡等地设有生产基地。",
    marketCap: "~HK$1670亿",
    revenue2024: "RMB 186.75亿 (~$26亿)",
    keyHighlight: "2025 H1净利润增长56%，北美收入增长32.5%",
    coreProducts: [
      {
        name: "生物药 CRDMO 服务",
        description:
          "端到端生物药合同研发与生产服务，覆盖双特异性抗体（151个）、ADC（194个）、融合蛋白（80个）、疫苗（24个）等。拥有 WuXiBody、WuXia、WuXiUP 等专有技术平台。",
        revenue: "2024: RMB 186.75亿 (+9.6% YoY)",
        status: "全球领先 CRDMO",
      },
      {
        name: "WuXi XDC (生物偶联药物)",
        description:
          "专注于 ADC 等生物偶联药物的 CRDMO 服务，为增长最快的业务板块。2025 H1 收入爆发式增长。",
        status: "子公司 · 高速增长",
      },
    ],
    pipeline: [],
    financials: [
      { label: "2024年总收入", value: "RMB 186.75亿 (+9.6% YoY)" },
      { label: "2024年净利润", value: "RMB 39.45亿 (+10.5% YoY)" },
      { label: "毛利率", value: "41.0% (+1pp)" },
      { label: "总订单积压", value: "$185亿" },
    ],
    catalysts: [
      "2025年收入指引增长12%-15%",
      "BIOSECURE法案已签署但未直接点名，5年过渡期",
      "2025 H1 新增86个整合项目（半数以上来自美国客户）",
      "XDC业务板块爆发式增长",
    ],
  },
  {
    slug: "zai-lab",
    name: "再鼎医药",
    nameEn: "Zai Lab",
    ticker: "ZLAB (NASDAQ)",
    otherTickers: ["9688.HK"],
    sector: "多领域创新药",
    description:
      "研发驱动的商业化阶段创新药企，采用「License-in + 自研」双轮驱动模式。聚焦肿瘤、自免、神经科学、感染等领域。COBENFY（KarXT）是70年来首个全新机制的精神分裂症疗法，2025年12月获中国批准。自研 DLL3 ADC（ZL-1310）展现突破性 SCLC 疗效。",
    marketCap: "~$19亿",
    revenue2024: "$3.99亿 (+50% YoY)",
    keyHighlight: "COBENFY获中国批准，自研ZL-1310 SCLC ORR达74%",
    coreProducts: [
      {
        name: "VYVGART (efgartigimod)",
        description:
          "中国首个获批的 FcRn 阻滞剂，用于全身型重症肌无力。与 argenx 合作引进，已纳入 2025 NRDL。正在扩展 CIDP、干燥综合征等适应症。",
        revenue: "2024: $9360万",
        status: "已上市 · 适应症扩展中",
      },
      {
        name: "COBENFY (KarXT / xanomeline + trospium)",
        description:
          "全新机制精神分裂症疗法（毒蕈碱 M1/M4 激动剂），70年来首个突破性新机制。2025年12月获中国 NMPA 批准，计划 2026 H1 商业化上线。",
        status: "已批准(中国) · 即将上市",
      },
      {
        name: "AUGTYRO (repotrectinib)",
        description:
          "ROS1/NTRK 抑制剂，2024年5月获 NMPA 批准用于 ROS1 阳性 NSCLC，已纳入 2024 NRDL。",
        status: "已上市",
      },
    ],
    pipeline: [
      {
        name: "ZL-1310 (Zoci)",
        target: "DLL3 ADC (自研全球权益)",
        indication: "小细胞肺癌",
        stage: "Phase 1 · ORR 74%",
      },
      {
        name: "Bemarituzumab",
        target: "Anti-FGFR2b",
        indication: "一线胃癌",
        stage: "Phase 3",
      },
      {
        name: "Povetacicept",
        target: "BAFF/APRIL 双靶",
        indication: "IgA 肾病",
        stage: "FDA突破性疗法 · BLA滚动审评",
      },
      {
        name: "TTFields",
        target: "肿瘤电场治疗",
        indication: "胰腺癌 / NSCLC",
        stage: "Phase 3 达到OS终点",
      },
    ],
    financials: [
      { label: "2024年总收入", value: "$3.99亿 (+50% YoY)" },
      { label: "Q3 2025 收入", value: "$1.16亿 (+14% YoY)" },
      { label: "现金储备", value: "$8.17亿 (2025.09)" },
      { label: "NRDL 纳入产品", value: "6款" },
    ],
    catalysts: [
      "COBENFY 中国商业化上线 (2026 H1)",
      "ZL-1310 进入3项注册性研究 (2026年底前)",
      "ADAPT-OCULUS (VYVGART眼科) III期数据 2026 H1",
      "2028年收入目标$20亿",
    ],
  },
  {
    slug: "genscript",
    name: "金斯瑞生物科技",
    nameEn: "GenScript Biotech",
    ticker: "1548.HK",
    sector: "生命科学服务",
    description:
      "全球性生命科学与生物技术集团，提供基因合成、寡核苷酸合成、蛋白/抗体工程等生命科学服务。旗下控股传奇生物（LEGN），拥有 ProBio CDMO（生物药外包服务）和百斯杰（工业合成生物学）等业务板块。2024年因传奇生物解并表产生$32亿一次性收益。",
    marketCap: "~HK$500亿",
    revenue2024: "$5.95亿 (+6.1% YoY，持续经营)",
    keyHighlight: "2025 H1收入增长82%，ProBio CDMO收入暴增511%",
    coreProducts: [
      {
        name: "生命科学服务与产品",
        description:
          "核心业务：基因合成、寡核苷酸合成、多肽合成、蛋白工程、抗体开发及实验室设备耗材。全球最大的基因合成服务商之一。",
        revenue: "2024: $4.55亿 (+10.2% YoY)",
        status: "全球领先",
      },
      {
        name: "ProBio CDMO（生物药外包服务）",
        description:
          "端到端生物药 CDMO 服务，从药物发现到商业化生产。2025 H1 收入$2.47亿，同比暴增 511%。",
        revenue: "2024: $9500万; 2025 H1: $2.47亿",
        status: "高速增长",
      },
      {
        name: "百斯杰 (Bestzyme · 工业合成生物学)",
        description:
          "酶工程子公司，服务饲料、酒精、食品、家护行业。甜味蛋白已获 FDA GRAS 认证。",
        revenue: "2024: $5370万 (+24.6% YoY)",
        status: "加速增长",
      },
    ],
    pipeline: [],
    financials: [
      { label: "2024年持续经营收入", value: "$5.95亿 (+6.1% YoY)" },
      { label: "2025 H1 合并收入", value: "$5.19亿 (+81.9% YoY)" },
      { label: "调整后净利润 (持续经营)", value: "$5980万 (+2.9% YoY)" },
      { label: "2025 H1 调整后净利润", value: "$1.78亿 (+510% YoY)" },
    ],
    catalysts: [
      "ProBio CDMO 业务爆发式增长",
      "传奇生物 (LEGN) 权益价值持续提升",
      "甜味蛋白商业化工厂预计 2026 年中投产",
      "生命科学服务全球扩展",
    ],
  },
  {
    slug: "ascentage-pharma",
    name: "亚盛医药",
    nameEn: "Ascentage Pharma",
    ticker: "6855.HK",
    otherTickers: ["AAPG (NASDAQ)"],
    sector: "细胞凋亡疗法",
    description:
      "专注于恢复细胞凋亡机制的全球性创新药企，拥有两款已上市产品。核心产品耐立克（olverembatinib）是第三代 BCR-ABL 抑制剂，利生妥（lisaftoclax）是中国首个获批的 Bcl-2 抑制剂。2024年与武田达成$1亿首付款的全球授权协议。2025年1月完成美国纳斯达克上市。",
    marketCap: "~HK$125亿",
    revenue2024: "RMB 9.81亿 (含武田里程碑)",
    keyHighlight: "利生妥成为中国首个获批Bcl-2抑制剂，武田$1亿首付全球合作",
    coreProducts: [
      {
        name: "耐立克 (olverembatinib / HQP1351)",
        description:
          "第三代 BCR-ABL 抑制剂，用于 T315I 突变 CML 及 TKI 耐药/不耐受 CML-CP。获 FDA 4项孤儿药认定+快速审评通道认定。与武田达成全球独家选择权协议。",
        revenue: "2024: RMB 2.41亿; 2025 H1: RMB 2.17亿 (+93% YoY)",
        status: "已上市(中国) · 全球III期进行中",
      },
      {
        name: "利生妥 (lisaftoclax / APG-2575)",
        description:
          "Bcl-2 抑制剂，2025年7月获中国 NMPA 批准用于 CLL/SLL（BTKi 经治）。中国首个获批的 Bcl-2 抑制剂，全球第二个（仅次于 venetoclax）。GLORA 系列全球注册性III期试验正在推进。",
        status: "已上市(中国) · 全球注册试验中",
      },
    ],
    pipeline: [
      {
        name: "POLARIS-1",
        target: "Olverembatinib + 化疗",
        indication: "新诊断 Ph+ ALL",
        stage: "全球 Phase 3 (FDA/EMA 批准)",
      },
      {
        name: "GLORA-4",
        target: "Lisaftoclax + 阿扎胞苷",
        indication: "高危 MDS",
        stage: "全球 Phase 3 (FDA/EMA 批准)",
      },
      {
        name: "APG-3288",
        target: "BTK 蛋白降解剂 (PROTAC)",
        indication: "血液肿瘤",
        stage: "IND 获批 · 即将进入 Phase 1",
      },
      {
        name: "APG-5918",
        target: "EED 抑制剂",
        indication: "肿瘤 / 贫血",
        stage: "临床阶段",
      },
    ],
    financials: [
      { label: "2024年总收入", value: "RMB 9.81亿 (+342% YoY)" },
      { label: "耐立克 2024 销售", value: "RMB 2.41亿 (+52% YoY)" },
      { label: "现金储备", value: "RMB 16.6亿 (2025 H1)" },
      { label: "美国 IPO", value: "2025年1月 ~$1.43亿" },
    ],
    catalysts: [
      "POLARIS-2 (CML) 入组完成，潜在 2026 美国 NDA",
      "利生妥 NRDL 纳入谈判（将大幅提升销量）",
      "APG-3288 (BTK降解剂) 首批全球临床数据",
      "武田是否行使耐立克全球权益选择权",
    ],
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}
