<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('donation_details', function (Blueprint $table) {
            if (! Schema::hasColumn('donation_details', 'public_offer_document')) {
                $table->string('public_offer_document')->nullable()->after('public_offer_url');
            }
        });
    }

    public function down(): void
    {
        Schema::table('donation_details', function (Blueprint $table) {
            if (Schema::hasColumn('donation_details', 'public_offer_document')) {
                $table->dropColumn('public_offer_document');
            }
        });
    }
};
