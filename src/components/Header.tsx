import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, Phone, Shield, Users } from 'lucide-react';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'home', onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', id: 'home', icon: Heart },
    { name: 'AI Chat', id: 'chat', icon: Heart },
    { name: 'Book Session', id: 'booking', icon: Phone },
    { name: 'Resources', id: 'resources', icon: Shield },
    { name: 'Peer Forum', id: 'forum', icon: Users },
    { name: 'Mood Tracker', id: 'mood', icon: Heart },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate?.(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-header">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-glow">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">DMHES</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Digital Mental Health Ecosystem</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          {/* Crisis Button - Always Visible */}
          <div className="flex items-center gap-3">
            <Button variant="crisis" size="sm" className="hidden sm:flex">
              <Phone className="w-4 h-4" />
              Crisis Help
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-slide-in">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleNavClick(item.id)}
                    className="justify-start gap-2 w-full"
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                );
              })}
              <Button variant="crisis" size="sm" className="sm:hidden justify-start gap-2 mt-2">
                <Phone className="w-4 h-4" />
                Crisis Help
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;