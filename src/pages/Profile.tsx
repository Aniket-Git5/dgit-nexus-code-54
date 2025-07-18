import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  username: string;
  bio: string;
  avatar?: string;
  principalId?: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    bio: '',
    avatar: '',
    principalId: ''
  });
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);
  const { toast } = useToast();

  useEffect(() => {
    // TODO: Replace with real-time Supabase query
    // const fetchProfile = async () => {
    //   const { data: user } = await supabase.auth.getUser();
    //   if (user.user) {
    //     const { data } = await supabase
    //       .from('profiles')
    //       .select('username, bio, avatar_url, principal_id')
    //       .eq('id', user.user.id)
    //       .single();
    //     
    //     const profileData = {
    //       username: data?.username || '',
    //       bio: data?.bio || '',
    //       avatar: data?.avatar_url || '',
    //       principalId: data?.principal_id || ''
    //     };
    //     setProfile(profileData);
    //     setTempProfile(profileData);
    //   }
    // };
    // fetchProfile();
    setIsLoading(false);
  }, []);

  const handleSave = async () => {
    // TODO: Replace with real Supabase update
    // const { data: user } = await supabase.auth.getUser();
    // if (user.user) {
    //   const { error } = await supabase
    //     .from('profiles')
    //     .update({
    //       username: tempProfile.username,
    //       bio: tempProfile.bio
    //     })
    //     .eq('id', user.user.id);
    //   
    //   if (!error) {
    //     setProfile(tempProfile);
    //     setIsEditing(false);
    //     toast({
    //       title: "Success",
    //       description: "Profile updated successfully!"
    //     });
    //   }
    // }
    setProfile(tempProfile);
    setIsEditing(false);
    toast({
      title: "Success",
      description: "Profile updated successfully!"
    });
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-primary" />
            <Link to="/dashboard" className="text-xl font-bold text-foreground hover:text-primary">
              dGit
            </Link>
          </div>
          
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">User Profile</h1>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Profile Information
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Handle */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar} alt="User" />
                  <AvatarFallback className="text-lg">{profile.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="handle">Handle</Label>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-1">@</span>
                        <Input
                          id="handle"
                          value={tempProfile.username}
                          onChange={(e) => setTempProfile(prev => ({ ...prev, username: e.target.value }))}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">@{profile.username}</h2>
                      <p className="text-sm text-muted-foreground">User Handle</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Principal ID */}
              <div className="space-y-2">
                <Label>Principal ID</Label>
                <div className="p-3 bg-muted rounded-md">
                  <code className="text-sm font-mono break-all">{profile.principalId || 'Not connected'}</code>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is your unique identifier on the Internet Computer network
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={tempProfile.bio}
                    onChange={(e) => setTempProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md min-h-[100px]">
                    <p className="text-sm">{profile.bio || 'No bio provided'}</p>
                  </div>
                )}
              </div>

              {/* Edit Actions */}
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;