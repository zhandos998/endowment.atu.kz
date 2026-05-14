<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fund_achievements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('value', 16, 2)->default(0);
            $table->string('unit', 40)->nullable();
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('color', 32)->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fund_achievements');
    }
};
