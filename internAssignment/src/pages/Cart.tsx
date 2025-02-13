import React from "react";
import { IoTrash } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item: { id: number; brand: string; model: string; section: string; type: string; quantity: number }) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
            >
              <div>
                <h3 className="font-medium text-lg">{item.brand} {item.model}</h3>
                <p className="text-gray-600 text-sm">{item.section} - {item.type}</p>
                <p className="text-gray-800 font-semibold">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
                title="Remove item from cart"
              >
                <IoTrash className="text-2xl" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        onClick={() => navigate("/cart")}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </button>
        <div 
        className="fixed bottom-0 left-0 w-full border flex justify-between p-4 bg-white border-t border-gray-300 shadow-md"
        >
          <button
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
            {/* <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => navigate("/cart")}
            >
              Next
            </button> */}
        </div>
    </div>
  );
};

export default CartPage;
