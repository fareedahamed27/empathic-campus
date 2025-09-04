import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Book, Video, Headphones, Download, Search, Filter, Play, Clock, Users, Globe } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'audio' | 'guide';
  category: 'stress' | 'anxiety' | 'depression' | 'relationships' | 'academic' | 'sleep';
  duration?: string;
  language: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isOfflineAvailable: boolean;
  downloadSize?: string;
  rating: number;
  views: number;
}

const ResourceHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  // Mock data - In real app, this would come from your Supabase database
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Managing Exam Anxiety: A Student\'s Guide',
      type: 'article',
      category: 'anxiety',
      language: 'English',
      description: 'Comprehensive strategies to overcome exam stress and perform better under pressure.',
      difficulty: 'beginner',
      isOfflineAvailable: true,
      rating: 4.8,
      views: 2450
    },
    {
      id: '2',
      title: 'Guided Meditation for Deep Relaxation',
      type: 'audio',
      category: 'stress',
      duration: '15 min',
      language: 'Hindi',
      description: 'A calming meditation session to help reduce stress and improve focus.',
      difficulty: 'beginner',
      isOfflineAvailable: true,
      downloadSize: '12 MB',
      rating: 4.9,
      views: 3200
    },
    {
      id: '3',
      title: 'Building Healthy Sleep Habits',
      type: 'video',
      category: 'sleep',
      duration: '8 min',
      language: 'English',
      description: 'Expert tips on improving sleep quality for better mental health.',
      difficulty: 'beginner',
      isOfflineAvailable: false,
      rating: 4.7,
      views: 1800
    },
    {
      id: '4',
      title: 'Coping with Depression: Self-Care Strategies',
      type: 'guide',
      category: 'depression',
      language: 'Urdu',
      description: 'A comprehensive guide with practical daily strategies for managing depression.',
      difficulty: 'intermediate',
      isOfflineAvailable: true,
      downloadSize: '5 MB',
      rating: 4.9,
      views: 2100
    },
    {
      id: '5',
      title: 'Social Anxiety in University Settings',
      type: 'article',
      category: 'relationships',
      language: 'English',
      description: 'Understanding and managing social anxiety in academic environments.',
      difficulty: 'intermediate',
      isOfflineAvailable: true,
      rating: 4.6,
      views: 1650
    },
    {
      id: '6',
      title: 'Time Management for Students',
      type: 'video',
      category: 'academic',
      duration: '12 min',
      language: 'Hindi',
      description: 'Effective techniques to balance academic workload and reduce stress.',
      difficulty: 'beginner',
      isOfflineAvailable: false,
      rating: 4.8,
      views: 2800
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📚' },
    { id: 'stress', name: 'Stress Management', icon: '🧘' },
    { id: 'anxiety', name: 'Anxiety Help', icon: '💙' },
    { id: 'depression', name: 'Depression Support', icon: '🌟' },
    { id: 'relationships', name: 'Relationships', icon: '👥' },
    { id: 'academic', name: 'Academic Success', icon: '📖' },
    { id: 'sleep', name: 'Sleep & Rest', icon: '😴' }
  ];

  const languages = [
    { id: 'all', name: 'All Languages' },
    { id: 'English', name: 'English' },
    { id: 'Hindi', name: 'हिंदी' },
    { id: 'Urdu', name: 'اردو' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <Book className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Headphones className="w-4 h-4" />;
      case 'guide': return <Book className="w-4 h-4" />;
      default: return <Book className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-wellness text-wellness-foreground';
      case 'intermediate': return 'bg-accent text-accent-foreground';
      case 'advanced': return 'bg-crisis text-crisis-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gradient-calm p-4 space-y-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              Mental Health Resource Hub
              <Badge variant="secondary" className="ml-auto">
                <Globe className="w-3 h-3 mr-1" />
                Multilingual
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Filters */}
        <Card className="shadow-card">
          <CardContent className="pt-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="gap-2"
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Language Filter */}
            <div>
              <h3 className="font-medium mb-3">Language</h3>
              <div className="flex gap-2">
                {languages.map((language) => (
                  <Button
                    key={language.id}
                    variant={selectedLanguage === language.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLanguage(language.id)}
                  >
                    {language.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(resource.type)}
                    <Badge variant="outline" className="capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  {resource.isOfflineAvailable && (
                  <Badge variant="secondary" className="text-xs">
                    <Download className="w-3 h-3 mr-1" />
                    Offline
                  </Badge>
                  )}
                </div>
                <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {resource.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {resource.duration}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {resource.views}
                  </div>
                  <div className="flex items-center gap-1">
                    ⭐ {resource.rating}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {resource.language}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </Badge>
                  {resource.downloadSize && (
                    <Badge variant="outline" className="text-xs">
                      {resource.downloadSize}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="flex-1 gap-2">
                    <Play className="w-3 h-3" />
                    Open
                  </Button>
                  {resource.isOfflineAvailable && (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="pt-6 text-center">
              <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No resources found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search terms or filters to find more resources.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResourceHub;