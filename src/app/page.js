import "bootstrap-icons/font/bootstrap-icons.css";

import styles from "./page.module.css";

import Graph from './graph.js';

export default function Home() {

	return (
		<main className={styles.main}>
			<Graph />
		</main>
	);
}
