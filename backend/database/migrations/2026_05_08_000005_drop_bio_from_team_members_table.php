<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('team_members', 'bio')) {
            return;
        }

        Schema::table('team_members', function (Blueprint $table) {
            $table->dropColumn('bio');
        });
    }

    public function down(): void
    {
        if (Schema::hasColumn('team_members', 'bio')) {
            return;
        }

        Schema::table('team_members', function (Blueprint $table) {
            $table->text('bio')->nullable();
        });
    }
};
