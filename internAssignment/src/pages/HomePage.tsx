import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddEquipmentForm from "./Page01";
import "../App.css";
import { useInventory } from "../context/InventoryContext";
import { PiSoundcloudLogo } from "react-icons/pi";
import { IoMicOutline } from "react-icons/io5";
// import '../css/Homepage.css'
const EquipmentItem = ({
  id,
  onAddClick,
}: {
  id: number;
  name: string;
  count: number;
  setCount: (count: number) => void;
  onAddClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { equipment, updateQuantity } = useInventory();
  const item = equipment.find((eq) => eq.id === id);

  if (!item) return null;
  return (
    <div className="flex items-center justify-between border-b border-0 border-slate-300 py-3 ">
      {/* <div className="flex items-center gap-4"> */}
      <div className="flex items-center gap-4">
        <button
          className=" border-dashed  border-[1px] border-blue-500 hover:bg-blue-200 px-4 py-2 w-[178px] h-[64px] font-inter rounded-md text-blue-500"
          onClick={() => {
            setIsOpen(true);
            onAddClick(); // Hide bottom bar
          }}
        >
          <span className="text-2xl font-extralight">+</span> Add
        </button>
        {isOpen && (
          <AddEquipmentForm onClose={() => setIsOpen(false)} equipmentId={1} />
        )}
      </div>
      <div className="flex items-center gap-2">
        <div>
          <button
            className="text-gray-400 text-2xl bg-blend-lighten text-center flex justify-center font-extralight bg-slate-200 rounded-full h-8 w-8"
            onClick={() => updateQuantity(id, Math.max(0, item.quantity - 1))}
            disabled={item.quantity <= 0}
          >
            -
          </button>
        </div>
        <span>{item.quantity}</span>
        <div>
          <button
            className="text-gray-400 text-2xl bg-blend-lighten text-center flex justify-center font-extralight bg-slate-200 rounded-full h-8 w-8"
            onClick={() => updateQuantity(id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const LocalAddEquipmentForm = ({}: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [equipmentQuantities, setEquipmentQuantities] = useState<{
    [key: string]: number;
  }>({
    Speaker: 0,
    Microphone: 0,
    "Audio Mixer": 0,
    "Fixed Fixture": 0,
  });
  const [customItemCount, setCustomItemCount] = useState(0);
  const [isSliderActive] = useState(false);

  const [, setShowFooter] = useState(true);
  // const handleSliderChange = (value: number) => {
  //   setIsSliderActive(value > 0); // Assume active if value is greater than 0
  // };
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
    <div className="font-inter">
      <div className=" mx-6">
        <div className="pt-6 pb-3 rounded-lg w-full max-w-lg">
          {/* Save & Exit Button */}
          <div className="flex justify-end mb-1">
            <button
              className="border border-gray-300 w-[116px] h-auto min-w-[116px] min-h-[48px] rounded-sm p-1 gap-2"
              onClick={() => navigate("/cart")}
            >
              Save & exit
            </button>
          </div>
          {/* Heading */}
          <p className="w-[342px] h-[40px] font-inter font-medium  text-[32px] leading-[40px] tracking-[-0.03em] text-[#0F161E]">
            Add Equipment
          </p>
          <div className="">
            <p className=" font-inter font-light text-[16px] leading-[20px] -tracking-normal text-[#5A5F66]">
              Add equipment items in the template for your selected package
              series.
            </p>
          </div>
          {/* Preview Package Link */}
          <div className="flex justify-end ">
            <a
              href="/"
              className="text-blue-600  mt-6 text-[14px] inline-block underline underline-offset-2 font-inter leading-[20px] tracking-wide"
            >
              Preview Package
            </a>
          </div>
        </div>
        {/*  */}
        <div className=" max-w-sm  mb-40 bg-white rounded-2xl shadow-2xl shadow-slate-300 px-3 py-1.5 ">
          <div className="flex-col space-y-2 my-1.5">
            <h2 className=" font-medium text-2xl font-inter leading-[20px] tracking-wide">
              Equipment
            </h2>
            <p className="text-sm text-gray-500 font-inter leading-[20px] tracking-normal ">
              Equipment items included in this package.
            </p>
          </div>

          <div className="bg-blue-100 w-full mt-3 text-blue-600 font-medium py-1 px-2 rounded-md inline-flex mb-8">
            <PiSoundcloudLogo className=" mr-2 mt-1 font-semibold" />
            Sound
          </div>
          <div className="mb-4">
            <div className="font-medium py-1 px-2 rounded-md inline-block ">
              Speaker
            </div>
            <EquipmentItem
              id={1}
              name="Speaker"
              count={equipmentQuantities["Speaker"]}
              setCount={(count) => updateQuantity("Speaker", count)}
              onAddClick={() => setShowFooter(false)}
            />
          </div>
          <div className="mb-4">
            <div className=" font-medium py-1 px-2 rounded-md inline-block mb-2">
              Microphone
            </div>
            <EquipmentItem
              id={2}
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
              id={3}
              name="Audio Mixer"
              count={equipmentQuantities["Audio Mixer"]}
              setCount={(count) => updateQuantity("Audio Mixer", count)}
              onAddClick={() => setShowFooter(false)}
            />
            <div className="bg-blue-100 w-full text-blue-600 font-medium py-1 px-2 rounded-md inline-flex my-4">
              <IoMicOutline className=" mr-2 mt-1 font-semibold" />
              Structure
            </div>
            {/* <div className="mb-4">
          <div className=" font-medium py-1 px-2 rounded-md inline-block mb-2">
            Fixed Fixture
          </div>
          <EquipmentItem
            name="Fixed Fixture"
            count={equipmentQuantities["Fixed Fixture"]}
            setCount={(count) => updateQuantity("Fixed Fixture", count)}
            onAddClick={() => setShowFooter(false)}

          />
        </div> */}
            <div className="mb-4">
              {Object.entries(equipmentQuantities).map(
                ([itemName, quantity]) => (
                  <div key={itemName} className="mb-4">
                    <EquipmentItem
                      id={
                        Object.keys(equipmentQuantities).indexOf(itemName) + 1
                      }
                      name={itemName}
                      count={quantity}
                      setCount={(count) => updateQuantity(itemName, count)}
                      onAddClick={() => setShowFooter(false)}
                    />
                  </div>
                )
              )}
            </div>
            <div className="justify-center flex align-middle my-4 py-8">
              <button
                className="w-[60%]  bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                onClick={handleAddMore}
              >
                + Add more
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render the footer */}
      {
        <div
          // className="fixed bottom-0 left-0 w-full border flex justify-between p-4 bg-white border-t border-gray-300 shadow-md"
          className={`
          ${isSliderActive ? "fixed" : " z-10 fixed bottom-0 left-0 w-full"}
          flex justify-between p-6 bg-white border-t border-gray-200 shadow-md
        `}
        >
          <button
            // className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
            className=" text-blue-500  rounded-md  transition underline underline-offset-2"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          {!isSliderActive && (
            <button
              className="bg-blue-500 text-white  py-2 px-4 rounded-[4px] text-[14px] hover:bg-blue-600 transition"
              onClick={() => navigate("/cart")}
            >
              Next
            </button>
          )}
        </div>
      }
    </div>
  );
};

export default LocalAddEquipmentForm;
