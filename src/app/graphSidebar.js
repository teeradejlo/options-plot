'use client';

import { useEffect, useState, useRef } from "react";

import styles from "./graphSidebar.module.css";

import PortfolioCard from "./portfolioCard";

export default function GraphSidebar(props) {

	const [portCount, setPortCount] = useState(0);
	const [colorsIdx, setColorsIdx] = useState(0);
	const colors = [
		"#ff0000",
		"#27a100",
		"#0000ff"
	];

	const addButtonEl = useRef(null);

	const [portfolios, setPortfolios] = useState([]);
	const [open, setOpen] = useState(true);

	const toggleSidebar = () => {
		setOpen(val => !val);
	};

	const addPortfolio = () => {
		setPortfolios([
			...portfolios,
			{
				id: portCount,
				color: colors[colorsIdx],
			}
		]);

		props.onAdd(portCount, colors[colorsIdx]);

		setPortCount(val => val + 1);
		setColorsIdx(val => (val + 1) % colors.length);
	};

	const removePortfolio = (id) => {
		setPortfolios(
			portfolios.filter((el) => el.id != id)
		);

		props.onRemove(id);
	};

	const updatePortfolio = (id, expr) => {
		props.onUpdate(id, expr);
	};

	useEffect(() => {
		addButtonEl.current.scrollIntoView();
	}, [portfolios]);

	return (
		<main className={`${styles.main} ${open ? styles.open : styles.close}`}>
			<button className={`${styles.button} ${styles.openButton}`} onClick={toggleSidebar}>
				{
					open ? <i className="bi bi-caret-left-fill"></i> : <i className="bi bi-caret-right-fill"></i>
				}
			</button>

			<header className={styles.header}>
				Portfolios
			</header>

			<div className={styles.cardContainer}>
				{
					portfolios.map(p => (
						<PortfolioCard key={p.id} id={p.id} color={p.color} onRemove={removePortfolio} onUpdate={updatePortfolio} />
					))
				}

				<div className={styles.cardContainer__addButton} ref={addButtonEl}>
					<button className={styles.button} onClick={addPortfolio}>
						<i className="bi bi-plus-lg"></i>
					</button>
				</div>
			</div>
		</main>
	);
}