import type { LucideIcon } from 'lucide-react';
import { Briefcase, ChartNoAxesCombined, CircleHelp, FileText, GraduationCap, HandCoins, Image, MessageSquare, Newspaper, Settings, Users } from 'lucide-react';

export type FieldType = 'text' | 'textarea' | 'richtext' | 'number' | 'date' | 'datetime-local' | 'file' | 'email' | 'url' | 'select' | 'checkbox';

export type EntityField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  accept?: string;
  autoSlugFrom?: string;
  options?: { label: string; value: string }[];
  defaultChecked?: boolean;
};

export type EntityConfig = {
  path: string;
  endpoint: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  fields: EntityField[];
  tableFields: string[];
  canCreate?: boolean;
  canDelete?: boolean;
  mode?: 'crud' | 'settings';
  settingsBefore?: EntityConfig;
  requestParams?: Record<string, string | number | boolean>;
  hiddenPayload?: Record<string, string | number | boolean>;
  formSize?: 'default' | 'wide';
};

const portfolioIconOptions = [
  { label: 'Образование', value: 'graduation' },
  { label: 'Наука и инновации', value: 'innovation' },
  { label: 'Социальная поддержка', value: 'support' },
  { label: 'Инфраструктура', value: 'infrastructure' },
  { label: 'Стратегия', value: 'strategy' },
];

const achievementIconOptions = [
  { label: 'Капитал', value: 'capital' },
  { label: 'Доход', value: 'income' },
  { label: 'Программы', value: 'programs' },
];

const aboutProcessIconOptions = [
  { label: 'Капитал', value: 'capital' },
  { label: 'Управление', value: 'governance' },
  { label: 'Доход', value: 'income' },
  { label: 'Отчетность', value: 'reporting' },
];

const aboutDocumentCategoryOptions = [
  { label: 'Уставные документы', value: 'statutory' },
  { label: 'Финансовая отчетность', value: 'financial' },
];

