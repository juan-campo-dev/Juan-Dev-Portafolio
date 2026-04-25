<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('track_events', function (Blueprint $table) {
            $table->id();
            $table->string('type')->index();
            $table->foreignId('project_id')->nullable()->constrained()->nullOnDelete();
            $table->string('project_slug')->nullable()->index();
            $table->json('payload')->nullable();
            $table->timestamp('created_at')->useCurrent()->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('track_events');
    }
};
