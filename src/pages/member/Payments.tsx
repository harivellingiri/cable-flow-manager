
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Download, Search, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { members, getMemberPayments } from '@/data/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Payments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  
  // Use the first member as the current member (in a real app, this would be based on auth)
  const member = members[0];
  const payments = getMemberPayments(member.id);
  
  // Sort by date (newest first)
  const sortedPayments = [...payments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Filter payments
  const filteredPayments = sortedPayments.filter(payment => {
    const matchesSearch = payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/member')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">Payment History</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
          <CardDescription>View all your past payments and transaction details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by transaction ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="successful">Successful</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              {(searchTerm || statusFilter !== 'all') && (
                <Button variant="ghost" size="icon" onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}>
                  <FilterX className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Payments Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{format(new Date(payment.date), 'dd MMM yyyy')}</TableCell>
                  <TableCell>₹{payment.amount}</TableCell>
                  <TableCell>{member.plan}</TableCell>
                  <TableCell className="font-mono text-xs">{payment.transactionId}</TableCell>
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
                  <TableCell className="text-right">
                    {payment.status === 'successful' && (
                      <Button variant="ghost" size="sm" className="h-8">
                        <Download className="h-4 w-4 mr-2" />
                        <span className="sr-only md:not-sr-only">Download</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No transactions found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {/* Payment Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h3 className="font-medium">Payment Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Paid (Last 12 months)</p>
                <p className="text-xl font-bold">
                  ₹{payments.reduce((sum, payment) => payment.status === 'successful' ? sum + payment.amount : sum, 0)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Payment</p>
                <p className="text-xl font-bold">₹{Math.floor(Math.random() * 500) + 250}</p>
                <p className="text-xs text-muted-foreground">Due on {format(new Date(member.nextRechargeDate), 'dd MMM yyyy')}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <div className="flex items-center mt-1">
                  <CreditCard className="h-4 w-4 mr-2 text-primary" />
                  <span>Auto-Recharge (Credit Card)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
