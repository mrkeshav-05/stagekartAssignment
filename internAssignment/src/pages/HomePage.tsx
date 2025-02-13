import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AddEquipmentForm from "./Page01";
import { motion } from "framer-motion";
import "../App.css";

const EquipmentItem = ({ 
  name,
  count, 
  setCount,
  onAddClick,
}: {
  name: string;
  count: number;
  setCount: (newCount: number) => void;
  onAddClick: () => void;
 }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between border-b border-0 border-slate-300 py-4">
      {/* <div className="flex items-center gap-4"> */}
      <div className="flex items-center gap-4">
        <button
          className=" border-dashed border-1 border-blue-500 hover:bg-blue-200 px-16 py-4 rounded-md text-blue-500"
          onClick={() => {
            setIsOpen(true);
            onAddClick(); // Hide bottom bar
          }}
        >
          + Add
        </button>
        {isOpen && <AddEquipmentForm onClose={() => setIsOpen(false)} />}
      </div>
      <div className="flex items-center gap-2">
        {/* <div className="flex items-center gap-2 bg-amber-300 rounded-full"> */}
        <button
          className="text-gray-400 text-2xl bg-blend-lighten text-center flex justify-center font-extralight bg-slate-200 rounded-full h-8 w-8"
          onClick={() => setCount(Math.max(0, count - 1))}
        >
          -
        </button>
        {/* </div> */}

        <span>{count}</span>
        <button
          className="text-gray-400 text-2xl bg-blend-lighten text-center flex justify-center font-extralight bg-slate-200 rounded-full h-8 w-8"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

const LocalAddEquipmentForm = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [equipmentQuantities, setEquipmentQuantities] = useState<{
    [key: string]: number;
  }>({
    Speaker: 0,
    Microphone: 0,
    "Audio Mixer": 0,
    "Fixed Fixture": 0,
  });

  const [isSliderActive, setIsSliderActive] = useState(false);
  const [customItemCount, setCustomItemCount] = useState(0);
  const [showFooter, setShowFooter] = useState(true);
  const handleSliderChange = (value: number) => {
    setIsSliderActive(value > 0); // Assume active if value is greater than 0
  };
  const handleAddMore = () => {
    setCustomItemCount((prev) => prev + 1);
    const newNumber = (customItemCount + 1).toString().padStart(2, "0");
    const newKey = `NewItem ${newNumber}`;
    setEquipmentQuantities((prev) => ({ ...prev, [newKey]: 0 }));
  };
  // Function to update quantity
  const updateQuantity = (itemName: string, newCount: number) => {
    setEquipmentQuantities((prev) => ({
      ...prev,
      [itemName]: Math.max(0, newCount),
    }));
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

      {/*  */}
      <div className="max-w-sm mx-3 mb-40 bg-white rounded-2xl shadow-2xl shadow-slate-300  p-4">
        <h2 className="text-xl font-semibold mb-4">Equipment</h2>
        <p className="text-sm text-gray-500 mb-4">
          Equipment items included in this package.
        </p>
        <div className="bg-blue-100 w-full text-blue-600 font-medium py-1 px-2 rounded-md inline-block mb-2">
          🏗️ Sound
        </div>
        <div className="mb-4">
          <div className="font-medium py-1 px-2 rounded-md inline-block mb-2">
            Speaker
          </div>
          <EquipmentItem 
            name="Speaker" 
            count={equipmentQuantities["Speaker"]}
            setCount={(count) => updateQuantity("Speaker", count)}
            onAddClick={() => setShowFooter(false)}
          />
          {/* <EquipmentItem 
            name="Speaker" 
            count={equipmentQuantities["Speaker"]}
            setCount={(count) => updateQuantity("Speaker", count)}
          /> */}
        </div>

        <div className="mb-4">
          <div className=" font-medium py-1 px-2 rounded-md inline-block mb-2">
            Microphone
          </div>
          <EquipmentItem
            name="Microphone"
            count={equipmentQuantities["Microphone"]}
            setCount={(count) => updateQuantity("Microphone", count)}
            onAddClick={() => setShowFooter(false)}
          />
        </div>
        <div className="mb-4">
          <div className=" font-medium py-1 px-2 rounded-md inline-block mb-2">
            Audio Mixer
          </div>
          <EquipmentItem
            name="Audio Mixer"
            count={equipmentQuantities["Audio Mixer"]}
            setCount={(count) => updateQuantity("Audio Mixer", count)}
            onAddClick={() => setShowFooter(false)}
          />
        </div>
        <div className="bg-blue-100 w-full text-blue-600 font-medium py-1 px-2 rounded-md inline-block mb-2">
          🏗️ Structure
        </div>
        <div className="mb-4">
          <div className=" font-medium py-1 px-2 rounded-md inline-block mb-2">
            Fixed Fixture
          </div>
          <EquipmentItem
            name="Fixed Fixture"
            count={equipmentQuantities["Fixed Fixture"]}
            setCount={(count) => updateQuantity("Fixed Fixture", count)}
            onAddClick={() => setShowFooter(false)}

          />
        </div>
        {Object.entries(equipmentQuantities).map(([itemName, quantity]) => (
          <div key={itemName} className="mb-4">
            <div className="font-medium py-1 px-2 rounded-md inline-block mb-2">
              {itemName}
            </div>
            <EquipmentItem
              name={itemName}
              count={quantity}
              setCount={(count) => updateQuantity(itemName, count)}
            onAddClick={() => setShowFooter(false)}
            />
          </div>
        ))}
        <div className="justify-center flex align-middle my-4">
          <button className="w-[60%]  bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleAddMore}
          >
            + Add more
          </button>
        </div>
      </div>
      {/* Conditionally render the footer */}
      {showFooter && (
        <div 
        // className=" bottom-0 left-0 w-full border flex justify-between p-4 bg-white border-t border-gray-300 shadow-md"
        className={`
          ${isSliderActive ? "" : "fixed bottom-0 left-0 w-full"}
          border flex justify-between p-4 bg-white border-t border-gray-300 shadow-md
        `}
        >
          <button
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          {!isSliderActive && (
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => navigate("/cart")}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LocalAddEquipmentForm;
