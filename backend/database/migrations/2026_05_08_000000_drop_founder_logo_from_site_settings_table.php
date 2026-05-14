<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('site_settings', 'founder_logo')) {
            return;
        }

        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn('founder_logo');
        });
    }

    public function down(): void
    {
        if (Schema::hasColumn('site_settings', 'founder_logo')) {
            return;
        }

        Schema::table('site_settings', function (Blueprint $table) {
            $table->string('founder_logo')->nullable();
        });
    }
};
