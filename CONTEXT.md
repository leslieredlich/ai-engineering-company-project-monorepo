# Contexto de la empresa: Nexova Solutions

Este es el contexto de Nexova que uso en todo el proyecto. Cada app, agente, prompt y pipeline que construya en este repo sale de los nombres, datos y reglas que dejo acá. El briefing original completo está en [`BRIEFING.md`](./BRIEFING.md); este archivo es mi versión procesada para trabajar.

**Idioma:** todo el proyecto va en español: documentación, prompts, mensajes de los agentes y nombres de campos.

---

## 1. La empresa en una mirada

| Dato | Valor |
|---|---|
| Nombre | Nexova Solutions |
| Rubro | Consultora de RR. HH. y selección de talento |
| Fundación | 2011 |
| Sedes | Valencia, España (sede central) · Miami, Florida, EE. UU. (oficina de expansión) |
| Empleados | 120 |
| Facturación | ~8 M USD anuales |
| CEO | Laura Mendoza (desde la fundación) |
| Clientes | Medianas empresas de tecnología, retail y servicios financieros que externalizan parte o toda su gestión de talento |
| Monedas | EUR (España) · USD (EE. UU.) |
| Idiomas de operación | Español e inglés |

**Líneas de negocio:**

1. **Headhunting** de mandos medios y directivos (principal fuente de ingresos).
2. **Outsourcing de soporte al cliente** para empresas tecnológicas, retail y finanzas.
3. **Formación corporativa** en habilidades blandas y liderazgo.

**Cómo está hoy:** tiene buena reputación y una red de candidatos y clientes que armó en 12 años, pero casi todo lo hace a mano. Ya hay plataformas automatizadas que le compiten directo y no tiene mucho tiempo para reaccionar. Yo soy parte del equipo de AI Engineering, y la idea es que Nexova siga haciendo lo que ya hace bien, pero más rápido, a más escala y con menos trabajo manual.

---

## 2. Áreas, responsables y problemas

| Área | Responsable | Equipo | Problema principal (con dato) | Qué necesitan |
|---|---|---|---|---|
| **Operaciones de Selección** (núcleo) | Javier Almeida | 40 consultores | Cada consultor lee 30–80 CVs por proceso a mano; emails a candidatos uno por uno; los clientes llaman para saber el estado; matching por intuición | Scoring y ranking de CVs, RAG sobre la base de candidatos, portal de candidatos con estado en tiempo real, agente de comunicación con seguimientos automáticos |
| **Atención al Cliente** (servicio externalizado) | Roberto Díaz | 30 agentes | Resolución media de 48 h con SLA de 24 h; sin base de conocimiento (un Word en Drive); supervisores sin visibilidad del backlog | Chatbot de primera línea con RAG que resuelva el 40% de las consultas, base de conocimiento con búsqueda semántica, dashboard en tiempo real, análisis de sentimiento |
| **Formación Corporativa** | Elena Vargas | 12 personas | Catálogo en PDF trimestral; inscripciones por Google Form; asistencia en Excel; cero personalización | Catálogo con búsqueda e inscripción online, recomendador de programas, portal del alumno, chatbot de asesoría formativa |
| **Ventas y Desarrollo de Negocio** | Megan Clarke / Marcos Ibáñez (*) | 18 (6 account managers + 12 SDRs) | Prospección manual en LinkedIn + Excel; solo el 40% actualiza HubSpot; deals perdidos por falta de seguimiento | Dashboard de pipeline, secuencias de prospección automáticas, alertas de inactividad, agente que sugiere el ángulo de propuesta |
| **Marketing y Comunicación** | Carmen Ruiz | Equipo pequeño | Web de 2019 lenta y no accesible; contenido manual; no saben qué convierte | Rediseño web con SEO/GEO y schema.org, pipeline de contenido con IA, dashboard de métricas |
| **Recursos Humanos** (interno) | Patricia Solís | 4 personas | Vacaciones y consultas por email; onboarding manual; evaluaciones semestrales en Google Forms sin revisar; sin KPIs | Portal interno, onboarding con checklists, dashboard de KPIs, agente de políticas y beneficios |
| **Tecnología e Infraestructura** | Sergio Molina (CTO) | 6 personas | Herramientas desconectadas, sin telemetría ni logs; se enteran de fallos por los usuarios; despliegues manuales | Telemetría y logging centralizados, pipeline de datos para dashboards, monitorización con alertas, agente de documentación técnica |
| **Dirección Ejecutiva** | Laura Mendoza (CEO) | — | Informe semanal en PDF que cuesta 4–8 h por manager y llega con una semana de retraso | Dashboard ejecutivo en tiempo real, informe semanal automático, alertas por umbral, asistente de IA en lenguaje natural |

