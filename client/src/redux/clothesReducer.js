import {
    ADD_FILTER, DELETE_CLOTHES, DELETE_CLOTHES_DETAILS,
    FETCH_CLOTHES,
    FETCH_CLOTHES_SEARCH_PANEL_INFO,
    REMOVE_FILTER,
    UPDATE_CLOTHES,
    UPDATE_CLOTHES_DETAILS
} from "./types";

const initialState = {
    searchPanelInfo: null,
    filter: {
        colors: null,
        sizes: null,
        price: null,
        brands: null,
        title: null,
        categories: null,
        seasons: null,
        types: null
    },
    clothes: []
};

export const clothesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLOTHES_SEARCH_PANEL_INFO:
            return { ...state, searchPanelInfo: action.payload };
        case ADD_FILTER:
            let newFilterAdd = {... state.filter };
            if (action.payload.field === "price" || action.payload.field === "title") {
                newFilterAdd[action.payload.field] = action.payload.value;
            }
            else {
                if (newFilterAdd[action.payload.field] === null) {
                    newFilterAdd[action.payload.field] = [];
                }
                newFilterAdd[action.payload.field].push(action.payload.value);
            }
            return { ...state, filter: newFilterAdd };
        case REMOVE_FILTER:
            let newFilterRemove = {... state.filter };
            if (action.payload.field === "price" || action.payload.field === "title") {
                newFilterRemove[action.payload.field] = null;
            }
            else {
                if (newFilterRemove[action.payload.field].length === 1) {
                    newFilterRemove[action.payload.field] = null;
                }
                else {
                    newFilterRemove[action.payload.field] =
                        newFilterRemove[action.payload.field].filter(e => e !== action.payload.value);
                }
            }
            return { ...state, filter: newFilterRemove };
        case FETCH_CLOTHES:
            return { ...state, clothes: action.payload };
        case UPDATE_CLOTHES:
            return { ...state, clothes: state.clothes.map(cd => cd.id === action.payload.clothesDetailsId ?
                    { ...cd, clothes: cd.clothes.map(c => c.id === action.payload.clothes.id ? action.payload.clothes : c) } : cd ) };
        case UPDATE_CLOTHES_DETAILS:
            return { ...state,
                clothes: state.clothes.map(cd=> cd.id === action.payload.clothesDetailsId ? action.payload.clothes : cd) };
        case DELETE_CLOTHES:
            const clothesDetails = [ ...state.clothes ].find(cd => cd.id === action.payload.clothesDetailsId);
            const newClothes = clothesDetails.clothes.filter(c => c.id !== action.payload.clothesId);
            return { ...state, clothes: state.clothes.map(cd => cd.id === action.payload.clothesDetailsId ?
                    { ...clothesDetails, clothes: newClothes } : cd ) };
        case DELETE_CLOTHES_DETAILS:
            return { ...state,
                clothes: state.clothes.filter(cd => cd.id !== action.payload) };
        default:
            return state;
    }
}