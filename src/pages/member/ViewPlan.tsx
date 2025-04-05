
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Calendar, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { members } from '@/data/mockData';
import { format, addMonths } from 'date-fns';

const ViewPlan = () => {
  const navigate = useNavigate();
  
  // Use the first member as the current member (in a real app, this would be based on auth)
  const member = members[0];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/member')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">Plan Details</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{member.plan}</CardTitle>
          <CardDescription>Your current subscription details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge className="bg-success hover:bg-success/80">Active</Badge>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Validity Period</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(member.validityStart), 'dd MMM yyyy')} - {format(new Date(member.validityEnd), 'dd MMM yyyy')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Next Recharge Due</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(member.nextRechargeDate), 'dd MMM yyyy')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CreditCard className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Monthly Charge</p>
                <p className="text-sm text-muted-foreground">
                  ₹{Math.floor(Math.random() * 500) + 250}/month
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Plan Features</h3>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <span>400+ Channels</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <span>50+ HD Channels</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <span>Regional Channels Included</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <span>Premium Sports Package</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Device Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Set-Top Box Number</p>
                <p className="font-medium">STB{Math.floor(10000000 + Math.random() * 90000000)}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Smart Card Number</p>
                <p className="font-medium">SC{Math.floor(10000000 + Math.random() * 90000000)}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Provider</p>
                <p className="font-medium">{member.provider}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Last Activated</p>
                <p className="font-medium">{format(new Date(member.validityStart), 'dd MMM yyyy')}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="bg-muted p-4 rounded-lg w-full">
            <h4 className="font-medium">Auto-Recharge Status</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Your subscription will be automatically renewed on {format(new Date(member.nextRechargeDate), 'dd MMM yyyy')}
            </p>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Auto-recharge is enabled</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Button variant="outline" className="w-full md:w-auto" onClick={() => navigate('/member')}>
              Back to Dashboard
            </Button>
            <Button className="w-full md:w-auto" onClick={() => navigate('/member/payments')}>
              View Payment History
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewPlan;