(*) El briefing nombra a Megan Clarke como líder de Ventas en la descripción general y a Marcos Ibáñez en la sección del departamento. Mientras no se aclare, uso a **Marcos Ibáñez** como responsable del área.

---

## 3. Sistemas actuales

| Sistema | Uso | Estado |
|---|---|---|
| ATS interno (principios de los 2010) | Seguimiento de candidatos | Hecho a medida, legacy, sin integración |
| HubSpot | CRM de ventas | Uso inconsistente (40% del equipo) |
| Zendesk (legacy) | Helpdesk de soporte | Desconectado del resto |
| Google Workspace | Email, Drive, Forms, Sheets | "Tejido conectivo" entre todo |
| Hojas de cálculo | Inscripciones, asistencia, RR. HH., reportes | Actúan como sistemas de gestión |

No tienen telemetría, logs centralizados, pipeline de datos ni una API común.

---

## 4. Entidades del dominio y nombres de campos

Estos son los nombres que uso siempre en código, esquemas, prompts y datos de prueba. Los campos van en `snake_case` y en español.

### Candidato
`candidato_id`, `nombre`, `email`, `telefono`, `pais` (`ES` | `US`), `idiomas` (lista con nivel MCER, p. ej. `ingles: C1`), `anios_experiencia`, `sector`, `cargo_actual`, `habilidades` (lista), `cv_texto`, `cv_url`, `expectativa_salarial`, `moneda` (`EUR` | `USD`), `disponibilidad`, `consentimiento_datos` (bool + fecha), `fecha_registro`

### Cliente
`cliente_id`, `nombre_empresa`, `sector` (`tecnologia` | `retail` | `servicios_financieros` | `otro`), `pais`, `servicios_contratados` (`headhunting` | `soporte` | `formacion`), `account_manager`, `fecha_inicio`

### Vacante
`vacante_id`, `cliente_id`, `titulo_cargo`, `nivel` (`mando_medio` | `directivo`), `funciones`, `requisitos_obligatorios` (lista), `requisitos_deseables` (lista), `competencias` (lista), `idiomas_requeridos`, `rango_salarial_min`, `rango_salarial_max`, `moneda`, `ubicacion`, `modalidad` (`presencial` | `hibrido` | `remoto`), `consultor_id`, `estado` (`abierta` | `en_proceso` | `cerrada` | `cancelada`), `fecha_apertura`

### Postulación (candidato dentro de un proceso)
`postulacion_id`, `vacante_id`, `candidato_id`, `etapa`, `puntaje` (0–100), `explicacion_puntaje`, `requisitos_cumplidos`, `requisitos_no_cumplidos`, `alertas`, `fecha_ultima_actualizacion`, `decision_consultor` (`avanza` | `descartado` | `pendiente`), `motivo_decision`

**Etapas de la postulación** (en orden):
`recibida` → `en_revision` → `preseleccionada` → `entrevista_consultor` → `entrevista_cliente` → `oferta` → `contratada` | `descartada`

### Consultor
`consultor_id`, `nombre`, `pais`, `especialidad_sectores`, `vacantes_activas`

### Ticket (soporte externalizado)
`ticket_id`, `cliente_id`, `canal` (`telefono` | `email` | `chat`), `asunto`, `descripcion`, `prioridad`, `estado` (`abierto` | `en_curso` | `resuelto` | `escalado`), `agente_id`, `sentimiento` (`positivo` | `neutro` | `negativo`), `fecha_creacion`, `fecha_resolucion`, `horas_resolucion`, `sla_horas` (24), `sla_cumplido` (bool)

### Programa de formación e inscripción
- Programa: `programa_id`, `titulo`, `tema` (`liderazgo` | `comunicacion` | `gestion_equipos` | `otro`), `formato` (`curso` | `taller` | `webinar`), `duracion_horas`, `idioma`
- Inscripción: `inscripcion_id`, `programa_id`, `cliente_id`, `alumno_nombre`, `alumno_email`, `estado` (`inscrito` | `en_curso` | `completado` | `abandonado`), `progreso_pct`

