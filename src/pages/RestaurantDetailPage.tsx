import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { Star, MapPin, ClockIcon, PhoneIcon, HomeIcon, ChefHatIcon, PlusCircle } from 'lucide-react';

// Placeholder types
interface MenuItemOption {
  sizes?: string[];
  toppings?: string[];
  // Add other option types as needed
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  customizable: boolean;
  options?: MenuItemOption;
}

interface MenuCategory {
  [key: string]: MenuItem[];
}

interface Restaurant {
  name: string;
  cuisine: string;
  address: string;
  hours: string;
  phone: string;
  rating: number;
  imageUrl: string;
  description: string;
  menu: MenuCategory;
}

const placeholderRestaurantData: Restaurant = {
  name: "Luigi's Pizza Palace",
  cuisine: "Italian",
  address: "123 Pepperoni Ave, Cheesenburg, CZ 12345",
  hours: "11:00 AM - 10:00 PM",
  phone: "(555)-PIZZA-01",
  rating: 4.5,
  imageUrl: "https://placehold.co/600x400?text=Delicious+Pizza+Place",
  description: "Experience the taste of authentic Italian cuisine. At Luigi's, we serve a wide variety of classic and gourmet pizzas, fresh pastas, and delightful salads, all prepared with the freshest ingredients in a warm, family-friendly atmosphere. Join us for a memorable dining experience!",
  menu: {
    appetizers: [
      { id: 'app1', name: 'Garlic Knots', description: 'Warm, buttery garlic knots served with a side of rich marinara sauce.', price: 6.99, imageUrl: 'https://placehold.co/300x200?text=Garlic+Knots', customizable: false },
      { id: 'app2', name: 'Caprese Skewers', description: 'Fresh mozzarella, cherry tomatoes, and basil drizzled with balsamic glaze.', price: 8.99, imageUrl: 'https://placehold.co/300x200?text=Caprese+Skewers', customizable: false },
    ],
    mainCourses: [
      { id: 'main1', name: 'Margherita Pizza', description: 'Classic Neapolitan pizza with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.', price: 12.99, imageUrl: 'https://placehold.co/300x200?text=Margherita+Pizza', customizable: true, options: { sizes: ['Medium 12"', 'Large 16"'], toppings: ['Extra Cheese', 'Mushrooms', 'Olives'] } },
      { id: 'main2', name: 'Pepperoni Feast Pizza', description: 'A pepperoni lover\'s dream, generously topped with premium pepperoni slices and mozzarella.', price: 14.99, imageUrl: 'https://placehold.co/300x200?text=Pepperoni+Pizza', customizable: true, options: { sizes: ['Medium 12"', 'Large 16"'], toppings: ['Extra Pepperoni', 'Jalapenos'] } },
      { id: 'main3', name: 'Spaghetti Carbonara', description: 'Authentic Italian pasta dish with eggs, Pecorino Romano cheese, pancetta, and black pepper.', price: 15.99, imageUrl: 'https://placehold.co/300x200?text=Spaghetti+Carbonara', customizable: false },
    ],
    drinks: [
      { id: 'drink1', name: 'Italian Soda', description: 'Refreshing sparkling water with your choice of flavored syrup.', price: 3.50, imageUrl: 'https://placehold.co/300x200?text=Italian+Soda', customizable: false },
      { id: 'drink2', name: 'Espresso', description: 'Rich and aromatic Italian espresso.', price: 2.50, imageUrl: 'https://placehold.co/300x200?text=Espresso', customizable: false },
    ],
    desserts: [
      { id: 'des1', name: 'Tiramisu', description: 'Classic Italian dessert made with ladyfingers, mascarpone cheese, coffee, and cocoa.', price: 7.99, imageUrl: 'https://placehold.co/300x200?text=Tiramisu', customizable: false },
    ]
  }
};

