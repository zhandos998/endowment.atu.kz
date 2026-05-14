<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('donation_details', function (Blueprint $table) {
            if (! Schema::hasColumn('donation_details', 'donation_cta_title')) {
                $table->string('donation_cta_title')->nullable()->after('payment_purpose');
            }
        });

        DB::table('donation_details')
            ->whereNull('donation_cta_title')
            ->update(['donation_cta_title' => 'Ваш вклад становится частью долгосрочного капитала АТУ']);
    }

    public function down(): void
    {
        Schema::table('donation_details', function (Blueprint $table) {
            if (Schema::hasColumn('donation_details', 'donation_cta_title')) {
                $table->dropColumn('donation_cta_title');
            }
        });
    }
};
