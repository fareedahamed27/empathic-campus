import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, MapPin, Clock, AlertTriangle, Heart, Users, Globe, Shield } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  type: 'national' | 'local' | 'university' | 'text' | 'online';
  available24h: boolean;
  languages: string[];
  description: string;
}

interface LocalResource {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'counselor' | 'support-group';
  address: string;
  phone: string;
  distance: string;
  isOpen: boolean;
  specialties: string[];
}

const CrisisManagement: React.FC = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Emergency helplines - Real numbers for mental health support in India
  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'National Suicide Prevention Helpline',
      phone: '1800-599-0019',
      type: 'national',
      available24h: true,
      languages: ['English', 'Hindi'],
      description: '24/7 free confidential suicide prevention hotline'
    },
    {
      id: '2',
      name: 'Vandrevala Foundation Helpline',
      phone: '1860-2662-345',
      type: 'national', 
      available24h: true,
      languages: ['English', 'Hindi'],
      description: '24/7 mental health support and crisis intervention'
    },
    {
      id: '3',
      name: 'AASRA Crisis Helpline',
      phone: '91-9820466726',
      type: 'national',
      available24h: true,
      languages: ['English', 'Hindi'],
      description: 'Emotional support and suicide prevention'
    },
    {
      id: '4',
      name: 'iCall Helpline',
      phone: '9152987821',
      type: 'national',
      available24h: false,
      languages: ['English', 'Hindi'],
      description: 'Counseling service by TISS (10 AM - 8 PM)'
    },
    {
      id: '5',
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      type: 'text',
      available24h: true,
      languages: ['English'],
      description: '24/7 crisis support via text message'
    }
  ];

  // Mock local resources - In real app, this would be fetched based on user's location
  const localResources: LocalResource[] = [
    {
      id: '1',
      name: 'University Health Center',
      type: 'clinic',
      address: 'Campus Medical Center, Block A',
      phone: '+91-11-2659-1234',
      distance: '0.5 km',
      isOpen: true,
      specialties: ['Mental Health', 'Emergency Care']
    },
    {
      id: '2',
      name: 'City General Hospital',
      type: 'hospital',
      address: 'MG Road, Sector 15',
      phone: '+91-11-2659-5678',
      distance: '2.3 km',
      isOpen: true,
      specialties: ['Emergency Care', 'Psychiatry']
    },
    {
      id: '3',
      name: 'Mind Wellness Clinic',
      type: 'clinic',
      address: 'Plaza Complex, 3rd Floor',
      phone: '+91-11-2659-9012',
      distance: '1.8 km',
      isOpen: false,
      specialties: ['Counseling', 'Therapy']
    },
    {
      id: '4',
      name: 'Student Support Group',
      type: 'support-group',
      address: 'Community Center, Hall 2',
      phone: '+91-11-2659-3456',
      distance: '1.2 km',
      isOpen: true,
      specialties: ['Peer Support', 'Group Therapy']
    }
  ];

  const copingStrategies = [
    {
      title: "Ground Yourself",
      technique: "5-4-3-2-1 Technique",
      description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
      icon: "🌱"
    },
    {
      title: "Breathe Deeply", 
      technique: "Box Breathing",
      description: "Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat.",
      icon: "🫁"
    },
    {
      title: "Stay Safe",
      technique: "Remove Harmful Objects",
      description: "Move away from anything that could cause harm. Call someone you trust.",
      icon: "🛡️"
    },
    {
      title: "Connect",
      technique: "Reach Out",
      description: "Text or call someone who cares. You don't have to be alone.",
      icon: "🤝"
    }
  ];

  const getLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleEmergencyCall = (phone: string) => {
    // In a real app, this would initiate a call
    if (phone.startsWith('Text')) {
      alert(`Opening messaging app to text: ${phone}`);
    } else {
      alert(`Calling: ${phone}\n\nIn a real app, this would directly initiate the call.`);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'hospital': return '🏥';
      case 'clinic': return '🏪';
      case 'counselor': return '👩‍⚕️';
      case 'support-group': return '👥';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Crisis Mode Alert */}
      {isEmergencyMode && (
        <div className="bg-crisis text-crisis-foreground p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 animate-gentle-pulse" />
            <span className="font-semibold">Crisis Support Mode Activated</span>
          </div>
          <p className="text-sm">You are not alone. Help is available immediately.</p>
        </div>
      )}

      <div className="p-4 space-y-6">
        <div className="container mx-auto max-w-4xl">
          {/* Emergency Button */}
          <Card className="shadow-glow border-crisis">
            <CardContent className="pt-6 text-center">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Button
                    variant="crisis"
                    size="xl"
                    onClick={() => setIsEmergencyMode(true)}
                    className="w-48 h-48 rounded-full text-2xl font-bold shadow-glow animate-gentle-pulse"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <AlertTriangle className="w-12 h-12" />
                      <span>CRISIS</span>
                      <span>HELP</span>
                    </div>
                  </Button>
                </div>
                <p className="text-lg font-medium">Need immediate help? Click for instant support.</p>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  This will connect you to crisis support services and show emergency resources in your area.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Immediate Coping Strategies */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-wellness" />
                Immediate Coping Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {copingStrategies.map((strategy, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{strategy.icon}</span>
                      <div>
                        <h3 className="font-semibold">{strategy.title}</h3>
                        <p className="text-sm text-muted-foreground">{strategy.technique}</p>
                      </div>
                    </div>
                    <p className="text-sm">{strategy.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Emergency Helplines
                <Badge variant="secondary" className="ml-auto">
                  <Globe className="w-3 h-3 mr-1" />
                  Available Now
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <div className="flex gap-2">
                          {contact.available24h && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              <Clock className="w-3 h-3 mr-1" />
                              24/7
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {contact.type === 'text' ? <MessageSquare className="w-3 h-3 mr-1" /> : <Phone className="w-3 h-3 mr-1" />}
                            {contact.type}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{contact.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Languages:</span>
                        {contact.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="crisis"
                      size="lg"
                      onClick={() => handleEmergencyCall(contact.phone)}
                      className="gap-2 ml-4"
                    >
                      {contact.type === 'text' ? <MessageSquare className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                      {contact.phone}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Local Resources */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Nearby Resources
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={getLocationPermission}
                  className="gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Find Near Me
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {localResources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold">{resource.name}</h3>
                          <Badge
                            variant={resource.isOpen ? "secondary" : "outline"}
                            className={`text-xs ${resource.isOpen ? 'bg-green-100 text-green-800' : ''}`}
                          >
                            {resource.isOpen ? 'Open Now' : 'Closed'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{resource.address}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{resource.distance}</span>
                          <span>•</span>
                          <span>{resource.specialties.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        variant={resource.isOpen ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleEmergencyCall(resource.phone)}
                        className="gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <MapPin className="w-4 h-4" />
                        Directions
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {!userLocation && (
                <div className="text-center py-6 border-t">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Enable location access to find resources nearest to you
                  </p>
                  <Button variant="outline" onClick={getLocationPermission}>
                    Enable Location
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Safety Plan */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-wellness" />
                Your Safety Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Warning Signs</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Feeling hopeless or trapped</li>
                    <li>• Increased anxiety or agitation</li>
                    <li>• Withdrawal from friends and activities</li>
                    <li>• Changes in sleep or eating patterns</li>
                    <li>• Increased substance use</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Coping Strategies</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Call someone you trust</li>
                    <li>• Use breathing exercises</li>
                    <li>• Go to a safe, public place</li>
                    <li>• Use the crisis chat or helplines</li>
                    <li>• Remove access to harmful objects</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="shadow-card border-muted">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Your Privacy is Protected</p>
                  <p>
                    All crisis support interactions are confidential. Emergency contacts may only be notified 
                    if there's immediate danger and you provide explicit consent, or in cases where legal 
                    requirements mandate reporting.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CrisisManagement;