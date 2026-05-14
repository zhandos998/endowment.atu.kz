<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('scholarships', function (Blueprint $table) {
            if (! Schema::hasColumn('scholarships', 'conditions')) {
                $table->text('conditions')->nullable()->after('description');
            }

            if (! Schema::hasColumn('scholarships', 'application_steps')) {
                $table->text('application_steps')->nullable()->after('conditions');
            }

            if (! Schema::hasColumn('scholarships', 'required_documents')) {
                $table->text('required_documents')->nullable()->after('application_steps');
            }
        });

        DB::table('scholarships')->whereNull('conditions')->update(['conditions' => 'Условия участия можно отредактировать в админ-панели.']);
        DB::table('scholarships')->whereNull('application_steps')->update(['application_steps' => 'Заполните анкету, приложите документы и отправьте заявку на рассмотрение фонда.']);
        DB::table('scholarships')->whereNull('required_documents')->update(['required_documents' => 'Удостоверение личности, справка с места учебы и подтверждающие документы.']);
    }

    public function down(): void
    {
        Schema::table('scholarships', function (Blueprint $table) {
            foreach (['conditions', 'application_steps', 'required_documents'] as $column) {
                if (Schema::hasColumn('scholarships', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
