<?php

namespace Database\Seeders;

use App\Models\Donation;
use App\Models\Faq;
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
            ['email' => 'admin@endowmentenu.kz'],
            [
                'name' => 'Администратор ENU Endowment Fund',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ]
        );

        SiteSetting::query()->updateOrCreate(
            ['email' => 'info@endowmentenu.kz'],
            [
                'phone' => '+7 7172 70 95 00',
                'address' => 'ул. Сатпаева 2, Астана',
                'instagram' => 'https://www.instagram.com/endowmentenu.kz/',
                'youtube' => 'https://www.youtube.com/@endowmentenu',
                'facebook' => 'https://facebook.com',
                'hero_title' => 'ENU ENDOWMENT FUND',
                'hero_subtitle' => 'Фонд долгосрочной поддержки Евразийского национального университета: стипендии, гранты, инновации и сильное академическое сообщество.',
                'hero_image' => 'https://static.tildacdn.pro/tild3661-6164-4465-b166-366537626564/AX8I5712.JPG',
                'hero_cta_primary' => 'Сделать вклад',
                'hero_cta_secondary' => 'О фонде',
                'statistics' => [
                    ['label' => 'студентов получили поддержку', 'value' => 50],
                    ['label' => 'выделенных грантов', 'value' => 40],
                    ['label' => 'цель фонда, млн тенге', 'value' => 500],
                ],
            ]
        );

        $news = [
            [
                'title' => 'Первый форум «Эндаументы Казахстана»',
                'slug' => 'pervyi-forum-endowmenty-kazakhstana',
                'excerpt' => 'ENU Endowment Fund провёл отраслевую встречу о развитии университетских фондов в Казахстане.',
                'content' => 'На форуме участники обсудили устойчивые модели поддержки студентов, прозрачное управление капиталом и роль выпускников в развитии университетской среды.',
                'image' => 'https://static.tildacdn.pro/tild6334-6235-4666-b262-653538653966/photo.jpg',
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'Новые именные стипендии для талантливых студентов',
                'slug' => 'novye-imennye-stipendii',
                'excerpt' => 'Фонд расширяет программу поддержки студентов, которые показывают сильные академические и общественные результаты.',
                'content' => 'Программа именных стипендий помогает студентам сосредоточиться на обучении, исследованиях, олимпиадах и общественных проектах университета.',
                'image' => 'https://static.tildacdn.pro/tild3565-3235-4738-b031-626230346262/photo.jpeg',
                'published_at' => now()->subDays(25),
            ],
            [
                'title' => 'Поддержка студенческих стартапов и научных инициатив',
                'slug' => 'podderzhka-startapov-i-nauki',
                'excerpt' => 'Средства фонда направляются на инновационные проекты, научные исследования и прикладные студенческие команды.',
                'content' => 'Эндаумент помогает запускать проекты, которые усиливают исследовательскую культуру ENU и открывают студентам путь к предпринимательству.',
                'image' => 'https://static.tildacdn.pro/tild3835-6366-4132-b764-343037636239/0_33.JPG',
                'published_at' => now()->subDays(41),
            ],
        ];

        foreach ($news as $item) {
            News::query()->updateOrCreate(['slug' => $item['slug']], $item);
        }

        $scholarships = [
            ['title' => 'Именная стипендия ENU Endowment Fund', 'description' => 'Для студентов с высокими академическими результатами и активным участием в университетских инициативах.', 'amount' => 250000, 'deadline' => now()->addMonth()],
            ['title' => 'Грант на обучение', 'description' => 'Финансовая поддержка студентов, которым необходимо закрыть часть образовательных расходов.', 'amount' => 500000, 'deadline' => now()->addMonths(2)],
            ['title' => 'Грант на научный проект', 'description' => 'Поддержка исследований, стартапов, олимпиад и международных академических конкурсов.', 'amount' => 350000, 'deadline' => now()->addMonths(3)],
        ];

        foreach ($scholarships as $item) {
            Scholarship::query()->updateOrCreate(['title' => $item['title']], $item);
        }

        $teamMembers = [
            ['name' => 'Инютин Дмитрий Сергеевич', 'role' => 'Попечительский совет', 'photo' => 'https://static.tildacdn.pro/tild3632-3865-4136-b165-306166326134/photo.png'],
            ['name' => 'Чен Борис Геннадьевич', 'role' => 'Попечительский совет', 'photo' => 'https://static.tildacdn.pro/tild3766-3934-4234-a264-373834346163/photo-20240312-17-45.jpg'],
            ['name' => 'Айтмагамбетов Думан Рамазанович', 'role' => 'Попечительский совет', 'photo' => 'https://static.tildacdn.pro/tild3832-3239-4137-a364-373161373331/photo-20240312-17-48.jpg'],
            ['name' => 'Ақан Бақытжан Даулетбайұлы', 'role' => 'Попечительский совет', 'photo' => 'https://static.tildacdn.pro/tild6364-3738-4730-b839-333361633562/photo-20240312-17-46.jpg'],
            ['name' => 'Амангельды Аружан Жалелбековна', 'role' => 'Попечительский совет', 'photo' => 'https://static.tildacdn.pro/tild6431-3839-4239-b965-363730656164/photo-20240312-17-46.jpg'],
            ['name' => 'Теленчинов Рамиль Кайратович', 'role' => 'Совет учредителей', 'photo' => 'https://static.tildacdn.pro/tild3266-6139-4766-b138-383538353338/photo.png'],
            ['name' => 'Несен Игорь Викторович', 'role' => 'Совет учредителей', 'photo' => 'https://static.tildacdn.pro/tild3132-3436-4231-a537-336130346134/photo.png'],
        ];

        foreach ($teamMembers as $item) {
            TeamMember::query()->updateOrCreate(['name' => $item['name']], $item);
        }

        $partners = [
            ['name' => 'Евразийский национальный университет', 'logo' => 'https://static.tildacdn.pro/tild3661-3730-4666-b932-373764376632/logo-enu-new.jpg', 'website' => 'https://enu.kz'],
            ['name' => 'ENU Endowment Fund', 'logo' => 'https://static.tildacdn.pro/tild3661-3730-4666-b932-373764376632/logo-enu-new.jpg', 'website' => 'https://endowmentenu.kz'],
            ['name' => 'Выпускники ENU', 'logo' => 'https://static.tildacdn.pro/tild6465-6362-4737-b532-326334636564/3a2e0bdd-a385-42e7-a.jpg', 'website' => 'https://endowmentenu.kz'],
        ];

        foreach ($partners as $item) {
            Partner::query()->updateOrCreate(['name' => $item['name']], $item);
        }

        $faqs = [
            ['question' => 'Что такое эндаумент?', 'answer' => 'Это фонд целевого капитала: собранные средства сохраняются и инвестируются, а доход направляется на поддержку студентов и университетских инициатив.'],
            ['question' => 'На что идут пожертвования?', 'answer' => 'На гранты, именные стипендии, научные и инновационные проекты, спортивные соревнования, олимпиады и социально значимые студенческие инициативы.'],
            ['question' => 'Как сделать вклад?', 'answer' => 'Оставьте заявку на странице пожертвований или свяжитесь с фондом по адресу info@endowmentenu.kz. Команда фонда поможет выбрать удобный формат участия.'],
            ['question' => 'Можно ли поддержать конкретную программу?', 'answer' => 'Да. Донор может направить вклад на стипендии, гранты, исследования, стартапы или другие согласованные направления поддержки.'],
        ];

        foreach ($faqs as $item) {
            Faq::query()->updateOrCreate(['question' => $item['question']], $item);
        }

        Donation::query()->updateOrCreate(['donor_name' => 'Выпускники ENU'], ['amount' => 1500000, 'message' => 'Поддерживаем будущих лидеров университета.']);
        Donation::query()->updateOrCreate(['donor_name' => 'Партнёры фонда'], ['amount' => 2300000, 'message' => 'Вклад в устойчивое развитие ENU.']);
    }
}
