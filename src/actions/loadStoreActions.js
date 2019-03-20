import * as fs from 'fs-web';
import { initialize_product } from './helper';

const FRUITS = [
    "apple",
    "apricot",
    "avocado",
    "banana",
    "bell pepper",
    "bilberry",
    "blackberry",
    "blackcurrant",
    "blood orange",
    "blueberry",
    "boysenberry",
    "breadfruit",
    "canary melon",
    "cantaloupe",
    "cherimoya",
    "cherry",
    "chili pepper",
    "clementine",
    "cloudberry",
    "coconut",
    "cranberry",
    "cucumber",
    "currant",
    "damson",
    "date",
    "dragonfruit",
    "durian",
    "eggplant",
    "elderberry",
    "feijoa",
    "fig",
    "goji berry",
    "gooseberry",
    "grape",
    "grapefruit",
    "guava",
    "honeydew",
    "huckleberry",
    "jackfruit",
    "jambul",
    "jujube",
    "kiwi fruit",
    "kumquat",
    "lemon",
    "lime",
    "loquat",
    "lychee",
    "mandarine",
    "mango",
    "mulberry",
    "nectarine",
    "nut",
    "olive",
    "orange",
    "pamelo",
    "papaya",
    "passionfruit",
    "peach",
    "pear",
    "persimmon",
    "physalis",
    "pineapple",
    "plum",
    "pomegranate",
    "pomelo",
    "purple mangosteen",
    "quince",
    "raisin",
    "rambutan",
    "raspberry",
    "redcurrant",
    "rock melon",
    "salal berry",
    "satsuma",
    "star fruit",
    "strawberry",
    "tamarillo",
    "tangerine",
    "tomato",
    "ugli fruit",
    "watermelon"
];

/**
 * Dispatches loading products from the products_file
 * @param {function(action)} dispatch 
 * @param {function} onSuccess 
 */
export function LoadProductsDispatcher(dispatch, onSuccess) {
    const action = {
        type: 'LOAD_PRODUCTS',
        payload: {}
    };
    console.log("Loading");
    setTimeout(() => {
        const error = false;
        console.log("Loaded");
        if (error) {
            dispatch(LoadProductsFailure(error));
        } else {
            var products = FRUITS.map((item, index) => initialize_product(index, item));
            dispatch(LoadProductsSuccess(products));
        }
    }, 2000);

    return dispatch(action);
}

function LoadProductsSuccess(products) {
    return {
        type: 'LOAD_PRODUCTS_SUCCESS',
        payload: { products }
    }
}

function LoadProductsFailure(error) {
    return {
        type: 'LOAD_PRODUCTS_FAILURE',
        payload: { error }
    }
}