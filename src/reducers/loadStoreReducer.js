const INITIAL_STATE = {
    products: [],
    trades: []
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
    }
    return result;
}