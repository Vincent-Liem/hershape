import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft, ShoppingBag, Save, UserPlus } from "lucide-react";
import { BodyTypeResult } from "@/utils/bodyTypeCalculator";
import { supabase } from "@/integrations/supabase/client";

interface LocationState {
  measurements: {
    height: number;
    weight: number;
    chest: number;
    waist: number;
    hips: number;
    inseam: number;
  };
  bodyTypeResult: BodyTypeResult;
}

const mockOutfits = {
  hourglass: [
    { name: "Wrap Dress", price: "$89.99", image: "👗" },
    { name: "Belted Blazer", price: "$129.99", image: "🧥" },
    { name: "High-Waist Jeans", price: "$79.99", image: "👖" },
  ],
  pear: [
    { name: "A-Line Skirt", price: "$69.99", image: "👗" },
    { name: "Boat Neck Top", price: "$49.99", image: "👚" },
    { name: "Structured Jacket", price: "$119.99", image: "🧥" },
  ],
  apple: [
    { name: "Empire Waist Dress", price: "$94.99", image: "👗" },
    { name: "V-Neck Blouse", price: "$54.99", image: "👚" },
    { name: "Wide-Leg Pants", price: "$84.99", image: "👖" },
  ],
  rectangle: [
    { name: "Peplum Top", price: "$59.99", image: "👚" },
    { name: "Belted Dress", price: "$99.99", image: "👗" },
    { name: "Layered Outfit Set", price: "$134.99", image: "🎽" },
  ],
  "inverted-triangle": [
    { name: "A-Line Skirt", price: "$74.99", image: "👗" },
    { name: "Scoop Neck Top", price: "$44.99", image: "👚" },
    { name: "Structured Pants", price: "$89.99", image: "👖" },
  ],
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState<LocationState | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!location.state) {
      navigate("/home");
    } else {
      setState(location.state as LocationState);
    }

    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, [location, navigate]);

  if (!state) {
    return null;
  }

  const { bodyTypeResult } = state;
  const outfits = mockOutfits[bodyTypeResult.type] || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/home")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Measurements
      </Button>

      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Your Body Type Analysis
        </h1>
        <p className="text-muted-foreground">
          Personalized recommendations for your body shape
        </p>
      </div>

      {/* Save Results CTA for Guest Users */}
      {!isAuthenticated && (
        <Card className="mb-6 border-primary/50 shadow-glow bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center flex-shrink-0">
                  <Save className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">Save Your Results & Track Your Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a free account to save your body type analysis, view past measurements, and access your personalized recommendations anytime!
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  onClick={() => navigate("/auth")}
                  className="shadow-elegant"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up Free
                </Button>
                <Button
                  onClick={() => navigate("/auth")}
                  variant="outline"
                >
                  Login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Body Type Card */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Your Body Type
              </CardTitle>
              <Badge className="text-lg px-4 py-1 bg-gradient-to-r from-primary to-primary-glow">
                {bodyTypeResult.type.charAt(0).toUpperCase() + bodyTypeResult.type.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Description</h3>
              <p className="text-muted-foreground">{bodyTypeResult.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-lg">Style Recommendations</h3>
              <ul className="space-y-2">
                {bodyTypeResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Outfit Recommendations */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Recommended Outfits
            </CardTitle>
            <CardDescription>
              From Colorbox Collection - Perfect for your body type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {outfits.map((outfit, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-accent/50 to-muted/50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{outfit.image}</div>
                  <div>
                    <p className="font-semibold">{outfit.name}</p>
                    <p className="text-sm text-muted-foreground">In stock</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{outfit.price}</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-background border-t mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Michael & Vincent. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
