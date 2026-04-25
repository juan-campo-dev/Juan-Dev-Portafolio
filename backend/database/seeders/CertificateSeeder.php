<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            ['title' => 'Top 3 Nacional — WorldSkills Colombia 2025', 'issuer' => 'WorldSkills Colombia', 'issued_label' => '2025', 'category' => 'distinction', 'highlight' => 'Tecnologías Web · Estándares internacionales'],
            ['title' => 'Oracle Database @ AWS Certified Architect Professional', 'issuer' => 'Oracle / AWS', 'issued_label' => 'Dic 2025', 'category' => 'certification'],
            ['title' => 'Diseño de Elementos Vectoriales en Illustrator', 'issuer' => 'Adobe', 'issued_label' => 'Jun 2024', 'category' => 'certification'],
            ['title' => 'Carrera de Desarrollo Full Stack (52 semanas)', 'issuer' => 'Coderhouse', 'issued_label' => 'Sep 2023', 'category' => 'course', 'highlight' => 'Top 10 mejores estudiantes'],
            ['title' => 'JavaScript', 'issuer' => 'Coderhouse · 34h', 'issued_label' => 'Jul 2022', 'category' => 'course'],
            ['title' => 'React.js', 'issuer' => 'Coderhouse · 28h', 'issued_label' => 'Sep 2022', 'category' => 'course'],
            ['title' => 'Programación Backend', 'issuer' => 'Coderhouse · 86h', 'issued_label' => 'Mar 2023', 'category' => 'course'],
            ['title' => 'Programación con Java', 'issuer' => 'Coderhouse · 37h', 'issued_label' => 'Dic 2022', 'category' => 'course'],
            ['title' => 'Desarrollo Web', 'issuer' => 'Coderhouse · 38h', 'issued_label' => 'May 2022', 'category' => 'course'],
            ['title' => 'Next.js: El framework de React para producción', 'issuer' => 'Udemy · 36.5h', 'issued_label' => 'Mar 2024', 'category' => 'course'],
            ['title' => 'Nest: Desarrollo backend escalable con Node', 'issuer' => 'Udemy · 25h', 'issued_label' => 'Jun 2024', 'category' => 'course'],
            ['title' => 'React: De cero a experto — Hooks y MERN', 'issuer' => 'Udemy · 54h', 'issued_label' => 'Oct 2023', 'category' => 'course'],
            ['title' => 'JavaScript Moderno: Guía para dominar el lenguaje', 'issuer' => 'Udemy · 22.5h', 'issued_label' => 'Sep 2023', 'category' => 'course'],
            ['title' => 'Node: De cero a experto', 'issuer' => 'Udemy · 20h', 'issued_label' => 'May 2023', 'category' => 'course'],
            ['title' => 'Principios SOLID y Clean Code', 'issuer' => 'Udemy · 8.5h', 'issued_label' => 'Nov 2023', 'category' => 'course'],
        ];

        foreach ($certificates as $index => $certificate) {
            Certificate::updateOrCreate(
                ['title' => $certificate['title'], 'issuer' => $certificate['issuer']],
                $certificate + ['status' => 'published', 'sort_order' => $index + 1]
            );
        }
    }
}
