import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Phone, Video, MessageSquare, Shield } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  type: 'urgent' | 'regular';
}

interface Counselor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  languages: string[];
  avatar: string;
}

const BookingSystem: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [sessionType, setSessionType] = useState<'individual' | 'group'>('individual');
  const [preferredMethod, setPreferredMethod] = useState<'video' | 'phone' | 'chat'>('video');
  const [isUrgent, setIsUrgent] = useState(false);

  // Mock data - In real app, this would come from your Supabase database
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00', available: true, type: 'regular' },
    { id: '2', time: '10:00', available: false, type: 'regular' },
    { id: '3', time: '11:00', available: true, type: 'regular' },
    { id: '4', time: '13:00', available: true, type: 'urgent' },
    { id: '5', time: '14:00', available: true, type: 'regular' },
    { id: '6', time: '15:00', available: true, type: 'regular' },
    { id: '7', time: '16:00', available: false, type: 'regular' },
    { id: '8', time: '17:00', available: true, type: 'urgent' },
  ];

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Anxiety & Depression',
      rating: 4.9,
      languages: ['English', 'Hindi'],
      avatar: '👩‍⚕️'
    },
    {
      id: '2', 
      name: 'Dr. Rajesh Patel',
      specialty: 'Academic Stress',
      rating: 4.8,
      languages: ['English', 'Hindi', 'Gujarati'],
      avatar: '👨‍⚕️'
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      specialty: 'Relationship & Social Issues',
      rating: 4.9,
      languages: ['English', 'Hindi', 'Urdu'],
      avatar: '👩‍⚕️'
    }
  ];

  const handleBooking = () => {
    if (!selectedSlot || !selectedCounselor) {
      alert('Please select a time slot and counselor');
      return;
    }

    // Mock booking - In real app, this would create a booking via Supabase
    alert(`Booking confirmed!\n\nDate: ${selectedDate}\nTime: ${selectedSlot.time}\nCounselor: ${selectedCounselor.name}\nType: ${sessionType}\nMethod: ${preferredMethod}`);
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm p-4 space-y-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Book Confidential Session
              <Badge variant="secondary" className="ml-auto">
                <Shield className="w-3 h-3 mr-1" />
                100% Private
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Session Options */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Urgency Toggle */}
              <div className="flex items-center gap-4">
                <Button
                  variant={isUrgent ? "crisis" : "outline"}
                  onClick={() => setIsUrgent(!isUrgent)}
                  className="gap-2"
                >
                  {isUrgent ? '🚨' : '📅'} {isUrgent ? 'Urgent Session' : 'Regular Session'}
                </Button>
                {isUrgent && (
                  <Badge variant="destructive" className="animate-gentle-pulse">
                    Available within 2 hours
                  </Badge>
                )}
              </div>

              {/* Session Type */}
              <div>
                <h3 className="font-medium mb-3">Session Type</h3>
                <div className="flex gap-3">
                  <Button
                    variant={sessionType === 'individual' ? 'default' : 'outline'}
                    onClick={() => setSessionType('individual')}
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    Individual (1-on-1)
                  </Button>
                  <Button
                    variant={sessionType === 'group' ? 'default' : 'outline'}
                    onClick={() => setSessionType('group')}
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    Group Session
                  </Button>
                </div>
              </div>

              {/* Preferred Method */}
              <div>
                <h3 className="font-medium mb-3">Preferred Method</h3>
                <div className="flex gap-3">
                  {(['video', 'phone', 'chat'] as const).map((method) => (
                    <Button
                      key={method}
                      variant={preferredMethod === method ? 'default' : 'outline'}
                      onClick={() => setPreferredMethod(method)}
                      className="gap-2 capitalize"
                    >
                      {getMethodIcon(method)}
                      {method}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="font-medium mb-3">Select Date</h3>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full max-w-xs"
                />
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="font-medium mb-3">Available Time Slots</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={
                        selectedSlot?.id === slot.id
                          ? 'default'
                          : slot.type === 'urgent'
                          ? 'crisis'
                          : 'outline'
                      }
                      disabled={!slot.available}
                      onClick={() => slot.available && setSelectedSlot(slot)}
                      className="gap-2"
                      size="sm"
                    >
                      <Clock className="w-3 h-3" />
                      {slot.time}
                      {slot.type === 'urgent' && '⚡'}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counselor Selection */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Select Counselor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {counselors.map((counselor) => (
                <div
                  key={counselor.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedCounselor?.id === counselor.id
                      ? 'border-primary bg-primary-soft'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedCounselor(counselor)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{counselor.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{counselor.name}</h4>
                      <p className="text-sm text-muted-foreground">{counselor.specialty}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          ⭐ {counselor.rating}
                        </Badge>
                        <div className="flex gap-1">
                          {counselor.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Booking Button */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Ready to Book?</h3>
                <p className="text-sm text-muted-foreground">
                  Your session will be completely confidential and secure.
                </p>
              </div>
              <Button
                onClick={handleBooking}
                disabled={!selectedSlot || !selectedCounselor}
                variant="wellness"
                size="lg"
                className="gap-2"
              >
                <Calendar className="w-4 h-4" />
                Confirm Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingSystem;