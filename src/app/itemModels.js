const isValidProperty = (val) => {
	return !(isNaN(val) || val === "");
};

class Asset {
	constructor(posType, price, quantity) {
		this.posType = posType;
		this.price = price;
		this.quantity = quantity;
		this.enable = true;
	}

	getDisplayName() {
		return "Asset";
	}

	getProperties() {
		return [
			{
				name: "price",
				type: "float",
				val: this.price
			},
			{
				name: "quantity",
				type: "int",
				val: this.quantity
			}
		];
	}

	toExpr() {
		if (!this.enable) {
			return "";
		}

		if (!isValidProperty(this.price) || !isValidProperty(this.quantity)) {
			return "";
		}

		return `${this.posType}*${parseInt(this.quantity)}*(x-${parseFloat(this.price)})`;
	}
}

class Option {
	constructor(posType, optionType, strikePrice, premiumPrice, numAsset, quantity) {
		this.posType = posType;
		this.optionType = optionType;
		this.strikePrice = strikePrice;
		this.premiumPrice = premiumPrice;
		this.numAssetPerContract = numAsset;
		this.quantity = quantity;
		this.enable = true;
	}

	getDisplayName() {
		return this.optionType === 1 ? "Call Option" : "Put Option";
	}

	getProperties() {
		return [
			{
				name: "strikePrice",
				type: "float",
				val: this.strikePrice
			},
			{
				name: "premiumPrice",
				type: "float",
				val: this.premiumPrice
			},
			{
				name: "numAssetPerContract",
				type: "float",
				val: this.numAssetPerContract
			},
			{
				name: "quantity",
				type: "int",
				val: this.quantity
			}
		];
	}

	toExpr() {
		if (!this.enable) {
			return "";
		}

		if (!isValidProperty(this.strikePrice) || !isValidProperty(this.premiumPrice) || !isValidProperty(this.numAssetPerContract) || !isValidProperty(this.quantity)) {
			return "";
		}

		const strP = parseFloat(this.strikePrice);
		const premP = parseFloat(this.premiumPrice);
		const numAsset = parseFloat(this.numAssetPerContract);
		const quan = parseInt(this.quantity);


		return `\\{${this.optionType}*x\\le${this.optionType}*${strP}: -1*${this.posType}*${quan}*${numAsset}*${premP},${this.posType}*${this.optionType}*${quan}*${numAsset}*((x-${strP})-${this.optionType}*${premP})\\}`;
	}
}

export { Asset, Option };