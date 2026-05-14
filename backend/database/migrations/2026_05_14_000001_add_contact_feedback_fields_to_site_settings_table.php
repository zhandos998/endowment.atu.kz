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
            $table->string('contact_feedback_title')->nullable()->after('executive_director_email');
            $table->text('contact_feedback_description')->nullable()->after('contact_feedback_title');
        });

        DB::table('site_settings')->update([
            'contact_feedback_title' => 'Форма обратной связи',
            'contact_feedback_description' => 'Отправьте вопрос, предложение о партнерстве или сообщение для команды фонда.',
        ]);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn(['contact_feedback_title', 'contact_feedback_description']);
        });
    }
};
