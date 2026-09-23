import { DataTable } from "./components/DataTable";
import { Dropzone } from "./components/Dropzone";
import { QueryEditor } from "./components/QueryEditor";
import { TableList } from "./components/TableList";

function App() {

	return (
    <div className="layout">
      <header className="header">
        <div className="header-brand">
          <span className="header-logo">◆</span>
          <span className="header-title">SQL Analytica</span>
        </div>
        <span className="header-tagline">SQL analytics in browser - powered by DuckDB-WASM</span>
        
      </header>

      <main className="content">
        <Dropzone onFile = {(files) => console.log(files)}/>

			 	<TableList tables={[]}/>

				<QueryEditor 
				sql= ""
  			onChange = {(sql) => console.log(sql)}
  			onRun= {() => console.log("Run query")}
  			isRunning= {false}
  			disabled= {false}
				/>
      
			 	<DataTable rows={[]} columns={[]}/>
      </main>
    </div>
  );

}

export default App;
