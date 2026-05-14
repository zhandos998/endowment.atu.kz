<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $columns = [
                'about_hero_title' => fn () => $table->string('about_hero_title')->nullable(),
                'about_hero_description' => fn () => $table->text('about_hero_description')->nullable(),
                'about_history_title' => fn () => $table->string('about_history_title')->nullable(),
                'about_history_text' => fn () => $table->text('about_history_text')->nullable(),
                'about_process_title' => fn () => $table->string('about_process_title')->nullable(),
                'about_process_description' => fn () => $table->text('about_process_description')->nullable(),
                'about_documents_title' => fn () => $table->string('about_documents_title')->nullable(),
                'about_reports_title' => fn () => $table->string('about_reports_title')->nullable(),
            ];

            foreach ($columns as $column => $create) {
                if (! Schema::hasColumn('site_settings', $column)) {
                    $create();
                }
            }
        });

        DB::table('site_settings')->whereNull('about_hero_title')->update(['about_hero_title' => 'О фонде']);
        DB::table('site_settings')->whereNull('about_hero_description')->update(['about_hero_description' => 'ATU Endowment Fund — фонд долгосрочной поддержки АО «Алматинский технологический университет».']);
        DB::table('site_settings')->whereNull('about_history_title')->update(['about_history_title' => 'История создания фонда']);
        DB::table('site_settings')->whereNull('about_history_text')->update(['about_history_text' => 'Фонд создан для долгосрочной поддержки студентов, научных инициатив и стратегического развития АТУ через целевой капитал и прозрачные программы финансирования.']);
        DB::table('site_settings')->whereNull('about_process_title')->update(['about_process_title' => 'Как работает фонд']);
        DB::table('site_settings')->whereNull('about_process_description')->update(['about_process_description' => 'Модель фонда строится на сохранении капитала, профессиональном управлении и направлении инвестиционного дохода на утвержденные программы поддержки.']);
        DB::table('site_settings')->whereNull('about_documents_title')->update(['about_documents_title' => 'Уставные документы']);
        DB::table('site_settings')->whereNull('about_reports_title')->update(['about_reports_title' => 'Финансовая отчетность']);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            foreach ([
                'about_hero_title',
                'about_hero_description',
                'about_history_title',
                'about_history_text',
                'about_process_title',
                'about_process_description',
                'about_documents_title',
                'about_reports_title',
            ] as $column) {
                if (Schema::hasColumn('site_settings', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
