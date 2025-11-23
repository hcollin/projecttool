import { CURRENCY } from "./eCurrency";


export interface IFixedPrice {
    name: string;
    price: number;
    currency: CURRENCY;
    repetition?: "none" | "monthly" | "yearly";
}