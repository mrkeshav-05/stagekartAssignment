import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5"; // Close icon
import "../App.css";
// import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
// import { useInventory } from "../context/InventoryContext";
interface AddEquipmentFormProps {
  onClose: () => void;
  equipmentId: number;
}
const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({
  onClose,
  equipmentId,
}) => {
  // const { equipment } = useInventory();
  // const item = equipment.find((eq) => eq.id === equipmentId) || {
  //   id: equipmentId,
  //   quantity: 1,
  // };

  // const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  // const { quantity, setQuantity } = useInventory();
  const [section, setSection] = useState("Sound");
  const [type, setType] = useState("Speakers");
  const [category, setCategory] = useState("");
  // const [quantity, setQuantity] = useState(1);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [power, setPower] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [assembled, ] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddToCart = async () => {
    const newItem = {
      id: equipmentId, // Unique ID
      quantity,
      section,
      type,
      category,
      brand,
      model,
      power,
      assembled,
      image,
    };
    addToCart(newItem);
    onClose();
  };
  return (
    <>
      {/* Dark Overlay Background */}
      <motion.div
        className="fixed inset-0 z-0  bg-opacity-50 backdrop-blur-sm"
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
        <div className="flex justify-between items-center ">
          <h2 className="text-xl ">Add new equipment</h2>
          <IoClose
            className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={onClose}
          />
        </div>
        <hr className="my-2 w-full border border-slate-300" />
        {/* Form Fields */}
        <div className="max-w-sm mx-auto my-10 bg-white shadow-md rounded-lg bg-blend-lighten ">
          <div className="border-1 border-slate-300 rounded-lg p-3">
            <h3 className=" text-lg mb-2">
              Equipment Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-extralight text-slate-700">Section</label>
                <select
                  title="Select Section"
                  className="w-full border-1 border-slate-300 rounded-md p-2 text-sm font-extralight text-slate-700"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option className="">Sound</option>
                  <option>Structure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-extralight text-slate-700">Type</label>
                <select
                  title="Select Type"
                  className="w-full border-1 border-slate-300 rounded-md p-2 text-sm font-extralight text-slate-700"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Small Speakers</option>
                  <option>Large Speakers</option>
                  <option>Microphone</option>
                  <option>Audio Mixer</option>
                  <option>Fixed Fixture</option>
                </select>
              </div>
            </div>
            <div className="mb-4 border-1 border-slate-300 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-extralight text-slate-700 ">
                    Category
                    <select
                      className="w-full border-1 border-slate-300 rounded-md p-2"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Select</option>
                    </select>
                  </label>
                </div>
                {/* <div>
                <label className="block text-sm font-medium">
                  Inventory Quantity
                </label>
                <input
                  type="number"
                  className="w-full border-1 border-slate-300 rounded-md p-2"
                  placeholder="Enter here"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div> */}
                <div className="flex flex-col items-center space-x-3">
                  <label className="block text-sm font-extralight text-slate-700">Quantity</label>
                  <div className="flex items-center space-x-3  rounded-md text-sm font-extralight text-slate-700 ">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-extralight text-slate-700">
                  Size (Woofer inches)
                </label>
                <select title="Select Size" className="w-full border-1 border-slate-300 rounded-md p-2 text-sm font-extralight text-slate-700">
                  <option>Select</option>
                </select>
              </div>

              <div className="flex gap-5  mb-4  ">
                <div>
                <input
                  type="checkbox"
                  className="w-6 h-6  my-2 block p-4 cursor-pointer"
                  // checked={assembled}
                  // onChange={() => setAssembled(!assembled)}
                  title="Assembled checkbox"
                />
                </div>
                <div className="flex flex-col  ">
                  <label className="text-sm font-extralight text-slate-700">Assembled</label>
                  <p className="text-xs text-gray-500 ml-2 block">
                    Select if this is a Copy Speaker built locally using
                    cabinets. This helps managing customer expectations and
                    avoiding complaints.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-extralight text-slate-700">Brand</label>
              <input
                type="text"
                className="w-full border-1 border-slate-300 rounded-md p-2"
                placeholder="Enter here"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-extralight text-slate-700">Model</label>
              <input
                type="text"
                className="w-full border-1 border-slate-300 rounded-md p-2"
                placeholder="Enter here"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-extralight text-slate-700">
                Power Watts (RMS)
              </label>
              <input
                type="text"
                className="w-full border-1 border-slate-300 rounded-md p-2"
                placeholder="Enter here"
                value={power}
                onChange={(e) => setPower(e.target.value)}
              />
            </div>

            {/* <div className="mb-4">
              <label className="block text-sm font-medium">
                Power Watts (RMS)
              </label>
              <input
                type="text"
                className="w-full border-1 border-slate-300 rounded-md p-2"
                placeholder="Enter here"
              />
            </div> */}

            <div className="mb-4 text-sm font-extralight text-slate-700">
              <label className="block text-sm font-extralight text-slate-700">
                Equipment Image
              </label>
              <div className="border-dashed border-1  border-slate-300 rounded-md p-4 ">
                <p className="text-sm text-gray-500">Upload From Your Device</p>
                <input
                  type="file"
                  className="mt-2 text-sm font-extralight text-slate-700"
                  title="Upload equipment image"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white py-3 mb-10 rounded-lg shadow-md hover:bg-blue-700 transition"
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
