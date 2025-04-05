
import React, { useState } from 'react';
import { Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format, subDays } from 'date-fns';
import { members, getMemberPayments } from '@/data/mockData';
import { cn } from '@/lib/utils';

// Get all payments by combining payments for all members
const getAllPayments = () => {
  let allPayments = [];
  for (const member of members) {
    const memberPayments = getMemberPayments(member.id);
    allPayments = [...allPayments, ...memberPayments.map(payment => ({
      ...payment,
      memberName: member.name,
      memberId: member.id,
      plan: member.plan,
      provider: member.provider
    }))];
  }
  return allPayments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const Reports = () => {
  const [dateRange, setDateRange] = useState('30');
  const [providerFilter, setProviderFilter] = useState('all');
  const allPayments = getAllPayments();
  
  // Get unique providers for filter
  const uniqueProviders = Array.from(new Set(members.map(member => member.provider)));
  
  // Filter payments based on date range and provider
  const filteredPayments = allPayments.filter(payment => {
    const paymentDate = new Date(payment.date);
    const daysAgo = subDays(new Date(), parseInt(dateRange));
    const matchesDateRange = paymentDate >= daysAgo;
    const matchesProvider = providerFilter === 'all' || payment.provider === providerFilter;
    
    return matchesDateRange && matchesProvider;
  });
  
  // Calculate totals
  const totalAmount = filteredPayments.reduce((total, payment) => 
    payment.status === 'successful' ? total + payment.amount : total, 0);
  
  const successfulCount = filteredPayments.filter(p => p.status === 'successful').length;
  const failedCount = filteredPayments.filter(p => p.status === 'failed').length;
  const pendingCount = filteredPayments.filter(p => p.status === 'pending').length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-row gap-2 items-center">
          <span className="text-sm font-medium">Date Range:</span>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 3 Months</SelectItem>
              <SelectItem value="180">Last 6 Months</SelectItem>
              <SelectItem value="365">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-row gap-2 items-center">
          <span className="text-sm font-medium">Provider:</span>
          <Select value={providerFilter} onValueChange={setProviderFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Providers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              {uniqueProviders.map(provider => (
                <SelectItem key={provider} value={provider}>{provider}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              For the selected period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPayments.length}</div>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="bg-success/10 text-success hover:bg-success/20">
                {successfulCount} Successful
              </Badge>
              <Badge variant="outline" className="bg-danger/10 text-danger hover:bg-danger/20">
                {failedCount} Failed
              </Badge>
              {pendingCount > 0 && (
                <Badge variant="outline" className="bg-warning/10 text-warning hover:bg-warning/20">
                  {pendingCount} Pending
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{successfulCount ? Math.round(totalAmount / successfulCount).toLocaleString() : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on successful transactions
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Showing transactions for the selected period
            {providerFilter !== 'all' && ` from ${providerFilter}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{format(new Date(payment.date), 'dd MMM yyyy')}</TableCell>
                  <TableCell className="font-mono text-xs">{payment.transactionId}</TableCell>
                  <TableCell>
                    <div className="font-medium">{payment.memberName}</div>
                    <div className="text-xs text-muted-foreground">{payment.memberId}</div>
                  </TableCell>
                  <TableCell>{payment.plan}</TableCell>
                  <TableCell>{payment.provider}</TableCell>
                  <TableCell>₹{payment.amount}</TableCell>
                  <TableCell>
                    <Badge variant={
                      payment.status === 'successful' ? 'default' :
                      payment.status === 'failed' ? 'destructive' :
                      'secondary'
                    } className={cn(
                      payment.status === 'successful' && 'bg-success hover:bg-success/80',
                      payment.status === 'failed' && 'bg-danger text-white',
                      payment.status === 'pending' && 'bg-warning hover:bg-warning/80'
                    )}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No transactions found for the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