const RestaurantDetailPage: React.FC = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  // States for customization options
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);


  console.log('RestaurantDetailPage loaded');

  const handleOpenDialog = (item: MenuItem) => {
    setSelectedMenuItem(item);
    if (item.customizable && item.options?.sizes) {
      setSelectedSize(item.options.sizes[0]); // Default to first size
    } else {
      setSelectedSize(undefined);
    }
    setSelectedToppings([]); // Reset toppings
    setIsDialogOpen(true);
  };

  const handleAddToCart = () => {
    if (selectedMenuItem) {
      console.log(`Adding ${selectedMenuItem.name} to cart.`);
      if (selectedMenuItem.customizable) {
        console.log("Selected Size:", selectedSize);
        console.log("Selected Toppings:", selectedToppings);
      }
      setCartItemCount(prevCount => prevCount + 1);
      setIsDialogOpen(false);
      toast.success(`${selectedMenuItem.name} added to cart!`);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {Array(fullStars).fill(0).map((_, i) => <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
        {halfStar && <Star key="half" className="h-5 w-5 text-yellow-400 fill-yellow-200" />}
        {Array(emptyStars).fill(0).map((_, i) => <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />)}
        <span className="ml-2 text-sm text-muted-foreground">({rating.toFixed(1)})</span>
      </>
    );
  };

  const handleToppingChange = (topping: string, checked: boolean) => {
    setSelectedToppings(prev => 
      checked ? [...prev, topping] : prev.filter(t => t !== topping)
    );
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header cartItemCount={cartItemCount} />

      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"><HomeIcon className="h-4 w-4" /> Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/* Assuming no dedicated restaurants list page for now, could link to / or be static */}
              <BreadcrumbLink asChild>
                <Link to="/"><ChefHatIcon className="h-4 w-4" /> Restaurants</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{placeholderRestaurantData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Restaurant Details Card */}
        <Card className="mb-8 shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={placeholderRestaurantData.imageUrl} 
                alt={placeholderRestaurantData.name} 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader className="p-6">
                <CardTitle className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{placeholderRestaurantData.name}</CardTitle>
                <CardDescription className="text-lg text-primary dark:text-primary-light mt-1">{placeholderRestaurantData.cuisine}</CardDescription>
                <div className="flex items-center mt-3">
                  {renderStars(placeholderRestaurantData.rating)}
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-gray-700 dark:text-gray-300">
                <p className="mb-4">{placeholderRestaurantData.description}</p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-muted-foreground" /> {placeholderRestaurantData.address}</p>
                  <p className="flex items-center"><ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" /> Open: {placeholderRestaurantData.hours}</p>
                  <p className="flex items-center"><PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" /> {placeholderRestaurantData.phone}</p>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Menu Tabs */}
        <Tabs defaultValue={Object.keys(placeholderRestaurantData.menu)[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
            {Object.keys(placeholderRestaurantData.menu).map(category => (
              <TabsTrigger key={category} value={category} className="capitalize py-2.5">
                {category.replace(/([A-Z])/g, ' $1').trim()} {/* Format camelCase to Title Case */}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(placeholderRestaurantData.menu).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map(item => (
                  <Card key={item.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 w-full overflow-hidden">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover " />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow pt-0">
                      <p className="text-sm text-muted-foreground mb-2 h-16 overflow-y-auto">{item.description}</p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">${item.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" onClick={() => handleOpenDialog(item)}>
                        <PlusCircle className="mr-2 h-4 w-4" /> {item.customizable ? 'Customize & Add' : 'Add to Cart'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Item Customization Dialog */}
      {selectedMenuItem && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedMenuItem.name}</DialogTitle>
              <DialogDescription>
                {selectedMenuItem.description}
              </DialogDescription>
            </DialogHeader>
            
            {selectedMenuItem.customizable && selectedMenuItem.options && (
              <div className="py-4 space-y-6">
                {selectedMenuItem.options.sizes && selectedMenuItem.options.sizes.length > 0 && (
                  <div>
                    <Label className="text-md font-medium">Size</Label>
                    <RadioGroup 
                        defaultValue={selectedMenuItem.options.sizes[0]} 
                        className="mt-2 grid grid-cols-2 gap-2"
                        value={selectedSize}
                        onValueChange={setSelectedSize}
                    >
                      {selectedMenuItem.options.sizes.map(size => (
                        <Label 
                            key={size} 
                            htmlFor={`size-${size.replace(/\s+/g, '-')}`} 
                            className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent ${selectedSize === size ? 'bg-accent ring-2 ring-primary' : ''}`}
                        >
                          <RadioGroupItem value={size} id={`size-${size.replace(/\s+/g, '-')}`} />
                          <span>{size}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                )}
                {selectedMenuItem.options.toppings && selectedMenuItem.options.toppings.length > 0 && (
                  <div>
                    <Label className="text-md font-medium">Toppings</Label>
                    <div className="mt-2 space-y-2">
                      {selectedMenuItem.options.toppings.map(topping => (
                        <div key={topping} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-accent">
                          <Checkbox 
                            id={`topping-${topping.replace(/\s+/g, '-')}`} 
                            onCheckedChange={(checked) => handleToppingChange(topping, !!checked)}
                            checked={selectedToppings.includes(topping)}
                          />
                          <Label htmlFor={`topping-${topping.replace(/\s+/g, '-')}`} className="font-normal cursor-pointer flex-grow">
                            {topping}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {!selectedMenuItem.customizable && (
                <p className="py-4 text-muted-foreground">This item will be added to your cart as is.</p>
            )}

            <DialogFooter className="sm:justify-start">
              <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)} className="mr-2">
                Cancel
              </Button>
              <Button type="button" onClick={handleAddToCart}>
                Add to Cart - ${selectedMenuItem.price.toFixed(2)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;