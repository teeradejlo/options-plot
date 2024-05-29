'use client';

import { useState, useEffect } from 'react';

import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';

import styles from "./positionCard.module.css";
import ParamBox from './paramBox';

export default function PositionCard(props) {

	const [expand, setExpand] = useState(false);

	const [enable, setEnable] = useState(false);

	const [positionParams, setPositionParams] = useState([]);

	const handleListClick = () => {
		setExpand(val => !val);
	};

	const handleRemove = () => {
		props.onRemove(props.id);

		props.onUpdate();
	};

	const handleEnableBox = () => {
		props.model.enable = !props.model.enable;

		setEnable(props.model.enable);

		props.onUpdate();
	};

	const handleInputChange = (name, type, val) => {
		if (isNaN(val) || val === "") {
			props.model[name] = "";
		}
		else if (type === "int") {
			let tmpInt = parseInt(val);

			props.model[name] = tmpInt < 0 ? "" : `${tmpInt}`;
		}
		else if (type === "float") {
			let tmpFloat = parseFloat(val);

			props.model[name] = tmpFloat < 0 ? "" : `${removeLeadingZero(val)}`;
		}

		setPositionParams(props.model.getProperties());

		props.onUpdate();
	};


	const removeLeadingZero = (str) => {
		if (str === "0" || str.match(/^0\./)) {
			return str;
		}

		if (str.replace(/^0+/, '').length === 0) {
			return "0";
		}

		return str.replace(/^0+/, '');
	};

	useEffect(() => {
		setEnable(props.model.enable);

		setPositionParams(props.model.getProperties());
	}, []);



	return (
		<main>
			<li className={styles.card} onClick={handleListClick}>
				<div className={styles.cardLeft}>
					{
						props.model.posType === 1
							? <i className="bi bi-caret-up-fill"></i>
							: <i className="bi bi-caret-down-fill"></i>
					}
					<span>
						{props.model.getDisplayName()}
					</span>
				</div>
				<div className={styles.cardRight}>
					<input className={styles.enableBox} type="checkbox" checked={enable} onClick={(e) => e.stopPropagation()} onChange={handleEnableBox} />
					<button className={styles.delButton} onClick={handleRemove}>
						<i className="bi bi-x-lg"></i>
					</button>
				</div>

			</li>
			<Collapse in={expand} timeout="auto" unmountOnExit>
				<div className={styles.cardCollapseBody}>
					{
						positionParams.map((p) => (
							<ParamBox key={p.name} model={p} onChange={handleInputChange} />
						))
					}
				</div>
			</Collapse>
		</main>
	);
}