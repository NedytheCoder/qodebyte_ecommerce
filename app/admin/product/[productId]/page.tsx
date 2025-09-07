"use client";
import { useState } from "react";
// import { useParams } from "next/navigation";
import { Button, Text, Card, Badge } from "@radix-ui/themes";

interface Variation {
  id: string;
  type: string;
  value: string;
  priceAdjustment: number;
  stock: number;
}
const ProductVariations = () => {
  // const { productId } = useParams();
  const [variations, setVariations] = useState<Variation[]>([]);
  const [newVariation, setNewVariation] = useState({
    type: "color",
    value: "",
    priceAdjustment: 0,
    stock: 0,
  });

  const handleAddVariation = (e: React.FormEvent) => {
    e.preventDefault();
    setVariations([
      ...variations,
      {
        ...newVariation,
        id: Date.now().toString(),
      },
    ]);
    setNewVariation({
      type: "color",
      value: "",
      priceAdjustment: 0,
      stock: 0,
    });
  };

  const handleRemoveVariation = (id: string) => {
    setVariations(variations.filter((v) => v.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Manage Product Variations
      </h1>

      <Card className="mb-6">
        <div className="p-3 sm:p-4">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            Add New Variation
          </h2>
          <form
            onSubmit={handleAddVariation}
            className="space-y-3 sm:space-y-4"
          >
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  className="w-full border rounded p-2 text-sm sm:text-base"
                  value={newVariation.type}
                  onChange={(e) =>
                    setNewVariation({
                      ...newVariation,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="color">Color</option>
                  <option value="size">Size</option>
                </select>
              </div>

              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 text-sm sm:text-base"
                  placeholder={
                    newVariation.type === "color" ? "e.g., Red" : "e.g., Large"
                  }
                  value={newVariation.value}
                  onChange={(e) =>
                    setNewVariation({
                      ...newVariation,
                      value: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="w-1/2 sm:w-auto sm:flex-1 min-w-[100px]">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Price $
                </label>
                <input
                  type="number"
                  className="w-full border rounded p-2 text-sm sm:text-base"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={newVariation.priceAdjustment || ""}
                  onChange={(e) =>
                    setNewVariation({
                      ...newVariation,
                      priceAdjustment: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="w-1/2 sm:w-auto sm:flex-1 min-w-[100px]">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  className="w-full border rounded p-2 text-sm sm:text-base"
                  placeholder="0"
                  min="0"
                  value={newVariation.stock || ""}
                  onChange={(e) =>
                    setNewVariation({
                      ...newVariation,
                      stock: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="w-full sm:w-auto mt-2 sm:mt-0">
                <Button
                  type="submit"
                  variant="solid"
                  className="w-full sm:w-auto"
                >
                  Add Variation
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>

      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Current Variations</h2>
        {variations.length === 0 ? (
          <Text color="gray" className="text-sm sm:text-base">
            No variations added yet
          </Text>
        ) : (
          <div className="space-y-2">
            {variations.map((variation) => (
              <Card key={variation.id} className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <Badge
                        color={variation.type === "color" ? "blue" : "green"}
                        className="text-xs sm:text-sm"
                      >
                        {variation.type}
                      </Badge>
                      <span className="font-medium text-sm sm:text-base">
                        {variation.value}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 space-x-2">
                      <span>+${variation.priceAdjustment.toFixed(2)}</span>
                      <span className="text-gray-300">•</span>
                      <span>Stock: {variation.stock}</span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Button
                      variant="ghost"
                      color="red"
                      size={window.innerWidth < 640 ? "1" : "2"}
                      className="w-full sm:w-auto"
                      onClick={() => handleRemoveVariation(variation.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {variations.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <Button
            size={{ initial: "3", sm: "3" }}
            variant="solid"
            color="green"
            className="w-full sm:w-auto"
          >
            Save All Variations
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductVariations;
