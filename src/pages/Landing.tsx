import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Ruler, ShoppingBag } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(214,165,165,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(200,145,200,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              Powered by AI & 3D Visualization
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Discover Your{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Perfect Style
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Get personalized outfit recommendations based on your unique body type with our advanced 3D visualization technology
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/home")}
                className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/home")}
                className="text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to discover your perfect wardrobe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-gradient-to-b from-accent/50 to-transparent hover:shadow-elegant transition-shadow">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Ruler className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Input Measurements</h3>
              <p className="text-muted-foreground">
                Enter your body measurements using our intuitive sliders and see your 3D model update in real-time
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-gradient-to-b from-accent/50 to-transparent hover:shadow-elegant transition-shadow">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Identify Body Type</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your proportions to determine your body type: hourglass, pear, apple, rectangle, or inverted triangle
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-gradient-to-b from-accent/50 to-transparent hover:shadow-elegant transition-shadow">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Receive personalized outfit recommendations from Colorbox's curated collection that flatter your unique shape
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Style?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of women who've discovered their perfect wardrobe with BodyShape
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/home")}
            className="text-lg px-12 py-6 shadow-elegant hover:shadow-glow transition-all"
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Michael & Vincent. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
