import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

// Icons
import { Search, MapPin, Star, Tag, UtensilsCrossed, Percent } from 'lucide-react';

// Placeholder data
const cuisineCategories = [
  { name: 'Italian', icon: <UtensilsCrossed className="mr-2 h-4 w-4" /> },
  { name: 'Chinese', icon: <UtensilsCrossed className="mr-2 h-4 w-4" /> },
  { name: 'Mexican', icon: <UtensilsCrossed className="mr-2 h-4 w-4" /> },
  { name: 'Indian', icon: <UtensilsCrossed className="mr-2 h-4 w-4" /> },
  { name: 'Burgers', icon: <UtensilsCrossed className="mr-2 h-4 w-4" /> },
  { name: 'Pizza', icon: <UtensilsCrossed className="mr-2 h-4 w-4" /> },
  { name: 'Sushi', icon: <UtensilsCrossed className="mr-2 h-4 w-4" /> },
  { name: 'Vegan', icon: <UtensilsCrossed className="mr-2 h-4 w-4" /> },
];

const promotionalBanners = [
  { id: 1, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Delicious pasta dish promotion', title: '50% Off Pasta!', description: 'Enjoy delicious pasta dishes at half price this week only.' },
  { id: 2, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Pizza promotion', title: 'Free Drink with Pizza', description: 'Order any large pizza and get a free drink.' },
  { id:3, imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', alt: 'Fine dining promotion', title: 'Weekend Special', description: 'Exclusive deals for weekend dining.' },
];

const restaurants = [
  { id: '1', name: 'Mama Mia Pizzeria', cuisine: 'Italian', rating: 4.5, deliveryTime: '25-35 min', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60' },
  { id: '2', name: 'Golden Dragon', cuisine: 'Chinese', rating: 4.2, deliveryTime: '30-40 min', imageUrl: 'https://images.unsplash.com/photo-1585851370601-6746f091HWQc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60' },
  { id: '3', name: 'El Sombrero Taqueria', cuisine: 'Mexican', rating: 4.7, deliveryTime: '20-30 min', imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60' },
  { id: '4', name: 'Curry House', cuisine: 'Indian', rating: 4.4, deliveryTime: '35-45 min', imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60' },
  { id: '5', name: 'Burger Barn', cuisine: 'Burgers', rating: 4.0, deliveryTime: '20-25 min', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60' },
  { id: '6', name: 'Sushi Heaven', cuisine: 'Sushi', rating: 4.8, deliveryTime: '40-50 min', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60' },
];

const Homepage = () => {
  console.log('Homepage loaded');

  // Assuming Header cartItemCount is managed globally or fetched, passing 0 for now.
  const cartItemCount = 0; 

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header cartItemCount={cartItemCount} />

      <main className="flex-1">
        {/* Hero/Search Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-primary/80 to-primary dark:from-primary/70 dark:to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Next Meal</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Explore top-rated restaurants and delicious cuisines near you. Fast delivery to your doorstep.
            </p>
            <form className="max-w-xl mx-auto">
              <div className="relative flex items-center">
                <MapPin className="absolute left-4 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your delivery address or zip code"
                  className="w-full pl-12 pr-28 py-3 h-14 text-lg rounded-full shadow-lg focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                />
                <Button type="submit" size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-11 px-6 bg-amber-500 hover:bg-amber-600 text-white">
                  <Search className="h-5 w-5 mr-2 sm:mr-0 md:mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* Cuisine Categories Section */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Tag className="h-7 w-7 text-primary mr-3" />
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">Browse by Cuisine</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {cuisineCategories.map((cuisine) => (
                <Button
                  key={cuisine.name}
                  variant="outline"
                  className="h-auto py-4 px-3 flex flex-col items-center justify-center text-center rounded-lg shadow-sm hover:shadow-md transition-shadow hover:bg-accent dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  {React.cloneElement(cuisine.icon, {className: "h-8 w-8 mb-2 text-primary"})}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cuisine.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banners Section */}
        <section className="py-10 md:py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Percent className="h-7 w-7 text-primary mr-3" />
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">Today's Hot Deals</h2>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {promotionalBanners.map((banner) => (
                  <CarouselItem key={banner.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden shadow-lg h-full flex flex-col">
                      <img src={banner.imageUrl} alt={banner.alt} className="w-full h-48 object-cover"/>
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">{banner.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{banner.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">View Deal</Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white dark:bg-gray-700/80 dark:hover:bg-gray-700 text-primary dark:text-white"/>
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white dark:bg-gray-700/80 dark:hover:bg-gray-700 text-primary dark:text-white"/>
            </Carousel>
          </div>
        </section>

        {/* Featured Restaurants Section */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
                <UtensilsCrossed className="h-7 w-7 text-primary mr-3" />
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">Featured Restaurants</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <Link to="/restaurant-detail" className="block"> {/* Link to static restaurant detail page as per App.tsx */}
                    <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-48 object-cover" />
                  </Link>
                  <CardHeader className="pb-3">
                    <Link to="/restaurant-detail" className="hover:text-primary">
                      <CardTitle className="text-xl font-semibold">{restaurant.name}</CardTitle>
                    </Link>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{restaurant.cuisine}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow pt-0">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" /> {restaurant.rating}
                      <span className="mx-2">|</span>
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                     <Link to="/restaurant-detail" className="w-full"> {/* Link to static restaurant detail page */}
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 dark:border-primary dark:hover:bg-primary/10">
                            View Menu
                        </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
                <Link to="/restaurants"> {/* Assuming a page for all restaurants, not defined in App.tsx, so a generic link */}
                    <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        View All Restaurants
                    </Button>
                </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;