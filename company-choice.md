# Elección de empresa

**Empresa elegida: Nexova Solutions**

## Por qué elegí Nexova

Elegí Nexova porque es la empresa donde la IA está metida en el centro del negocio. El mismo briefing dice que el scoring de CVs, el matching de candidatos y los agentes de soporte son "entregables centrales, no mejoras opcionales", y eso es justo lo que quiero aprender a construir. Lo que más me llamó la atención fue Operaciones de Selección: 40 consultores que leen a mano entre 30 y 80 CVs por proceso, escriben los emails a los candidatos uno por uno y encima reciben llamadas de clientes que solo quieren saber en qué va su proceso. Todo eso pasa con un ATS hecho a medida a principios de los 2010 que no se conecta con HubSpot ni con Zendesk, así que la información de cada candidato queda repartida en varias partes. Laura Mendoza ya tiene encima a plataformas automatizadas que le compiten directo, así que el problema es real y tiene urgencia. Y hay algo personal: yo desarrollo un SaaS para talleres mecánicos en Chile de nombre promecanicaservicios.com, y elegí basarme en Nexova porque, aunque un taller mecánico parece un negocio puramente físico, las soluciones de automatización, agentes conversacionales y sistemas de soporte basados en RAG que quiero desarrollar son problemas de gestión de información B2B que reflejan exactamente la estructura técnica de esa empresa.

## Departamentos que me resultan más interesantes

### 1. Operaciones de Selección (Javier Almeida, 40 consultores)

Es lo que más plata le deja a Nexova y hoy todo se hace a mano: el filtro de CVs, la comunicación con los candidatos y el matching, que depende solo del ojo del consultor. Me interesa porque cada hora que la IA le ahorra a un consultor son más procesos cerrados, y porque el cliente hoy no tiene cómo ver en qué etapa va su búsqueda sin llamar.

### 2. Atención al Cliente externalizado (Roberto Díaz, 30 agentes)

Se demoran 48 horas en resolver cuando se comprometieron a 24, y los agentes trabajan con lo que saben y un Word compartido en Drive porque no tienen base de conocimiento. Me gusta porque el problema ya está medido y la meta también: un chatbot con RAG que resuelva el 40% de las consultas sin que intervenga una persona. Así se puede comparar el antes y el después con números.

## Reto de automatización/IA que más quiero construir

El **pipeline de selección asistido por IA, con scoring y ranking automático de CVs**, conectado al **agente de comunicación que les hace el seguimiento a los candidatos**. Es el reto de Operaciones de Selección y con él ataco al mismo tiempo los tres problemas que cuenta el briefing: la lectura de CVs a mano, los emails uno por uno y los clientes que llaman para preguntar cómo va su proceso.

## Mi idea de Agente de IA (My AI Agent Idea)

Quiero construir un **agente de preselección que converse con el postulante** desde que postula hasta que el consultor toma la decisión.

**Qué haría:**

- Recibe la postulación (CV y datos del candidato) a una vacante abierta.
- Lee el CV, lo compara con el perfil del cargo que definió el cliente y le pone un puntaje explicado, por ejemplo: "cumple 4 de 5 requisitos; no acredita inglés C1".
- Conversa con el candidato por email o chat con preguntas de filtro según el cargo (disponibilidad, expectativa de sueldo, experiencia concreta en lo que pide el cliente) y algunas preguntas de situaciones reales para ver sus competencias.
- Le avisa al candidato en cada etapa (recibida, en revisión, pasa a entrevista, cerrada), para que nadie se quede sin respuesta.
- Al cerrar la etapa, le entrega al consultor un informe por candidato y el ranking del proceso.

**Qué información necesita:**

- El perfil del cargo que pide el cliente: funciones, requisitos obligatorios y deseables, competencias, rango de sueldo e idioma.
- El CV y lo que el candidato responde en la conversación.
- La base histórica de candidatos del ATS de Nexova, para sugerir gente que ya postuló antes y calza, con búsquedas del tipo "experiencia en ventas B2B e inglés C1".
- Las plantillas de mensajes y los criterios de evaluación que defina el equipo de Javier Almeida.

**Qué produciría o activaría:**

- Un ranking de candidatos donde cada puntaje viene con su explicación.
- Un informe por candidato con un resumen de su experiencia, fortalezas, alertas y preguntas sugeridas para la entrevista con una persona.
- El estado de cada candidato actualizado, para que el cliente lo vea sin tener que llamar al consultor.
- Un aviso al consultor cuando aparece un candidato muy bueno, y los emails de seguimiento enviados solos.

**Límites que me pongo:**

- **La IA recomienda y la persona decide.** El consultor revisa el informe y toma la decisión final. El agente nunca descarta ni contrata por su cuenta.
- Usar IA para seleccionar personal está considerado **de alto riesgo en la AI Act europea**, y Nexova trabaja desde Valencia. Por eso cada puntaje tiene que poder explicarse, reviso que los criterios no tengan sesgos y los datos de los candidatos se cuidan según el RGPD.
- El agente evalúa competencias para el trabajo, no hace diagnósticos psicológicos.

**Cómo podría crecer:** Para hacer crecer este sistema, la estrategia consiste en evolucionar el agente inicial hacia una arquitectura multi-agente especializada y escalable en tres etapas: primero, validando el prototipo con los 40 consultores de Javier Almeida para luego dividir el proceso en un equipo de sub-agentes expertos independientes (un reclutador enfocado en el filtro duro y resúmenes ejecutivos, un evaluador conversacional de competencias técnicas y situacionales, y un redactor final que genere la recomendación justificada para el hiring manager); segundo, empaquetar esta solución como un portal de postulación marca blanca para capturar la data de candidatos de los clientes de los sectores financiero, tecnológico y retail de Nexova; y tercero, comercializar esta infraestructura multi-agente vía API para integrarse en portales masivos como Getonbrd o Indeed
