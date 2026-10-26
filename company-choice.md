# Elección de empresa

**Empresa elegida: Nexova Solutions**

## Por qué elegí Nexova

Elegí Nexova porque es la única de las cuatro empresas donde la IA no es una herramienta de apoyo, sino el producto mismo: el briefing lo dice directo, el scoring de CVs, el matching de candidatos y los agentes de soporte son "entregables centrales, no mejoras opcionales". Me llamó la atención que su negocio principal, Operaciones de Selección, dependa de 40 consultores que leen a mano entre 30 y 80 CVs por proceso, escriben cada email a candidatos de forma individual y reciben llamadas de clientes que solo quieren saber en qué va su proceso. A eso se suma un ATS construido a medida a principios de los 2010 que no conversa con HubSpot ni con Zendesk, así que la información del candidato queda repartida entre herramientas. Laura Mendoza ya ve que plataformas automatizadas empiezan a competirle directamente, y la ventana para responder no es ilimitada: eso le da urgencia real al proyecto. Además, yo desarrollo un SaaS para talleres mecánicos en Chile, donde encontrar buenos mecánicos es uno de los dolores más grandes de los dueños, así que lo que aprenda construyendo para Nexova lo puedo llevar después a un nicho que conozco.

## Departamentos que me resultan más interesantes

### 1. Operaciones de Selección (Javier Almeida, 40 consultores)

Es el corazón del negocio y su principal fuente de ingresos, y hoy todo es manual: cribado de CVs, comunicación con candidatos y matching basado solo en la intuición del consultor. Me interesa porque cada hora que la IA le ahorra a un consultor se traduce directo en más procesos cerrados para Nexova, y porque el cliente no tiene ninguna visibilidad del estado de su proceso.

### 2. Atención al Cliente externalizado (Roberto Díaz, 30 agentes)

El tiempo medio de resolución es de 48 horas cuando el SLA comprometido es de 24, y los agentes resuelven con su experiencia y un documento Word compartido en Drive porque no existe una base de conocimiento. Me interesa porque el problema está medido (incumplen el SLA por el doble) y el objetivo también: un chatbot con RAG que resuelva el 40% de las consultas sin intervención humana. Es un caso claro para comparar el antes y el después.

## Reto de automatización/IA que más quiero construir

**Pipeline de selección asistido por IA con scoring y ranking automático de CVs**, conectado con el **agente de comunicación que envía los seguimientos a candidatos**. Es el reto del área de Operaciones de Selección y ataca a la vez los tres problemas del briefing: la lectura manual de CVs, los emails uno por uno y los clientes que llaman a preguntar el estado de su proceso.

## Mi idea de Agente de IA (My AI Agent Idea)

**Agente de preselección conversacional para Nexova**

**Qué haría:**

- Recibe la postulación (CV + datos del candidato) a una vacante abierta.
- Lee el CV y lo compara contra el perfil del cargo que definió el cliente, generando un puntaje con explicación ("cumple 4 de 5 requisitos; no acredita inglés C1").
- Conversa con el candidato por email o chat con preguntas de filtro adaptadas al cargo (disponibilidad, expectativa salarial, experiencia concreta en lo que pide el cliente) y una breve evaluación de competencias con preguntas situacionales.
- Mantiene informado al candidato en cada etapa con mensajes automáticos (recibido, en revisión, pasa a entrevista, cerrado), para que nadie quede sin respuesta.
- Al cerrar la etapa, entrega al consultor un informe por candidato y un ranking del proceso.

**Qué información necesita:**

- El perfil del cargo y los requisitos del cliente (briefing de la vacante: funciones, requisitos obligatorios y deseables, competencias, rango salarial, idioma).
- El CV y las respuestas del candidato durante la conversación.
- La base histórica de candidatos del ATS de Nexova, para sugerir perfiles que ya postularon antes y encajan (búsqueda semántica tipo "experiencia en ventas B2B e inglés C1").
- Plantillas de comunicación y criterios de evaluación definidos por el equipo de Javier Almeida.

**Qué produciría o activaría:**

- Un ranking de candidatos con puntaje explicado, no una caja negra.
- Un informe por candidato: resumen de experiencia, fortalezas, alertas y preguntas sugeridas para la entrevista humana.
- La actualización del estado del candidato, para que el cliente pueda verlo sin llamar al consultor.
- Una alerta al consultor cuando aparece un candidato top, y los emails de seguimiento enviados automáticamente.

**Límites que respeto en el diseño:**

- **La IA recomienda, la persona decide.** El consultor revisa el informe y toma la decisión final; el agente nunca descarta ni contrata solo.
- La selección de personal con IA es un uso de **alto riesgo según la AI Act europea** (Nexova opera desde Valencia), así que cada puntaje debe poder explicarse, se revisa el sesgo de los criterios y los datos del candidato se tratan bajo RGPD.
- La evaluación es de competencias laborales, no un diagnóstico psicológico.

**Cómo podría crecer:** en una segunda fase, el proceso se dividiría en varios agentes especializados (reclutador que filtra, evaluador de competencias, y un agente que prepara la recomendación final para el hiring manager del cliente), cada uno con su propio informe.
