<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('description');
            $table->string('category')->index();
            $table->string('client')->nullable();
            $table->json('technologies');
            $table->json('platforms')->nullable();
            $table->json('images')->nullable();
            $table->string('github_url')->nullable();
            $table->boolean('github_private')->default(true);
            $table->string('demo_url')->nullable();
            $table->boolean('demo_private')->default(true);
            $table->boolean('demo_soon')->default(false);
            $table->boolean('featured')->default(false)->index();
            $table->string('status')->default('published')->index();
            $table->unsignedSmallInteger('year')->nullable();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
