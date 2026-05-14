import type {
  DonationDetail,
  FaqItem,
  AboutDocument,
  AboutProcessStep,
  FundAchievement,
  FundPortfolio,
  HomePayload,
  NewsItem,
  Partner,
  Scholarship,
  SiteSetting,
  TeamMember,
} from '../types';

export const referenceImages = {
  logo: 'https://atu.edu.kz/templates/release/images/logo.svg',
  hero: 'https://atu.edu.kz/userfiles/images/index/mission.webp',
  finance: 'https://atu.edu.kz/img/hnp_news/s942.webp',
  innovation: 'https://atu.edu.kz/userfiles/images/index/strategy.webp',
  talent: 'https://atu.edu.kz/img/hnp_news/s941.webp',
  campus: 'https://atu.edu.kz/userfiles/images/index/mission.webp',
  galleryOne: 'https://atu.edu.kz/userfiles/images/index/mission.webp',
  galleryTwo: 'https://atu.edu.kz/userfiles/images/index/strategy.webp',
};

export const fallbackSettings: SiteSetting = {
  hero_title: 'ATU ENDOWMENT FUND',
  hero_subtitle:
    'Фонд долгосрочной поддержки АО «Алматинский технологический университет»: целевой капитал, прозрачное управление и устойчивые программы для студентов, науки и будущего университета.',
  fund_summary_title: 'Фонд, который работает дольше одного учебного года',
  fund_summary:
    'ATU Endowment Fund формирует долгосрочный целевой капитал АО «Алматинский технологический университет», чтобы инвестиционный доход фонда ежегодно направлялся на образование, научные инициативы, социальную поддержку студентов, развитие инфраструктуры и стратегические проекты университета.',
  footer_text:
    'Фонд долгосрочной поддержки АТУ: целевые капиталы, стипендии, гранты, инновации, социальные программы и системное развитие университетской среды.',
  fund_logo_url: referenceImages.logo,
  portfolio_section_description: 'Каждый портфель отвечает за отдельное направление поддержки АТУ и помогает донорам выбрать понятный фокус вклада.',
  achievement_section_title: 'Достижения фонда',
  achievement_section_description: 'Ключевые показатели показывают масштаб целевого капитала, инвестиционного дохода и программ поддержки.',
  team_section_title: 'Попечительский совет',
  team_section_description: 'Совет объединяет представителей университета и экспертов, отвечающих за стратегическое развитие фонда.',
  about_hero_title: 'О фонде',
  about_hero_description: 'ATU Endowment Fund — фонд долгосрочной поддержки АО «Алматинский технологический университет».',
  about_history_title: 'История создания фонда',
  about_history_text:
    'Фонд создан для долгосрочной поддержки студентов, научных инициатив и стратегического развития АТУ через целевой капитал и прозрачные программы финансирования.',
  about_process_title: 'Как работает фонд',
  about_process_description:
    'Модель фонда строится на сохранении капитала, профессиональном управлении и направлении инвестиционного дохода на утвержденные программы поддержки.',
  about_documents_title: 'Уставные документы',
  about_reports_title: 'Финансовая отчетность',
  news_hero_title: 'Новости',
  news_hero_description: 'События фонда, объявления и истории поддержки студентов АТУ.',
  news_section_title: 'Последние публикации',
  faq_hero_title: 'FAQ',
  faq_hero_description: 'Ответы на частые вопросы о фонде, пожертвованиях и программах поддержки.',
  faq_section_title: 'Частые вопросы',
  scholarships_hero_title: 'Стипендии',
  scholarships_hero_description: 'Грантовые и стипендиальные программы для студентов АТУ.',
  scholarships_section_title: 'Программы поддержки',
  scholarships_section_description: 'Каждая программа ориентирована на конкретный результат: обучение, исследования, участие в конкурсах и развитие инициатив.',
  hero_image_url: referenceImages.hero,
  email: 'info@atu.edu.kz',
  phone: '+7 727 221-88-08',
  address: 'г. Алматы, ул. Толе би, 100',
  instagram: 'https://www.instagram.com/atu_university/',
  youtube: 'https://www.youtube.com/@atuuniversity',
  facebook: 'https://facebook.com/atu.edu.kz',
  executive_director_photo_url: null,
  executive_director_name: 'Исполнительный директор фонда',
  executive_director_position: 'Ответственное лицо по взаимодействию с вкладчиками',
  executive_director_phone: '+7 727 221-88-08',
  executive_director_email: 'info@atu.edu.kz',
  contact_feedback_title: 'Форма обратной связи',
  contact_feedback_description: 'Отправьте вопрос, предложение о партнерстве или сообщение для команды фонда.',
  statistics: [
    { value: 5, label: 'целевых капиталов фонда' },
    { value: 5, label: 'направления поддержки АТУ' },
    { value: 10, label: 'лет долгосрочного горизонта' },
  ],
};

export const fallbackPortfolios: FundPortfolio[] = [
  {
    id: 1,
    title: 'Образование',
    direction: 'Стипендии и образовательные гранты',
    description: 'Именные стипендии, оплата обучения, академическая мобильность, олимпиады и профессиональные конкурсы студентов.',
    icon: 'graduation',
    color: '#071b4f',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: 'Наука и инновации',
    direction: 'Исследования, стартапы и прикладные лаборатории',
    description: 'Студенческие исследования, прототипы, стартап-команды, публикации и проекты в пищевых технологиях, IT и инженерии.',
    icon: 'innovation',
    color: '#0f766e',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: 'Социальная поддержка студентов',
    direction: 'Адресная помощь и равный доступ к обучению',
    description: 'Поддержка студентов из социально уязвимых категорий: обучение, проживание, питание и неотложные образовательные расходы.',
    icon: 'support',
    color: '#b45309',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 4,
    title: 'Развитие инфраструктуры университета',
    direction: 'Кампус, аудитории, лаборатории и цифровая среда',
    description: 'Модернизация учебных пространств, оборудования, библиотечной, цифровой и исследовательской инфраструктуры АТУ.',
    icon: 'infrastructure',
    color: '#2563eb',
    sort_order: 4,
    is_active: true,
  },
  {
    id: 5,
    title: 'Стратегическое развитие университета',
    direction: 'Долгосрочные инициативы и конкурентоспособность',
    description: 'Проекты, усиливающие бренд АТУ, индустриальные партнерства, международные программы и устойчивое развитие.',
    icon: 'strategy',
    color: '#7c3aed',
    sort_order: 5,
    is_active: true,
  },
];

export const fallbackAchievements: FundAchievement[] = [
  {
    id: 1,
    title: 'Объем целевого капитала',
    value: 500,
    unit: 'млн ₸',
    description: 'Плановый объем капитала для устойчивой ежегодной поддержки программ АТУ.',
    icon: 'capital',
    color: '#071b4f',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: 'Инвестиционный доход',
    value: 35,
    unit: 'млн ₸',
    description: 'Доход от управления капиталом, направляемый на целевые университетские программы.',
    icon: 'income',
    color: '#c99b3f',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: 'Поддержанные программы',
    value: 12,
    unit: 'программ',
    description: 'Стипендии, гранты, научные инициативы и социальные проекты фонда.',
    icon: 'programs',
    color: '#ff7c3b',
    sort_order: 3,
    is_active: true,
  },
];

export const fallbackDonationDetail: DonationDetail = {
  id: 1,
  qr_image_url: 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://endowment.atu.kz/#donate',
  bank_name: 'Банк будет указан после утверждения реквизитов',
  beneficiary: 'Корпоративный фонд «ATU Endowment Fund»',
  bin: '000000000000',
  iban: 'KZ000000000000000000',
  bik: 'XXXXXXXX',
  kbe: '17',
  payment_purpose: 'Добровольный вклад в целевой капитал ATU Endowment Fund',
  donation_cta_title: 'Ваш вклад становится частью долгосрочного капитала АТУ',
  public_offer_title: 'Договор публичной оферты',
  public_offer_url: '/public-offer.html',
  public_offer_document_url: null,
  public_offer_text:
    'Публичная оферта описывает порядок внесения добровольного вклада, целевое использование средств, права донора и обязательства фонда. Утвержденный документ можно заменить в админ-панели.',
  is_active: true,
};

