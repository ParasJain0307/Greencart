import React from 'react';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const ProductCard = ({ product }) => {
    const [count, setCount] = useState(0);
    const { currency, addToCart, updateCartItem, removeFromCart, cartItems, navigate } = useAppContext();

    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    return (
        product && (
            <div
                onClick={handleCardClick}
                className="border border-gray-300 rounded-xl px-4 py-3 bg-white w-full max-w-[220px] mx-auto transition-transform hover:scale-[1.03] hover:shadow-lg cursor-pointer"
            >
                {/* Product Image */}
                <div className="group flex items-center justify-center mb-2">
                    <img
                        className="group-hover:scale-105 transition-transform max-w-[120px]"
                        src={product.image[0]}
                        alt={product.name}
                    />
                </div>

                {/* Category & Name */}
                <div className="text-sm text-gray-500">{product.category}</div>
                <p className="text-gray-800 font-semibold text-base truncate">{product.name}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 my-1">
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <img
                                key={i}
                                className="w-4"
                                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                                alt="star"
                            />
                        ))}
                    <span className="text-xs text-gray-500">(4)</span>
                </div>

                {/* Price & Cart */}
                <div className="flex items-end justify-between mt-3">
                    <p className="text-primary text-base font-medium">
                        {currency}${product.offerPrice}{' '}
                        <span className="text-gray-400 line-through text-sm">
                            {currency}${product.price}
                        </span>
                    </p>

                    {/* Cart Buttons */}
                    <div className="text-primary z-10" onClick={(e) => e.stopPropagation()}>
                        {!cartItems[product._id] ? (
                            <button
                                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 w-[64px] h-[34px] rounded"
                                onClick={() => addToCart(product._id)}
                            >
                                <img src={assets.cart_icon} alt="cart_icon" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 w-16 h-[34px] bg-primary/20 rounded select-none">
                                <button
                                    onClick={() => {
                                        if (cartItems[product._id] === 1) {
                                            removeFromCart(product._id);
                                        } else {
                                            updateCartItem(product._id, cartItems[product._id] - 1);
                                        }
                                    }}
                                    className="px-2 text-md"
                                >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button
                                    onClick={() => updateCartItem(product._id, cartItems[product._id] + 1)}
                                    className="px-2 text-md"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default ProductCard;
