'use client';

import { useEffect, useRef, useState } from "react";

import styles from "./graph.module.css";

import GrapherSidebar from "./graphSidebar";

export default function Graph() {

	const graphEl = useRef(null);

	const [loadComplete, setLoadComplete] = useState(false);

	const [calculator, setCalculator] = useState(null);

	useEffect(() => {
		async function loadDesmosGraph() {
			const Desmos = (await import('desmos')).default;

			const calculatorOptions = {
				"keypad": false,
				"expressions": false,
				"zoomButtons": false
			};

			setCalculator(Desmos.GraphingCalculator(graphEl.current, calculatorOptions));

			setLoadComplete(true);
		};
		loadDesmosGraph();
	}, []);

	const addGraph = (id, color) => {
		if (calculator === null) {
			return;
		}

		calculator.setExpression({ id: id, color: color, latex: "" });
	}

	const removeGraph = (id) => {
		if (calculator === null) {
			return;
		}

		calculator.removeExpression({ id: id });
	}

	const updateGraph = (id, expr) => {
		if (calculator === null) {
			return;
		}

		calculator.setExpression({ id: id, latex: expr });
	};

	return (
		<main className={styles.main}>
			<div className={styles.graph} ref={graphEl}></div>

			{loadComplete ? <GrapherSidebar onAdd={addGraph} onRemove={removeGraph} onUpdate={updateGraph} /> : <></>}
		</main>
	);
}
