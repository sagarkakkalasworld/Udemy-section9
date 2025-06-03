import React, { useEffect, useState } from 'react';
import Header from './Header';
import StatusCard from './StatusCard';
import Timeline from './Timeline';
import Footer from './Footer';
import { FadeIn } from './animations/FadeIn';

const Dashboard: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animation purposes
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Header />
        
        <main className="mt-8 sm:mt-16">
          <FadeIn delay={100}>
            <StatusCard 
              title="Deployment Status"
              status="success"
              message="Congratulations Manual Build and Deployment of React Application is Successfull using Azure"
              timestamp={new Date().toLocaleString()}
            />
          </FadeIn>
          
          <FadeIn delay={300}>
            <Timeline />
          </FadeIn>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
