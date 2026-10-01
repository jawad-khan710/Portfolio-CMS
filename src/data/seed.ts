import type {
  Profile,
  SiteSettings,
  Skill,
  Project,
  Experience,
  Education,
  Certification,
  Service,
  Testimonial,
  BlogPost,
  ContactMessage,
} from '@/types'
import { STORAGE_KEYS, storage } from '@/lib/storage'
import { generateId, nowISO } from '@/lib/id'

const now = nowISO()
const ts = { createdAt: now, updatedAt: now }

const img = (seed: string, w = 1200, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export function makeDefaultProfile(): Profile {
  return {
    id: 'profile',
    fullName: 'Jawad Khan',
    professionalTitle: 'Data Scientist & AI Developer',
    tagline: 'I turn data into insights, predictive models, dashboards and practical AI applications.',
    avatar: img('jawad-data-science-avatar', 700, 850),
    email: 'jawadkhanktk788@gmail.com',
    phone: '+92 348 9510788',
    location: 'Peshawar, Khyber Pakhtunkhwa, Pakistan',
    shortBio:
      'Junior Data Scientist and BS Data Science student at UET Peshawar focused on Data Analysis, Machine Learning, Predictive Modelling and practical AI applications.',
    longBio:
      'I am a Junior Data Scientist and BS Data Science student at the University of Engineering & Technology (UET) Peshawar. My practical work spans data preprocessing, feature engineering, exploratory analysis, supervised machine learning, predictive modelling, business analytics and AI applications.\n\nI follow an end-to-end workflow from data cleaning and exploration through feature engineering, model development and evaluation, then turn the results into dashboards, APIs or interactive applications. I also work with LLMs, Hugging Face, LangChain and Streamlit for practical AI applications.',
    currentFocus: 'Data Analysis, Machine Learning, Predictive Modelling, Generative AI and practical LLM applications.',
    available: true,
    availabilityMessage: 'Open to internships, project-based work and research collaboration',
    yearsOfExperience: 1,
    projectsCompleted: 5,
    happyClients: 0,
    resumeUrl: '/Jawad_Khan_CV.pdf',
    social: [
      { platform: 'github', url: 'https://github.com/jawad-khan710', enabled: true },
    ],
    hero: {
      greeting: "Hi, I'm",
      valueProposition:
        'I build data-driven solutions — from exploratory analysis and dashboards to predictive models and AI applications.',
      availabilityText: 'Open to internships & project work',
      primaryCtaLabel: 'View My Projects',
      primaryCtaHref: '/projects',
      secondaryCtaLabel: "Let's Work Together",
      secondaryCtaHref: '/contact',
      imageOverride: '',
      showGreeting: true,
      showAvailability: true,
      showSecondaryCta: true,
      showSocials: true,
    },
    ...ts,
  }
}

export function makeDefaultSettings(): SiteSettings {
  return {
    id: 'settings',
    siteName: 'Jawad Khan',
    siteDescription: 'Jawad Khan — Data Scientist & AI Developer focused on Data Science, Machine Learning and AI applications.',
    logoText: 'Jawad Khan',
    logoImageUrl: '',
    faviconUrl: '/favicon.svg',
    seo: {
      metaTitle: 'Jawad Khan -- Data Scientist',
      metaDescription:
        'Data Scientist & AI Developer from Peshawar, Pakistan, focused on Data Analysis, Machine Learning, Predictive Modelling and AI applications.',
      keywords: [
        'Jawad Khan',
        'Data Scientist',
        'Data Analysis',
        'Machine Learning',
        'Artificial Intelligence',
        'Python',
        'Power BI',
        'Generative AI',
        'RAG',
      ],
      ogImage: img('jawad-og', 1200, 630),
    },
    appearance: {
      defaultTheme: 'dark',
      accent: 'violet',
      animationsEnabled: true,
    },
    ...ts,
  }
}

function makeSkills(): Skill[] {
  const rows: Array<[string, Skill['category'], string, number, number, boolean]> = [
    ['Python', 'tools', 'FileCode2', 90, 2, true],
    ['SQL', 'database', 'Database', 84, 1, true],
    ['Pandas', 'tools', 'Table2', 88, 2, true],
    ['NumPy', 'tools', 'Sigma', 86, 2, true],
    ['Excel', 'tools', 'TableProperties', 88, 2, true],
    ['Scikit-learn', 'tools', 'BrainCircuit', 86, 1, true],
    ['XGBoost', 'tools', 'GitBranch', 82, 1, true],
    ['LightGBM', 'tools', 'GitBranch', 76, 1, false],
    ['Power BI', 'tools', 'BarChart3', 86, 1, true],
    ['Matplotlib', 'tools', 'LineChart', 78, 1, false],
    ['Machine Learning', 'other', 'BrainCircuit', 86, 1, true],
    ['Classification', 'other', 'GitCompareArrows', 84, 1, false],
    ['Regression', 'other', 'TrendingUp', 82, 1, false],
    ['Clustering', 'other', 'Network', 78, 1, false],
    ['PCA', 'other', 'ScatterChart', 76, 1, false],
    ['Feature Engineering', 'other', 'WandSparkles', 82, 1, true],
    ['Model Evaluation', 'other', 'ChartNoAxesCombined', 84, 1, true],
    ['Exploratory Data Analysis', 'other', 'Search', 90, 2, true],
    ['Hypothesis Testing', 'other', 'Sigma', 72, 1, false],
    ['Statistical Analysis', 'other', 'ChartNoAxesColumnIncreasing', 76, 1, false],
    ['RFM Analysis', 'other', 'Users', 74, 1, false],
    ['Cohort Analysis', 'other', 'CalendarRange', 70, 1, false],
    ['NLP', 'other', 'Languages', 72, 1, false],
    ['Generative AI', 'other', 'Sparkles', 80, 1, true],
    ['LLMs', 'other', 'MessageSquareText', 80, 1, true],
    ['Hugging Face', 'tools', 'Bot', 74, 1, true],
    ['LangChain', 'tools', 'Link2', 76, 1, true],
    ['Ollama', 'tools', 'Cpu', 72, 1, false],
    ['Streamlit', 'tools', 'LayoutDashboard', 84, 1, true],
    ['FastAPI', 'backend', 'Server', 72, 1, true],
    ['REST APIs', 'backend', 'Globe', 70, 1, false],
    ['Pydantic', 'tools', 'Braces', 72, 1, false],
  ]
  return rows.map(([name, category, icon, proficiency, yearsOfExperience, featured], i) => ({
    id: generateId('skill'), name, category, icon, proficiency, yearsOfExperience, featured, sortOrder: i, ...ts,
  }))
}

function makeProjects(): Project[] {
  const projects: Project[] = [
    {
      id: 'proj_aqi',
      title: 'AI Air Quality Prediction',
      slug: 'ai-air-quality-prediction',
      shortDescription: 'A machine-learning application that predicts AQI from environmental and historical air-quality data.',
      description:
        'An end-to-end air-quality prediction project covering data preparation, exploratory analysis, lag-based feature engineering, XGBoost modelling, evaluation and deployment. The project exposes a prediction API with FastAPI and a user-facing Streamlit application.',
      thumbnail: img('ai-air-quality', 1200, 800),
      images: [img('ai-air-quality-1', 1600, 1000)],
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'FastAPI', 'Streamlit'],
      category: 'Machine Learning',
      features: ['AQI prediction', 'Lag features', 'XGBoost model', 'FastAPI prediction endpoint', 'Streamlit interface'],
      challenges: ['Working with environmental time-series features and preparing historical observations for modelling.'],
      solutions: ['Cleaned and structured the dataset, engineered lag features, trained an XGBoost model and exposed the model through an API and Streamlit application.'],
      results: ['Deployed working prediction application for interactive AQI estimation.'],
      githubUrl: 'https://github.com/jawad-khan710',
      liveUrl: 'https://air-quality-index-deploy-en599s23ywghtvsmkfs9vf.streamlit.app/',
      client: '',
      completedAt: '2026-01-01',
      featured: true,
      published: true,
      sortOrder: 0,
      seo: { metaTitle: 'AI Air Quality Prediction — Jawad Khan', metaDescription: 'End-to-end AQI prediction using Python, XGBoost, FastAPI and Streamlit.' },
      ...ts,
    },
    {
      id: 'proj_architect',
      title: 'AI Data Science Project Architect',
      slug: 'ai-data-science-project-architect',
      shortDescription: 'An AI-powered project blueprint builder that helps learners turn a data idea into a structured project plan.',
      description:
        'An AI application designed to generate structured Data Science project blueprints, including dataset direction, research references, technology choices, requirements and a learning roadmap. The project combines an AI generation layer with a polished Streamlit interface.',
      thumbnail: img('ai-ds-project-architect', 1200, 800),
      images: [img('ai-ds-project-architect-1', 1600, 1000)],
      technologies: ['Python', 'Streamlit', 'FastAPI', 'Hugging Face', 'Qwen', 'LLM'],
      category: 'Generative AI',
      features: ['Structured project blueprints', 'Dataset recommendations', 'Research-paper references', 'Technology planning', 'Learning roadmap'],
      challenges: ['Turning an open-ended project idea into a consistent, useful and structured output.'],
      solutions: ['Used structured schemas and prompt-driven generation to organise AI output into reusable project-planning sections.'],
      results: ['A working AI-assisted project planning application deployed for interactive use.'],
      githubUrl: 'https://github.com/jawad-khan710',
      liveUrl: '',
      client: '',
      completedAt: '2026-08-01',
      featured: true,
      published: true,
      sortOrder: 1,
      seo: { metaTitle: 'AI Data Science Project Architect — Jawad Khan', metaDescription: 'AI-assisted Data Science project planning with structured blueprints and learning roadmaps.' },
      ...ts,
    },
    {
      id: 'proj_market_basket',
      title: 'Online Retail Market Basket Analysis',
      slug: 'online-retail-market-basket-analysis',
      shortDescription: 'An unsupervised retail analysis project using Apriori and FP-Growth to discover product associations.',
      description:
        'An exploratory and unsupervised retail analytics project built around transaction-level Online Retail data. The workflow covers cleaning, handling negative quantities and missing customer identifiers, basket construction, sparsity analysis and association-rule mining with Apriori and FP-Growth.',
      thumbnail: img('market-basket-analysis', 1200, 800),
      images: [img('market-basket-analysis-1', 1600, 1000)],
      technologies: ['Python', 'Pandas', 'Apriori', 'FP-Growth', 'Association Rules', 'Data Visualization'],
      category: 'Data Analysis',
      features: ['Transaction cleaning', 'Basket construction', 'Apriori', 'FP-Growth', 'Association-rule analysis'],
      challenges: ['Preparing sparse transaction data and dealing with returns, negative quantities and missing customer identifiers.'],
      solutions: ['Profiled the raw transactions, separated problematic rows, created basket representations and compared frequent-itemset mining approaches.'],
      results: ['Identified product-association patterns suitable for further retail and merchandising analysis.'],
      githubUrl: 'https://github.com/jawad-khan710',
      liveUrl: '',
      client: '',
      completedAt: '2026-07-01',
      featured: true,
      published: true,
      sortOrder: 2,
      seo: { metaTitle: 'Online Retail Market Basket Analysis — Jawad Khan', metaDescription: 'Unsupervised retail analytics using Apriori, FP-Growth and association rules.' },
      ...ts,
    },
    {
      id: 'proj_fraud_detection',
      title: 'Financial Fraud Detection System',
      slug: 'financial-fraud-detection-system',
      shortDescription: 'An end-to-end machine learning pipeline for detecting fraudulent transactions in a highly imbalanced 1M+ transaction dataset.',
      description:
        'A fraud detection workflow covering data exploration, preprocessing, feature analysis, class-imbalance handling and supervised model comparison. Logistic Regression, Random Forest and XGBoost were evaluated using Precision, Recall, F1-score and ROC-AUC, with emphasis on recall for the fraud class.',
      thumbnail: img('financial-fraud-detection', 1200, 800),
      images: [img('financial-fraud-detection-1', 1600, 1000)],
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'SMOTE', 'Machine Learning'],
      category: 'Machine Learning',
      features: ['1M+ transaction dataset', 'Class-imbalance handling', 'Logistic Regression', 'Random Forest', 'XGBoost', 'Precision / Recall / F1 / ROC-AUC'],
      challenges: ['Severe class imbalance and the need to evaluate fraud detection with metrics that reflect the cost of missed fraud.'],
      solutions: ['Performed preprocessing and feature analysis, applied imbalance-handling techniques, and compared multiple supervised models with recall-focused evaluation.'],
      results: ['Produced a structured fraud-risk modelling workflow for identifying transaction and customer-level patterns associated with fraudulent activity.'],
      githubUrl: 'https://github.com/jawad-khan710',
      liveUrl: '',
      client: '',
      completedAt: '2026-02-01',
      featured: true,
      published: true,
      sortOrder: 3,
      seo: { metaTitle: 'Financial Fraud Detection System — Jawad Khan', metaDescription: 'Fraud detection using Python, scikit-learn, XGBoost and imbalanced classification.' },
      ...ts,
    },
    {
      id: 'proj_business_intelligence',
      title: 'Business Intelligence & Data Analytics',
      slug: 'business-intelligence-data-analytics',
      shortDescription: 'Interactive business dashboards and analytical workflows using Power BI, Excel and SQL.',
      description:
        'A collection of business intelligence and data analytics work focused on transforming raw business and retail data into decision-ready reporting. The workflow includes data cleaning, exploratory analysis, KPI development, customer and sales analysis, and interactive visualization.',
      thumbnail: img('business-intelligence-data-analytics', 1200, 800),
      images: [img('business-intelligence-data-analytics-1', 1600, 1000)],
      technologies: ['Power BI', 'Excel', 'SQL', 'Data Analysis', 'Data Visualization'],
      category: 'Data Analysis',
      features: ['KPI dashboards', 'Sales performance analysis', 'Customer behavior analysis', 'Operational trend analysis', 'Interactive visualisation'],
      challenges: ['Turning raw business data into clear KPIs and visual narratives that can support practical decisions.'],
      solutions: ['Cleaned datasets, performed exploratory analysis, developed KPIs and built interactive dashboards for business and retail analysis.'],
      results: ['Created reusable analytical dashboards and reports for monitoring business performance and trends.'],
      githubUrl: 'https://github.com/jawad-khan710',
      liveUrl: '',
      client: '',
      completedAt: '2026-03-01',
      featured: true,
      published: true,
      sortOrder: 4,
      seo: { metaTitle: 'Business Intelligence & Data Analytics — Jawad Khan', metaDescription: 'Business analytics and interactive dashboards using Power BI, Excel and SQL.' },
      ...ts,
    }
  ]
  return projects
}

function makeExperience(): Experience[] {
  return [
    {
      id: generateId('exp'),
      company: 'DevSpire Solutions',
      position: 'AI Intern',
      location: 'Pakistan',
      employmentType: 'internship',
      startDate: '2025-11-01',
      endDate: '2026-02-28',
      current: false,
      description: 'Worked on practical machine learning workflows using real-world datasets, with a focus on preprocessing, feature engineering, supervised modelling and imbalanced classification.',
      responsibilities: [
        'Conducted data preprocessing and feature engineering on real-world datasets to support ML pipelines.',
        'Built and evaluated supervised ML models for classification and regression tasks using Python and scikit-learn.',
        'Contributed to a fraud detection project applying imbalanced classification techniques with recall-focused evaluation.',
      ],
      achievements: [],
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'Machine Learning', 'Feature Engineering'],
      companyUrl: '',
      sortOrder: 0,
      ...ts,
    },
    {
      id: generateId('exp'),
      company: 'Digital Empowerment Network (DEN)',
      position: 'Data Science Intern',
      location: 'Pakistan',
      employmentType: 'internship',
      startDate: '2025-07-01',
      endDate: '2025-09-30',
      current: false,
      description: 'Performed end-to-end data analysis and supervised machine learning development on assigned business datasets.',
      responsibilities: [
        'Performed end-to-end data analysis and supervised ML model development on assigned business datasets.',
        'Applied Logistic Regression and Decision Tree classifiers.',
        'Delivered structured analytical reports to a cross-functional team.',
      ],
      achievements: [],
      technologies: ['Python', 'Data Analysis', 'Logistic Regression', 'Decision Trees', 'Machine Learning'],
      companyUrl: '',
      sortOrder: 1,
      ...ts,
    },
  ]
}

