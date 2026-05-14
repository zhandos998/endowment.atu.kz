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
            if (! Schema::hasColumn('site_settings', 'news_hero_title')) {
                $table->string('news_hero_title')->nullable();
            }

            if (! Schema::hasColumn('site_settings', 'news_hero_description')) {
                $table->text('news_hero_description')->nullable();
            }

            if (! Schema::hasColumn('site_settings', 'news_section_title')) {
                $table->string('news_section_title')->nullable();
            }
        });

        DB::table('site_settings')->whereNull('news_hero_title')->update(['news_hero_title' => 'Новости']);
        DB::table('site_settings')->whereNull('news_hero_description')->update(['news_hero_description' => 'События фонда, объявления и истории поддержки студентов АТУ.']);
        DB::table('site_settings')->whereNull('news_section_title')->update(['news_section_title' => 'Последние публикации']);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            foreach (['news_hero_title', 'news_hero_description', 'news_section_title'] as $column) {
                if (Schema::hasColumn('site_settings', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
