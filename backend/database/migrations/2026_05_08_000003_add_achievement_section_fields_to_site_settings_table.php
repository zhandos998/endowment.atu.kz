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
            if (! Schema::hasColumn('site_settings', 'achievement_section_title')) {
                $table->string('achievement_section_title')->nullable();
            }

            if (! Schema::hasColumn('site_settings', 'achievement_section_description')) {
                $table->text('achievement_section_description')->nullable();
            }
        });

        DB::table('site_settings')
            ->whereNull('achievement_section_title')
            ->update(['achievement_section_title' => 'Достижения фонда']);

        DB::table('site_settings')
            ->whereNull('achievement_section_description')
            ->update(['achievement_section_description' => 'Ключевые показатели показывают масштаб целевого капитала, инвестиционного дохода и программ поддержки.']);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            if (Schema::hasColumn('site_settings', 'achievement_section_title')) {
                $table->dropColumn('achievement_section_title');
            }

            if (Schema::hasColumn('site_settings', 'achievement_section_description')) {
                $table->dropColumn('achievement_section_description');
            }
        });
    }
};
