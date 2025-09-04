import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Heart, AlertTriangle, Shield, Plus, Search, Filter, Users, ThumbsUp, MessageCircle } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string; // Anonymous ID
  timestamp: Date;
  category: 'general' | 'anxiety' | 'depression' | 'academic' | 'relationships';
  mood: 'struggling' | 'improving' | 'good' | 'mixed';
  likes: number;
  replies: number;
  isModerated: boolean;
  tags: string[];
}

const PeerForum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'Feeling overwhelmed with finals approaching',
      content: 'Anyone else feeling super anxious about exams? I can\'t seem to focus and keep procrastinating. Would love to hear how others are coping.',
      author: 'Anonymous_Student_47',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      category: 'academic',
      mood: 'struggling',
      likes: 12,
      replies: 8,
      isModerated: true,
      tags: ['exams', 'anxiety', 'procrastination']
    },
    {
      id: '2',
      title: 'Small victory: Attended my first therapy session',
      content: 'Just wanted to share that I finally took the step to book a counseling session. It was scary but I feel hopeful. To anyone on the fence about it - it\'s worth it.',
      author: 'Anonymous_Warrior_23',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      category: 'general',
      mood: 'improving',
      likes: 34,
      replies: 15,
      isModerated: true,
      tags: ['therapy', 'progress', 'hope']
    },
    {
      id: '3',
      title: 'Dealing with social anxiety in group projects',
      content: 'Group assignments are my worst nightmare. I get so anxious about speaking up that I end up not contributing much. Any tips for managing this?',
      author: 'Anonymous_Quiet_12',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      category: 'anxiety',
      mood: 'mixed',
      likes: 18,
      replies: 22,
      isModerated: true,
      tags: ['social anxiety', 'group work', 'university']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general' as ForumPost['category'],
    mood: 'mixed' as ForumPost['mood'],
    tags: ''
  });

  const categories = [
    { id: 'all', name: 'All Topics', icon: '💬' },
    { id: 'general', name: 'General Support', icon: '🤝' },
    { id: 'anxiety', name: 'Anxiety', icon: '💙' },
    { id: 'depression', name: 'Depression', icon: '🌟' },
    { id: 'academic', name: 'Academic Stress', icon: '📚' },
    { id: 'relationships', name: 'Relationships', icon: '👥' }
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'struggling': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'mixed': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'improving': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'good': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'struggling': return '😓';
      case 'mixed': return '😕';
      case 'improving': return '🙂';
      case 'good': return '😊';
      default: return '😐';
    }
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: `Anonymous_User_${Math.floor(Math.random() * 999)}`,
      timestamp: new Date(),
      category: newPost.category,
      mood: newPost.mood,
      likes: 0,
      replies: 0,
      isModerated: false, // Would be moderated by AI/human moderators
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', category: 'general', mood: 'mixed', tags: '' });
    setShowNewPostForm(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-calm p-4 space-y-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Anonymous Peer Support Forum
              <Badge variant="secondary" className="ml-auto">
                <Shield className="w-3 h-3 mr-1" />
                Moderated & Safe
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Filters and New Post */}
        <Card className="shadow-card">
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:items-center">
                {/* Search */}
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="gap-2 whitespace-nowrap"
                    >
                      <span>{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* New Post Button */}
              <Button
                variant="wellness"
                onClick={() => setShowNewPostForm(true)}
                className="gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                Share Your Experience
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* New Post Form */}
        {showNewPostForm && (
          <Card className="shadow-card border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Share with the Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Post title..."
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              />
              
              <Textarea
                placeholder="Share your thoughts, experiences, or questions. Remember, this is a safe space for anonymous support..."
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value as ForumPost['category'] }))}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="general">General Support</option>
                    <option value="anxiety">Anxiety</option>
                    <option value="depression">Depression</option>
                    <option value="academic">Academic Stress</option>
                    <option value="relationships">Relationships</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Current Mood</label>
                  <select
                    value={newPost.mood}
                    onChange={(e) => setNewPost(prev => ({ ...prev, mood: e.target.value as ForumPost['mood'] }))}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="struggling">Struggling 😓</option>
                    <option value="mixed">Mixed feelings 😕</option>
                    <option value="improving">Getting better 🙂</option>
                    <option value="good">Doing well 😊</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tags</label>
                  <Input
                    placeholder="anxiety, help, tips..."
                    value={newPost.tags}
                    onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                  Cancel
                </Button>
                <Button
                  variant="wellness"
                  onClick={handleCreatePost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                >
                  Post Anonymously
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{formatTimestamp(post.timestamp)}</span>
                        {post.isModerated && (
                          <>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge className={`text-xs ${getMoodColor(post.mood)}`}>
                      {getMoodEmoji(post.mood)} {post.mood}
                    </Badge>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground leading-relaxed">{post.content}</p>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Interactions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        {post.likes} Support
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageCircle className="w-4 h-4" />
                        {post.replies} Replies
                      </Button>
                    </div>
                    <Badge variant="outline" className="capitalize text-xs">
                      {post.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="pt-6 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No posts found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Be the first to share your experience or adjust your search filters.
              </p>
              <Button variant="wellness" onClick={() => setShowNewPostForm(true)}>
                Create First Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PeerForum;