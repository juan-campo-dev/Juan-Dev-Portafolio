<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ProjectSeeder::class,
            CertificateSeeder::class,
        ]);

        if (env('ADMIN_EMAIL') && env('ADMIN_PASSWORD')) {
            User::updateOrCreate(
                ['email' => env('ADMIN_EMAIL')],
                [
                    'name' => env('ADMIN_NAME', 'Juan Campo'),
                    'password' => env('ADMIN_PASSWORD'),
                    'role' => 'admin',
                    'is_active' => true,
                ]
            );
        }
    }
}