function makeEducation(): Education[] {
  return [{
    id: generateId('edu'),
    institution: 'University of Engineering & Technology (UET) Peshawar',
    degree: 'BS Data Science',
    field: 'Data Science',
    startDate: '2024-01-01',
    endDate: '',
    current: true,
    description: 'BS Data Science undergraduate programme, 2024–Present (Expected 2028).',
    institutionUrl: 'https://www.uetpeshawar.edu.pk/',
    sortOrder: 0,
    ...ts,
  }]
}

function makeCertifications(): Certification[] {
  const rows = [
    ['Python for Data Science, AI & Development', 'IBM (Coursera)', '2025-06-01'],
    ['Data Analysis with Python', 'IBM (Coursera)', '2025-05-01'],
    ['Databases and SQL for Data Science with Python', 'IBM (Coursera)', '2025-02-01'],
  ] as const
  return rows.map(([name, issuer, issueDate], i) => ({
    id: generateId('cert'),
    name,
    issuer,
    issueDate,
    credentialId: '',
    credentialUrl: '',
    image: '',
    sortOrder: i,
    ...ts,
  }))
}

function makeServices(): Service[] {
  const rows = [
    ['Data Analysis & EDA', 'Turn raw datasets into clear findings through cleaning, exploratory analysis, statistics and visualisation.', 'BarChart3', ['Data cleaning', 'EDA', 'Statistical analysis', 'Insight reporting']],
    ['Machine Learning & Predictive Modelling', 'Build and evaluate practical predictive models for classification, regression and forecasting problems.', 'BrainCircuit', ['Feature engineering', 'Model training', 'Evaluation', 'Prediction workflows']],
    ['Power BI & Excel Analytics', 'Create decision-ready dashboards, reports and analysis workflows from business data.', 'LayoutDashboard', ['KPI dashboards', 'Trend analysis', 'Excel analysis', 'Power BI reporting']],
    ['Generative AI & LLM Applications', 'Prototype useful AI applications with modern LLM tooling, structured outputs and practical interfaces.', 'Sparkles', ['LLM applications', 'Prompt design', 'Hugging Face', 'Streamlit']],
    ['RAG & AI Chatbots', 'Build document-aware AI experiences using retrieval, embeddings and conversational interfaces.', 'MessageSquareText', ['RAG workflows', 'Document Q&A', 'LangChain', 'FastAPI / Streamlit']],
  ] as const
  return rows.map(([title, description, icon, features], i) => ({
    id: generateId('svc'), title, description, icon, features: [...features], startingPrice: '', deliveryTime: '', featured: i < 3, published: true, sortOrder: i, ...ts,
  }))
}

