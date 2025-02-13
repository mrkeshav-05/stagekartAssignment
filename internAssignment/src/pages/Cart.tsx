// import React from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";

// const Cart: React.FC = () => {
//   const { cart, removeFromCart } = useCart();
//   const navigate = useNavigate();

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-gray-500">Your cart is empty.</p>
//       ) : (
//         <ul>
//           {cart.map((item) => (
//             <li key={item.id} className="flex justify-between items-center mb-4 p-4 bg-white shadow rounded-lg">
//               <div>
//                 <h3 className="font-semibold">{item.name}</h3>
//                 <p>${item.price.toFixed(2)}</p>
//               </div>
//               <div className="flex items-center">
//                 <button
//                   className="px-3 py-1 bg-gray-300 rounded-md"
//                   onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                 >
//                   -
//                 </button>
//                 <span className="mx-3">{item.quantity}</span>
//                 <button
//                   className="px-3 py-1 bg-gray-300 rounded-md"
//                   onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                 >
//                   +
//                 </button>
//                 <button
//                   className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md"
//                   onClick={() => removeFromCart(item.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {cart.length > 0 && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Total: ${getTotalPrice().toFixed(2)}</h3>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



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
        onClick={() => navigate("/checkout")}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;
