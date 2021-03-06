import {
    ADD_FILTER,
    ADD_PRODUCT,
    ADD_PRODUCT_DETAILS,
    ADD_PRODUCT_DETAILS_ID,
    ADD_PRODUCT_PHOTOS,
    CLEAR_PHOTO_STORE, CLEAR_PRODUCTS,
    CLEAR_SELECTED_ITEMS, CLEAR_SELLERS,
    FETCH_ADDRESS,
    FETCH_DELIVERY,
    HIDE_ALERT,
    REMOVE_FILTER,
    REQUEST_ADDRESS,
    REQUEST_ADDRESSES,
    REQUEST_ALERT,
    REQUEST_ALL_SELLERS_INFO,
    REQUEST_AUTH,
    REQUEST_AUTH_AND_FETCH_USER,
    REQUEST_CART,
    REQUEST_CLOTHES_BY_SELLER_ID,
    REQUEST_CLOTHES_SEARCH_PANEL_INFO,
    REQUEST_CUSTOMER,
    REQUEST_DELETE_ADDRESS,
    REQUEST_DELETE_CART,
    REQUEST_DELETE_CLOTHES,
    REQUEST_DELETE_CLOTHES_DETAILS,
    REQUEST_DELETE_PHOTO,
    REQUEST_DELETE_WISH,
    REQUEST_DELIVERIES,
    REQUEST_DELIVERY,
    REQUEST_MAIN_ADDRESS,
    REQUEST_ORDER,
    REQUEST_ORDERS,
    REQUEST_PHOTOS_NAMES, REQUEST_PRODUCT,
    REQUEST_REGISTRATION_USER,
    REQUEST_RUSSIAN_POST_DELIVERY,
    REQUEST_SAVE_ADDRESS,
    REQUEST_SAVE_CART,
    REQUEST_SAVE_DELIVERY,
    REQUEST_SAVE_ORDER,
    REQUEST_SAVE_PRODUCT,
    REQUEST_SAVE_RETURN,
    REQUEST_SAVE_WISH,
    REQUEST_SEARCH_CLOTHES,
    REQUEST_SELLER,
    REQUEST_SELLER_INFO,
    REQUEST_SELLERS_INFO_COUNT,
    REQUEST_UPDATE_ADDRESS,
    REQUEST_UPDATE_CART,
    REQUEST_UPDATE_CLOTHES,
    REQUEST_UPDATE_CLOTHES_DETAILS,
    REQUEST_UPDATE_DELIVERY,
    REQUEST_UPDATE_ORDER_STATUS,
    REQUEST_UPDATE_SELLER_INFO,
    REQUEST_UPDATE_USER,
    REQUEST_UPLOAD_PHOTO,
    REQUEST_USER_BY_EMAIL,
    REQUEST_USER_BY_ID, REQUEST_WISHLIST,
    SELECT_ITEM,
    SET_CURRENT_ADDRESS,
    SET_CURRENT_ORDER_ID,
    SET_USER_ROLE
} from "./types";

export function authUser(email, password, userRole) {
    return {
        type: REQUEST_AUTH,
        payload: { email, password, userRole }
    }
}

export function fetchUserById(userRole, id) {
    return {
        type: REQUEST_USER_BY_ID,
        payload: { userRole, id }
    }
}

export function fetchUserByEmail(email) {
    return {
        type: REQUEST_USER_BY_EMAIL,
        payload: email
    }
}

export function authAndFetchUser(email, password, userRole) {
    return {
        type: REQUEST_AUTH_AND_FETCH_USER,
        payload: { email, password, userRole }
    }
}

export function registrationUser(user, userRole) {
    return {
        type: REQUEST_REGISTRATION_USER,
        payload: { user, userRole }
    }
}

export function updateUser(user, userRole) {
    return {
        type: REQUEST_UPDATE_USER,
        payload: { user, userRole }
    }
}

export function setUserRole(userRole) {
    return {
        type: SET_USER_ROLE,
        payload: userRole
    }
}

