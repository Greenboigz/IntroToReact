export const MS_PER_SEC = 1000;
export const SEC_PER_MIN = 60;
export const MIN_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;
export const NUMBER_OF_DAYS = 120;
export const EXPERIMENT_DURATION = MS_PER_SEC * SEC_PER_MIN * MIN_PER_HOUR * HOURS_PER_DAY * NUMBER_OF_DAYS;
export const EXPERIMENT_START_DATE = Date.now() - EXPERIMENT_DURATION;

var transaction_id = 0;

export function initialize_product(id, name) {
    const initial_date = new Date(EXPERIMENT_START_DATE + (Math.random() * EXPERIMENT_DURATION));
    return {
        id,
        createdDate: initial_date,
        name,
        description: "This is an example of a product.",
        value: Math.random() * 20
    }
}

export function initialize_purchase(product, purchaseDate) {
    return {
        id: transaction_id++,
        productId: product.id,
        quantity: Math.ceil(Math.random() * 20),
        purchaseDate
    }
}