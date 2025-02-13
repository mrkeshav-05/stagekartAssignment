// import React from "react";
// import { useCart } from "../context/CartContext";

// const ProductList: React.FC = () => {
//   const { addToCart } = useCart();

//   const products = [
//     { id: 1, name: "Speaker", price: 100 },
//     { id: 2, name: "Microphone", price: 50 },
//     { id: 3, name: "Amplifier", price: 200 },
//   ];

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Available Equipment</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id} className="flex justify-between items-center p-4 border-b">
//             <span>{product.name} - ${product.price}</span>
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded-md"
//               onClick={() => addToCart({ ...product, quantity: 1, section: "default", type: "default", category: "default", brand: "default", model: "default" })}
//             >
//               Add to Cart
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;