export const fallbackBoardMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Кулажанов Куралбек Садибаевич',
    role: 'Председатель Попечительского совета',
    regalia: 'Президент Алматинского технологического университета, доктор технических наук, профессор.',
    category: 'board',
    photo_url: 'https://atu.edu.kz/img/staff/1.webp',
  },
  {
    id: 2,
    name: 'Нурахметов Бауржан Кумаргалиевич',
    role: 'Член Попечительского совета',
    regalia: 'Первый проректор, отвечает за академическое развитие и институциональные проекты университета.',
    category: 'board',
    photo_url: 'https://atu.edu.kz/img/staff/3.webp',
  },
  {
    id: 3,
    name: 'Алиев Баходир Азимджонович',
    role: 'Член Попечительского совета',
    regalia: 'Проректор по науке и инновациям, курирует исследовательские и технологические инициативы.',
    category: 'board',
    photo_url: 'https://atu.edu.kz/img/staff/6.webp',
  },
  {
    id: 4,
    name: 'Балхыбекова Коркем Сатылхановна',
    role: 'Член Попечительского совета',
    regalia: 'Проректор по воспитательной работе, курирует социальную поддержку и студенческую среду.',
    category: 'board',
    photo_url: 'https://atu.edu.kz/img/staff/5.webp',
  },
  {
    id: 5,
    name: 'Ердинбеков Болат Садыкович',
    role: 'Член Попечительского совета',
    regalia: 'Проректор по административно-хозяйственным вопросам, отвечает за инфраструктурные направления.',
    category: 'board',
    photo_url: 'https://atu.edu.kz/img/staff/7.webp',
  },
];

export const fallbackFounder: TeamMember = {
  id: 6,
  name: 'Кулажанов Талгат Куралбекович',
  role: 'Ректор АО «Алматинский технологический университет»',
  regalia: 'Доктор технических наук, профессор. Представляет учредителя фонда и стратегическое развитие университета.',
  category: 'founder',
  photo_url: 'https://atu.edu.kz/img/staff/2.webp',
};

export const fallbackScholarships: Scholarship[] = [
  {
    id: 1,
    title: 'Именная стипендия ATU Endowment Fund',
    description: 'Финансовая поддержка студентов АТУ с высокой академической успеваемостью и сильной социальной позицией.',
    conditions: 'Средний балл от 3.5, активное участие в академической, научной или общественной жизни университета.',
    application_steps: 'Заполните анкету, приложите подтверждающие документы и дождитесь рассмотрения заявки комиссией фонда.',
    required_documents: 'Удостоверение личности, транскрипт, справка с места учебы, мотивационное письмо.',
    amount: 250000,
    deadline: '2026-06-30',
  },
  {
    id: 2,
    title: 'Грант на обучение',
    description: 'Помощь студентам, которым необходимо закрыть образовательные расходы и продолжить обучение без паузы.',
    conditions: 'Подтвержденная потребность в финансовой поддержке и отсутствие академической задолженности.',
    application_steps: 'Опишите ситуацию, приложите документы по обучению и финансовому положению, отправьте заявку через форму.',
    required_documents: 'Удостоверение личности, справка об обучении, документы, подтверждающие необходимость поддержки.',
    amount: 500000,
    deadline: '2026-07-20',
  },
  {
    id: 3,
    title: 'Грант на исследовательский проект',
    description: 'Поддержка стартапов, научных работ, олимпиад и прикладных команд в пищевых технологиях, инженерии, IT и бизнесе.',
    conditions: 'Наличие проекта, научного руководителя или подтвержденного участия в конкурсе/мероприятии.',
    application_steps: 'Кратко опишите проект, бюджет и ожидаемый результат, затем загрузите заявку и подтверждающие материалы.',
    required_documents: 'Описание проекта, бюджет, рекомендация руководителя, подтверждение участия при наличии.',
    amount: 350000,
    deadline: '2026-08-15',
  },
];

