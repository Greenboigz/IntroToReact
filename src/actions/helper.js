const MS_PER_SEC = 1000;
const SEC_PER_MIN = 60;
const MIN_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const NUMBER_OF_DAYS = 120;
const EXPERIMENT_DURATION = MS_PER_SEC * SEC_PER_MIN * MIN_PER_HOUR * HOURS_PER_DAY * NUMBER_OF_DAYS;

export function initialize_product(id, name) {
    const initial_date = new Date(Date.now() - (Math.random() * EXPERIMENT_DURATION));
    return {
        id,
        createdDate: initial_date,
        name,
        description: "This is an example of a product.",
        value: Math.random() * 20
    }
}