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
            if (! Schema::hasColumn('site_settings', 'team_section_title')) {
                $table->string('team_section_title')->nullable();
            }

            if (! Schema::hasColumn('site_settings', 'team_section_description')) {
                $table->text('team_section_description')->nullable();
            }
        });

        DB::table('site_settings')
            ->whereNull('team_section_title')
            ->update(['team_section_title' => 'Попечительский совет']);

        DB::table('site_settings')
            ->whereNull('team_section_description')
            ->update(['team_section_description' => 'Совет объединяет представителей университета и экспертов, отвечающих за стратегическое развитие фонда.']);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            if (Schema::hasColumn('site_settings', 'team_section_title')) {
                $table->dropColumn('team_section_title');
            }

            if (Schema::hasColumn('site_settings', 'team_section_description')) {
                $table->dropColumn('team_section_description');
            }
        });
    }
};
