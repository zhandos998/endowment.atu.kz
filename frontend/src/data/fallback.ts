import type { FaqItem, HomePayload, NewsItem, Partner, Scholarship, SiteSetting, TeamMember } from '../types';

export const referenceImages = {
  logo: 'https://static.tildacdn.pro/tild3661-3730-4666-b932-373764376632/logo-enu-new.jpg',
  hero: 'https://static.tildacdn.pro/tild3661-6164-4465-b166-366537626564/AX8I5712.JPG',
  finance: 'https://static.tildacdn.pro/tild3539-3561-4634-b131-633538626637/photo.jpeg',
  innovation: 'https://static.tildacdn.pro/tild6232-3161-4462-b137-623761306234/photo.png',
  talent: 'https://static.tildacdn.pro/tild6334-6235-4666-b262-653538653966/photo.jpg',
  galleryOne: 'https://static.tildacdn.pro/tild6465-6362-4737-b532-326334636564/3a2e0bdd-a385-42e7-a.jpg',
  galleryTwo: 'https://static.tildacdn.pro/tild3765-6130-4535-a464-636436313162/IMG_1924.jpeg',
};

export const fallbackSettings: SiteSetting = {
  hero_title: 'ENU ENDOWMENT FUND',
  hero_subtitle:
    'Фонд долгосрочной поддержки Евразийского национального университета. Помогаем студентам, развиваем инициативы и усиливаем стратегические цели ENU.',
  hero_image_url: referenceImages.hero,
  hero_cta_primary: 'Сделать вклад',
  hero_cta_secondary: 'О фонде',
  email: 'info@endowmentenu.kz',
  phone: '+7 7172 70 95 00',
  address: 'ул. Сатпаева 2, Астана',
  instagram: 'https://www.instagram.com/endowmentenu.kz/',
  statistics: [
    { value: 50, label: 'студентов получили поддержку' },
    { value: 40, label: 'выделенных грантов' },
    { value: 500, label: 'млн тенге целевой капитал' },
  ],
};

export const fallbackScholarships: Scholarship[] = [
  {
    id: 1,
    title: 'Именная стипендия ENU Endowment Fund',
    description: 'Финансовая поддержка студентов с высокой академической успеваемостью и сильной социальной позицией.',
    amount: 250000,
    deadline: '2026-06-30',
  },
  {
    id: 2,
    title: 'Грант на обучение',
    description: 'Помощь студентам, которым необходимо закрыть образовательные расходы и продолжить обучение без паузы.',
    amount: 500000,
    deadline: '2026-07-20',
  },
  {
    id: 3,
    title: 'Грант на исследовательский проект',
    description: 'Поддержка стартапов, научных работ, олимпиад и прикладных студенческих команд.',
    amount: 350000,
    deadline: '2026-08-15',
  },
];

export const fallbackNews: NewsItem[] = [
  {
    id: 1,
    title: 'Первый форум «Эндаументы Казахстана»',
    slug: 'pervyi-forum-endowmenty-kazakhstana',
    excerpt: 'ENU Endowment Fund провёл отраслевую встречу о развитии университетских фондов в Казахстане.',
    content:
      'На форуме участники обсудили устойчивые модели поддержки студентов, прозрачное управление капиталом и роль выпускников в развитии университетской среды.',
    image_url: referenceImages.talent,
    published_at: '2026-04-24T08:00:00.000Z',
  },
  {
    id: 2,
    title: 'Новые именные стипендии для талантливых студентов',
    slug: 'novye-imennye-stipendii',
    excerpt: 'Фонд расширяет программу поддержки студентов, которые показывают сильные академические результаты.',
    content:
      'Программа помогает студентам сосредоточиться на обучении, исследованиях, олимпиадах и общественных проектах университета.',
    image_url: 'https://static.tildacdn.pro/tild3565-3235-4738-b031-626230346262/photo.jpeg',
    published_at: '2026-04-10T08:00:00.000Z',
  },
  {
    id: 3,
    title: 'Поддержка студенческих стартапов и научных инициатив',
    slug: 'podderzhka-startapov-i-nauki',
    excerpt: 'Средства фонда направляются на инновационные проекты и прикладные студенческие команды.',
    content:
      'Эндаумент помогает запускать проекты, которые усиливают исследовательскую культуру ENU и открывают студентам путь к предпринимательству.',
    image_url: 'https://static.tildacdn.pro/tild3835-6366-4132-b764-343037636239/0_33.JPG',
    published_at: '2026-03-26T08:00:00.000Z',
  },
];

