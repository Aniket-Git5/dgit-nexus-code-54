
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitBranch, Infinity, User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InteractiveEntryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', username: '' });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const entryRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!iframeRef.current || !entryRef.current) return;

      // Calculate cursor position relative to the viewport
      const rect = entryRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Send cursor position to iframe for hover effects
      try {
        iframeRef.current.contentWindow?.postMessage({
          type: 'cursor_position',
          x: x,
          y: y
        }, '*');
      } catch (error) {
        // Silently handle cross-origin restrictions
      }
    };

    const section = entryRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => {
        section.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const handleInternetIdentityLogin = () => {
    setIsLoading(true);
    
    // Open Internet Identity in a new tab to avoid CORS restrictions
    const internetIdentityWindow = window.open('https://identity.ic0.app/', '_blank', 'noopener,noreferrer');
    
    // Simulate authentication flow - in real implementation, Internet Identity would postMessage back
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, ask user about existing account
      const hasExistingAccount = confirm('Do you have an existing Internet Identity account?\n\nClick OK for YES, Cancel for NO');
      
      if (hasExistingAccount) {
        // User has existing account, redirect to dashboard
        localStorage.setItem('hasVisitedLandingPage', 'true');
        navigate('/dashboard');
      } else {
        // User doesn't have account, show create account form
        setShowCreateAccount(true);
      }
      
      // Close the Internet Identity window if it's still open
      if (internetIdentityWindow && !internetIdentityWindow.closed) {
        internetIdentityWindow.close();
      }
    }, 2000);
  };

  const handleCreateAccount = () => {
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      localStorage.setItem('hasVisitedLandingPage', 'true');
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/dashboard');
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div 
      ref={entryRef}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Desktop Interactive Background - Only on screens larger than 1024px */}
      <div className="absolute inset-0 hidden lg:block">
        <iframe 
          ref={iframeRef}
          src='https://my.spline.design/backlightbgeffect-BsrDTMwnuQ1pzHIOA1AgaXQe/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-auto"
          style={{ border: 'none' }}
          title="Interactive Background Model"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* Mobile/Tablet Static Background - Only on screens 1024px and below */}
      <div className="absolute inset-0 lg:hidden bg-gradient-to-br from-black via-purple-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/30 via-transparent to-purple-600/20"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-purple-900/40 to-black/80"></div>
      </div>

      {/* Central Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div className="glass p-8 md:p-12 max-w-md w-full text-center pointer-events-auto relative">
          {/* Gradient Background for the content div */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/90 rounded-xl backdrop-blur-lg border border-purple-500/20"></div>
          
          {/* Content */}
          <div className="relative z-10 space-y-6">
            {!showCreateAccount ? (
              <>
                {/* Logo and Text */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/30">
                    <GitBranch size={24} className="text-purple-400" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white purple-glow">
                    Dgit - Decentralised Github
                  </h1>
                </div>

                {/* Login Button */}
                <div className="relative">
                  {!isLoading ? (
                    <Button 
                      onClick={handleInternetIdentityLogin}
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 glow transition-all duration-300"
                    >
                      Login with Internet Identity
                    </Button>
                  ) : (
                    <div className="w-full py-4 flex items-center justify-center">
                      <InfinityLoader />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Create Account Form */}
                <Card className="bg-transparent border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white text-center flex items-center justify-center gap-2">
                      <User size={20} className="text-purple-400" />
                      Create Your Account
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-purple-200">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-black/40 border-purple-500/30 text-white placeholder:text-purple-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-purple-200">Email</Label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-black/40 border-purple-500/30 text-white placeholder:text-purple-300 pl-10"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-purple-200">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="bg-black/40 border-purple-500/30 text-white placeholder:text-purple-300"
                        placeholder="Choose a username"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => setShowCreateAccount(false)}
                        variant="outline"
                        className="flex-1 border-purple-500/30 text-purple-200 hover:bg-purple-600/20"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleCreateAccount}
                        disabled={!formData.name || !formData.email || !formData.username || isLoading}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                      >
                        {isLoading ? <InfinityLoader /> : 'Create Account'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Infinity Symbol Loader Component
const InfinityLoader = () => {
  return (
    <div className="relative w-16 h-8 flex items-center justify-center">
      <svg
        width="64"
        height="32"
        viewBox="0 0 64 32"
        className="animate-infinity"
      >
        <path
          d="M16 16c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zm32 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-purple-400"
        />
        <circle
          r="3"
          fill="currentColor"
          className="text-purple-300"
        >
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path="M16 16c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zm32 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16z"
          />
        </circle>
      </svg>
    </div>
  );
};

export default InteractiveEntryPage;
