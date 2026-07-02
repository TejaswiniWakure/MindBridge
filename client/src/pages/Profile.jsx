import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Card, { CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { User, Mail, Shield, Save } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      showToast('Profile updated successfully!', 'success');
      setLoading(false);
    }, 1000);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4 py-6 border-b border-slate-100 dark:border-slate-800">
          <Avatar name={user.name} size="xl" />
          <div className="text-center sm:text-left">
            <CardTitle className="text-xl font-bold font-heading">{user.name}</CardTitle>
            <CardDescription className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              <Mail size={12} /> {user.email}
            </CardDescription>
            <div className="mt-2.5">
              <Badge variant="primary" className="capitalize text-xs px-3 py-1">
                {user.role} Access
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <Input
              label="Full Name"
              type="text"
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={User}
              required
            />
            <Input
              label="Email Address"
              type="email"
              id="profile-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
              disabled
              helperText="Email changes require security verification."
            />
            <Input
              label="Account Authorization Role"
              type="text"
              id="profile-role"
              value={user.role.toUpperCase()}
              icon={Shield}
              disabled
            />

            <div className="flex justify-end mt-4">
              <Button type="submit" className="px-6 rounded-xl flex items-center gap-2" isLoading={loading}>
                <Save size={16} /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
