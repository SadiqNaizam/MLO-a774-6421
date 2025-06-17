import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { toast } from 'sonner';
import { ShoppingCart, CreditCard, ShieldCheck, ChevronRight } from 'lucide-react';

// Zod Schema for Checkout Form Validation
const checkoutFormSchema = z.object({
  // Delivery Address
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  address1: z.string().min(5, { message: "Street address is required." }),
  address2: z.string().optional(),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zip: z.string().regex(/^\d{5}(?:-\d{4})?$/, { message: "Invalid ZIP code format." }),
  phone: z.string().regex(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, { message: "Invalid phone number format." }),

  // Payment Method
  paymentMethod: z.enum(["creditCard", "paypal"], {
    required_error: "Please select a payment method.",
  }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(), // Expected MM/YY
  cvv: z.string().optional(),
  savePaymentInfo: z.boolean().default(false).optional(),

  // Promo Code
  promoCode: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "creditCard") {
    if (!data.cardNumber || !/^\d{13,19}$/.test(data.cardNumber.replace(/\s/g, ''))) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid card number.", path: ["cardNumber"] });
    }
    if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Expiry date must be MM/YY.", path: ["expiryDate"] });
    }
    if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CVV must be 3 or 4 digits.", path: ["cvv"] });
    }
  }
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Dummy data for states
const states = [
  { value: "AL", label: "Alabama" }, { value: "CA", label: "California" },
  { value: "FL", label: "Florida" }, { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" }, // Add more as needed
];

// Dummy cart data
const cartItems = [
  { id: "1", name: "Margherita Pizza", quantity: 1, price: 12.99 },
  { id: "2", name: "Coca-Cola (2L)", quantity: 2, price: 2.50 },
];
const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const deliveryFee = 3.50;
const taxes = subtotal * 0.08; // 8% tax
const totalAmount = subtotal + deliveryFee + taxes;


const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      address1: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      paymentMethod: "creditCard",
      savePaymentInfo: false,
      promoCode: "",
    },
  });

  const watchedPaymentMethod = form.watch("paymentMethod");

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Checkout form submitted:", data);
    // Simulate API call
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Processing your order...',
        success: () => {
          navigate('/order-tracking', { state: { orderId: `FAKE-${Date.now()}` } }); // Navigate to order tracking page
          return `Order placed successfully! Order ID: FAKE-${Date.now()}`;
        },
        error: 'Failed to place order. Please try again.',
      }
    );
  };

  const handleApplyPromoCode = () => {
    const promo = form.getValues("promoCode");
    if (promo) {
      console.log("Applying promo code:", promo);
      toast.info(`Promo code "${promo}" applied (simulation).`);
    } else {
      toast.error("Please enter a promo code.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header cartItemCount={cartItems.length} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/cart">Cart</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 text-center">
          Complete Your Order
        </h1>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form Fields Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                  <CardDescription>Enter where you'd like your order delivered.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="address1" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Street Address</FormLabel>
                      <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="address2" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Apartment, suite, etc. (Optional)</FormLabel>
                      <FormControl><Input placeholder="Apt B" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {states.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="zip" render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl><Input placeholder="12345" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input type="tel" placeholder="(555) 123-4567" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how you'd like to pay.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row gap-4">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="creditCard" id="creditCard" /></FormControl>
                            <FormLabel htmlFor="creditCard" className="font-normal flex items-center"><CreditCard className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400"/> Credit/Debit Card</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="paypal" id="paypal" /></FormControl>
                            <FormLabel htmlFor="paypal" className="font-normal">PayPal</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {watchedPaymentMethod === "creditCard" && (
                    <div className="space-y-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800/50">
                      <FormField control={form.control} name="cardNumber" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="expiryDate" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="cvv" render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl><Input placeholder="123" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </div>
                  )}
                  <FormField control={form.control} name="savePaymentInfo" render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Save payment information for future orders</FormLabel>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Promo Code</CardTitle>
                </CardHeader>
                <CardContent className="flex items-start gap-2">
                  <FormField control={form.control} name="promoCode" render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl><Input placeholder="Enter code" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="button" variant="outline" onClick={handleApplyPromoCode}>Apply</Button>
                </CardContent>
              </Card>

              <Card className="sticky top-24"> {/* Sticky for summary on scroll */}
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Taxes (8%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                  <Button type="submit" className="w-full" size="lg">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Place Order (${totalAmount.toFixed(2)})
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                    <ShieldCheck className="mr-1 h-4 w-4 text-green-600" /> Secure Checkout
                  </p>
                </CardFooter>
              </Card>
            </div>
          </form>
        </FormProvider>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;