export function showAlert(variant, text) {
    return {
        type: REQUEST_ALERT,
        payload: {variant, text}
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function fetchSearchPanelInfo() {
    return {
        type: REQUEST_CLOTHES_SEARCH_PANEL_INFO
    }
}

export function addFilter(field, value) {
    return {
        type: ADD_FILTER,
        payload: { field, value }
    }
}

export function removeFilter(field, value) {
    return {
        type: REMOVE_FILTER,
        payload: { field, value }
    }
}

export function fetchSearchClothes(filter) {
    return {
        type: REQUEST_SEARCH_CLOTHES,
        payload: {
            colors: filter.colors,
            sizes: filter.sizes,
            price: filter.price,
            brands: filter.brands,
            title: filter.title,
            categories: filter.categories,
            seasons: filter.seasons,
            types: filter.types
        }
    }
}

export function fetchClothesBySellerId(sellerId) {
    return {
        type: REQUEST_CLOTHES_BY_SELLER_ID,
        payload: sellerId
    }
}

export function updateClothes(clothesDetailsId, clothesId, color, size, count, regularPrice, price, weight, deliveryId) {
    return {
        type: REQUEST_UPDATE_CLOTHES,
        payload: { clothesDetailsId, clothesId, color, size, count, regularPrice, price, weight, deliveryId }
    }
}

export function updateClothesDetails(clothesDetailsId, brand, title, description, composition, category,
                                     season, type, productionCountry, care, style, sellerId) {
    return {
        type: REQUEST_UPDATE_CLOTHES_DETAILS,
        payload: { clothesDetailsId, brand, title, description, composition, category,
            season, type, productionCountry, care, style, sellerId }
    }
}

export function deleteClothes(clothesDetailsId, clothesId) {
    return {
        type: REQUEST_DELETE_CLOTHES,
        payload: { clothesDetailsId, clothesId }
    }
}

export function deleteClothesDetails(clothesDetailsId) {
    return {
        type: REQUEST_DELETE_CLOTHES_DETAILS,
        payload: clothesDetailsId
    }
}

export function uploadPhotos(productType, detailsId, id, photos) {
    return {
        type: REQUEST_UPLOAD_PHOTO,
        payload: { productType, detailsId, id, photos }
    }
}

export function clearPhotoStore() {
    return {
        type: CLEAR_PHOTO_STORE
    }
}

export function fetchPhotosNames(productType, detailsId, id) {
    return {
        type: REQUEST_PHOTOS_NAMES,
        payload: { productType, detailsId, id }
    }
}

export function deletePhoto(productType, detailsId, id, name) {
    return {
        type: REQUEST_DELETE_PHOTO,
        payload: { productType, detailsId, id, name }
    }
}

export function saveProduct(productType, productDetails, detailsId, product, photos, sellerId) {
    return {
        type: REQUEST_SAVE_PRODUCT,
        payload: { productType, productDetails, detailsId, product, photos, sellerId }
    }
}

export function fetchCart(customerId) {
    return {
        type: REQUEST_CART,
        payload: customerId
    }
}

export function deleteCart(cartId) {
    return {
        type: REQUEST_DELETE_CART,
        payload: cartId
    }
}

export function updateCart(cartId, count) {
    return {
        type: REQUEST_UPDATE_CART,
        payload: { cartId, count }
    }
}

export function selectItemCart(cartId, checked) {
    return {
        type: SELECT_ITEM,
        payload: { cartId, checked }
    }
}

export function clearSelectedItemsCart() {
    return {
        type: CLEAR_SELECTED_ITEMS
    }
}

export function saveCart(customerId, productType, productDetailsId, productId, count) {
    return {
        type: REQUEST_SAVE_CART,
        payload: { customerId, productType, productDetailsId, productId, count }
    }
}

export function addProductDetails(productDetails) {
    return {
        type: ADD_PRODUCT_DETAILS,
        payload: productDetails
    }
}

export function addProductDetailsId(productDetailsId) {
    return {
        type: ADD_PRODUCT_DETAILS_ID,
        payload: productDetailsId
    }
}

export function addProduct(product) {
    return {
        type: ADD_PRODUCT,
        payload: product
    }
}

export function addProductPhotos(photos) {
    return {
        type: ADD_PRODUCT_PHOTOS,
        payload: photos
    }
}

export function fetchProduct(productType, productDetailsId, productId) {
    return {
        type: REQUEST_PRODUCT,
        payload: { productType, productDetailsId, productId }
    }
}

export function clearProducts() {
    return {
        type: CLEAR_PRODUCTS
    }
}

export function fetchSellersInfoCount() {
    return {
        type: REQUEST_SELLERS_INFO_COUNT
    }
}

export function fetchAllSellersInfo() {
    return {
        type: REQUEST_ALL_SELLERS_INFO
    }
}

export function fetchSellerInfo(id) {
    return {
        type: REQUEST_SELLER_INFO,
        payload: id
    }
}

export function updateSellerInfo(id, verificationStatus, message) {
    return {
        type: REQUEST_UPDATE_SELLER_INFO,
        payload: { id, verificationStatus, message }
    }
}

export function saveOrder(productDetailsId, productId, count, customerId, address, sellerId, productType, regularPrice, price, cartId) {
    return {
        type: REQUEST_SAVE_ORDER,
        payload: { productDetailsId, productId, count, customerId, address, sellerId, productType, regularPrice, price, cartId }
    }
}

export function fetchOrders(fetchBy, id) {
    return {
        type: REQUEST_ORDERS,
        payload: { fetchBy, id }
    }
}

export function fetchOrder(id) {
    return {
        type: REQUEST_ORDER,
        payload: id
    }
}

export function fetchSeller(id) {
    return {
        type: REQUEST_SELLER,
        payload: id
    }
}

export function clearSellers() {
    return {
        type: CLEAR_SELLERS
    }
}

export function fetchCustomer(id) {
    return {
        type: REQUEST_CUSTOMER,
        payload: id
    }
}

export function updateOrderStatus(id, newStatus) {
    return {
        type: REQUEST_UPDATE_ORDER_STATUS,
        payload: { id, newStatus }
    }
}

export function saveDelivery(deliveryVariant, deliveryPriceIncluded, deliveryPrice, deliveryPriceVariant,
                             departureIndex, returnIndex, packVariant, service, sellerId) {
    return {
        type: REQUEST_SAVE_DELIVERY,
        payload: { deliveryVariant, deliveryPriceIncluded, deliveryPrice, deliveryPriceVariant,
            departureIndex, returnIndex, packVariant, service, sellerId }
    }
}

export function fetchDelivery(id) {
    return {
        type: REQUEST_DELIVERY,
        payload: id
    }
}

export function fetchDeliveries(id) {
    return {
        type: REQUEST_DELIVERIES,
        payload: id
    }
}

export function updateDelivery(id, deliveryVariant, deliveryPriceIncluded, deliveryPrice, deliveryPriceVariant,
                             departureIndex, returnIndex, packVariant, service, sellerId) {
    return {
        type: REQUEST_UPDATE_DELIVERY,
        payload: { id, deliveryVariant, deliveryPriceIncluded, deliveryPrice, deliveryPriceVariant,
            departureIndex, returnIndex, packVariant, service, sellerId }
    }
}

export function setCurrentDelivery(delivery) {
    return {
        type: FETCH_DELIVERY,
        payload: delivery
    }
}

export function fetchRussianPostDelivery(from, to, weight, pack, ret, price, service) {
    return {
        type: REQUEST_RUSSIAN_POST_DELIVERY,
        payload: { from, to, weight, pack, ret, price, service }
    }
}

export function saveAddress(address, index, customerId, isMain) {
    return {
        type: REQUEST_SAVE_ADDRESS,
        payload: { address, index, customerId, isMain }
    }
}

export function fetchAddress(id) {
    return {
        type: REQUEST_ADDRESS,
        payload: id
    }
}

export function fetchMainAddress(id) {
    return {
        type: REQUEST_ADDRESSES,
        payload: { id, isMain: true }
    }
}

export function fetchAddresses(id) {
    return {
        type: REQUEST_ADDRESSES,
        payload: { id }
    }
}

export function updateAddress(id, address, index, customerId, isMain) {
    return {
        type: REQUEST_UPDATE_ADDRESS,
        payload: { id, address, index, customerId, isMain }
    }
}

export function deleteAddress(id) {
    return {
        type: REQUEST_DELETE_ADDRESS,
        payload: id
    }
}

export function setMainAddress(address) {
    return {
        type: FETCH_ADDRESS,
        payload: address
    }
}

export function setCurrentAddress(address) {
    return {
        type: SET_CURRENT_ADDRESS,
        payload: address
    }
}

export function saveReturn(reason, description, orderId) {
    return {
        type: REQUEST_SAVE_RETURN,
        payload: { reason, description, orderId }
    }
}

export function setCurrentOrderId(id) {
    return {
        type: SET_CURRENT_ORDER_ID,
        payload: id
    }
}

export function saveWish(productType, productDetailsId, productId, customerId, sellerId) {
    return {
        type: REQUEST_SAVE_WISH,
        payload: { productType, productDetailsId, productId, customerId, sellerId }
    }
}

export function fetchWishlist(fetchBy, id) {
    return {
        type: REQUEST_WISHLIST,
        payload: { fetchBy, id }
    }
}

export function deleteWish(id) {
    return {
        type: REQUEST_DELETE_WISH,
        payload: id
    }
}