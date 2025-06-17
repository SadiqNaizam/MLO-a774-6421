import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LiveOrderTracker, { OrderStatus } from '@/components/LiveOrderTracker'; // Assuming OrderStatus type is exported

// shadcn/ui Components
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// lucide-react Icons
import { MessageSquare, ShoppingBag } from 'lucide-react';

const OrderTrackingPage: React.FC = () => {
  console.log('OrderTrackingPage loaded');

  // Example order data - in a real app, this would come from state/API
  const orderId = "FD7890123";
  const currentStatus: OrderStatus = 'OUT_FOR_DELIVERY'; // To show more features like driver and map
  const estimatedDeliveryTime = "Approx. 15-25 mins";
  const deliveryAddress = "456 Delivery Rd, Foodie City, FC 67890";
  const restaurantName = "Pizza Palace";
  const driverName = "Alex P."; // Relevant for 'OUT_FOR_DELIVERY'

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header cartItemCount={0} /> {/* Assuming cart is empty or not relevant here */}
      
      <ScrollArea className="flex-grow">
        <main className="container mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
            Your Order Status
          </h1>

          <LiveOrderTracker
            orderId={orderId}
            currentStatus={currentStatus}
            estimatedDeliveryTime={estimatedDeliveryTime}
            deliveryAddress={deliveryAddress}
            restaurantName={restaurantName}
            driverName={currentStatus === 'OUT_FOR_DELIVERY' ? driverName : undefined}
            showMapPlaceholder={true}
          />

          <Card className="mt-8 max-w-2xl mx-auto shadow-md bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Need Help with Your Order?</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                If you have any issues or questions, we're here to assist you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Our support team is available to help. You can reach us via chat or find more options in our help center.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t dark:border-gray-700">
              <Button variant="outline" className="w-full sm:w-auto dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700">
                <MessageSquare className="mr-2 h-4 w-4" /> Live Chat
              </Button>
              <Button asChild className="w-full sm:w-auto">
                <Link to="/"> {/* Link to homepage, path from App.tsx */}
                  <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
              </Button>
            </CardFooter>
          </Card>

        </main>
      </ScrollArea>
      
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;