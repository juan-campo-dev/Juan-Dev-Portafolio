<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class VertexChatService
{
    private const SYSTEM_PROMPT = <<<'PROMPT'
Eres el asistente personal de Juan Campo, desarrollador y aprendiz del SENA en Tecnología en Análisis y Desarrollo de Software.

Información sobre Juan:
- Actualmente está en etapa lectiva, a un trimestre de iniciar la fase productiva.
- Se especializa en desarrollo frontend, pero también construye backend y despliegues reales.
- Combina diseño interactivo, buenas prácticas de desarrollo y tecnologías modernas.
- Usa herramientas de IA para mejorar la experiencia del usuario.
- Busca escribir código limpio, funcional y escalable.

Habilidades técnicas de Juan:
- Frontend: HTML, CSS, JavaScript, Tailwind CSS, React.js.
- Backend: PHP, Python, Node.js, Laravel.
- Bases de datos: MySQL.
- Diseño: Adobe Illustrator, Adobe XD.
- IA generativa: integración práctica en productos reales.

Proyectos destacados de Juan:
- Adsonary.
- Vence Pro 360.
- Luna Sofía ERP.
- Fleet App.
- Portafolio personal con Next.js.

Juan está disponible para trabajos freelance y oportunidades de colaboración. Está especialmente interesado en proyectos que le permitan crecer profesionalmente.

IMPORTANTE:
- Para contactar a Juan, los visitantes deben usar el formulario de contacto disponible en su portafolio web.
- No inventes enlaces, precios, números, correos ni disponibilidad no confirmada.
- Si te preguntan por proyectos o experiencia, responde con tono profesional, breve y útil.
PROMPT;

    public function generateReply(array $messages): string
    {
        $normalizedMessages = array_values(array_filter(array_map(function (array $message): ?array {
            $content = trim((string) ($message['content'] ?? ''));
            $role = $message['role'] ?? null;

            if ($content === '' || !in_array($role, ['user', 'assistant'], true)) {
                return null;
            }

            return [
                'role' => $role === 'assistant' ? 'model' : 'user',
                'parts' => [['text' => $content]],
            ];
        }, $messages)));

        if ($normalizedMessages === []) {
            throw new RuntimeException('No se recibieron mensajes válidos para el chat.');
        }

        $credentials = $this->loadCredentials();
        $token = $this->fetchAccessToken($credentials);

        $projectId = config('vertex.project_id') ?: ($credentials['project_id'] ?? null);
        $location = config('vertex.location', 'us-central1');
        $model = config('vertex.model', 'gemini-2.5-flash');

        if (!$projectId) {
            throw new RuntimeException('VERTEX_AI_PROJECT_ID no está configurado.');
        }

        $url = sprintf(
            'https://%s-aiplatform.googleapis.com/v1/projects/%s/locations/%s/publishers/google/models/%s:generateContent',
            $location,
            $projectId,
            $location,
            $model,
        );

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(30)
            ->post($url, [
                'systemInstruction' => [
                    'parts' => [
                        ['text' => self::SYSTEM_PROMPT],
                    ],
                ],
                'contents' => $normalizedMessages,
                'generationConfig' => [
                    'temperature' => 0.5,
                    'maxOutputTokens' => 512,
                ],
            ]);

        if ($response->failed()) {
            throw new RuntimeException($this->extractErrorMessage($response->json()));
        }

        $text = trim((string) Arr::get($response->json(), 'candidates.0.content.parts.0.text', ''));

        if ($text === '') {
            throw new RuntimeException('Vertex no devolvió contenido para responder.');
        }

        return $text;
    }

    private function loadCredentials(): array
    {
        $credentialsPath = config('vertex.credentials_path', storage_path('app/vertex-chatbot.json'));

        if (!is_file($credentialsPath)) {
            throw new RuntimeException("No existe el archivo de credenciales de Vertex: {$credentialsPath}");
        }

        $credentials = json_decode((string) file_get_contents($credentialsPath), true);

        if (!is_array($credentials)) {
            throw new RuntimeException('El archivo de credenciales de Vertex no es un JSON válido.');
        }

        foreach (['client_email', 'private_key', 'token_uri'] as $requiredKey) {
            if (empty($credentials[$requiredKey])) {
                throw new RuntimeException("Falta la clave {$requiredKey} en las credenciales de Vertex.");
            }
        }

        return $credentials;
    }

    private function fetchAccessToken(array $credentials): string
    {
        $issuedAt = time();
        $header = $this->base64UrlEncode(json_encode([
            'alg' => 'RS256',
            'typ' => 'JWT',
        ], JSON_THROW_ON_ERROR));

        $payload = $this->base64UrlEncode(json_encode([
            'iss' => $credentials['client_email'],
            'sub' => $credentials['client_email'],
            'aud' => $credentials['token_uri'],
            'scope' => 'https://www.googleapis.com/auth/cloud-platform',
            'iat' => $issuedAt,
            'exp' => $issuedAt + 3600,
        ], JSON_THROW_ON_ERROR));

        $unsignedJwt = $header . '.' . $payload;
        $privateKey = openssl_pkey_get_private($credentials['private_key']);

        if ($privateKey === false) {
            throw new RuntimeException('No se pudo abrir la private_key de Vertex.');
        }

        $signature = '';
        $signed = openssl_sign($unsignedJwt, $signature, $privateKey, OPENSSL_ALGO_SHA256);
        // Desde PHP 8.0 OpenSSLAsymmetricKey se libera automáticamente; openssl_free_key está deprecado.

        if (!$signed) {
            throw new RuntimeException('No se pudo firmar el JWT para Vertex.');
        }

        $assertion = $unsignedJwt . '.' . $this->base64UrlEncode($signature);

        $response = Http::asForm()
            ->acceptJson()
            ->timeout(20)
            ->post($credentials['token_uri'], [
                'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                'assertion' => $assertion,
            ]);

        if ($response->failed()) {
            throw new RuntimeException($this->extractErrorMessage($response->json()) ?: 'No se pudo obtener el access token de Google.');
        }

        $accessToken = (string) $response->json('access_token');

        if ($accessToken === '') {
            throw new RuntimeException('Google no devolvió access_token para Vertex.');
        }

        return $accessToken;
    }

    private function extractErrorMessage(mixed $payload): string
    {
        $message = Arr::get($payload, 'error.message')
            ?? Arr::get($payload, 'error_description')
            ?? Arr::get($payload, 'message');

        return is_string($message) && trim($message) !== ''
            ? $message
            : 'Error desconocido al comunicarse con Vertex AI.';
    }

    private function base64UrlEncode(string $value): string
    {
        return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
    }
}