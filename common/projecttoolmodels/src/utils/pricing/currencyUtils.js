import { CURRENCY } from "../../models/pricing/eCurrency";
export function utilCurrencyToSymbol(currency) {
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
//# sourceMappingURL=currencyUtils.js.map