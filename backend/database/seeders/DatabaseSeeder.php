<?php

namespace Database\Seeders;

use App\Models\AboutProcessStep;
use App\Models\Donation;
use App\Models\DonationDetail;
use App\Models\Faq;
use App\Models\FundAchievement;
use App\Models\FundPortfolio;
use App\Models\News;
use App\Models\Partner;
use App\Models\Scholarship;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'endowment@atu.edu.kz'],
            [
                'name' => 'Администратор ATU Endowment Fund',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ]
        );

        SiteSetting::query()->updateOrCreate(
            ['email' => 'info@atu.edu.kz'],
            [
                'phone' => '+7 727 221-88-08',
                'address' => 'г. Алматы, ул. Толе би, 100',
                'instagram' => 'https://www.instagram.com/atu_university/',
                'youtube' => 'https://www.youtube.com/@atuuniversity',
                'facebook' => 'https://facebook.com/atu.edu.kz',
                'executive_director_name' => 'Исполнительный директор фонда',
                'executive_director_position' => 'Ответственное лицо по взаимодействию с вкладчиками',
                'executive_director_phone' => '+7 727 221-88-08',
                'executive_director_email' => 'info@atu.edu.kz',
                'contact_feedback_title' => 'Форма обратной связи',
                'contact_feedback_description' => 'Отправьте вопрос, предложение о партнерстве или сообщение для команды фонда.',
                'fund_summary_title' => 'Фонд, который работает дольше одного учебного года',
                'fund_summary' => 'ATU Endowment Fund формирует долгосрочный целевой капитал АО «Алматинский технологический университет», чтобы инвестиционный доход фонда ежегодно направлялся на образование, научные инициативы, социальную поддержку студентов, развитие инфраструктуры и стратегические проекты университета.',
                'footer_text' => 'Фонд долгосрочной поддержки АТУ: целевые капиталы, стипендии, гранты, инновации, социальные программы и системное развитие университетской среды.',
                'fund_logo' => 'https://atu.edu.kz/templates/release/images/logo.svg',
                'portfolio_section_description' => 'Каждый портфель отвечает за отдельное направление поддержки АТУ и помогает донорам выбрать понятный фокус вклада.',
                'achievement_section_title' => 'Достижения фонда',
                'achievement_section_description' => 'Ключевые показатели показывают масштаб целевого капитала, инвестиционного дохода и программ поддержки.',
                'team_section_title' => 'Попечительский совет',
                'team_section_description' => 'Совет объединяет представителей университета и экспертов, отвечающих за стратегическое развитие фонда.',
                'about_hero_title' => 'О фонде',
                'about_hero_description' => 'ATU Endowment Fund — фонд долгосрочной поддержки АО «Алматинский технологический университет».',
                'about_history_title' => 'История создания фонда',
                'about_history_text' => 'Фонд создан для долгосрочной поддержки студентов, научных инициатив и стратегического развития АТУ через целевой капитал и прозрачные программы финансирования.',
                'about_process_title' => 'Как работает фонд',
                'about_process_description' => 'Модель фонда строится на сохранении капитала, профессиональном управлении и направлении инвестиционного дохода на утвержденные программы поддержки.',
                'about_documents_title' => 'Уставные документы',
                'about_reports_title' => 'Финансовая отчетность',
                'news_hero_title' => 'Новости',
                'news_hero_description' => 'События фонда, объявления и истории поддержки студентов АТУ.',
                'news_section_title' => 'Последние публикации',
                'faq_hero_title' => 'FAQ',
                'faq_hero_description' => 'Ответы на частые вопросы о фонде, пожертвованиях и программах поддержки.',
                'faq_section_title' => 'Частые вопросы',
                'scholarships_hero_title' => 'Стипендии',
                'scholarships_hero_description' => 'Грантовые и стипендиальные программы для студентов АТУ.',
                'scholarships_section_title' => 'Программы поддержки',
                'scholarships_section_description' => 'Каждая программа ориентирована на конкретный результат: обучение, исследования, участие в конкурсах и развитие инициатив.',
                'hero_title' => 'ATU ENDOWMENT FUND',
                'hero_subtitle' => 'Фонд долгосрочной поддержки АО «Алматинский технологический университет»: целевой капитал, прозрачное управление и устойчивые программы для студентов, науки и будущего университета.',
                'hero_image' => 'https://atu.edu.kz/userfiles/images/index/mission.webp',
                'hero_cta_primary' => 'Сделать вклад',
                'statistics' => [
                    ['label' => 'целевых капиталов фонда', 'value' => 5],
                    ['label' => 'направления поддержки АТУ', 'value' => 5],
                    ['label' => 'лет долгосрочного горизонта', 'value' => 10],
                ],
            ]
        );

        $portfolios = [
            [
                'title' => 'Образование',
                'direction' => 'Стипендии и образовательные гранты',
                'description' => 'Поддерживает именные стипендии, оплату обучения, академическую мобильность, участие студентов в олимпиадах и профессиональных конкурсах.',
                'icon' => 'graduation',
                'color' => '#071b4f',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Наука и инновации',
                'direction' => 'Исследования, стартапы и прикладные лаборатории',
                'description' => 'Финансирует студенческие исследования, прототипы, стартап-команды, публикации и проекты в пищевых технологиях, IT, инженерии и бизнесе.',
                'icon' => 'innovation',
                'color' => '#0f766e',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Социальная поддержка студентов',
                'direction' => 'Адресная помощь и равный доступ к обучению',
                'description' => 'Помогает студентам из социально уязвимых категорий закрывать образовательные расходы, проживание, питание и неотложные потребности.',
                'icon' => 'support',
                'color' => '#b45309',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Развитие инфраструктуры университета',
                'direction' => 'Кампус, аудитории, лаборатории и цифровая среда',
                'description' => 'Направлен на модернизацию учебных пространств, оборудования, библиотечной и цифровой инфраструктуры АТУ.',
                'icon' => 'infrastructure',
                'color' => '#2563eb',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Стратегическое развитие университета',
                'direction' => 'Долгосрочные инициативы и международная конкурентоспособность',
                'description' => 'Поддерживает проекты, которые усиливают бренд АТУ, партнерства с индустрией, международные программы и устойчивое развитие университета.',
                'icon' => 'strategy',
                'color' => '#7c3aed',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($portfolios as $item) {
            FundPortfolio::query()->updateOrCreate(['title' => $item['title']], $item);
        }

        $achievements = [
            [
                'title' => 'Объем целевого капитала',
                'value' => 500,
                'unit' => 'млн ₸',
                'description' => 'Плановый объем капитала, который формирует устойчивую базу для ежегодной поддержки программ АТУ.',
                'icon' => 'capital',
                'color' => '#071b4f',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Инвестиционный доход',
                'value' => 35,
                'unit' => 'млн ₸',
                'description' => 'Доход от управления капиталом, который может направляться на целевые университетские программы.',
                'icon' => 'income',
                'color' => '#c99b3f',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Поддержанные программы',
                'value' => 12,
                'unit' => 'программ',
                'description' => 'Стипендии, гранты, научные инициативы и социальные проекты, объединенные вокруг миссии фонда.',
                'icon' => 'programs',
                'color' => '#ff7c3b',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($achievements as $item) {
            FundAchievement::query()->updateOrCreate(['title' => $item['title']], $item);
        }

        $processSteps = [
            [
                'title' => 'Формируется капитал',
                'description' => 'Взносы доноров аккумулируются в целевом капитале фонда.',
                'icon' => 'capital',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Капитал инвестируется',
                'description' => 'Средства работают по утвержденной инвестиционной политике и сохраняют долгосрочный горизонт.',
                'icon' => 'governance',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Доход направляется в программы',
                'description' => 'Инвестиционный доход используется для стипендий, грантов, науки и инфраструктурных проектов.',
                'icon' => 'income',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Фонд отчитывается',
                'description' => 'Попечительский совет и команда фонда контролируют целевое использование средств и отчетность.',
                'icon' => 'reporting',
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($processSteps as $item) {
            AboutProcessStep::query()->updateOrCreate(['title' => $item['title']], $item);
        }

        DonationDetail::query()->updateOrCreate(
            ['beneficiary' => 'Корпоративный фонд «ATU Endowment Fund»'],
            [
                'qr_image' => 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://endowment.atu.kz/#donate',
                'bank_name' => 'Банк будет указан после утверждения реквизитов',
                'bin' => '000000000000',
                'iban' => 'KZ000000000000000000',
                'bik' => 'XXXXXXXX',
                'kbe' => '17',
                'payment_purpose' => 'Добровольный вклад в целевой капитал ATU Endowment Fund',
                'donation_cta_title' => 'Ваш вклад становится частью долгосрочного капитала АТУ',
                'public_offer_title' => 'Договор публичной оферты',
                'public_offer_url' => '/public-offer.html',
                'public_offer_text' => 'Публичная оферта описывает порядок внесения добровольного вклада, целевое использование средств, права донора и обязательства фонда. Точный утвержденный документ можно заменить в админ-панели.',
                'is_active' => true,
            ]
        );

        $teamMembers = [
            [
                'name' => 'Кулажанов Талгат Куралбекович',
                'role' => 'Ректор АО «Алматинский технологический университет»',
                'regalia' => 'Доктор технических наук, профессор. Представляет учредителя фонда и стратегическое развитие университета.',
                'category' => 'founder',
                'photo' => 'https://atu.edu.kz/img/staff/2.webp',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Кулажанов Куралбек Садибаевич',
                'role' => 'Председатель Попечительского совета',
                'regalia' => 'Президент Алматинского технологического университета, доктор технических наук, профессор.',
                'category' => 'board',
                'photo' => 'https://atu.edu.kz/img/staff/1.webp',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Нурахметов Бауржан Кумаргалиевич',
                'role' => 'Член Попечительского совета',
                'regalia' => 'Первый проректор, отвечает за академическое развитие и институциональные проекты университета.',
                'category' => 'board',
                'photo' => 'https://atu.edu.kz/img/staff/3.webp',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Алиев Баходир Азимджонович',
                'role' => 'Член Попечительского совета',
                'regalia' => 'Проректор по науке и инновациям, курирует исследовательские и технологические инициативы.',
                'category' => 'board',
                'photo' => 'https://atu.edu.kz/img/staff/6.webp',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Балхыбекова Коркем Сатылхановна',
                'role' => 'Член Попечительского совета',
                'regalia' => 'Проректор по воспитательной работе, курирует социальную поддержку и студенческую среду.',
                'category' => 'board',
                'photo' => 'https://atu.edu.kz/img/staff/5.webp',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Ердинбеков Болат Садыкович',
                'role' => 'Член Попечительского совета',
                'regalia' => 'Проректор по административно-хозяйственным вопросам, отвечает за инфраструктурные направления.',
                'category' => 'board',
                'photo' => 'https://atu.edu.kz/img/staff/7.webp',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($teamMembers as $item) {
            TeamMember::query()->updateOrCreate(['name' => $item['name']], $item);
        }

        $news = [
            [
                'title' => 'Эндаумент АТУ усиливает долгосрочную поддержку студентов',
                'slug' => 'endowment-atu-usilivaet-podderzhku-studentov',
                'excerpt' => 'ATU Endowment Fund развивает программы целевого капитала для студентов Алматинского технологического университета.',
                'content' => 'Фонд объединяет выпускников, партнеров и индустриальные компании вокруг устойчивых программ: стипендий, грантов, исследований и студенческих инициатив.',
                'image' => 'https://atu.edu.kz/img/hnp_news/s942.webp',
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'Новые именные стипендии для талантливых студентов АТУ',
                'slug' => 'novye-imennye-stipendii-atu',
                'excerpt' => 'Фонд расширяет программу поддержки студентов, которые показывают сильные академические и общественные результаты.',
                'content' => 'Программа именных стипендий помогает студентам сосредоточиться на обучении, исследованиях, олимпиадах и общественных проектах университета.',
                'image' => 'https://atu.edu.kz/img/hnp_news/s941.webp',
                'published_at' => now()->subDays(25),
            ],
            [
                'title' => 'Поддержка студенческих стартапов и научных инициатив',
                'slug' => 'podderzhka-startapov-i-nauki',
                'excerpt' => 'Средства фонда направляются на инновационные проекты, научные исследования и прикладные студенческие команды.',
                'content' => 'Эндаумент помогает запускать проекты, которые усиливают исследовательскую культуру АТУ и открывают студентам путь к предпринимательству.',
                'image' => 'https://atu.edu.kz/userfiles/images/index/strategy.webp',
                'published_at' => now()->subDays(41),
            ],
        ];

        foreach ($news as $item) {
            News::query()->updateOrCreate(['slug' => $item['slug']], $item);
        }

        $scholarships = [
            [
                'title' => 'Именная стипендия ATU Endowment Fund',
                'description' => 'Для студентов АТУ с высокими академическими результатами и активным участием в университетских инициативах.',
                'conditions' => 'Средний балл от 3.5, активное участие в академической, научной или общественной жизни университета.',
                'application_steps' => 'Заполните анкету, приложите подтверждающие документы и дождитесь рассмотрения заявки комиссией фонда.',
                'required_documents' => 'Удостоверение личности, транскрипт, справка с места учебы, мотивационное письмо.',
                'amount' => 250000,
                'deadline' => now()->addMonth(),
            ],
            [
                'title' => 'Грант на обучение',
                'description' => 'Финансовая поддержка студентов, которым необходимо закрыть часть образовательных расходов.',
                'conditions' => 'Подтвержденная потребность в финансовой поддержке и отсутствие академической задолженности.',
                'application_steps' => 'Опишите ситуацию, приложите документы по обучению и финансовому положению, отправьте заявку через форму.',
                'required_documents' => 'Удостоверение личности, справка об обучении, документы, подтверждающие необходимость поддержки.',
                'amount' => 500000,
                'deadline' => now()->addMonths(2),
            ],
            [
                'title' => 'Грант на научный проект',
                'description' => 'Поддержка исследований, стартапов, олимпиад и международных академических конкурсов.',
                'conditions' => 'Наличие проекта, научного руководителя или подтвержденного участия в конкурсе/мероприятии.',
                'application_steps' => 'Кратко опишите проект, бюджет и ожидаемый результат, затем загрузите заявку и подтверждающие материалы.',
                'required_documents' => 'Описание проекта, бюджет, рекомендация руководителя, подтверждение участия при наличии.',
                'amount' => 350000,
                'deadline' => now()->addMonths(3),
            ],
        ];

        foreach ($scholarships as $item) {
            Scholarship::query()->updateOrCreate(['title' => $item['title']], $item);
        }

        $partners = [
            ['name' => 'АО «Алматинский технологический университет»', 'logo' => 'https://atu.edu.kz/templates/release/images/logo.svg', 'website' => 'https://atu.edu.kz'],
            ['name' => 'ATU Endowment Fund', 'logo' => 'https://atu.edu.kz/templates/release/images/logo.svg', 'website' => 'https://endowment.atu.kz'],
            ['name' => 'Ассоциация выпускников АТУ', 'logo' => 'https://atu.edu.kz/templates/release/images/logo.svg', 'website' => 'https://atu.edu.kz'],
        ];

        foreach ($partners as $item) {
            Partner::query()->updateOrCreate(['name' => $item['name']], $item);
        }

        $faqs = [
            ['question' => 'Что такое эндаумент?', 'answer' => 'Это фонд целевого капитала: собранные средства сохраняются и инвестируются, а доход направляется на поддержку студентов и университетских инициатив.'],
            ['question' => 'На что идут пожертвования?', 'answer' => 'На гранты, именные стипендии, научные и инновационные проекты, конкурсы, олимпиады и социально значимые инициативы студентов АТУ.'],
            ['question' => 'Как сделать вклад?', 'answer' => 'Нажмите кнопку «Сделать вклад», отсканируйте QR-код или используйте актуальные банковские реквизиты фонда.'],
            ['question' => 'Можно ли поддержать конкретный портфель?', 'answer' => 'Да. Донор может выбрать портфель: образование, наука и инновации, социальная поддержка, инфраструктура или стратегическое развитие университета.'],
        ];

        foreach ($faqs as $item) {
            Faq::query()->updateOrCreate(['question' => $item['question']], $item);
        }

        Donation::query()->updateOrCreate(['donor_name' => 'Выпускники АТУ'], ['amount' => 1500000, 'message' => 'Поддерживаем будущих лидеров университета.']);
        Donation::query()->updateOrCreate(['donor_name' => 'Партнеры фонда'], ['amount' => 2300000, 'message' => 'Вклад в устойчивое развитие АТУ.']);
    }
}
