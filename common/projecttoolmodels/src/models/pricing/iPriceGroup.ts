import { IRootObject } from "../IRootObject";

export interface IPriceGroup extends IRootObject {
	name: string;
	price: number;
	currency: "EUR" | "USD" | "GBP" | "JPY" | "CNY";
}
