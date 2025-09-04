import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, TrendingUp, Heart, BookOpen, Target, Award } from 'lucide-react';

interface MoodEntry {
  id: string;
  date: Date;
  mood: number; // 1-10 scale
  energy: number; // 1-10 scale
  anxiety: number; // 1-10 scale
  sleep: number; // hours
  notes: string;
  activities: string[];
  gratitude?: string;
}

const MoodTracker: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState<Partial<MoodEntry>>({
    date: new Date(),
    mood: 5,
    energy: 5,
    anxiety: 5,
    sleep: 8,
    notes: '',
    activities: [],
    gratitude: ''
  });

  // Mock historical data - In real app, this would come from your Supabase database
  const [moodHistory] = useState<MoodEntry[]>([
    {
      id: '1',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      mood: 7,
      energy: 6,
      anxiety: 4,
      sleep: 7.5,
      notes: 'Had a good study session today. Feeling more confident about the upcoming exam.',
      activities: ['studying', 'meditation', 'exercise'],
      gratitude: 'Grateful for my supportive friends'
    },
    {
      id: '2',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      mood: 4,
      energy: 3,
      anxiety: 7,
      sleep: 5,
      notes: 'Felt overwhelmed with assignments. Had trouble sleeping.',
      activities: ['studying', 'social media'],
      gratitude: 'Grateful for my comfortable bed'
    },
    {
      id: '3',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      mood: 8,
      energy: 8,
      anxiety: 3,
      sleep: 8,
      notes: 'Great day! Finished a major project and celebrated with friends.',
      activities: ['socializing', 'celebration', 'exercise', 'healthy eating'],
      gratitude: 'Grateful for completing my project successfully'
    }
  ]);

  const moodEmojis = ['😫', '😢', '😔', '😕', '😐', '🙂', '😊', '😄', '😁', '🤩'];
  const energyIcons = ['🔋', '🔋', '⚡', '⚡', '⚡', '💪', '💪', '🚀', '🚀', '✨'];
  const anxietyColors = [
    'bg-green-100 text-green-800',
    'bg-green-100 text-green-800', 
    'bg-yellow-100 text-yellow-800',
    'bg-yellow-100 text-yellow-800',
    'bg-orange-100 text-orange-800',
    'bg-orange-100 text-orange-800',
    'bg-red-100 text-red-800',
    'bg-red-100 text-red-800',
    'bg-red-200 text-red-900',
    'bg-red-300 text-red-900'
  ];

  const availableActivities = [
    'studying', 'exercise', 'meditation', 'socializing', 'hobbies', 'work',
    'family time', 'sleep', 'healthy eating', 'social media', 'gaming', 'reading'
  ];

  const handleActivityToggle = (activity: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      activities: prev.activities?.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...(prev.activities || []), activity]
    }));
  };

  const handleSaveEntry = () => {
    if (!currentEntry.mood || !currentEntry.energy || !currentEntry.anxiety) {
      alert('Please rate your mood, energy, and anxiety levels');
      return;
    }

    // Mock save - In real app, this would save to Supabase
    alert('Mood entry saved! Keep tracking your progress. 🌟');
    
    // Reset form
    setCurrentEntry({
      date: new Date(),
      mood: 5,
      energy: 5,
      anxiety: 5,
      sleep: 8,
      notes: '',
      activities: [],
      gratitude: ''
    });
  };

  const getAverages = () => {
    if (moodHistory.length === 0) return { mood: 0, energy: 0, anxiety: 0, sleep: 0 };
    
    const totals = moodHistory.reduce((acc, entry) => ({
      mood: acc.mood + entry.mood,
      energy: acc.energy + entry.energy,
      anxiety: acc.anxiety + entry.anxiety,
      sleep: acc.sleep + entry.sleep
    }), { mood: 0, energy: 0, anxiety: 0, sleep: 0 });

    return {
      mood: Math.round((totals.mood / moodHistory.length) * 10) / 10,
      energy: Math.round((totals.energy / moodHistory.length) * 10) / 10,
      anxiety: Math.round((totals.anxiety / moodHistory.length) * 10) / 10,
      sleep: Math.round((totals.sleep / moodHistory.length) * 10) / 10
    };
  };

  const averages = getAverages();

  return (
    <div className="min-h-screen bg-gradient-calm p-4 space-y-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Daily Mood & Wellness Tracker
              <Badge variant="secondary" className="ml-auto">
                <TrendingUp className="w-3 h-3 mr-1" />
                Track Progress
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Entry */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Check-in
                <span className="text-sm font-normal text-muted-foreground">
                  {currentEntry.date?.toLocaleDateString()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mood Scale */}
              <div>
                <label className="font-medium mb-3 block">How are you feeling today?</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Terrible</span>
                  <div className="flex gap-1 flex-1 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <Button
                        key={value}
                        variant={currentEntry.mood === value ? 'default' : 'outline'}
                        size="sm"
                        className="w-12 h-12 text-lg"
                        onClick={() => setCurrentEntry(prev => ({ ...prev, mood: value }))}
                      >
                        {moodEmojis[value - 1]}
                      </Button>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Amazing</span>
                </div>
              </div>

              {/* Energy Level */}
              <div>
                <label className="font-medium mb-3 block">Energy Level</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Drained</span>
                  <div className="flex gap-1 flex-1 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <Button
                        key={value}
                        variant={currentEntry.energy === value ? 'default' : 'outline'}
                        size="sm"
                        className="w-12 h-12"
                        onClick={() => setCurrentEntry(prev => ({ ...prev, energy: value }))}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Energized</span>
                </div>
              </div>

              {/* Anxiety Level */}
              <div>
                <label className="font-medium mb-3 block">Anxiety Level</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Calm</span>
                  <div className="flex gap-1 flex-1 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <Button
                        key={value}
                        variant={currentEntry.anxiety === value ? 'default' : 'outline'}
                        size="sm"
                        className="w-12 h-12"
                        onClick={() => setCurrentEntry(prev => ({ ...prev, anxiety: value }))}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Very Anxious</span>
                </div>
              </div>

              {/* Sleep Hours */}
              <div>
                <label className="font-medium mb-3 block">Hours of Sleep</label>
                <div className="flex gap-2">
                  {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((hours) => (
                    <Button
                      key={hours}
                      variant={currentEntry.sleep === hours ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentEntry(prev => ({ ...prev, sleep: hours }))}
                    >
                      {hours}h
                    </Button>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <label className="font-medium mb-3 block">Today's Activities</label>
                <div className="flex flex-wrap gap-2">
                  {availableActivities.map((activity) => (
                    <Button
                      key={activity}
                      variant={currentEntry.activities?.includes(activity) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleActivityToggle(activity)}
                      className="capitalize"
                    >
                      {activity}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Gratitude */}
              <div>
                <label className="font-medium mb-3 block">What are you grateful for today?</label>
                <Textarea
                  placeholder="I'm grateful for..."
                  value={currentEntry.gratitude}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, gratitude: e.target.value }))}
                  rows={2}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="font-medium mb-3 block">Additional Notes</label>
                <Textarea
                  placeholder="How was your day? Any thoughts or reflections..."
                  value={currentEntry.notes}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button variant="wellness" size="lg" onClick={handleSaveEntry} className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Save Today's Entry
              </Button>
            </CardContent>
          </Card>

          {/* Statistics & Progress */}
          <div className="space-y-6">
            {/* Weekly Averages */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mood Average</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{averages.mood}/10</span>
                      <span className="text-lg">{moodEmojis[Math.round(averages.mood) - 1]}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Energy Level</span>
                    <span className="font-medium">{averages.energy}/10</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Anxiety Level</span>
                    <Badge className={`text-xs ${anxietyColors[Math.round(averages.anxiety) - 1]}`}>
                      {averages.anxiety}/10
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sleep Average</span>
                    <span className="font-medium">{averages.sleep}h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-wellness-soft rounded-lg">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <div className="font-medium text-sm">Consistent Tracker</div>
                    <div className="text-xs text-muted-foreground">3 days in a row</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-primary-soft rounded-lg">
                  <span className="text-2xl">💪</span>
                  <div>
                    <div className="font-medium text-sm">Self-Care Champion</div>
                    <div className="text-xs text-muted-foreground">Regular exercise logged</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-accent-soft rounded-lg">
                  <span className="text-2xl">🧘</span>
                  <div>
                    <div className="font-medium text-sm">Mindfulness Master</div>
                    <div className="text-xs text-muted-foreground">Meditation streak: 2 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">
                  Your mood tends to improve on days when you exercise and get good sleep. 
                  Keep up the great work! 💪
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Entries */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodHistory.slice(0, 3).map((entry) => (
                <div key={entry.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm text-muted-foreground">
                        {entry.date.toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{moodEmojis[entry.mood - 1]}</span>
                        <Badge variant="secondary" className="text-xs">
                          {entry.mood}/10
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm">{entry.notes}</p>
                    {entry.gratitude && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        Grateful: {entry.gratitude}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodTracker;