import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

// Lucide Icons
import { User, MapPin, CreditCard, History, Settings as SettingsIcon, Edit2, PlusCircle, Trash2, Bell } from 'lucide-react';

// Placeholder Data
const userProfile = {
  name: 'Alice Wonderland',
  email: 'alice.wonderland@example.com',
  avatarUrl: 'https://avatar.vercel.sh/alice', // Using Vercel Avatars for placeholder
  initials: 'AW',
  phone: '123-456-7890',
};

const deliveryAddresses = [
  { id: '1', street: '123 Main St', city: 'Anytown', state: 'CA', zip: '90210', country: 'USA', isDefault: true },
  { id: '2', street: '456 Oak Ave', city: 'Otherville', state: 'NY', zip: '10001', country: 'USA', isDefault: false },
];

const paymentMethods = [
  { id: '1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: '2', type: 'PayPal', email: 'alice.paypal@example.com', isDefault: false },
];

const orderHistory = [
  { id: 'ORD789', date: '2024-07-15', total: 45.99, status: 'Delivered', items: 'Pizza, Coke' },
  { id: 'ORD654', date: '2024-07-10', total: 22.50, status: 'Delivered', items: 'Burger, Fries' },
  { id: 'ORD321', date: '2024-06-28', total: 30.00, status: 'Cancelled', items: 'Sushi Platter' },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');
  const [activeTab, setActiveTab] = useState("profile");

  // Basic form state example (not fully functional, for layout)
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile saved:", { name, email, phone });
    // Add API call or state update logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header cartItemCount={3} /> {/* Example cart item count */}

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-muted-foreground">Manage your account details and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: User Avatar and Quick Info (Optional - can be part of Profile Tab) */}
          <Card className="lg:w-1/3 h-fit sticky top-24">
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4 ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                <AvatarFallback>{userProfile.initials}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
              <CardDescription>{userProfile.email}</CardDescription>
            </CardHeader>
            {/* Could add quick links or summary stats here if needed */}
          </Card>

          {/* Right Column: Tabs for Profile Management */}
          <div className="lg:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6">
                <TabsTrigger value="profile" className="flex-1">
                  <User className="mr-2 h-4 w-4" /> Profile
                </TabsTrigger>
                <TabsTrigger value="addresses" className="flex-1">
                  <MapPin className="mr-2 h-4 w-4" /> Addresses
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex-1">
                  <CreditCard className="mr-2 h-4 w-4" /> Payment
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex-1">
                  <History className="mr-2 h-4 w-4" /> Orders
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">
                  <SettingsIcon className="mr-2 h-4 w-4" /> Settings
                </TabsTrigger>
              </TabsList>

              {/* Profile Information Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your name, email, and phone number.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSave} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" />
                      </div>
                      <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Delivery Addresses Tab */}
              <TabsContent value="addresses">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Delivery Addresses</CardTitle>
                      <CardDescription>Manage your saved shipping addresses.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {deliveryAddresses.map((addr) => (
                      <Card key={addr.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{addr.street}</p>
                            <p className="text-sm text-muted-foreground">{`${addr.city}, ${addr.state} ${addr.zip}, ${addr.country}`}</p>
                            {addr.isDefault && <Badge variant="secondary" className="mt-1">Default</Badge>}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            {!addr.isDefault && (
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                    {deliveryAddresses.length === 0 && <p className="text-muted-foreground">No addresses saved yet.</p>}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Methods Tab */}
              <TabsContent value="payment">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your saved payment options.</CardDescription>
                    </div>
                     <Button variant="outline" size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Payment Method
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {paymentMethods.map((method) => (
                      <Card key={method.id} className="p-4">
                         <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{method.type} ending in {method.last4 || method.email}</p>
                            {method.expiry && <p className="text-sm text-muted-foreground">Expires: {method.expiry}</p>}
                            {method.isDefault && <Badge variant="secondary" className="mt-1">Default</Badge>}
                          </div>
                           <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                             {!method.isDefault && (
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                     {paymentMethods.length === 0 && <p className="text-muted-foreground">No payment methods saved yet.</p>}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Order History Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View your past orders and their status.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderHistory.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              <Link to={`/order-tracking?orderId=${order.id}`} className="text-primary hover:underline">
                                #{order.id}
                              </Link>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell className="max-w-xs truncate">{order.items}</TableCell>
                            <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={
                                order.status === 'Delivered' ? 'default' : // 'default' for success-like
                                order.status === 'Cancelled' ? 'destructive' :
                                'secondary' // For other statuses like 'Processing'
                              }>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/order-tracking?orderId=${order.id}`}>View Details</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                         {orderHistory.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                                    You haven't placed any orders yet.
                                </TableCell>
                            </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>App Settings</CardTitle>
                    <CardDescription>Manage your notification preferences and other settings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive updates about your orders and promotions.</p>
                        </div>
                        {/* Shadcn Switch component would be good here, using Button as placeholder */}
                        <Button variant="outline" size="sm">Toggle</Button>
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="pushNotifications" className="font-medium">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Get real-time alerts on your mobile device.</p>
                        </div>
                        <Button variant="outline" size="sm">Toggle</Button>
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Account Management</h3>
                        <Button variant="outline" className="w-full sm:w-auto mr-2 mb-2 sm:mb-0">Change Password</Button>
                        <Button variant="destructive" className="w-full sm:w-auto">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfilePage;