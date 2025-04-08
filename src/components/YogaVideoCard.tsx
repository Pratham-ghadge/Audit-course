
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface YogaVideoCardProps {
  title: string;
  description: string;
  videoUrl: string;
}

const YogaVideoCard: React.FC<YogaVideoCardProps> = ({ title, description, videoUrl }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="aspect-video w-full mb-4 bg-muted rounded-md overflow-hidden">
          <iframe 
            src={videoUrl} 
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => window.open(videoUrl, '_blank')}>
          Watch Full Video
        </Button>
      </CardFooter>
    </Card>
  );
};

export default YogaVideoCard;
