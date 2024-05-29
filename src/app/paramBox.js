'use client';

import { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';

import styles from "./paramBox.module.css";

export default function ParamBox(props) {

	const modelRef = useRef();
	const sliderRef = useRef();
	const [sliderValue, setSliderValue] = useState(0);
	const [sliderInterval, setSliderInterval] = useState(null);

	modelRef.current = props.model;
	sliderRef.current = sliderValue;

	const toDisplayName = (name) => {
		// Step 1: Insert space before each uppercase letter
		let result = name.replace(/([A-Z])/g, ' $1');
		// Step 2: Capitalize the first letter and lowercase the rest
		result = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
		// Step 3: Convert the remaining characters after spaces to lowercase
		result = result.replace(/(\s[a-z])/g, match => match.toUpperCase());
		return result;
	};

	const roundTwoDecimal = (val) => {
		return Math.round(val * 100) / 100;
	};

	const changeModelValue = () => {
		if (isNaN(modelRef.current.val) || modelRef.current.val === "") {
			return;
		}

		if (props.model.type === "int") {
			let tmpVal = parseInt(modelRef.current.val) + Math.sign(parseFloat(sliderRef.current));

			if (tmpVal < 0) {
				tmpVal = 0;
			}

			props.onChange(props.model.name, props.model.type, (tmpVal).toString());
		}
		else if (props.model.type === "float") {
			let tmpVal = roundTwoDecimal(parseFloat(modelRef.current.val) + (1.5 * parseFloat(sliderRef.current)) * (1.5 * parseFloat(sliderRef.current)) * (1.5 * parseFloat(sliderRef.current)));

			if (tmpVal < 0) {
				tmpVal = 0;
			}

			props.onChange(props.model.name, props.model.type, (tmpVal).toString());
		}
	};

	const handleSliderInput = (e) => {
		setSliderValue(e.target.value);
	};

	const handleSliderMouseDown = () => {
		setSliderInterval(
			setInterval(changeModelValue, 100)
		);
	};

	const handleSliderMouseUp = () => {
		setSliderValue(0);

		clearInterval(sliderInterval);
		setSliderInterval(null);
	};

	return (
		<div className={styles.paramBox}>
			<TextField
				key={props.model.name}
				label={toDisplayName(props.model.name)}
				size="small"
				value={props.model.val}
				sx={{
					m: 1,
					width: "70%"
				}}
				InputLabelProps={{
					shrink: true,
				}}
				error={isNaN(props.model.val) || props.model.val === ""}
				onChange={(e) => props.onChange(props.model.name, props.model.type, e.target.value)}
			/>
			<input className={styles.slider} type="range" min="-1" max="1" step="0.1" value={sliderValue}
				onInput={handleSliderInput}
				onMouseDown={handleSliderMouseDown}
				onMouseUp={handleSliderMouseUp} />
		</div>
	);
}