# SQL ANALYTICA

A browser-based SQL analytics application built with React, TypeScript, and DuckDB-WASM.

The application allows users to load and analyze data directly in the browser using SQL queries. It combines a professional SQL IDE-style editor with DuckDB-WASM to provide fast, client-side analytical querying without requiring a traditional backend database.

The application provides a clean SQL editor with syntax highlighting, query execution, result visualization, and an analytics-focused dashboard experience.

---

## ✨ Features

- 🛢️ **Database**
  - DuckDB - WASM
  - column-oriented RDBMS
  - Analyze data locally in the browser

- 🧑‍💻 **SQL IDE-style Editor**
  - CodeMirror 6-powered editor
  - SQL syntax highlighting

- ⚡ **Query Execution**
  - Execute SQL queries directly from the editor
  - Run queries using the `Run` button
  - Keyboard shortcut support
  - `Ctrl + Enter` / `⌘ + Enter` to execute

- 📊 **Query Results**
  - Display query results in a structured table and chart
  - Handle empty result sets
  - Loading and error states

- 🔒 **Error Handling**
  - Query execution errors
  - Invalid SQL feedback

---

## 🖥️ Preview

> Add screenshots or a GIF of your application here.

![SQL Analytics Preview](./screenshots/preview.png)

---

## 🛠️ Tech Stack

### Frontend

- **React**
- **TypeScript**
- **Vite**
- **CodeMirror 6**
- **HTML**
- **CSS**

### SQL Engine

- **DuckDB-WASM**

DuckDB-WASM brings DuckDB's analytical SQL engine into the browser through WebAssembly, allowing SQL queries to execute client-side without requiring a traditional database server.

### Development

- Biome
- Git
- GitHub

## 🏗️ How It Works

The application uses DuckDB-WASM as the SQL execution engine.

Instead of sending every query to a backend database server, the application initializes DuckDB inside the browser and executes analytical queries locally.

```text
                    Browser
                       │
                       ▼
              ┌─────────────────┐
              │   React App     │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │  SQL Editor     │
              │   CodeMirror    │
              └────────┬────────┘
                       │
                    SQL Query
                       │
                       ▼
              ┌─────────────────┐
              │   DuckDB-WASM   │
              │                 │
              │ DuckDB compiled │
              │  to WebAssembly │
              └────────┬────────┘
                       │
                  Query Result
                       │
                       ▼
              ┌─────────────────┐
              │ Results Table   │
              | or Chart        |
              └─────────────────┘
---


