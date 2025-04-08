
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface RecommendationCardProps {
  techniques: string[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ techniques }) => {
  return (
    <Card className="shadow-lg overflow-hidden max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-primary/20 to-calm-light/20 p-6">
        <h3 className="text-xl font-bold mb-2">Daily Practices for Stress Relief</h3>
        <p className="text-muted-foreground">Incorporate these techniques into your routine:</p>
      </div>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {techniques.map((technique, index) => (
          <div key={index} className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p>{technique}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
