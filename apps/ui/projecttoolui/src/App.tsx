import { useState } from "react";
import "./App.css";

import { IProjectBase } from "@frosttroll/projecttoolmodels";

function App() {
	const [count, setCount] = useState(0);

	const prj: IProjectBase = {
		guid: "1234",
		name: "My Project",
		organizationId: "org1",
	};

	console.log(prj);

	return (
		<>
			<h1>Project Tool</h1>
		</>
	);
}

export default App;
