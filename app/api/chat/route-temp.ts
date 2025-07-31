import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // Respuestas predefinidas mientras se resuelve el problema de OpenAI
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    
    let response = '';
    
    if (lastMessage.includes('proyecto') || lastMessage.includes('trabajo')) {
      response = 'Juan ha trabajado en varios proyectos interesantes:\n\n1. **Adsonary** - Un diccionario técnico de software desarrollado con Node.js, Express y JavaScript\n2. **ContaFlow** - Sistema de contabilidad (próximamente)\n3. **MotorSys** - Sistema de gestión (próximamente)\n4. **WellMap** - Aplicación de mapas (próximamente)\n5. **Portafolio Personal** - Desarrollado con Next.js y Tailwind CSS\n\n¿Te interesa algún proyecto en particular?';
    } else if (lastMessage.includes('habilidad') || lastMessage.includes('tecnolog') || lastMessage.includes('skill')) {
      response = 'Juan tiene experiencia en diversas tecnologías:\n\n**Frontend:**\n• HTML (90%)\n• CSS (90%)\n• JavaScript (90%)\n• Tailwind CSS (70%)\n• React.js (70%)\n\n**Backend:**\n• PHP (90%)\n• Python (90%)\n• Node.js (70%)\n\n**Bases de Datos:**\n• MySQL (90%)\n• Lucidchart (70%)\n\n**Diseño:**\n• Adobe Illustrator (90%)\n• Adobe XD (60%)\n\n**IA Generativa:** 80% - Experimentando con IA generativas';
    } else if (lastMessage.includes('contacto') || lastMessage.includes('disponib') || lastMessage.includes('freelance')) {
      response = 'Juan está disponible para trabajos freelance y proyectos colaborativos. Puedes contactarlo a través del formulario de contacto en su portafolio.\n\nActualmente es aprendiz del SENA en Tecnología en Análisis y Desarrollo de Software, está en etapa lectiva a un trimestre de iniciar la fase productiva.\n\n¿Te gustaría saber más sobre su disponibilidad o algún proyecto específico?';
    } else if (lastMessage.includes('sena') || lastMessage.includes('estudio') || lastMessage.includes('educación')) {
      response = 'Juan es aprendiz del SENA en **Tecnología en Análisis y Desarrollo de Software**. Actualmente está en la etapa lectiva y está a un trimestre de iniciar la fase productiva.\n\nEsta formación le ha permitido desarrollar habilidades tanto en frontend como backend, y está especialmente interesado en proyectos que le permitan crecer profesionalmente.';
    } else if (lastMessage.includes('hola') || lastMessage.includes('hi') || lastMessage.includes('hello')) {
      response = '¡Hola! 👋 Soy el asistente de Juan Campo. Me da mucho gusto saludarte. Puedo ayudarte con información sobre:\n\n• Sus proyectos y trabajos\n• Habilidades técnicas\n• Experiencia y formación\n• Disponibilidad para freelance\n\n¿Qué te gustaría saber sobre Juan?';
    } else {
      response = 'Hola! Soy el asistente de Juan Campo, desarrollador especializado en tecnologías web modernas. Puedo ayudarte con información sobre:\n\n• Sus proyectos y trabajos\n• Habilidades técnicas\n• Experiencia y formación\n• Disponibilidad para freelance\n\n¿Qué te gustaría saber sobre Juan?';
    }

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
