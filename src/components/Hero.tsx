
import React from 'react';
import { Button } from "@/components/ui/button";
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-calm-deep bg-clip-text text-transparent animate-float">
            Find Your Inner Peace
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            Discover personalized yoga practices and stress-relief techniques
            tailored to your unique stress profile with AI-powered recommendations.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}>
              Assess Your Stress
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Learn More
            </Button>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="card-hover bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-stress-light text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Assessment</h3>
              <p className="text-muted-foreground">Understand your unique stress triggers and patterns with our advanced AI analysis.</p>
            </div>
            
            <div className="card-hover bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-stress-light text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Solutions</h3>
              <p className="text-muted-foreground">Get yoga practices and remedies tailored specifically to your stress type and level.</p>
            </div>
            
            <div className="card-hover bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-stress-light text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Guided Practice</h3>
              <p className="text-muted-foreground">Follow video tutorials and expert articles to implement your personalized stress-relief plan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
