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
            if (! Schema::hasColumn('site_settings', 'faq_hero_title')) {
                $table->string('faq_hero_title')->nullable();
            }

            if (! Schema::hasColumn('site_settings', 'faq_hero_description')) {
                $table->text('faq_hero_description')->nullable();
            }

            if (! Schema::hasColumn('site_settings', 'faq_section_title')) {
                $table->string('faq_section_title')->nullable();
            }
        });

        DB::table('site_settings')->whereNull('faq_hero_title')->update(['faq_hero_title' => 'FAQ']);
        DB::table('site_settings')->whereNull('faq_hero_description')->update(['faq_hero_description' => 'Ответы на частые вопросы о фонде, пожертвованиях и программах поддержки.']);
        DB::table('site_settings')->whereNull('faq_section_title')->update(['faq_section_title' => 'Частые вопросы']);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            foreach (['faq_hero_title', 'faq_hero_description', 'faq_section_title'] as $column) {
                if (Schema::hasColumn('site_settings', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
