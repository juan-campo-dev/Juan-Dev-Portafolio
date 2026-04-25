<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CertificateController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'certificates' => Certificate::query()
                ->orderBy('sort_order')
                ->orderByDesc('updated_at')
                ->get()
                ->map(fn(Certificate $certificate) => $this->serialize($certificate))
                ->values(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate($this->rules());
        $data = $this->applyUpload($request, $data);

        $certificate = Certificate::create($data);

        return response()->json(['certificate' => $this->serialize($certificate)], 201);
    }

    public function update(Request $request, Certificate $certificate): JsonResponse
    {
        $data = $request->validate($this->rules());
        $data = $this->applyUpload($request, $data, $certificate);

        $certificate->update($data);

        return response()->json(['certificate' => $this->serialize($certificate->fresh())]);
    }

    public function destroy(Certificate $certificate): JsonResponse
    {
        $certificate->delete();

        return response()->json(['ok' => true]);
    }

    private function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:180'],
            'issuer' => ['required', 'string', 'max:180'],
            'issued_label' => ['nullable', 'string', 'max:120'],
            'category' => ['nullable', 'string', 'max:120'],
            'highlight' => ['nullable', 'string', 'max:180'],
            'image' => ['nullable', 'string', 'max:500'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'credential_url' => ['nullable', 'url', 'max:500'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    private function applyUpload(Request $request, array $data, ?Certificate $certificate = null): array
    {
        if ($request->hasFile('image_file')) {
            $data['image'] = $this->storePublicUpload($request);
        } elseif (empty($data['image']) && $certificate) {
            $data['image'] = $certificate->image;
        }

        $data['sort_order'] = $data['sort_order'] ?? $certificate?->sort_order ?? 0;

        return $data;
    }

    private function storePublicUpload(Request $request): string
    {
        $file = $request->file('image_file');
        $directory = public_path('uploads/certificates');

        File::ensureDirectoryExists($directory, 0755, true);

        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $file->move($directory, $filename);

        return url("uploads/certificates/{$filename}");
    }

    private function serialize(Certificate $certificate): array
    {
        return [
            'id' => $certificate->id,
            'title' => $certificate->title,
            'issuer' => $certificate->issuer,
            'issued_label' => $certificate->issued_label,
            'category' => $certificate->category,
            'highlight' => $certificate->highlight,
            'image' => $certificate->image,
            'credential_url' => $certificate->credential_url,
            'status' => $certificate->status,
            'sort_order' => $certificate->sort_order,
            'updated_at' => $certificate->updated_at?->toISOString(),
        ];
    }
}