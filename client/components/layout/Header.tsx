import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  Crown,
  Hotel,
  Menu,
  User,
  Calendar,
  Utensils,
  Briefcase,
  MapPin,
  ShoppingBag,
  Users,
  Settings,
  Bell,
  Heart,
} from "lucide-react";
import { cn } from "../../lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const guestNavItems = [
    {
      title: "Stay",
      items: [
        {
          title: "Book a Room",
          href: "/book",
          icon: Hotel,
          description: "Luxury accommodations await",
        },
        {
          title: "Special Offers",
          href: "/offers",
          icon: Crown,
          description: "Exclusive deals for special guests",
        },
        {
          title: "Spa & Wellness",
          href: "/spa",
          icon: Heart,
          description: "Rejuvenate your body and soul",
        },
        {
          title: "Fitness Center",
          href: "/fitness",
          icon: Users,
          description: "State-of-the-art facilities",
        },
      ],
    },
    {
      title: "Dine",
      items: [
        {
          title: "Digital Menu",
          href: "/menu",
          icon: Utensils,
          description: "Interactive dining experience",
        },
        {
          title: "Room Service",
          href: "/room-service",
          icon: Bell,
          description: "24/7 luxury dining",
        },
        {
          title: "Events & Banquets",
          href: "/events",
          icon: Calendar,
          description: "Memorable celebrations",
        },
      ],
    },
    {
      title: "Experience",
      items: [
        {
          title: "Travel Desk",
          href: "/travel",
          icon: MapPin,
          description: "Curated local experiences",
        },
        {
          title: "Concierge",
          href: "/concierge",
          icon: Settings,
          description: "Personalized assistance",
        },
        {
          title: "Gift Shop",
          href: "/shop",
          icon: ShoppingBag,
          description: "Luxury souvenirs & more",
        },
        {
          title: "Special Community",
          href: "/blog",
          icon: Users,
          description: "Exclusive member experiences",
        },
      ],
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Crown className="h-8 w-8 text-sheraton-gold" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-sheraton-navy">
                Sheraton
              </span>
              <span className="text-xs text-sheraton-gold font-medium tracking-wide">
                SPECIAL
              </span>
            </div>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {guestNavItems.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger className="text-foreground/60 hover:text-foreground">
                    {section.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md sheraton-gradient p-6 no-underline outline-none focus:shadow-md"
                            to="/"
                          >
                            <Crown className="h-6 w-6 text-white" />
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              {section.title === "Stay"
                                ? "Luxury Awaits"
                                : section.title === "Dine"
                                  ? "Culinary Excellence"
                                  : "Special Moments"}
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              {section.title === "Stay"
                                ? "Experience unparalleled comfort and luxury"
                                : section.title === "Dine"
                                  ? "Savor exceptional flavors and hospitality"
                                  : "Create unforgettable memories"}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {section.items.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                isActive(item.href) &&
                                  "bg-accent text-accent-foreground",
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <item.icon className="h-4 w-4 text-sheraton-gold" />
                                <div className="text-sm font-medium leading-none">
                                  {item.title}
                                </div>
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Crown className="h-6 w-6 text-sheraton-gold" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-sheraton-navy">
                  Sheraton
                </span>
                <span className="text-xs text-sheraton-gold font-medium tracking-wide">
                  SPECIAL
                </span>
              </div>
            </Link>
            <nav className="flex flex-col space-y-3 mt-6">
              {guestNavItems
                .flatMap((section) => section.items)
                .map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive(item.href) && "bg-accent text-accent-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4 text-sheraton-gold" />
                    {item.title}
                  </Link>
                ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Link to="/staff">
              <Button variant="ghost" size="sm" className="text-xs">
                <Briefcase className="h-4 w-4 mr-1" />
                Staff Portal
              </Button>
            </Link>
            <Link to="/profile">
              <Button
                variant="outline"
                size="sm"
                className="sheraton-gradient text-white border-0"
              >
                <User className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">My Account</span>
                <Badge
                  variant="secondary"
                  className="ml-2 bg-white/20 text-white"
                >
                  1,250 pts
                </Badge>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
