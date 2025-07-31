import { createContext, useContext, useEffect, useState } from "react";
import App from "../App";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();



export const AppContextProvider = ({ children }) => {
    const currency = import.meta.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setuser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})

    //Fetch All Products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    //Add product to carts
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }

        setCartItems(cartData)
        toast.success("Add item Successfully")
    }

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("cart updated");
    }


    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1
            if (cartData[itemId] == 0) {
                delete cartData[itemId]
            }
        }
        toast.success("Remove from cart")
        setCartItems(cartData)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    const value = { user, setuser, isSeller, setIsSeller, navigate, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, cartItems, removeFromCart }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}


export const useAppContext = () => {
    return useContext(AppContext)
}