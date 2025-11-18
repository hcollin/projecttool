import { CURRENCY } from "../../models/pricing/eCurrency";

export function utilCurrencyToSymbol(currency: CURRENCY): string {
    switch (currency) {
        case CURRENCY.EUR:
            return "€";
        case CURRENCY.USD:
            return "$";
        case CURRENCY.GBP:
            return "£";
        case CURRENCY.JPY:
            return "¥";
        case CURRENCY.CNY:
            return "¥";
        default:
            return currency;
    }
}
