import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { History, Calendar, Ruler } from "lucide-react";
import { calculateBodyType } from "@/utils/bodyTypeCalculator";

interface Measurement {
  id: string;
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  inseam: number;
  body_type: string;
  created_at: string;
}

export default function PastResults() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  useEffect(() => {
    loadMeasurements();
  }, []);

  const loadMeasurements = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from("body_measurements")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMeasurements(data || []);
    } catch (error: any) {
      console.error("Error loading measurements:", error);
      toast.error("Failed to load past results");
    } finally {
      setLoading(false);
    }
  };

  const viewResult = (measurement: Measurement) => {
    const bodyTypeResult = calculateBodyType({
      chest: measurement.chest,
      waist: measurement.waist,
      hips: measurement.hips,
      height: measurement.height,
    });

    navigate("/results", {
      state: {
        measurements: measurement,
        bodyTypeResult,
      },
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Past Results
        </h1>
        <p className="text-muted-foreground">
          View your measurement history and body type analyses
        </p>
      </div>

      {measurements.length === 0 ? (
        <Card className="shadow-elegant">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <History className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Past Results</h3>
            <p className="text-muted-foreground mb-4">
              You haven't taken any measurements yet
            </p>
            <Button onClick={() => navigate("/home")}>
              Take Your First Measurement
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {measurements.map((measurement) => (
            <Card key={measurement.id} className="shadow-elegant hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">Measurement</CardTitle>
                  <Badge className="bg-gradient-to-r from-primary to-primary-glow">
                    {measurement.body_type}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(measurement.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Height:</span>
                    <span className="font-medium">{measurement.height}"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">{measurement.weight}lb</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Chest:</span>
                    <span className="font-medium">{measurement.chest}"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Waist:</span>
                    <span className="font-medium">{measurement.waist}"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Hips:</span>
                    <span className="font-medium">{measurement.hips}"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Inseam:</span>
                    <span className="font-medium">{measurement.inseam}"</span>
                  </div>
                </div>
                <Button
                  onClick={() => viewResult(measurement)}
                  className="w-full mt-4"
                  variant="outline"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