function makeTestimonials(): Testimonial[] { return [] }

function makeBlog(): BlogPost[] {
  const rows = [
    {
      title: 'From Raw Data to a Machine Learning Application',
      slug: 'from-raw-data-to-machine-learning-application',
      excerpt: 'A practical look at the workflow I follow from data cleaning and EDA to modelling and deployment.',
      content: '## The workflow\n\nA useful Data Science project is more than training a model. I start with data quality, understand the variables through EDA, engineer features that represent the problem, evaluate models with appropriate metrics, and then package the result into something people can actually use.\n\n## Deployment matters\n\nFor practical projects, I like exposing models through an API or a simple Streamlit interface so the result can be tested outside the notebook.',
      featuredImage: img('blog-ml-workflow', 1200, 800), category: 'Data Science', tags: ['Python', 'Machine Learning', 'Deployment'], author: 'Jawad Khan', publishedAt: '2026-08-15', status: 'published' as const, featured: true, seo: {},
    },
    {
      title: 'What I Learned Building a Data Science Project Architect',
      slug: 'what-i-learned-building-data-science-project-architect',
      excerpt: 'Lessons from turning an AI idea into a structured project-planning application.',
      content: '## The problem\n\nBeginners often know a topic but do not know how to turn it into a complete Data Science project.\n\n## The solution\n\nThe project architect organises an idea into datasets, research directions, tools, requirements and a learning roadmap. The main lesson was that structured outputs make AI applications easier to use and easier to improve.',
      featuredImage: img('blog-project-architect', 1200, 800), category: 'Generative AI', tags: ['LLM', 'Streamlit', 'AI'], author: 'Jawad Khan', publishedAt: '2026-08-01', status: 'published' as const, featured: true, seo: {},
    },
    {
      title: 'Market Basket Analysis with Apriori and FP-Growth',
      slug: 'market-basket-analysis-apriori-fp-growth',
      excerpt: 'How transaction data can be transformed into baskets and association rules for retail analysis.',
      content: '## Start with the transactions\n\nThe Online Retail dataset requires careful cleaning before association-rule mining. Returns, negative quantities and missing customer identifiers need to be understood before constructing baskets.\n\n## Compare mining approaches\n\nApriori and FP-Growth provide different ways to discover frequent itemsets. The useful output is not simply a list of rules; it is an interpretable view of product relationships that can support further retail analysis.',
      featuredImage: img('blog-market-basket', 1200, 800), category: 'Data Analysis', tags: ['Unsupervised Learning', 'Retail Analytics', 'Python'], author: 'Jawad Khan', publishedAt: '2026-07-15', status: 'published' as const, featured: false, seo: {},
    },
  ]
  return rows.map((r) => ({ id: generateId('post'), readingTime: Math.max(1, Math.round(r.content.split(/\s+/).length / 220)), ...r, ...ts }))
}

function makeMessages(): ContactMessage[] { return [] }

export const DATA_VERSION = 3

export function seedDatabase(): void {
  const seededVersion = storage.get<number>(STORAGE_KEYS.version)
  const fresh = seededVersion !== DATA_VERSION
  const ensure = <T>(key: string, factory: () => T) => {
    if (fresh || !storage.has(key)) storage.set(key, factory())
  }
  ensure(STORAGE_KEYS.profile, makeDefaultProfile)
  ensure(STORAGE_KEYS.settings, makeDefaultSettings)
  ensure(STORAGE_KEYS.skills, makeSkills)
  ensure(STORAGE_KEYS.projects, makeProjects)
  ensure(STORAGE_KEYS.experience, makeExperience)
  ensure(STORAGE_KEYS.education, makeEducation)
  ensure(STORAGE_KEYS.certifications, makeCertifications)
  ensure(STORAGE_KEYS.services, makeServices)
  ensure(STORAGE_KEYS.testimonials, makeTestimonials)
  ensure(STORAGE_KEYS.blog, makeBlog)
  ensure(STORAGE_KEYS.messages, makeMessages)
  storage.set(STORAGE_KEYS.version, DATA_VERSION)
}

export function resetDatabase(): void {
  storage.set(STORAGE_KEYS.version, -1)
  ;[
    STORAGE_KEYS.profile,
    STORAGE_KEYS.settings,
    STORAGE_KEYS.skills,
    STORAGE_KEYS.projects,
    STORAGE_KEYS.experience,
    STORAGE_KEYS.education,
    STORAGE_KEYS.certifications,
    STORAGE_KEYS.services,
    STORAGE_KEYS.testimonials,
    STORAGE_KEYS.blog,
    STORAGE_KEYS.messages,
  ].forEach((key) => storage.remove(key))
  seedDatabase()
}
