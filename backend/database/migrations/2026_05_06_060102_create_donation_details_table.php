<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donation_details', function (Blueprint $table) {
            $table->id();
            $table->string('qr_image')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('beneficiary');
            $table->string('bin', 32)->nullable();
            $table->string('iban', 64)->nullable();
            $table->string('bik', 32)->nullable();
            $table->string('kbe', 16)->nullable();
            $table->text('payment_purpose')->nullable();
            $table->string('public_offer_title')->nullable();
            $table->string('public_offer_url')->nullable();
            $table->longText('public_offer_text')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donation_details');
    }
};
