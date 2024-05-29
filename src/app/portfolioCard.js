'use client';

import { useEffect, useState } from 'react';

import Collapse from '@mui/material/Collapse';

import styles from "./portfolioCard.module.css";

import AddItemMenu from "./addItemMenu";
import PositionCard from './positionCard';

export default function PortfolioCard(props) {

	const [expand, setExpand] = useState(false);
	const [positions, setPositions] = useState([]);
	const [posCount, setPosCount] = useState(0);


	const handleListClick = () => {
		setExpand(val => !val);
	};

	const handleRemove = () => {
		props.onRemove(props.id);
	};

	const addPosition = (positionObj) => {
		setPositions([
			...positions,
			{
				id: posCount,
				model: positionObj
			}
		]);

		setPosCount(val => val + 1);
	};

	const removePosition = (id) => {
		setPositions(
			positions.filter((el) => el.id != id)
		);
	};

	const updatePortfolio = () => {
		let tmp = positions.reduce((acc, curr) => acc + curr.model.toExpr() + "+", "").replace(/\++$/, '');

		props.onUpdate(props.id, "y=" + tmp);
	};

	useEffect(() => {
		updatePortfolio();
	}, [positions]);

	return (
		<main className={styles.main}>
			<li className={styles.card} onClick={handleListClick}>
				<div className={styles.cardLeft}>
					<div className={styles.colorCircle} style={{
						backgroundColor: props.color
					}}></div>
					<span>
						Portfolio {props.id}
					</span>
				</div>
				<button className={styles.delButton} onClick={handleRemove}>
					<i className="bi bi-x-lg"></i>
				</button>
			</li>
			<Collapse in={expand} timeout="auto" unmountOnExit>
				<div className={styles.cardCollapseBody}>
					{
						positions.map((pos) => (
							<PositionCard key={pos.id} id={pos.id} model={pos.model} onRemove={removePosition} onUpdate={updatePortfolio} />
						))
					}
				</div>
				<footer className={styles.cardCollapseFooter}>
					<AddItemMenu onAdd={addPosition} />
				</footer>
			</Collapse>
		</main>
	);
}