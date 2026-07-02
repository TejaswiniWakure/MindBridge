import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Bell, Eye, Lock, Globe } from 'lucide-react';

const Settings = () => {
  const { showToast } = () => useToast(); // fallback or direct call
  const toast = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState('private');

  const handleSaveSettings = () => {
    toast.showToast('Settings saved successfully!', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto py-6 flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure how you receive platform updates</CardDescription>
          </div>
          <Bell className="text-slate-400" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800">
            <div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Email Summaries</h4>
              <p className="text-xs text-slate-450 mt-0.5">Receive weekly wellness check-in summaries</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-350 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Push Alerts</h4>
              <p className="text-xs text-slate-455 mt-0.5">Receive immediate notifications for chat messages</p>
            </div>
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={() => setPushNotifications(!pushNotifications)}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-350 rounded cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Privacy and Data Sharing</CardTitle>
            <CardDescription>Manage who sees your wellbeing journals and mood records</CardDescription>
          </div>
          <Eye className="text-slate-400" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Profile Visibility</h4>
              <p className="text-xs text-slate-450 mt-0.5">Control access to your wellbeing logs</p>
            </div>
            <select
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm rounded-xl cursor-pointer"
            >
              <option value="private">Only Me (Private)</option>
              <option value="therapist">Share with Connected Therapist</option>
              <option value="family">Share with Family (Parents)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="px-6 rounded-xl">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
