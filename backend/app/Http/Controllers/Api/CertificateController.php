<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CertificateController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $certificates = Certificate::query()
            ->where('status', 'published')
            ->orderBy('sort_order')
            ->get();

        return CertificateResource::collection($certificates);
    }
}
