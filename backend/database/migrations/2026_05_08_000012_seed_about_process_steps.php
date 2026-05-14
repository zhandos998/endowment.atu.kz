<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::table('about_process_steps')->exists()) {
            return;
        }

        DB::table('about_process_steps')->insert([
            [
                'title' => 'Формируется капитал',
                'description' => 'Взносы доноров аккумулируются в целевом капитале фонда.',
                'icon' => 'capital',
                'sort_order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Капитал инвестируется',
                'description' => 'Средства работают по утвержденной инвестиционной политике и сохраняют долгосрочный горизонт.',
                'icon' => 'governance',
                'sort_order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Доход направляется в программы',
                'description' => 'Инвестиционный доход используется для стипендий, грантов, науки и инфраструктурных проектов.',
                'icon' => 'income',
                'sort_order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Фонд отчитывается',
                'description' => 'Попечительский совет и команда фонда контролируют целевое использование средств и отчетность.',
                'icon' => 'reporting',
                'sort_order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        DB::table('about_process_steps')
            ->whereIn('title', [
                'Формируется капитал',
                'Капитал инвестируется',
                'Доход направляется в программы',
                'Фонд отчитывается',
            ])
            ->delete();
    }
};
