
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:items-start gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences.</p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your basic application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" defaultValue="Cable Flow Services" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" type="email" defaultValue="admin@cableflow.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input id="contactPhone" type="tel" defaultValue="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" defaultValue="123 Main Street, Mumbai, India" />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark mode for the application</p>
                </div>
                <Switch id="darkMode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="language">Language</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                </div>
                <select className="w-24 rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Currency and Date Format</CardTitle>
              <CardDescription>Configure how numbers and dates are displayed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Currency Symbol</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred currency symbol</p>
                </div>
                <select className="w-24 rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option>₹ (INR)</option>
                  <option>$ (USD)</option>
                  <option>€ (EUR)</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Date Format</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred date format</p>
                </div>
                <select className="w-40 rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure when and how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="emailNotifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch id="smsNotifications" />
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-lg font-medium">Notification Types</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="paymentNotifications">Payment Confirmations</Label>
                  <p className="text-sm text-muted-foreground">When a payment is processed successfully</p>
                </div>
                <Switch id="paymentNotifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="rechargeReminders">Recharge Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send reminders before subscription expiry</p>
                </div>
                <Switch id="rechargeReminders" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="failedRecharges">Failed Recharges</Label>
                  <p className="text-sm text-muted-foreground">When a recharge attempt fails</p>
                </div>
                <Switch id="failedRecharges" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="systemUpdates">System Updates</Label>
                  <p className="text-sm text-muted-foreground">Announcements and updates about the platform</p>
                </div>
                <Switch id="systemUpdates" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and processing options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Payment Method</Label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Online Payment (Credit/Debit Card)</option>
                  <option>UPI</option>
                  <option>Cash Collection</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoRecharge">Auto-Recharge Default</Label>
                  <p className="text-sm text-muted-foreground">Enable auto-recharge for new members by default</p>
                </div>
                <Switch id="autoRecharge" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reminderDays">Recharge Reminder Days</Label>
                <p className="text-sm text-muted-foreground">Days before expiry to send reminder</p>
                <Input id="reminderDays" type="number" defaultValue="5" min="1" max="30" className="w-full md:w-32" />
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-lg font-medium">Payment Gateway</h3>
              
              <div className="space-y-2">
                <Label htmlFor="gatewayKey">API Key</Label>
                <Input id="gatewayKey" type="password" value="●●●●●●●●●●●●●●●●" readOnly />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gatewaySecret">API Secret</Label>
                <Input id="gatewaySecret" type="password" value="●●●●●●●●●●●●●●●●" readOnly />
              </div>
              
              <Button variant="outline">Update Payment Credentials</Button>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="Admin User" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@cableflow.com" />
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-lg font-medium">Change Password</h3>
              
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <Button variant="outline">Change Password</Button>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">Irreversible account actions</p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
