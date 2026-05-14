<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scholarship_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scholarship_id')->constrained()->cascadeOnDelete();
            $table->string('applicant_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('student_group')->nullable();
            $table->text('message')->nullable();
            $table->json('documents')->nullable();
            $table->string('status')->default('new');
            $table->text('admin_note')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scholarship_applications');
    }
};
