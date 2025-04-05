
import React from 'react';
import { Calendar, Check, Clock, CreditCard, FileText, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { members, getMemberPayments } from '@/data/mockData';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

const MemberDashboard = () => {
  // Use the first member as the current member (in a real app, this would be based on auth)
  const member = members[0];
  const payments = getMemberPayments(member.id);
  
  // Calculate days left in subscription
  const today = new Date();
  const validityEnd = new Date(member.validityEnd);
  const daysLeft = Math.max(0, differenceInDays(validityEnd, today));
  const totalDays = differenceInDays(new Date(member.validityEnd), new Date(member.validityStart));
  const daysUsed = totalDays - daysLeft;
  const percentageUsed = Math.min(100, Math.round((daysUsed / totalDays) * 100));
  
  // Get recent payments (last 3)
  const recentPayments = [...payments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Welcome, {member.name}</h1>
      
      {/* Subscription Status */}
      <Card className={cn(
        "border-l-4",
        daysLeft <= 5 ? "border-l-warning" : "border-l-primary"
      )}>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
          <CardDescription>Your current plan and validity details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{member.plan}</h3>
              <p className="text-muted-foreground">Provider: {member.provider}</p>
            </div>
            <div className="flex items-center">
              {daysLeft <= 5 ? (
                <div className="flex items-center text-warning space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-medium">Expires Soon</span>
                </div>
              ) : (
                <div className="flex items-center text-success space-x-2">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">Active</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{daysLeft} days left</span>
              <span>{format(validityEnd, 'dd MMM yyyy')}</span>
            </div>
            <Progress value={percentageUsed} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Validity Period</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(member.validityStart), 'dd MMM yyyy')} - {format(new Date(member.validityEnd), 'dd MMM yyyy')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Next Recharge Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(member.nextRechargeDate), 'dd MMM yyyy')}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">View Plan Details</Button>
          <Button>Recharge Now</Button>
        </CardFooter>
      </Card>
      
      {/* Payment History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Transaction ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{format(new Date(payment.date), 'dd MMM yyyy')}</TableCell>
                  <TableCell>₹{payment.amount}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs",
                      payment.status === 'successful' ? "bg-success/10 text-success" : 
                      payment.status === 'failed' ? "bg-danger/10 text-danger" : 
                      "bg-muted text-muted-foreground"
                    )}>
                      {payment.status === 'successful' && <Check className="h-3 w-3 mr-1" />}
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">
                    {payment.transactionId}
                  </TableCell>
                </TableRow>
              ))}
              
              {recentPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No payment history available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Important alerts and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {daysLeft <= 5 && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium">Your subscription expires soon</p>
                  <p className="text-sm text-muted-foreground">
                    Your current plan will expire in {daysLeft} days on {format(validityEnd, 'dd MMM yyyy')}. 
                    Please recharge to avoid service interruption.
                  </p>
                  <Button size="sm" className="mt-2">Recharge Now</Button>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-muted rounded-lg flex items-start space-x-3">
              <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Auto-recharge is enabled</p>
                <p className="text-sm text-muted-foreground">
                  Your account is set to automatically recharge on {format(new Date(member.nextRechargeDate), 'dd MMM yyyy')}.
                </p>
                <Button variant="outline" size="sm" className="mt-2">Manage Settings</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDashboard;
