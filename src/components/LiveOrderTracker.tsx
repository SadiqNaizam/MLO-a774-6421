import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { PackageCheck, ChefHat, Bike, Home as HomeIcon, Clock, XCircle, MapPin, CheckCircle2 } from 'lucide-react';

// Define stage types for clarity
type OrderStatus = 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

interface LiveOrderTrackerProps {
  orderId: string;
  currentStatus: OrderStatus;
  estimatedDeliveryTime: string; // e.g., "6:30 PM" or "2024-07-28T18:30:00Z"
  deliveryAddress: string;
  showMapPlaceholder?: boolean;
  restaurantName?: string;
  driverName?: string;
}

const STAGE_DEFINITIONS: { id: OrderStatus; label: string; Icon: React.ElementType }[] = [
  { id: 'CONFIRMED', label: 'Order Confirmed', Icon: PackageCheck },
  { id: 'PREPARING', label: 'Preparing Food', Icon: ChefHat },
  { id: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', Icon: Bike },
  { id: 'DELIVERED', label: 'Delivered', Icon: HomeIcon },
];

// Filter out CANCELLED from STAGE_DEFINITIONS for stepper rendering
const stepperStages = STAGE_DEFINITIONS.filter(s => s.id !== 'CANCELLED');

const statusToProgressValue = (status: OrderStatus): number => {
  switch (status) {
    case 'CONFIRMED': return 20; // Adjusted for 4 main stages before delivery completion
    case 'PREPARING': return 45;
    case 'OUT_FOR_DELIVERY': return 70;
    case 'DELIVERED': return 100;
    case 'CANCELLED': return 0;
    default: return 0;
  }
};

const LiveOrderTracker: React.FC<LiveOrderTrackerProps> = ({
  orderId,
  currentStatus,
  estimatedDeliveryTime,
  deliveryAddress,
  showMapPlaceholder = true,
  restaurantName,
  driverName,
}) => {
  console.log(`LiveOrderTracker loaded for order ID: ${orderId}, status: ${currentStatus}`);

  const currentStageIndex = stepperStages.findIndex(stage => stage.id === currentStatus);

  if (currentStatus === 'CANCELLED') {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="bg-muted/50 p-6">
          <CardTitle className="text-2xl">Order #{orderId}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <XCircle className="h-5 w-5" />
            <AlertTitle className="text-lg">Order Cancelled</AlertTitle>
            <AlertDescription className="mt-1">
              We're sorry, but this order has been cancelled. If you have any questions or need further assistance, please contact customer support.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-muted/50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
                <CardTitle className="text-2xl leading-tight">Track Your Order: #{orderId}</CardTitle>
                {restaurantName && <CardDescription className="mt-1 text-md">From: {restaurantName}</CardDescription>}
            </div>
            <div className="text-left sm:text-right mt-2 sm:mt-0">
                <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                <p className="text-lg font-semibold flex items-center sm:justify-end">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    {estimatedDeliveryTime}
                </p>
            </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-8">
        {/* Stepper/Timeline */}
        <div>
          <div className="flex items-start">
            {stepperStages.map((stage, index) => {
              const isStepCompleted = currentStageIndex > index || (stage.id === 'DELIVERED' && currentStatus === 'DELIVERED');
              const isStepActive = stage.id === currentStatus && currentStatus !== 'DELIVERED';
              // const isStepPending = currentStageIndex < index && currentStatus !== 'DELIVERED'; // Implicitly handled by default

              let iconClasses = "h-7 w-7";
              let textClasses = "text-xs sm:text-sm font-medium mt-2 text-center";
              let stepRingClasses = "rounded-full p-3 flex items-center justify-center transition-all duration-300";

              if (isStepActive) {
                iconClasses += " text-primary"; // Removed animate-pulse for cleaner look, can be added back
                textClasses += " text-primary";
                stepRingClasses += " bg-primary/10 ring-2 ring-primary shadow-md";
              } else if (isStepCompleted) {
                iconClasses += " text-green-600";
                textClasses += " text-green-700";
                stepRingClasses += " bg-green-100";
              } else { // Pending
                iconClasses += " text-gray-400";
                textClasses += " text-muted-foreground";
                stepRingClasses += " bg-gray-100 dark:bg-gray-700";
              }

              // Connector line styling
              let connectorBg = 'bg-gray-300 dark:bg-gray-600';
              if (currentStageIndex > index) { 
                  connectorBg = 'bg-green-500';
              } else if (currentStageIndex === index && currentStatus !== 'DELIVERED') { 
                  connectorBg = 'bg-primary';
              }
              
              return (
                <React.Fragment key={stage.id}>
                  <div className="flex flex-col items-center w-1/4">
                    <div className={stepRingClasses}>
                      <stage.Icon className={iconClasses} strokeWidth={isStepActive || isStepCompleted ? 2.5 : 2} />
                    </div>
                    <p className={textClasses}>
                      {stage.label}
                    </p>
                  </div>
                  {index < stepperStages.length - 1 && (
                    <div className={`flex-1 h-1.5 rounded-full mt-[22px] ${connectorBg} mx-1 sm:mx-2`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {/* Overall Progress Bar */}
          {currentStatus !== 'DELIVERED' && (
             <Progress value={statusToProgressValue(currentStatus)} className="w-full h-2.5 mt-6" aria-label={`Order progress: ${statusToProgressValue(currentStatus)}%`} />
          )}
        </div>

        {/* Order Details Section */}
        <div className="space-y-4 pt-4 border-t">
            {driverName && currentStatus === 'OUT_FOR_DELIVERY' && (
                <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                    <Bike className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <AlertTitle className="text-blue-700 dark:text-blue-300">Your rider, {driverName}, is on the way!</AlertTitle>
                    {/* <AlertDescription>Vehicle: {driverVehicle}</AlertDescription> */}
                </Alert>
            )}
            
            <div className="flex items-start space-x-3 p-4 border rounded-lg bg-background shadow-sm">
                <MapPin className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                    <p className="text-sm font-semibold text-muted-foreground">Delivery Address</p>
                    <p className="text-base text-foreground">{deliveryAddress}</p>
                </div>
            </div>
        </div>

        {/* Simplified Map Placeholder */}
        {showMapPlaceholder && (currentStatus === 'OUT_FOR_DELIVERY' || currentStatus === 'PREPARING') && ( // Show map earlier potentially
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Live Location</h3>
            <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 border">
              <MapPin className="h-12 w-12 mb-2" />
              <p className="font-medium">Live Map Unavailable</p>
              <p className="text-xs">Map integration feature coming soon.</p>
            </div>
          </div>
        )}
      </CardContent>

      {currentStatus === 'DELIVERED' && (
        <CardFooter className="p-6 bg-green-50 dark:bg-green-900/20 border-t border-green-200 dark:border-green-700">
            <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                    <p className="text-xl font-semibold text-green-700 dark:text-green-300">Order Delivered!</p>
                    <p className="text-sm text-muted-foreground">Enjoy your meal. Thank you for choosing us!</p>
                </div>
            </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default LiveOrderTracker;