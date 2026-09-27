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
  - `Ctrl + Q` / `⌘ + Q` to auto-format

- 📊 **Query Results**
  - Display query results in a structured table and chart
  - Handle empty result sets
  - Loading and error states

- 🔒 **Error Handling**
  - Query execution errors
  - Invalid SQL feedback

---

## 🖥️ Preview

<img width="1917" height="897" alt="preview" src="https://github.com/user-attachments/assets/6a4e0af3-9fe6-4f0c-8115-dd1a3b20d984" />

---

## 🛠️ Tech Stack

| Layer | Component | Description |
| :--- | :--- | :--- |
| **Frontend Foundation** | React 18 + TypeScript | Component isolation pipelines and strict compiler type systems. |
| **Build Tooling** | Vite | Rapid hot-module replacement (HMR) and ultra-lean production asset bundles. |
| **Editor Shell** | CodeMirror 6 | Modular syntax tree parsing, programmatic state filtering. |
| **Execution Core** | DuckDB-WASM | Columnar relational execution layout running within browser WebWorkers. |
| **Linting & Quality** | Biome | Unified high-speed code syntax validation and formatting rules. |


### SQL Engine

- **DuckDB-WASM**

DuckDB-WASM brings DuckDB's analytical SQL engine into the browser through WebAssembly, allowing SQL queries to execute client-side without requiring a traditional database server.


## How It Works

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




               [ Raw Data Ingestion (.csv File Drop) ]
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │   React Interface     │
                     └───────────┬───────────┘
                                 │
                     ┌───────────▼───────────┐
                     │ Custom CodeMirror IDE │ ◄── [ Ctrl + Q ] Format Pipeline
                     └───────────┬───────────┘
                                 │
                     [ Clean SQL Query Vector ]
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │   DuckDB-WASM Core    │ ◄── [ Client-Side Execution ]
                     │ (Columnar Core Engine)│
                     └───────────┬───────────┘
                                 │
                     [ Structured Row Arrays ]
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │   Data Tables         │
                     │   & Analytical Charts │
                     └───────────────────────┘
```

## 🚀 Quickstart Local Installation

### Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your machine (v18+ recommended).

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com](https://github.com/Advi729/sql-analytica.git)
   cd sql-analytica
   ```

2. **Install Codebase Dependencies:**
   ```bash
   npm install
   ```

3. **Launch the Local Development Workspace:**
   ```bash
   npm run dev
   ```
   Open the generated local address (typically `http://localhost:5173`) inside your browser window to interact with the environment.

---

## 📄 License

Distributed under the MIT License. View the accompanying `LICENSE` file layout context for structural authorization parameters.