const documentAccept = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const entityConfigs: EntityConfig[] = [
  {
    path: 'about-process-steps',
    endpoint: 'about-process-steps',
    title: 'Как работает фонд',
    icon: ChartNoAxesCombined,
    tableFields: ['title', 'sort_order', 'is_active'],
    fields: [
      { name: 'title', label: 'Заголовок шага', type: 'text', required: true },
      { name: 'description', label: 'Описание шага', type: 'textarea' },
      { name: 'icon', label: 'Иконка', type: 'select', options: aboutProcessIconOptions },
      { name: 'sort_order', label: 'Порядок', type: 'number' },
      { name: 'is_active', label: 'Показывать на сайте', type: 'checkbox', defaultChecked: true },
    ],
  },
  {
    path: 'about-documents',
    endpoint: 'about-documents',
    title: 'Документы фонда',
    icon: FileText,
    tableFields: ['title', 'category', 'published_at', 'is_active'],
    fields: [
      { name: 'title', label: 'Название документа', type: 'text', required: true },
      { name: 'category', label: 'Раздел', type: 'select', required: true, options: aboutDocumentCategoryOptions },
      { name: 'document', label: 'Документ (PDF/DOCX)', type: 'file', accept: documentAccept },
      { name: 'published_at', label: 'Дата документа', type: 'date' },
      { name: 'sort_order', label: 'Порядок', type: 'number' },
      { name: 'is_active', label: 'Показывать на сайте', type: 'checkbox', defaultChecked: true },
    ],
  },
  {
    path: 'fund-portfolios',
    endpoint: 'fund-portfolios',
    title: 'Целевые капиталы',
    icon: Briefcase,
    tableFields: ['title', 'direction', 'sort_order', 'is_active'],
    fields: [
      { name: 'title', label: 'Название портфеля', type: 'text', required: true },
      { name: 'direction', label: 'Направление', type: 'text' },
      { name: 'description', label: 'Что поддерживает портфель', type: 'textarea', required: true },
      { name: 'icon', label: 'Иконка', type: 'select', options: portfolioIconOptions },
      { name: 'color', label: 'Цвет HEX', type: 'text' },
      { name: 'sort_order', label: 'Порядок', type: 'number' },
      { name: 'is_active', label: 'Показывать на сайте', type: 'checkbox', defaultChecked: true },
    ],
  },
  {
    path: 'fund-achievements',
    endpoint: 'fund-achievements',
    title: 'Достижения фонда',
    icon: ChartNoAxesCombined,
    tableFields: ['title', 'value', 'unit', 'is_active'],
    fields: [
      { name: 'title', label: 'Название показателя', type: 'text', required: true },
      { name: 'value', label: 'Значение', type: 'number', required: true },
      { name: 'unit', label: 'Единица измерения', type: 'text' },
      { name: 'description', label: 'Описание', type: 'textarea' },
      { name: 'icon', label: 'Иконка', type: 'select', options: achievementIconOptions },
      { name: 'color', label: 'Цвет HEX', type: 'text' },
      { name: 'sort_order', label: 'Порядок', type: 'number' },
      { name: 'is_active', label: 'Показывать на сайте', type: 'checkbox', defaultChecked: true },
    ],
  },
  {
    path: 'donation-details',
    endpoint: 'donation-details',
    title: 'Реквизиты вклада',
    icon: FileText,
    description: 'Редактируются QR-код, банковские реквизиты и текст оферты, которые показываются на сайте.',
    canCreate: false,
    canDelete: false,
    mode: 'settings',
    tableFields: ['beneficiary', 'bank_name', 'iban', 'is_active'],
    fields: [
      { name: 'beneficiary', label: 'Получатель', type: 'text', required: true },
      { name: 'bank_name', label: 'Банк', type: 'text' },
      { name: 'bin', label: 'БИН', type: 'text' },
      { name: 'iban', label: 'IBAN', type: 'text' },
      { name: 'bik', label: 'БИК', type: 'text' },
      { name: 'kbe', label: 'КБЕ', type: 'text' },
      { name: 'payment_purpose', label: 'Назначение платежа', type: 'textarea' },
      { name: 'donation_cta_title', label: 'Заголовок блока вклада', type: 'text' },
      { name: 'qr_image', label: 'QR-код', type: 'file' },
      { name: 'public_offer_title', label: 'Название оферты', type: 'text' },
      { name: 'public_offer_document', label: 'Документ оферты (PDF/DOCX)', type: 'file', accept: documentAccept },
      { name: 'public_offer_text', label: 'Краткий текст оферты', type: 'textarea' },
      { name: 'is_active', label: 'Активные реквизиты', type: 'checkbox', defaultChecked: true },
    ],
  },
  {
    path: 'news',
    endpoint: 'news',
    title: 'Новости',
    icon: Newspaper,
    description: 'Информация о проектах, мероприятиях и деятельности фонда.',
    formSize: 'wide',
    tableFields: ['title', 'slug', 'published_at'],
    fields: [
      { name: 'title', label: 'Заголовок', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', autoSlugFrom: 'title' },
      { name: 'excerpt', label: 'Краткое описание', type: 'textarea', required: true },
      { name: 'content', label: 'Текст новости', type: 'richtext', required: true },
      { name: 'published_at', label: 'Дата публикации', type: 'datetime-local' },
      { name: 'image', label: 'Изображение', type: 'file' },
    ],
  },
  {
    path: 'scholarships',
    endpoint: 'scholarships',
    title: 'Стипендии',
    icon: GraduationCap,
    tableFields: ['title', 'amount', 'deadline'],
    fields: [
      { name: 'title', label: 'Название', type: 'text', required: true },
      { name: 'description', label: 'Описание', type: 'textarea', required: true },
      { name: 'conditions', label: 'Условия участия', type: 'textarea' },
      { name: 'application_steps', label: 'Порядок подачи заявки', type: 'textarea' },
      { name: 'required_documents', label: 'Необходимые документы', type: 'textarea' },
      { name: 'amount', label: 'Сумма', type: 'number', required: true },
      { name: 'deadline', label: 'Дедлайн', type: 'date' },
    ],
  },
  {
    path: 'scholarship-applications',
    endpoint: 'scholarship-applications',
    title: 'Заявки на стипендии',
    icon: GraduationCap,
    description: 'Анкеты студентов и загруженные документы для программ поддержки.',
    canCreate: false,
    tableFields: ['scholarship_title', 'applicant_name', 'email', 'phone', 'documents', 'status', 'created_at'],
    fields: [
      {
        name: 'status',
        label: 'Статус заявки',
        type: 'select',
        options: [
          { label: 'Новая', value: 'new' },
          { label: 'На рассмотрении', value: 'in_review' },
          { label: 'Одобрена', value: 'approved' },
          { label: 'Отклонена', value: 'rejected' },
        ],
      },
      { name: 'admin_note', label: 'Комментарий администратора', type: 'textarea' },
    ],
  },
  {
    path: 'contact-messages',
    endpoint: 'contact-messages',
    title: 'Форма обратной связи',
    icon: MessageSquare,
    description: 'Сообщения, отправленные через форму обратной связи на странице контактов.',
    canCreate: false,
    tableFields: ['name', 'email', 'phone', 'subject', 'message', 'status', 'created_at'],
    fields: [
      { name: 'name', label: 'ФИО', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Телефон', type: 'text' },
      { name: 'subject', label: 'Тема', type: 'text' },
      { name: 'message', label: 'Сообщение', type: 'textarea' },
      {
        name: 'status',
        label: 'Статус обращения',
        type: 'select',
        options: [
          { label: 'Новое', value: 'new' },
          { label: 'В работе', value: 'in_progress' },
          { label: 'Отвечено', value: 'answered' },
          { label: 'Закрыто', value: 'closed' },
        ],
      },
      { name: 'admin_note', label: 'Комментарий администратора', type: 'textarea' },
    ],
  },
  {
    path: 'donations',
    endpoint: 'donations',
    title: 'Пожертвования',
    icon: HandCoins,
    tableFields: ['donor_name', 'amount', 'message'],
    fields: [
      { name: 'donor_name', label: 'Донор', type: 'text' },
      { name: 'amount', label: 'Сумма', type: 'number', required: true },
      { name: 'message', label: 'Сообщение', type: 'textarea' },
    ],
  },
  {
    path: 'partners',
    endpoint: 'partners',
    title: 'Партнеры',
    icon: Image,
    tableFields: ['name', 'website'],
    fields: [
      { name: 'name', label: 'Название', type: 'text', required: true },
      { name: 'website', label: 'Сайт', type: 'url' },
      { name: 'logo', label: 'Логотип', type: 'file' },
    ],
  },
  {
    path: 'team-members',
    endpoint: 'team-members',
    title: 'Команда и совет',
    icon: Users,
    tableFields: ['name', 'role', 'category', 'is_active'],
    fields: [
      { name: 'name', label: 'Имя', type: 'text', required: true },
      { name: 'role', label: 'Роль', type: 'text', required: true },
      {
        name: 'category',
        label: 'Категория',
        type: 'select',
        options: [
          { label: 'Попечительский совет', value: 'board' },
          { label: 'Учредитель / ректор', value: 'founder' },
          { label: 'Команда фонда', value: 'team' },
        ],
      },
      { name: 'regalia', label: 'Регалии', type: 'textarea' },
      { name: 'sort_order', label: 'Порядок', type: 'number' },
      { name: 'is_active', label: 'Показывать на сайте', type: 'checkbox', defaultChecked: true },
      { name: 'photo', label: 'Фото', type: 'file' },
    ],
  },
  {
    path: 'faqs',
    endpoint: 'faqs',
    title: 'FAQ',
    icon: CircleHelp,
    tableFields: ['question', 'answer'],
    fields: [
      { name: 'question', label: 'Вопрос', type: 'text', required: true },
      { name: 'answer', label: 'Ответ', type: 'textarea', required: true },
    ],
  },
  {
    path: 'settings',
    endpoint: 'settings',
    title: 'Настройки сайта',
    icon: Settings,
    canCreate: false,
    canDelete: false,
    mode: 'settings',
    tableFields: ['hero_title', 'email', 'address'],
    fields: [
      { name: 'hero_title', label: 'Hero заголовок', type: 'text', required: true },
      { name: 'hero_subtitle', label: 'Hero текст', type: 'textarea' },
      { name: 'fund_summary_title', label: 'Заголовок краткой информации', type: 'text' },
      { name: 'fund_summary', label: 'Краткая информация о фонде', type: 'textarea' },
      { name: 'portfolio_section_description', label: 'Описание блока целевых капиталов', type: 'textarea' },
      { name: 'achievement_section_title', label: 'Заголовок блока достижений', type: 'text' },
      { name: 'achievement_section_description', label: 'Описание блока достижений', type: 'textarea' },
      { name: 'team_section_title', label: 'Заголовок блока команды и совета', type: 'text' },
      { name: 'team_section_description', label: 'Описание блока команды и совета', type: 'textarea' },
      { name: 'about_hero_title', label: 'О фонде: заголовок hero', type: 'text' },
      { name: 'about_hero_description', label: 'О фонде: описание hero', type: 'textarea' },
      { name: 'about_history_title', label: 'История: заголовок', type: 'text' },
      { name: 'about_history_text', label: 'История создания фонда', type: 'textarea' },
      { name: 'about_process_title', label: 'Как работает фонд: заголовок', type: 'text' },
      { name: 'about_process_description', label: 'Как работает фонд: описание', type: 'textarea' },
      { name: 'about_documents_title', label: 'Заголовок уставных документов', type: 'text' },
      { name: 'about_reports_title', label: 'Заголовок финансовой отчетности', type: 'text' },
      { name: 'news_hero_title', label: 'Новости: заголовок hero', type: 'text' },
      { name: 'news_hero_description', label: 'Новости: описание hero', type: 'textarea' },
      { name: 'news_section_title', label: 'Заголовок списка новостей', type: 'text' },
      { name: 'faq_hero_title', label: 'FAQ: заголовок hero', type: 'text' },
      { name: 'faq_hero_description', label: 'FAQ: описание hero', type: 'textarea' },
      { name: 'faq_section_title', label: 'Заголовок списка вопросов', type: 'text' },
      { name: 'scholarships_hero_title', label: 'Стипендии: заголовок hero', type: 'text' },
      { name: 'scholarships_hero_description', label: 'Стипендии: описание hero', type: 'textarea' },
      { name: 'scholarships_section_title', label: 'Заголовок блока программ', type: 'text' },
      { name: 'scholarships_section_description', label: 'Описание блока программ', type: 'textarea' },
      { name: 'footer_text', label: 'Текст в футере', type: 'textarea' },
      { name: 'phone', label: 'Телефон', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'address', label: 'Адрес', type: 'text' },
      { name: 'instagram', label: 'Instagram', type: 'url' },
      { name: 'youtube', label: 'YouTube', type: 'text' },
      { name: 'facebook', label: 'Facebook', type: 'url' },
      { name: 'executive_director_photo', label: 'Фото исполнительного директора', type: 'file' },
      { name: 'executive_director_name', label: 'ФИО исполнительного директора', type: 'text' },
      { name: 'executive_director_position', label: 'Должность исполнительного директора', type: 'text' },
      { name: 'executive_director_phone', label: 'Телефон исполнительного директора', type: 'text' },
      { name: 'executive_director_email', label: 'Email исполнительного директора', type: 'email' },
      { name: 'contact_feedback_title', label: 'Заголовок формы обратной связи', type: 'text' },
      { name: 'contact_feedback_description', label: 'Описание формы обратной связи', type: 'textarea' },
      { name: 'hero_image', label: 'Hero изображение', type: 'file' },
      { name: 'fund_logo', label: 'Логотип', type: 'file' },
    ],
  },
];
