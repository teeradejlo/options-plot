'use client';

import styles from "./addItemMenu.module.css";

import { Asset, Option } from "./itemModels";

export default function AddItemMenu(props) {

	const posTypes = ["long", "short"];
	const posItems = ["asset", "call_option", "put_option"];

	const toDisplayName = (name) => {
		return name.split('_')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const addItem = (type, item) => {
		let typeMult = 0;
		switch (type) {
			case "long":
				typeMult = 1;
				break;
			case "short":
				typeMult = -1;
				break;
			default:
				return;
		}

		switch (item) {
			case "asset":
				props.onAdd(new Asset(typeMult, 0, 100));
				break;
			case "call_option":
				props.onAdd(new Option(typeMult, 1, 0, 0, 100, 1));
				break;
			case "put_option":
				props.onAdd(new Option(typeMult, -1, 0, 0, 100, 1));
				break;
			default:
				return;
		}
	};

	return (
		<main className={styles.main}>
			<span>+ Positions</span>

			<ul className={styles.menu}>
				{
					posTypes.map((type) => (
						<li key={type} className={styles.menuItem}>
							<span>{toDisplayName(type)}</span>

							<ul className={styles.menu}>
								{
									posItems.map((item) => (
										<li key={type + "/" + item} className={styles.menuItem} onClick={() => addItem(type, item)}>
											<span>{toDisplayName(item)}</span>
										</li>
									))
								}
							</ul>
						</li>
					))
				}
			</ul>
		</main>

	);
}