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
            if (! Schema::hasColumn('site_settings', 'scholarships_hero_title')) {
                $table->string('scholarships_hero_title')->nullable();
            }

            if (! Schema::hasColumn('site_settings', 'scholarships_hero_description')) {
                $table->text('scholarships_hero_description')->nullable();
            }

            if (! Schema::hasColumn('site_settings', 'scholarships_section_title')) {
                $table->string('scholarships_section_title')->nullable();
            }

            if (! Schema::hasColumn('site_settings', 'scholarships_section_description')) {
                $table->text('scholarships_section_description')->nullable();
            }
        });

        DB::table('site_settings')->whereNull('scholarships_hero_title')->update(['scholarships_hero_title' => 'Стипендии']);
        DB::table('site_settings')->whereNull('scholarships_hero_description')->update(['scholarships_hero_description' => 'Грантовые и стипендиальные программы для студентов АТУ.']);
        DB::table('site_settings')->whereNull('scholarships_section_title')->update(['scholarships_section_title' => 'Программы поддержки']);
        DB::table('site_settings')->whereNull('scholarships_section_description')->update(['scholarships_section_description' => 'Каждая программа ориентирована на конкретный результат: обучение, исследования, участие в конкурсах и развитие инициатив.']);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            foreach (['scholarships_hero_title', 'scholarships_hero_description', 'scholarships_section_title', 'scholarships_section_description'] as $column) {
                if (Schema::hasColumn('site_settings', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
