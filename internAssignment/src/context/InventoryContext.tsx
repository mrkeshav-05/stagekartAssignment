import React, { createContext, useContext, useState } from "react";

// Removed duplicate interface definition
interface EquipmentItem {
  id: number;
  name: string;
  description?: string;
  quantity: number;
}

interface InventoryContextType {
  equipment: EquipmentItem[];
  updateQuantity: (id: number, quantity: number) => void;
}
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([
    { id: 1, name: "Speaker", quantity: 0 },
    { id: 2, name: "Microphone", quantity: 0 },
    { id: 3, name: "Audio Mixer", quantity: 0 },
    { id: 4, name: "Fixed Fixture", quantity: 0 },
  ]);
  const updateQuantity = (id: number, quantity: number) => {
    setEquipment((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  return (
    <InventoryContext.Provider value={{ equipment, updateQuantity }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};
