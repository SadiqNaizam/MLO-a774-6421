import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSummaryItem from '@/components/CartSummaryItem';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

// Lucide Icons
import { ShoppingCart, Tag, Percent, Trash2 } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  options?: string[];
  quantity: number;
  price: number; // Price per unit
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1675451537756-3dd6b423301f?q=80&w=600&auto=format&fit=crop',
    options: ['Size: Large', 'Crust: Thin'],
    quantity: 1,
    price: 15.99,
  },
  {
    id: '2',
    name: 'Coca-Cola Can',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop',
    quantity: 4,
    price: 1.50,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    imageUrl: 'https://images.unsplash.com/photo-1550304943-43281414ebb8?q=80&w=600&auto=format&fit=crop',
    options: ['Dressing: Extra'],
    quantity: 1,
    price: 8.75,
  },
];

const DELIVERY_FEE = 5.00;
const VALID_PROMO_CODE = 'SAVE10'; // Example promo code for 10% discount

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const calculateCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const updateQuantity = useCallback((itemId: string | number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((itemId: string | number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const handleApplyPromoCode = () => {
    if (promoCodeInput.toUpperCase() === VALID_PROMO_CODE) {
      setAppliedPromoCode(promoCodeInput);
    } else {
      // Handle invalid promo code (e.g., show a toast)
      console.log("Invalid promo code");
      setAppliedPromoCode(null); // Clear any previously applied promo if new one is invalid
    }
  };

  useEffect(() => {
    const currentSubtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(currentSubtotal);

    let currentDiscount = 0;
    if (appliedPromoCode?.toUpperCase() === VALID_PROMO_CODE) {
      currentDiscount = currentSubtotal * 0.10; // 10% discount
    }
    setDiscount(currentDiscount);

    const currentTotal = currentSubtotal - currentDiscount + (cartItems.length > 0 ? DELIVERY_FEE : 0);
    setTotal(currentTotal);
  }, [cartItems, appliedPromoCode]);

  const handleProceedToCheckout = () => {
    navigate('/checkout'); // Path from App.tsx
  };
  
  const cartItemCount = calculateCartItemCount();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header cartItemCount={cartItemCount} />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link> {/* Path from App.tsx */}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items Section */}
          <section className="lg:col-span-2">
            <Card className="shadow-md dark:bg-gray-800">
              <CardHeader className="border-b dark:border-gray-700">
                <CardTitle className="text-2xl font-semibold flex items-center">
                  <ShoppingCart className="mr-3 h-6 w-6 text-primary" />
                  Your Shopping Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {cartItems.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    <ShoppingCart className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                    <p className="text-xl font-medium mb-2">Your cart is empty</p>
                    <p className="mb-4">Looks like you haven't added anything to your cart yet.</p>
                    <Button asChild>
                      <Link to="/">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y dark:divide-gray-700">
                    {cartItems.map((item) => (
                      <CartSummaryItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        options={item.options}
                        quantity={item.quantity}
                        price={item.price}
                        onQuantityChange={updateQuantity}
                        onRemoveItem={removeItem}
                        currencySymbol="$"
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Order Summary Section */}
          {cartItems.length > 0 && (
            <aside className="lg:col-span-1 sticky top-24"> {/* Sticky for desktop */}
              <Card className="shadow-md dark:bg-gray-800">
                <CardHeader className="border-b dark:border-gray-700">
                  <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${DELIVERY_FEE.toFixed(2)}</span>
                  </div>

                  <Separator className="dark:bg-gray-700" />
                  
                  <div className="space-y-2">
                    <label htmlFor="promoCode" className="text-sm font-medium">Promo Code</label>
                    <div className="flex space-x-2">
                      <Input
                        id="promoCode"
                        type="text"
                        placeholder="Enter code"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value)}
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                      <Button onClick={handleApplyPromoCode} variant="outline" className="whitespace-nowrap">
                        <Tag className="mr-2 h-4 w-4" /> Apply
                      </Button>
                    </div>
                    {appliedPromoCode && discount > 0 && (
                      <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                        <Percent className="h-3 w-3 mr-1" />
                        "{appliedPromoCode}" applied! You saved ${discount.toFixed(2)}.
                      </p>
                    )}
                     {appliedPromoCode && discount === 0 && promoCodeInput.length > 0 && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        Invalid or expired promo code.
                      </p>
                    )}
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <Separator className="dark:bg-gray-700" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleProceedToCheckout}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </aside>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;