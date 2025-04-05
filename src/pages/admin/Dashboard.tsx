
import React from 'react';
import { ArrowUp, ArrowDown, Users, UserCheck, UserX, AlertCircle, Calendar, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dashboardSummary, payments, members } from '@/data/mockData';
import { format } from 'date-fns';

const Dashboard = () => {
  // Get recent payments (last 5)
  const recentPayments = [...payments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Get upcoming recharges (next 5)
  const upcomingRecharges = [...members]
    .filter(member => new Date(member.nextRechargeDate) > new Date())
    .sort((a, b) => new Date(a.nextRechargeDate).getTime() - new Date(b.nextRechargeDate).getTime())
    .slice(0, 5);

  // Get failed recharges and alerts
  const failedRecharges = payments
    .filter(payment => payment.status === 'failed')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardSummary.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 10) + 1} from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardSummary.activeMembers}</div>
            <div className="flex items-center text-xs text-success">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>{Math.floor(Math.random() * 5) + 1}% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Members</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardSummary.inactiveMembers}</div>
            <div className="flex items-center text-xs text-danger">
              <ArrowDown className="mr-1 h-3 w-3" />
              <span>{Math.floor(Math.random() * 5) + 1}% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Recharges</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardSummary.pendingRecharges}</div>
            <p className="text-xs text-muted-foreground">For this week</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Payments */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Last 5 payments processed</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment) => {
                  const member = members.find(m => m.id === payment.memberId);
                  return (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{member?.name || 'Unknown'}</TableCell>
                      <TableCell>₹{payment.amount}</TableCell>
                      <TableCell>{format(new Date(payment.date), 'dd MMM yyyy')}</TableCell>
                      <TableCell>
                        <span className={payment.status === 'successful' ? 'text-success' : 'text-danger'}>
                          {payment.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Upcoming Recharges */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Recharges</CardTitle>
            <CardDescription>Subscriptions due in next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingRecharges.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.plan}</TableCell>
                    <TableCell className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(new Date(member.nextRechargeDate), 'dd MMM yyyy')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>Recent issues that need attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {failedRecharges.map((payment) => {
              const member = members.find(m => m.id === payment.memberId);
              return (
                <div key={payment.id} className="flex items-start p-3 bg-muted/50 rounded-lg border border-border">
                  <AlertCircle className="h-5 w-5 text-danger mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Failed Payment for {member?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Payment of ₹{payment.amount} failed on {format(new Date(payment.date), 'dd MMM yyyy')}. 
                      Transaction ID: {payment.transactionId}
                    </p>
                    <div className="mt-2">
                      <button className="text-sm font-medium text-primary hover:underline">
                        Retry Payment
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* If no failed recharges */}
            {failedRecharges.length === 0 && (
              <div className="flex items-center justify-center p-6 text-muted-foreground">
                No alerts at the moment
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
