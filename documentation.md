# Wake Todo Frontend Architecture

This file provides a brief documentation on how and why so is the app built.

## Table of Contents

- [Architecture](#architecture)
- [Decisions](#decisions)

## Architecture & State Management

The application architectured is service-oriented, focusing on isolated, independent and reusable modules coming together to deliver the business requirements.

- There are 3 main visual areas. Header (containing counts and add task control), main (containing todolist) and footer (containing app preferences).
- The application uses a hybrid of state and store. Since there is only one heavy-lifting widget right now (the TodosList), it stores the list locally in its state after fetching from the backend
- The breakdown of counts to be shown in header is an information that needs to be shared between the TodoList and Header. For this, store is used
- Dumb shareable unit components (Button, Tooltip, Modal) are defined for reusability and isolation
- Todo (dumb/presentational) component represents a todo item
- Container components use presentational(dumb) components to build flows. TodoList is a smart component that fetches tasks list, and renders them using dumb Todo component
- TaskModal is responsible for adding and editing tasks
- Once a task has been added, the TodosList needs to be informed by TaskModal. For this, the components share action's latest timestamp via store. TodoList listens to "updatedAt" to know if it needs to refetch the list due to changes in state at the backend
- The Backend communication works through ServerAPI service, which is a wrapped exposing HTTP methods. Under the hood, it uses axios to fire requests. Should the application scale with more flows and API calls, the error handling can be baked into this service so that is reused
- TasksServie exists as a service that isolates all CRUD operations related to Todo Tasks and exposes feature-specific methods like addTask, updateTask

## Decisions

- The decision for service-oriented architecture is inspired by the scalability, maintainability and the simplicity of this approach. It creates isolated, easily testable blocks of shared logic. The amount of code that needs to be written for the core remains fixed even as the application features grow. Operations like error-handling, logging and telemetry can also be baked-in as one-time effort on a single-source of operations.
- Zustand for state management as it is a low-boilerplate, easy to scale state management solution
- Timestamp based communication as it simplifies the inter-app communication and delivers a little-to-none overhead
