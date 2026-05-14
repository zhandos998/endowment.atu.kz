import { CircleHelp, Gift, HandCoins, Home, Info, Mail, Newspaper, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { entityConfigs } from './entityConfigs';
import type { EntityConfig } from './entityConfigs';

export type AdminSection = {
  path: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: {
    key: string;
    label: string;
    config: EntityConfig;
  }[];
};

function requireConfig(path: string) {
  const config = entityConfigs.find((item) => item.path === path);

  if (!config) {
    throw new Error(`Admin config not found: ${path}`);
  }

  return config;
}

function pickFields(config: EntityConfig, names: string[]) {
  return names.map((name) => {
    const field = config.fields.find((item) => item.name === name);

    if (!field) {
      throw new Error(`Field not found in ${config.path}: ${name}`);
    }

    return field;
  });
}

const settingsConfig = requireConfig('settings');
const teamConfig = requireConfig('team-members');
const aboutProcessConfig = requireConfig('about-process-steps');
const aboutDocumentConfig = requireConfig('about-documents');
const portfolioConfig = requireConfig('fund-portfolios');
const achievementConfig = requireConfig('fund-achievements');
const donationDetailConfig = requireConfig('donation-details');
const donationConfig = requireConfig('donations');
const contactMessageConfig = requireConfig('contact-messages');
const newsConfig = requireConfig('news');
const faqConfig = requireConfig('faqs');
const scholarshipConfig = requireConfig('scholarships');
const scholarshipApplicationConfig = requireConfig('scholarship-applications');

function settingsSubset(title: string, description: string, fields: string[]): EntityConfig {
  return {
    ...settingsConfig,
    title,
    description,
    tableFields: ['hero_title', 'email', 'address'],
    fields: pickFields(settingsConfig, fields),
    canCreate: false,
    canDelete: false,
    mode: 'settings',
  };
}

const portfolioTextConfig = settingsSubset(
  'Главная: текст блока целевых капиталов',
  'Редактируется описание под заголовком блока «Целевые капиталы фонда».',
  ['portfolio_section_description'],
);

const achievementTextConfig = settingsSubset(
  'Главная: текст блока достижений',
  'Редактируется заголовок и описание блока достижений на главной странице.',
  ['achievement_section_title', 'achievement_section_description'],
);

const teamTextConfig = settingsSubset(
  'Главная: текст блока команды и совета',
  'Редактируется заголовок и описание блока «Попечительский совет» на главной странице.',
  ['team_section_title', 'team_section_description'],
);

const aboutPageTextConfig = settingsSubset(
  'О фонде: история создания фонда',
  'Редактируется hero страницы и краткая история создания фонда.',
  [
    'about_hero_title',
    'about_hero_description',
    'about_history_title',
    'about_history_text',
  ],
);

const aboutProcessTextConfig = settingsSubset(
  'О фонде: текст блока «Как работает фонд»',
  'Редактируется заголовок и описание блока инфографики.',
  ['about_process_title', 'about_process_description'],
);

const statutoryDocumentsTextConfig = settingsSubset(
  'О фонде: заголовок уставных документов',
  'Редактируется заголовок блока уставных документов.',
  ['about_documents_title'],
);

const financialReportsTextConfig = settingsSubset(
  'О фонде: заголовок финансовой отчетности',
  'Редактируется заголовок блока финансовой отчетности.',
  ['about_reports_title'],
);

const newsPageTextConfig = settingsSubset(
  'Новости фонда: тексты страницы',
  'Редактируется hero страницы новостей и заголовок списка публикаций.',
  ['news_hero_title', 'news_hero_description', 'news_section_title'],
);

const faqPageTextConfig = settingsSubset(
  'FAQ: тексты страницы',
  'Редактируется hero страницы FAQ и заголовок списка вопросов.',
  ['faq_hero_title', 'faq_hero_description', 'faq_section_title'],
);

const scholarshipsPageTextConfig = settingsSubset(
  'Стипендии и гранты: тексты страницы',
  'Редактируется hero страницы и текст блока программ поддержки.',
  ['scholarships_hero_title', 'scholarships_hero_description', 'scholarships_section_title', 'scholarships_section_description'],
);

const executiveDirectorConfig = settingsSubset(
  'Контакты: исполнительный директор фонда',
  'Редактируется контакт ответственного лица по взаимодействию с вкладчиками.',
  [
    'executive_director_photo',
    'executive_director_name',
    'executive_director_position',
    'executive_director_phone',
    'executive_director_email',
  ],
);

const contactFeedbackTextConfig = settingsSubset(
  'Контакты: текст формы обратной связи',
  'Редактируется заголовок и описание формы на странице контактов.',
  ['contact_feedback_title', 'contact_feedback_description'],
);

const aboutDocumentFields = pickFields(aboutDocumentConfig, ['title', 'document', 'published_at', 'sort_order', 'is_active']);
const statutoryDocumentFields = aboutDocumentFields.map((field) =>
  field.name === 'document' ? { ...field, label: 'Документ (PDF)', accept: '.pdf,application/pdf' } : field,
);

const statutoryDocumentConfig: EntityConfig = {
  ...aboutDocumentConfig,
  title: 'Уставные документы',
  description: 'Загружаются утвержденные документы фонда в формате PDF.',
  tableFields: ['title', 'published_at', 'is_active'],
  fields: statutoryDocumentFields,
  requestParams: { category: 'statutory' },
  hiddenPayload: { category: 'statutory' },
  settingsBefore: statutoryDocumentsTextConfig,
};

const financialDocumentConfig: EntityConfig = {
  ...aboutDocumentConfig,
  title: 'Финансовая отчетность',
  description: 'Загружаются документы финансовой отчетности в формате PDF, DOC или DOCX.',
  tableFields: ['title', 'published_at', 'is_active'],
  fields: aboutDocumentFields,
  requestParams: { category: 'financial' },
  hiddenPayload: { category: 'financial' },
  settingsBefore: financialReportsTextConfig,
};

export const adminSections: AdminSection[] = [
  {
    path: 'home',
    title: 'Главная',
    description: 'Все блоки главной страницы: hero, краткий текст, портфели, достижения, совет и учредитель.',
    icon: Home,
    items: [
      {
        key: 'home-settings',
        label: 'Hero и краткая информация',
        config: settingsSubset('Главная: hero и краткая информация', 'Редактируется верхний блок главной, краткое описание фонда и логотипы.', [
          'hero_title',
          'hero_subtitle',
          'fund_summary_title',
          'fund_summary',
          'hero_image',
          'fund_logo',
        ]),
      },
      { key: 'portfolios', label: 'Целевые капиталы', config: { ...portfolioConfig, title: 'Карточки целевых капиталов', settingsBefore: portfolioTextConfig } },
      { key: 'achievements', label: 'Достижения фонда', config: { ...achievementConfig, title: 'Карточки достижений', settingsBefore: achievementTextConfig } },
      { key: 'team', label: 'Команда и совет', config: { ...teamConfig, settingsBefore: teamTextConfig } },
    ],
  },
  {
    path: 'requisites',
    title: 'Реквизиты',
    description: 'Отдельная страница для редактирования банковских реквизитов, QR-кода и документа оферты.',
    icon: HandCoins,
    items: [{ key: 'donation-details', label: 'Банковские реквизиты', config: donationDetailConfig }],
  },
  {
    path: 'about',
    title: 'О фонде',
    description: 'История создания фонда, инфографика работы, уставные документы и финансовая отчетность.',
    icon: Info,
    items: [
      { key: 'about-settings', label: 'История создания фонда', config: aboutPageTextConfig },
      { key: 'about-process', label: 'Как работает фонд', config: { ...aboutProcessConfig, settingsBefore: aboutProcessTextConfig } },
      { key: 'statutory-documents', label: 'Уставные документы', config: statutoryDocumentConfig },
      { key: 'financial-documents', label: 'Финансовая отчетность', config: financialDocumentConfig },
    ],
  },
  {
    path: 'news',
    title: 'Новости фонда',
    description: 'Публикации, события и объявления фонда.',
    icon: Newspaper,
    items: [{ key: 'news', label: 'Новости фонда', config: { ...newsConfig, settingsBefore: newsPageTextConfig } }],
  },
  {
    path: 'faq',
    title: 'FAQ',
    description: 'Вопросы и ответы, которые отображаются на сайте.',
    icon: CircleHelp,
    items: [{ key: 'faq', label: 'FAQ', config: { ...faqConfig, settingsBefore: faqPageTextConfig } }],
  },
  {
    path: 'scholarships',
    title: 'Стипендии и гранты',
    description: 'Программы поддержки студентов, суммы и дедлайны.',
    icon: Gift,
    items: [
      { key: 'scholarships', label: 'Стипендии и гранты', config: { ...scholarshipConfig, settingsBefore: scholarshipsPageTextConfig } },
      { key: 'scholarship-applications', label: 'Заявки на стипендии', config: scholarshipApplicationConfig },
    ],
  },
  {
    path: 'contacts',
    title: 'Обратная связь / Контакты',
    description: 'Форма обратной связи, контактные данные, социальные сети и ответственное лицо фонда.',
    icon: Mail,
    items: [
      { key: 'contact-messages', label: 'Форма обратной связи', config: { ...contactMessageConfig, settingsBefore: contactFeedbackTextConfig } },
      {
        key: 'contacts',
        label: 'Контакты и соцсети',
        config: settingsSubset('Контакты и социальные сети', 'Эти данные используются в шапке, футере и на странице контактов.', [
          'phone',
          'email',
          'address',
          'instagram',
          'youtube',
          'facebook',
          'footer_text',
          'fund_logo',
        ]),
      },
      { key: 'executive-director', label: 'Исполнительный директор', config: executiveDirectorConfig },
      { key: 'donations', label: 'Заявки вкладов', config: donationConfig },
    ],
  },
];

export const siteSettingsAdminItem = {
  path: 'settings',
  title: 'Настройки сайта',
  description: 'Общие настройки сайта, контакты, логотипы, hero и footer.',
  icon: Settings,
  config: settingsConfig,
};
