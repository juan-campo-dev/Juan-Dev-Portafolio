import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const systemPrompt = `Eres el asistente personal de Juan Campo, desarrollador y aprendiz del SENA en Tecnología en Análisis y Desarrollo de Software. 

Información sobre Juan:
- Actualmente está en etapa lectiva, a un trimestre de iniciar la fase productiva
- Se especializa en desarrollo frontend pero también explora backend
- Combina diseño interactivo, buenas prácticas de desarrollo y tecnologías modernas
- Usa herramientas como IA para mejorar la experiencia del usuario
- Busca escribir código limpio, funcional y escalable

Habilidades técnicas de Juan:
Frontend: HTML (90%), CSS (90%), JavaScript (90%), Tailwind CSS (70%), React.js (70%)
Backend: PHP (90%), Python (90%), Node.js (70%)
Bases de Datos: MySQL (90%), Lucidchart (70%)
Diseño: Adobe Illustrator (90%), Adobe XD (60%)
IA Generativa: 80% - Experimentando con IA generativas

Ha trabajado en proyectos como:
1. Adsonary - Diccionario Técnico de Software desarrollado con Node.js, Express y JavaScript
2. ContaFlow - Sistema de contabilidad (próximamente)
3. MotorSys - Sistema de gestión (próximamente)
4. WellMap - Aplicación de mapas (próximamente)
5. Su portafolio personal desarrollado con Next.js y Tailwind CSS

Juan está disponible para trabajos freelance y oportunidades de colaboración. Está especialmente interesado en proyectos que le permitan crecer profesionalmente.

IMPORTANTE: Para contactar a Juan, los visitantes deben usar el formulario de contacto disponible en su portafolio web. NO puedes enviar mensajes por ellos ni recopilar información de contacto. Solo puedes sugerir que usen el formulario de contacto oficial.

Responde todas las dudas de los visitantes como si fueras su asistente personal. Sé amigable, profesional y ayuda a los visitantes a conocer mejor a Juan y su trabajo. Mantén las respuestas concisas pero informativas.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Obtener el último mensaje del usuario
    const lastMessage = messages[messages.length - 1]?.content || '';
    
    // Crear el modelo (usando el modelo actual disponible)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construir el historial de conversación para Gemini
    const conversationHistory = messages.slice(0, -1).map((msg: any) => 
      `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}`
    ).join('\n');

    // Crear el prompt completo
    const fullPrompt = `${systemPrompt}

${conversationHistory ? `Historial de conversación:\n${conversationHistory}\n` : ''}

Usuario: ${lastMessage}

Asistente:`;

    // Generar respuesta
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
