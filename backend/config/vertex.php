<?php

return [
    'project_id' => env('VERTEX_AI_PROJECT_ID'),
    'location' => env('VERTEX_AI_LOCATION', 'us-central1'),
    'model' => env('VERTEX_AI_MODEL', 'gemini-2.5-flash'),
    'credentials_path' => env('VERTEX_AI_CREDENTIALS_PATH', storage_path('app/vertex-chatbot.json')),
];