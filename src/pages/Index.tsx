import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import BookingSystem from '@/components/BookingSystem';
import ResourceHub from '@/components/ResourceHub';
import PeerForum from '@/components/PeerForum';
import MoodTracker from '@/components/MoodTracker';
import AdminDashboard from '@/components/AdminDashboard';
import CrisisManagement from '@/components/CrisisManagement';
import { Heart, MessageSquare, Calendar, Book, Users, TrendingUp, Shield, Star, Globe, Zap } from 'lucide-react';
import heroImage from '@/assets/hero-mental-health.jpg';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const features = [
    {
      icon: MessageSquare,
      title: 'AI Mental Health Companion',
      description: 'Get 24/7 support from our culturally sensitive AI chatbot with crisis detection',
      color: 'text-primary'
    },
    {
      icon: Calendar,
      title: 'Confidential Booking',
      description: 'Schedule anonymous sessions with verified counselors and mental health professionals',
      color: 'text-wellness'
    },
    {
      icon: Book,
      title: 'Multilingual Resources',
      description: 'Access psychoeducational content in Hindi, Urdu, English with offline support',
      color: 'text-accent'
    },
    {
      icon: Users,
      title: 'Anonymous Peer Forum',
      description: 'Connect with other students in a safe, moderated environment for mutual support',
      color: 'text-secondary'
    },
    {
      icon: TrendingUp,
      title: 'Mood & Wellness Tracking',
      description: 'Track your mental health journey with personalized insights and progress monitoring',
      color: 'text-primary'
    },
    {
      icon: Shield,
      title: 'Crisis Management',
      description: 'Immediate access to crisis support with local emergency resources and safety planning',
      color: 'text-crisis'
    }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'chat': return <ChatInterface />;
      case 'booking': return <BookingSystem />;
      case 'resources': return <ResourceHub />;
      case 'forum': return <PeerForum />;
      case 'mood': return <MoodTracker />;
      case 'admin': return <AdminDashboard />;
      case 'crisis': return <CrisisManagement />;
      default: return (
        <main className="min-h-screen bg-gradient-calm">
          {/* Hero Section */}
          <section className="relative pt-20 pb-16 overflow-hidden">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-4xl mx-auto">
                <Badge variant="secondary" className="mb-6 gap-2 text-sm px-4 py-2">
                  <Star className="w-4 h-4" />
                  Stigma-Free • Culturally Sensitive • Privacy-First
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
                  Digital Mental Health Ecosystem for Students
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Comprehensive mental health support designed for higher education students in rural and semi-urban areas. 
                  Anonymous, accessible, and available in your language.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button variant="hero" size="xl" onClick={() => setCurrentPage('chat')} className="gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Start AI Chat Support
                  </Button>
                  <Button variant="wellness" size="xl" onClick={() => setCurrentPage('crisis')} className="gap-2">
                    <Shield className="w-5 h-5" />
                    Crisis Help
                  </Button>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-glow max-w-4xl mx-auto">
                  <img 
                    src={heroImage} 
                    alt="Students in a peaceful, supportive environment representing mental wellness" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Complete Mental Health Support
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need for your mental wellness journey, designed with privacy and cultural sensitivity in mind.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300 h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-gradient-calm rounded-lg">
                            <Icon className={`w-6 h-6 ${feature.color}`} />
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Built for Indian Students
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Globe className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Multilingual Support</h3>
                        <p className="text-muted-foreground">Available in English, Hindi, Urdu and more regional languages</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Shield className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Complete Privacy</h3>
                        <p className="text-muted-foreground">End-to-end encryption, anonymous usage, GDPR compliant</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Zap className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold mb-2">Works Offline</h3>
                        <p className="text-muted-foreground">Access resources and tools even without internet connection</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="shadow-card text-center p-6">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">AI Support Available</div>
                  </Card>
                  <Card className="shadow-card text-center p-6">
                    <div className="text-3xl font-bold text-wellness mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Anonymous & Private</div>
                  </Card>
                  <Card className="shadow-card text-center p-6">
                    <div className="text-3xl font-bold text-accent mb-2">5+</div>
                    <div className="text-sm text-muted-foreground">Regional Languages</div>
                  </Card>
                  <Card className="shadow-card text-center p-6">
                    <div className="text-3xl font-bold text-secondary mb-2">∞</div>
                    <div className="text-sm text-muted-foreground">Offline Resources</div>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <Card className="max-w-4xl mx-auto shadow-glow border-primary/20">
                <CardContent className="pt-12 pb-12">
                  <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Your Mental Health Matters
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Take the first step towards better mental wellness. Our platform is here to support you 
                    every step of the way with complete privacy and cultural understanding.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="hero" size="xl" onClick={() => setCurrentPage('chat')}>
                      Start Your Journey
                    </Button>
                    <Button variant="outline" size="xl" onClick={() => setCurrentPage('resources')}>
                      Explore Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default Index;