export const fallbackNews: NewsItem[] = [
  {
    id: 1,
    title: 'Эндаумент АТУ усиливает долгосрочную поддержку студентов',
    slug: 'endowment-atu-usilivaet-podderzhku-studentov',
    excerpt: 'ATU Endowment Fund развивает программы целевого капитала для студентов Алматинского технологического университета.',
    content:
      'Фонд объединяет выпускников, партнеров и индустриальные компании вокруг устойчивых программ: стипендий, грантов, исследований и студенческих инициатив.',
    image_url: referenceImages.talent,
    published_at: '2026-04-24T08:00:00.000Z',
  },
  {
    id: 2,
    title: 'Новые именные стипендии для талантливых студентов АТУ',
    slug: 'novye-imennye-stipendii',
    excerpt: 'Фонд расширяет программу поддержки студентов, которые показывают сильные академические результаты.',
    content: 'Программа помогает студентам сосредоточиться на обучении, исследованиях, олимпиадах и общественных проектах университета.',
    image_url: referenceImages.finance,
    published_at: '2026-04-10T08:00:00.000Z',
  },
  {
    id: 3,
    title: 'Поддержка студенческих стартапов и научных инициатив',
    slug: 'podderzhka-startapov-i-nauki',
    excerpt: 'Средства фонда направляются на инновационные проекты, исследования и прикладные команды университета.',
    content:
      'Эндаумент помогает запускать проекты, которые усиливают исследовательскую культуру АТУ и открывают студентам путь к предпринимательству.',
    image_url: referenceImages.innovation,
    published_at: '2026-03-26T08:00:00.000Z',
  },
];

export const fallbackPartners: Partner[] = [
  { id: 1, name: 'АО «Алматинский технологический университет»', logo_url: referenceImages.logo, website: 'https://atu.edu.kz' },
  { id: 2, name: 'ATU Endowment Fund', logo_url: referenceImages.logo, website: 'https://endowment.atu.kz' },
  { id: 3, name: 'Ассоциация выпускников АТУ', logo_url: referenceImages.logo, website: 'https://atu.edu.kz' },
];

export const fallbackTeam: TeamMember[] = [fallbackFounder, ...fallbackBoardMembers];

export const fallbackFaqs: FaqItem[] = [
  {
    id: 1,
    question: 'Что такое эндаумент?',
    answer: 'Это фонд целевого капитала: собранные средства сохраняются и инвестируются, а доход направляется на поддержку студентов и университетских инициатив.',
  },
  {
    id: 2,
    question: 'На что идут пожертвования?',
    answer: 'На гранты, именные стипендии, научные и инновационные проекты, конкурсы, олимпиады и социально значимые инициативы студентов АТУ.',
  },
  {
    id: 3,
    question: 'Как сделать вклад?',
    answer: 'Нажмите кнопку «Сделать вклад», отсканируйте QR-код или используйте актуальные банковские реквизиты фонда.',
  },
  {
    id: 4,
    question: 'Можно ли поддержать конкретный портфель?',
    answer: 'Да. Донор может выбрать портфель: образование, наука и инновации, социальная поддержка, инфраструктура или стратегическое развитие университета.',
  },
];

export const fallbackAboutProcessSteps: AboutProcessStep[] = [
  {
    id: 1,
    title: 'Формируется капитал',
    description: 'Взносы доноров аккумулируются в целевом капитале фонда.',
    icon: 'capital',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: 'Капитал инвестируется',
    description: 'Средства работают по утвержденной инвестиционной политике и сохраняют долгосрочный горизонт.',
    icon: 'governance',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: 'Доход направляется в программы',
    description: 'Инвестиционный доход используется для стипендий, грантов, науки и инфраструктурных проектов.',
    icon: 'income',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 4,
    title: 'Фонд отчитывается',
    description: 'Попечительский совет и команда фонда контролируют целевое использование средств и отчетность.',
    icon: 'reporting',
    sort_order: 4,
    is_active: true,
  },
];

export const fallbackAboutDocuments: AboutDocument[] = [];

export const fallbackHome: HomePayload = {
  settings: fallbackSettings,
  fund_portfolios: fallbackPortfolios,
  achievements: fallbackAchievements,
  board_members: fallbackBoardMembers,
  founder: fallbackFounder,
  donation_detail: fallbackDonationDetail,
  about_process_steps: fallbackAboutProcessSteps,
  about_documents: fallbackAboutDocuments,
  scholarships: fallbackScholarships,
  news: fallbackNews,
  partners: fallbackPartners,
  team_members: fallbackTeam,
  faqs: fallbackFaqs,
};
