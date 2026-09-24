import { useState } from "react";
import { ChartView } from "./components/ChartView";
import { DataTable } from "./components/DataTable";
import { Dropzone } from "./components/Dropzone";
import { QueryEditor } from "./components/QueryEditor";
import { TableList } from "./components/TableList";

function App() {
	const [sql, setSql] = useState<string>("");
	const [activeView, setActiveView] = useState<"table" | "chart">("table");

	return (
		<div className="layout">
			<header className="header">
				<div className="header-brand">
					<span className="header-logo">◆</span>
					<span className="header-title">SQL Analytica</span>
				</div>
				<span className="header-tagline">
					SQL analytics in browser - powered by DuckDB-WASM
				</span>
			</header>

			<main className="content">
				<Dropzone onFile={(files) => console.log(files)} />

				<TableList
					tables={[]}
					onSelect={(name) => setSql(`SELECT *\nFROM "${name}"\nLIMIT 10`)}
				/>

				<QueryEditor
					sql={sql}
					onChange={setSql}
					onRun={() => console.log("Run query")}
					isRunning={false}
					disabled={false}
				/>

				<section className="results">
					<div className="results-header">
						<span className="results-meta">{/* Display query metadata */}</span>
						<div className="results-tab">
							<button
								type="button"
								className={`tab${activeView === "table" ? " tab--active" : ""}`}
								onClick={() => setActiveView("table")}
							>
								Table
							</button>

							<button
								type="button"
								className={`tab${activeView === "chart" ? " tab--active" : ""}`}
								onClick={() => setActiveView("chart")}
							>
								Chart
							</button>
						</div>
					</div>
					{activeView === "table" ? (
						<DataTable rows={[]} columns={[]} />
					) : (
						<ChartView rows={[]} columns={[]} />
					)}
				</section>
			</main>
		</div>
	);
}

export default App;
