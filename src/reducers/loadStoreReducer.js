const INITIAL_STATE = {
    products: [],
    purchases: []
}

export default (state = INITIAL_STATE, action) => {
    var result = state;
    switch (action.type) {
        case 'LOAD_PRODUCTS':
            result = {
                ...state,
                products: {
                    loading: true,
                    error: null,
                    list: []
                }
            };
            break;
        case 'LOAD_PRODUCTS_SUCCESS':
            result = {
                ...state,
                products: {
                    loading: false,
                    error: null,
                    list: action.payload.products
                }
            };
            break;
        case 'LOAD_PRODUCTS_FAILURE':
            result = {
                ...state,
                products: {
                    loading: false,
                    error: action.payload.error,
                    list: []
                }
            };
            break;
        case 'LOAD_PURCHASES':
            result = {
                ...state,
                purchases: {
                    loading: true,
                    error: null,
                    list: []
                }
            };
            break;
        case 'LOAD_PURCHASES_SUCCESS':
            result = {
                ...state,
                purchases: {
                    loading: false,
                    error: null,
                    list: action.payload.purchases
                }
            };
            break;
        case 'LOAD_PURCHASES_FAILURE':
            result = {
                ...state,
                purchases: {
                    loading: false,
                    error: action.payload.error,
                    list: []
                }
            };
            break;
    }
    return result;
}