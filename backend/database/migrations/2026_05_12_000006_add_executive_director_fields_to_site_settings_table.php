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
            $table->string('executive_director_photo')->nullable()->after('facebook');
            $table->string('executive_director_name')->nullable()->after('executive_director_photo');
            $table->string('executive_director_position')->nullable()->after('executive_director_name');
            $table->string('executive_director_phone', 100)->nullable()->after('executive_director_position');
            $table->string('executive_director_email')->nullable()->after('executive_director_phone');
        });

        DB::table('site_settings')->update([
            'executive_director_name' => 'Исполнительный директор фонда',
            'executive_director_position' => 'Ответственное лицо по взаимодействию с вкладчиками',
            'executive_director_phone' => '+7 727 221-88-08',
            'executive_director_email' => 'info@atu.edu.kz',
        ]);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn([
                'executive_director_photo',
                'executive_director_name',
                'executive_director_position',
                'executive_director_phone',
                'executive_director_email',
            ]);
        });
    }
};
