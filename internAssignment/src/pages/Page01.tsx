import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5"; // Close icon
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface AddEquipmentFormProps {
  onClose: () => void;
}
const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [section, setSection] = useState("Sound");
  const [type, setType] = useState("Speakers");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [power, setPower] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [assembled, setAssembled] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddToCart = () => {
    const newItem = {
      id: Date.now(),
      section,
      type,
      category,
      quantity,
      brand,
      model,
      power,
      image,
    };
    addToCart(newItem);
    // navigate("/cart");
    onClose();
  };
  return (
    <>
      {/* Dark Overlay Background */}
      <motion.div
        className="fixed inset-0  bg-opacity-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Sliding Modal */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 70, damping: 20 }}
        // className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-lg max-w-md mx-auto h-[85vh] overflow-y-auto"
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-lg max-w-md mx-auto max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add new equipment</h2>
          <IoClose
            className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={onClose}
          />
        </div>
        <hr className="my-2 w-full border border-slate-300" />
        {/* Form Fields */}
        <div className="max-w-sm mx-auto my-10 bg-white shadow-md rounded-lg">
          <div className="border-1 border-slate-300 rounded-lg p-3">
            <h3 className="font-semibold text-lg mb-2">
              Equipment Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium">Section</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option>Sound</option>
                  <option>Structure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Type</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Speakers</option>
                  <option>Microphone</option>
                  <option>Audio Mixer</option>
                  <option>Fixed Fixture</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium">
                  Category
                  <select
                    className="w-full border rounded-md p-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Select</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Inventory Quantity
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2"
                  placeholder="Enter here"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Size (Woofer inches)
              </label>
              <select className="w-full border rounded-md p-2">
                <option>Select</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2"
                // checked={assembled}
                // onChange={() => setAssembled(!assembled)}
                title="Assembled checkbox"
              />
              <label className="text-sm">Assembled</label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Brand</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Enter here"
                value={brand} onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Model</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Enter here"
                value={model} onChange={(e) => setModel(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Power Watts (RMS)
              </label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Enter here"
                value={power} onChange={(e) => setPower(e.target.value)}
              />
            </div>

            {/* <div className="mb-4">
              <label className="block text-sm font-medium">
                Power Watts (RMS)
              </label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Enter here"
              />
            </div> */}

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Equipment Image
              </label>
              <div className="border-dashed border-2 border-gray-300 rounded-md p-4 text-center">
                <p className="text-sm text-gray-500">Upload From Your Device</p>
                <input
                  type="file"
                  className="mt-2"
                  title="Upload equipment image"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={handleAddToCart}
            >
              Save
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AddEquipmentForm;
