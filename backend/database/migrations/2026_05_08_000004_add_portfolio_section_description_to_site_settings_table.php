<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('site_settings', 'portfolio_section_description')) {
            Schema::table('site_settings', function (Blueprint $table) {
                $table->text('portfolio_section_description')->nullable();
            });
        }

        DB::table('site_settings')
            ->whereNull('portfolio_section_description')
            ->update(['portfolio_section_description' => 'Каждый портфель отвечает за отдельное направление поддержки АТУ и помогает донорам выбрать понятный фокус вклада.']);
    }

    public function down(): void
    {
        if (! Schema::hasColumn('site_settings', 'portfolio_section_description')) {
            return;
        }

        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn('portfolio_section_description');
        });
    }
};
