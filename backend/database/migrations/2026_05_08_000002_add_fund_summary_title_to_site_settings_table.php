<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('site_settings', 'fund_summary_title')) {
            return;
        }

        Schema::table('site_settings', function (Blueprint $table) {
            $table->string('fund_summary_title')->nullable();
        });

        DB::table('site_settings')
            ->whereNull('fund_summary_title')
            ->update(['fund_summary_title' => 'Фонд, который работает дольше одного учебного года']);
    }

    public function down(): void
    {
        if (! Schema::hasColumn('site_settings', 'fund_summary_title')) {
            return;
        }

        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn('fund_summary_title');
        });
    }
};
