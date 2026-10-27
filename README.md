# Taller de Spec-Driven Development (SDD)

## Curso-PSWE-07 application

Requires Node.js 22 or newer. No dependencies to install.

```sh
npm start
```

Open http://localhost:3000. On Windows PowerShell, use `npm.cmd start` if script execution policy blocks `npm`.

Tasks are stored in this browser's localStorage and persist after closing and reopening the app at the same address. Clearing browser site data removes tasks; private browsing may not retain them.

```sh
npm test
npm run lint
```

The implementation plan and Constitution Check are in `specs/001-todo/plan.md`. UI, application logic, and persistence are in separate modules under `src/`. The checks cover each user story at the task-service boundary, title validation, and persistence failures. Lint checks JavaScript syntax using Node's built-in checker.

## Objetivo

Analizar y mejorar una especificación de requisitos elaborada con asistencia de inteligencia artificial.

El objetivo no es aceptar automáticamente lo que propone la IA, sino evaluar la calidad de los requisitos, identificar ambigüedades y justificar las decisiones de mejora.

## Caso de estudio

Una aplicación simple que gestiona tareas personales.

La especificación inicial se encuentra en `requirements/spec-inicial.md`.

## Actividades

1. Leer la especificación completa.
2. Identificar al menos tres ambigüedades, supuestos o decisiones pendientes.
3. Proponer mejoras a los criterios de aceptación.
4. Utilizar IA para explorar alternativas y evaluar críticamente sus propuestas.
5. Documentar las decisiones finales y justificarlas.

## Entregables

- Una especificación revisada.
- Al menos tres decisiones de mejora justificadas.
- Una reflexión breve sobre las limitaciones de utilizar IA para definir requisitos.

## Principio de trabajo

Cada cambio debe responder a una necesidad identificada y contar con una justificación.

No es necesario implementar la aplicación en este taller.

## Estructura del repositorio

- `requirements/`: especificación inicial.
- `activities/`: guía de trabajo.
- `deliverables/`: resultados de los estudiantes.

Current feature artifacts: [specification](specs/002-todo-list/spec.md), [plan](specs/002-todo-list/plan.md), [task progress](specs/002-todo-list/tasks.md), and [validation guide/evidence](specs/002-todo-list/quickstart.md).

The latest checks include architecture, malformed-storage validation, all failed service writes, and isolated UI event-handler scenarios. Browser layout, real browser reopening, and participant usability validation remain pending; see the guide for exact scenarios. UI receives the task service from src/main.js and does not access storage directly.
