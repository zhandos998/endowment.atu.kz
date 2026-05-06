import type { LucideIcon } from 'lucide-react';
import { CircleHelp, GraduationCap, HandCoins, Image, Newspaper, Settings, Users } from 'lucide-react';

export type FieldType = 'text' | 'textarea' | 'number' | 'date' | 'datetime-local' | 'file' | 'email' | 'url';

export type EntityField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
};

export type EntityConfig = {
  path: string;
  endpoint: string;
  title: string;
  icon: LucideIcon;
  fields: EntityField[];
  tableFields: string[];
};

export const entityConfigs: EntityConfig[] = [
  {
    path: 'news',
    endpoint: 'news',
    title: 'Новости',
    icon: Newspaper,
    tableFields: ['title', 'slug', 'published_at'],
    fields: [
      { name: 'title', label: 'Заголовок', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text' },
      { name: 'excerpt', label: 'Краткое описание', type: 'textarea', required: true },
      { name: 'content', label: 'Текст новости', type: 'textarea', required: true },
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
      { name: 'amount', label: 'Сумма', type: 'number', required: true },
      { name: 'deadline', label: 'Дедлайн', type: 'date' },
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
    title: 'Партнёры',
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
    title: 'Команда',
    icon: Users,
    tableFields: ['name', 'role'],
    fields: [
      { name: 'name', label: 'Имя', type: 'text', required: true },
      { name: 'role', label: 'Роль', type: 'text', required: true },
      { name: 'bio', label: 'Биография', type: 'textarea' },
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
    tableFields: ['hero_title', 'email', 'address'],
    fields: [
      { name: 'hero_title', label: 'Hero заголовок', type: 'text', required: true },
      { name: 'hero_subtitle', label: 'Hero текст', type: 'textarea' },
      { name: 'hero_cta_primary', label: 'Основная кнопка', type: 'text' },
      { name: 'hero_cta_secondary', label: 'Вторичная кнопка', type: 'text' },
      { name: 'phone', label: 'Телефон', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'address', label: 'Адрес', type: 'text' },
      { name: 'instagram', label: 'Instagram', type: 'url' },
      { name: 'youtube', label: 'YouTube', type: 'text' },
      { name: 'facebook', label: 'Facebook', type: 'url' },
      { name: 'hero_image', label: 'Hero изображение', type: 'file' },
    ],
  },
];