### Oportunidad comercial
`oportunidad_id`, `empresa`, `contacto`, `etapa` (`prospecto` | `primer_contacto` | `seguimiento` | `propuesta` | `cierre_ganado` | `cierre_perdido`), `responsable_id`, `fecha_ultima_actividad`, `dias_sin_actividad`

---

## 5. Indicadores de partida (línea base)

| Indicador | Valor actual | Meta del briefing |
|---|---|---|
| CVs leídos a mano por proceso | 30–80 por consultor | Ranking automático |
| Tiempo medio de resolución de soporte | 48 h | ≤ 24 h (SLA) |
| Consultas de soporte resueltas sin humano | 0% | 40% |
| Uso del CRM por el equipo de ventas | 40% | — |
| Tiempo de preparación del informe semanal | 4–8 h por manager | Automático |
| Antigüedad de los datos de dirección | ~1 semana | Tiempo real |

---

## 6. Reglas que me pongo en el proyecto

- **La IA recomienda y la persona decide.** Ningún agente descarta, contrata ni rechaza a un candidato sin que un consultor lo apruebe.
- **AI Act (UE):** usar IA para seleccionar personal es de **alto riesgo**. Por eso cada puntaje tiene que poder explicarse, dejo documentados los criterios, reviso que no haya sesgos y siempre hay una persona supervisando.
- **RGPD y protección de datos:** los datos de los candidatos son personales. Necesito su consentimiento, usarlos solo para el proceso, pedir lo mínimo y permitir que los vean o los borren. En desarrollo trabajo solo con datos ficticios, nunca reales.
- **Lo que nunca entra al puntaje:** edad, género, origen, estado civil, foto, discapacidad ni ningún otro dato sensible.
- **Competencias, no psicología:** los agentes miden si la persona sirve para el cargo; no hacen diagnósticos.
- **Dos mercados:** España (EUR, ley laboral española) y EE. UU. (USD, ley de Florida). Todo dato con plata lleva su `moneda`.
- **Bilingüe:** Nexova opera en español e inglés. Yo documento en español, pero los agentes le responden al candidato en el idioma en que escribe.
- **SLA de soporte:** 24 horas.

---

## 7. En qué me voy a enfocar

**Área principal:** Operaciones de Selección. **Área secundaria:** Atención al Cliente.

**Reto que elegí:** un pipeline de selección con IA que puntúe y ordene los CVs automáticamente, conectado a un agente que se comunica con los candidatos.

**Mi agente principal: preselección conversacional**
- **Lo que recibe:** la vacante (perfil del cargo), el CV y las respuestas del candidato, la base histórica de candidatos, y las plantillas y criterios del equipo de selección.
- **Lo que hace:** puntúa el CV contra los requisitos, conversa con el candidato con preguntas de filtro y de competencias, y va moviendo la postulación de etapa.
- **Lo que entrega:** el ranking con puntajes explicados, un informe por candidato (fortalezas, alertas y preguntas para la entrevista), el estado visible para el cliente, avisos al consultor y emails de seguimiento.
- **Más adelante:** dividirlo en agentes con roles distintos: un reclutador, un evaluador de competencias y uno que prepare la recomendación para el hiring manager del cliente.

Detalle de la elección en [`company-choice.md`](./company-choice.md).

---

## 8. Glosario

| Término | Significado en este proyecto |
|---|---|
| ATS | Sistema de seguimiento de candidatos (el interno de Nexova) |
| Filtro de CVs | Primera revisión de CVs para descartar o preseleccionar |
| Matching | Encaje entre un candidato y una vacante |
| Scoring | Puntaje 0–100 de un candidato frente a una vacante, siempre con explicación |
| RAG | Búsqueda en documentos o bases propias para que la IA responda con datos reales |
| SDR | Representante de ventas que prospecta clientes nuevos |
| Account manager | Responsable de cuidar a un cliente actual |
| SLA | Tiempo máximo comprometido de respuesta o resolución |
| Hiring manager | Persona del cliente que toma la decisión final de contratación |
| MCER | Marco europeo de niveles de idioma (A1–C2) |
