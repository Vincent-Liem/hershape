import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { BodyVisualizer3D } from "@/components/BodyVisualizer3D";
import { calculateBodyType } from "@/utils/bodyTypeCalculator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Ruler } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [measurements, setMeasurements] = useState({
    height: 65,
    weight: 141,
    chest: 37,
    waist: 30,
    hips: 40,
    inseam: 30,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateMeasurement = (key: string, value: number[]) => {
    setMeasurements((prev) => ({ ...prev, [key]: value[0] }));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    try {
      const bodyTypeResult = calculateBodyType(measurements);

      const { data: userData } = await supabase.auth.getUser();
      
      if (userData.user) {
        // If logged in, save to database
        const { error } = await supabase.from("body_measurements").insert({
          user_id: userData.user.id,
          height: measurements.height,
          weight: measurements.weight,
          chest: measurements.chest,
          waist: measurements.waist,
          hips: measurements.hips,
          inseam: measurements.inseam,
          body_type: bodyTypeResult.type,
        });

        if (error) throw error;
        toast.success("Measurements saved successfully!");
      } else {
        // If not logged in, just show results without saving
        toast.success("Analysis complete! Sign in to save your results.");
      }

      navigate("/results", { state: { measurements, bodyTypeResult } });
    } catch (error: any) {
      console.error("Error saving measurements:", error);
      toast.error(error.message || "Failed to analyze measurements");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Body Measurement Visualizer
        </h1>
        <p className="text-muted-foreground">
          Enter your measurements to discover your body type and get personalized recommendations
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 3D Visualizer */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-primary" />
              3D Body Model
            </CardTitle>
            <CardDescription>
              Real-time visualization based on your measurements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square">
              <BodyVisualizer3D measurements={measurements} />
            </div>
          </CardContent>
        </Card>

        {/* Measurement Inputs */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Your Measurements</CardTitle>
            <CardDescription>
              Adjust the sliders to match your body measurements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Height: {measurements.height} inches</Label>
              <Slider
                value={[measurements.height]}
                onValueChange={(v) => updateMeasurement("height", v)}
                min={48}
                max={84}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Weight: {measurements.weight} pounds</Label>
              <Slider
                value={[measurements.weight]}
                onValueChange={(v) => updateMeasurement("weight", v)}
                min={80}
                max={300}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Chest: {measurements.chest} inches</Label>
              <Slider
                value={[measurements.chest]}
                onValueChange={(v) => updateMeasurement("chest", v)}
                min={28}
                max={54}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Waist: {measurements.waist} inches</Label>
              <Slider
                value={[measurements.waist]}
                onValueChange={(v) => updateMeasurement("waist", v)}
                min={22}
                max={50}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Hips: {measurements.hips} inches</Label>
              <Slider
                value={[measurements.hips]}
                onValueChange={(v) => updateMeasurement("hips", v)}
                min={28}
                max={58}
                step={0.5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Inseam: {measurements.inseam} inches</Label>
              <Slider
                value={[measurements.inseam]}
                onValueChange={(v) => updateMeasurement("inseam", v)}
                min={24}
                max={38}
                step={0.5}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze & Get Recommendations"}
            </Button>
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
