import React from "react";
import { IoTrash } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { audio1, image2, image3, micro1, micro3, speaker1, speaker2, speaker3 } from "../assets/images";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  // const randomImage = getRandomImage();
  const images = [audio1, micro1, micro3, speaker1, speaker2, speaker3, image2, image3];
  const RandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  return (
    <div>
      <div className=" p-6  rounded-lg w-full max-w-lg">
        {/* Save & Exit Button */}
        <div className="flex justify-end">
          <button
            className="border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            onClick={() => navigate("/cart")}
          >
            Save & exit
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-light mt-4">Add equipment</h1>
        <p className="text-gray-600 mt-1">
          Add equipment items in the template for your selected package series.
        </p>

        {/* Preview Package Link */}
        <a href="/" className="text-blue-600 mt-4 inline-block hover:underline">
          Preview Package
        </a>
      </div>
    
    <div className="max-w-sm mx-3 mb-40 bg-white rounded-2xl shadow-2xl shadow-slate-300  p-4">
      <h2 className="text-2xl font-semibold  mb-4">Equipment</h2>
      <p className="text-sm text-gray-500 mb-4">
          Equipment items included in this package.
        </p>
        <div className="bg-blue-100 w-full text-blue-600 font-medium py-1 px-2 rounded-md inline-block mb-2">
          🏗️ Sound
        </div>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item: { id: number; brand: string; model: string; section: string; type: string; quantity: number; image: File | null}) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4  rounded-lg shadow-sm bg-white"
            >
              <img src={RandomImage()} 
              alt="microphone"
              className="w-12 h-16 object cover rounded-lg"
                />
              <div>
                <h3 className="font-medium text-lg">{item.brand} <br /> {item.model}</h3>
                <p className="text-gray-600 text-sm">{item.section} - {item.type}</p>
                <p className="text-gray-800 font-semibold">{item.quantity}</p>
                {item.image && <p className="text-gray-800 font-semibold">Image: {item.image.name}</p>}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-blue-500 hover:text-red-800 border rounded-full p-1 "
                title="Remove item from cart"
              >
                <RiDeleteBinLine className="font-semibold" />
              </button>
              <button
                className="text-blue-500 hover:text-blue-600 border rounded-full p-1"
                title="Remove item from cart"
              >
                <CiEdit className="font-semibold" />
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
        </div>
    </div>
    </div>
  );
};

export default CartPage;