export const fallbackPartners: Partner[] = [
  { id: 1, name: 'Евразийский национальный университет', logo_url: referenceImages.logo, website: 'https://enu.kz' },
  { id: 2, name: 'ENU Endowment Fund', logo_url: referenceImages.logo, website: 'https://endowmentenu.kz' },
  { id: 3, name: 'Выпускники ENU', logo_url: referenceImages.galleryOne, website: 'https://endowmentenu.kz' },
];

export const fallbackTeam: TeamMember[] = [
  {
    id: 1,
    name: 'Инютин Дмитрий Сергеевич',
    role: 'Попечительский совет',
    photo_url: 'https://static.tildacdn.pro/tild3632-3865-4136-b165-306166326134/photo.png',
  },
  {
    id: 2,
    name: 'Чен Борис Геннадьевич',
    role: 'Попечительский совет',
    photo_url: 'https://static.tildacdn.pro/tild3766-3934-4234-a264-373834346163/photo-20240312-17-45.jpg',
  },
  {
    id: 3,
    name: 'Айтмагамбетов Думан Рамазанович',
    role: 'Попечительский совет',
    photo_url: 'https://static.tildacdn.pro/tild3832-3239-4137-a364-373161373331/photo-20240312-17-48.jpg',
  },
  {
    id: 4,
    name: 'Ақан Бақытжан Даулетбайұлы',
    role: 'Попечительский совет',
    photo_url: 'https://static.tildacdn.pro/tild6364-3738-4730-b839-333361633562/photo-20240312-17-46.jpg',
  },
  {
    id: 5,
    name: 'Амангельды Аружан Жалелбековна',
    role: 'Попечительский совет',
    photo_url: 'https://static.tildacdn.pro/tild6431-3839-4239-b965-363730656164/photo-20240312-17-46.jpg',
  },
  {
    id: 6,
    name: 'Теленчинов Рамиль Кайратович',
    role: 'Совет учредителей',
    photo_url: 'https://static.tildacdn.pro/tild3266-6139-4766-b138-383538353338/photo.png',
  },
];

export const fallbackFaqs: FaqItem[] = [
  {
    id: 1,
    question: 'Что такое эндаумент?',
    answer:
      'Это фонд целевого капитала: собранные средства сохраняются и инвестируются, а доход направляется на поддержку студентов и университетских инициатив.',
  },
  {
    id: 2,
    question: 'На что идут пожертвования?',
    answer:
      'На гранты, именные стипендии, научные и инновационные проекты, спортивные соревнования, олимпиады и социально значимые инициативы.',
  },
  {
    id: 3,
    question: 'Как сделать вклад?',
    answer:
      'Оставьте заявку на странице пожертвований или свяжитесь с фондом по адресу info@endowmentenu.kz. Команда фонда поможет выбрать удобный формат участия.',
  },
  {
    id: 4,
    question: 'Можно ли поддержать конкретную программу?',
    answer:
      'Да. Донор может направить вклад на стипендии, гранты, исследования, стартапы или другие согласованные направления поддержки.',
  },
];

export const fallbackHome: HomePayload = {
  settings: fallbackSettings,
  scholarships: fallbackScholarships,
  news: fallbackNews,
  partners: fallbackPartners,
  team_members: fallbackTeam,
  faqs: fallbackFaqs,
};
