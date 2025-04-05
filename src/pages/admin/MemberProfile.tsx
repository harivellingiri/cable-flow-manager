
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Mail, 
  Tv, 
  Building, 
  Calendar as CalendarIcon,
  CreditCard, 
  Check, 
  X, 
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { members, getMemberById, getMemberPayments } from '@/data/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const MemberProfile = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  
  // Get member data
  const member = getMemberById(memberId || '');
  const payments = getMemberPayments(memberId || '');
  
  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
        <h2 className="text-2xl font-semibold">Member Not Found</h2>
        <p className="text-muted-foreground">The member you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/admin/members')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Button>
      </div>
    );
  }

  // Format dates for display
  const formattedValidityStart = format(new Date(member.validityStart), 'dd MMM yyyy');
  const formattedValidityEnd = format(new Date(member.validityEnd), 'dd MMM yyyy');
  const formattedNextRecharge = format(new Date(member.nextRechargeDate), 'dd MMM yyyy');
  
  const isRechargeNeeded = new Date(member.nextRechargeDate) <= new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate('/admin/members')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Member Profile</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Member Info Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
            <CardDescription>Basic details and subscription info</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4 mb-6">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-3xl font-semibold text-muted-foreground">
                {member.name.charAt(0)}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.id}</p>
                <div className="mt-2">
                  <Badge variant={
                    member.status === 'active' ? 'default' :
                    member.status === 'inactive' ? 'outline' :
                    'secondary'
                  } className={cn(
                    member.status === 'active' && 'bg-success hover:bg-success/80',
                    member.status === 'inactive' && 'bg-muted text-muted-foreground',
                    member.status === 'pending' && 'bg-warning hover:bg-warning/80'
                  )}>
                    {member.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center">
                <Tv className="h-4 w-4 mr-3 text-muted-foreground" />
                <span><strong>Plan:</strong> {member.plan}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-3 text-muted-foreground" />
                <span><strong>Provider:</strong> {member.provider}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-3 text-muted-foreground" />
                <span><strong>Allotter:</strong> {member.allotter}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                <div>
                  <div><strong>Validity:</strong></div>
                  <div className="text-sm text-muted-foreground">
                    {formattedValidityStart} to {formattedValidityEnd}
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-2">Next Recharge</h4>
              <div className={cn(
                "p-3 rounded-md flex items-center",
                isRechargeNeeded ? "bg-danger/10 border border-danger/20" : "bg-muted"
              )}>
                <CalendarIcon className={cn(
                  "h-5 w-5 mr-2",
                  isRechargeNeeded ? "text-danger" : "text-muted-foreground"
                )} />
                <div>
                  <p className={cn(
                    "font-medium",
                    isRechargeNeeded && "text-danger"
                  )}>
                    {formattedNextRecharge}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRechargeNeeded ? "Recharge needed" : "Upcoming recharge"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button className="flex-1">Edit Details</Button>
              <Button variant="outline" className="flex-1">Recharge</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for Payment History and Other Information */}
        <div className="md:col-span-2">
          <Tabs defaultValue="history">
            <TabsList className="grid grid-cols-2 w-[300px]">
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="settings">Subscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>All transactions for this member</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Transaction ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.length > 0 ? (
                        payments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>
                              {format(new Date(payment.date), 'dd MMM yyyy')}
                            </TableCell>
                            <TableCell>₹{payment.amount}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {payment.status === 'successful' ? (
                                  <>
                                    <Check className="h-4 w-4 text-success mr-1" />
                                    <span className="text-success">Successful</span>
                                  </>
                                ) : payment.status === 'failed' ? (
                                  <>
                                    <X className="h-4 w-4 text-danger mr-1" />
                                    <span className="text-danger">Failed</span>
                                  </>
                                ) : (
                                  <span className="text-muted-foreground">Pending</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {payment.transactionId}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
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
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Settings</CardTitle>
                  <CardDescription>Manage subscription details and automatic recharge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Current Plan</h4>
                      <Button variant="outline" size="sm">Change Plan</Button>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{member.plan}</span>
                        <Badge>Current</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Valid until {formattedValidityEnd}
                      </p>
                      <div className="flex items-center text-sm">
                        <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Monthly billing at ₹499</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-4">Auto-Recharge Settings</h4>
                    <div className="flex items-start space-x-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full bg-success"></div>
                          <span className="font-medium">Auto-recharge is active</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          The subscription will be automatically renewed on {formattedNextRecharge}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Disable</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Manual Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button>Process Recharge Now</Button>
                      <Button variant="outline">
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
