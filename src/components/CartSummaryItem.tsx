import React from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface CartSummaryItemProps {
  id: string | number;
  imageUrl: string;
  name: string;
  options?: string[]; // e.g., ["Size: Large", "Topping: Extra Cheese"]
  quantity: number;
  price: number; // Price of a single unit
  onQuantityChange: (itemId: string | number, newQuantity: number) => void;
  onRemoveItem: (itemId: string | number) => void;
  currencySymbol?: string;
}

const CartSummaryItem: React.FC<CartSummaryItemProps> = ({
  id,
  imageUrl,
  name,
  options,
  quantity,
  price,
  onQuantityChange,
  onRemoveItem,
  currencySymbol = '$',
}) => {
  console.log(`CartSummaryItem loaded for: ${name}`);

  const handleIncrement = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
    // If quantity is 1 and user tries to decrement,
    // UX decision: either do nothing (as implemented) or remove item.
    // Current implementation: quantity cannot go below 1 via decrement button.
  };

  const itemTotalPrice = (price * quantity).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 px-2 sm:px-4 border-b border-gray-200 last:border-b-0">
      <img
        src={imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'}
        alt={name}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md mb-3 sm:mb-0 sm:mr-4 flex-shrink-0"
      />
      <div className="flex-grow text-center sm:text-left mb-3 sm:mb-0">
        <h3 className="text-lg font-semibold">{name}</h3>
        {options && options.length > 0 && (
          <div className="mt-1 space-x-1">
            {options.map((option, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {option}
              </Badge>
            ))}
          </div>
        )}
        <p className="text-sm text-gray-600 mt-1">
          Unit Price: {currencySymbol}{price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-3 mx-4 mb-3 sm:mb-0">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-lg font-medium w-8 text-center" aria-live="polite">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-center sm:text-right w-24 flex-shrink-0 mb-3 sm:mb-0 sm:mx-4">
        <p className="text-lg font-semibold">
          {currencySymbol}{itemTotalPrice}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemoveItem(id)}
        aria-label={`Remove ${name} from cart`}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CartSummaryItem;