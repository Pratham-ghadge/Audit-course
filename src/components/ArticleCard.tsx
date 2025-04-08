import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  title: string;
  description: string;
  url: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, url }) => {
  const handleReadMore = () => {
    // Ensure URL is valid
    if (!/^https?:\/\//i.test(url)) {
      alert("Invalid URL format. Make sure it starts with http:// or https://");
      return;
    }

    // Securely open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col card-hover transition-transform duration-200 hover:scale-[1.01]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleReadMore}
          aria-label={`Read article: ${title}`}
        >
          Read Article
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
