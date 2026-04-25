<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('issuer');
            $table->string('issued_label')->nullable();
            $table->string('category')->nullable()->index();
            $table->string('highlight')->nullable();
            $table->string('image')->nullable();
            $table->string('credential_url')->nullable();
            $table->string('status')->default('published')->index();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
