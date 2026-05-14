<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('donation_details')
            ->where('qr_image', 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://endowment.atu.kz/donate')
            ->update(['qr_image' => 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://endowment.atu.kz/#donate']);
    }

    public function down(): void
    {
        DB::table('donation_details')
            ->where('qr_image', 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://endowment.atu.kz/#donate')
            ->update(['qr_image' => 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://endowment.atu.kz/donate']);
    }
};
