import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Home, Menu, Package2, Search, ShoppingCart, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  console.log('Header loaded');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Placeholder for search functionality. In a real app, you might navigate to a search results page.
      // Example: navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      console.log('Search submitted:', searchTerm);
      setSearchTerm(''); // Clear search term after submission
      if (mobileMenuOpen) {
        setMobileMenuOpen(false); // Close mobile menu if search was from there
      }
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section: Logo & Desktop Navigation */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg hidden sm:inline-block">FoodApp</span>
          </Link>
          <nav className="hidden md:flex items-center gap-3 text-sm font-medium">
            <Link
              to="/"
              className="text-muted-foreground transition-colors hover:text-foreground px-2 py-1 rounded-md hover:bg-accent"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            {/* Future desktop navigation links can be added here */}
          </nav>
        </div>

        {/* Center Section: Desktop Search */}
        <div className="flex-1 flex justify-center px-2 sm:px-4">
          <form onSubmit={handleSearchSubmit} className="w-full max-w-xs sm:max-w-sm md:max-w-md hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants, dishes..."
                className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Right Section: Icons & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/user-profile" onClick={closeMobileMenu}>
            <Button variant="ghost" size="icon" aria-label="User Profile">
              <UserIcon className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/cart" onClick={closeMobileMenu}>
            <Button variant="ghost" size="icon" className="relative" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1.5 h-4 w-4 text-[10px] p-0 flex items-center justify-center rounded-full">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs p-4">
                <SheetHeader className="mb-6 text-left">
                  <SheetTitle>
                    <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
                        <Package2 className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg">FoodApp</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                
                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm focus-visible:ring-primary"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </form>

                <nav className="flex flex-col gap-1">
                  <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-accent" onClick={closeMobileMenu}>
                    <Home className="h-5 w-5" /> Home
                  </Link>
                  <Link to="/user-profile" className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-accent" onClick={closeMobileMenu}>
                    <UserIcon className="h-5 w-5" /> Profile
                  </Link>
                  <Link to="/cart" className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-accent" onClick={closeMobileMenu}>
                    <ShoppingCart className="h-5 w-5" /> Cart
                    {cartItemCount > 0 && <Badge variant="secondary" className="ml-auto h-6 w-6 justify-center">{cartItemCount > 9 ? '9+' : cartItemCount}</Badge>}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;