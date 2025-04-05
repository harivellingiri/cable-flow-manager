
import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, MoreHorizontal, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { members } from '@/data/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Recharge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter members based on search
  const filteredMembers = members.filter(member => {
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Recharge Management</h1>
      </div>
      
      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by member name or ID..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-row gap-2">
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Process All Due
          </Button>
        </div>
      </div>
      
      {/* Recharge Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Recharges</CardTitle>
          <CardDescription>Members due for recharge in the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Auto-Recharge</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.id}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.plan}</TableCell>
                  <TableCell>₹{Math.floor(Math.random() * 1000) + 500}</TableCell>
                  <TableCell>{format(new Date(member.nextRechargeDate), 'dd MMM yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={member.id.includes('1') ? "default" : "outline"}>
                      {member.id.includes('1') ? "Enabled" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      member.status === 'active' ? 'default' :
                      member.status === 'inactive' ? 'destructive' :
                      'secondary'
                    } className={cn(
                      member.status === 'active' && 'bg-success hover:bg-success/80',
                      member.status === 'inactive' && 'bg-danger text-white',
                      member.status === 'pending' && 'bg-warning hover:bg-warning/80'
                    )}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Process Recharge</DropdownMenuItem>
                        <DropdownMenuItem>Toggle Auto-Recharge</DropdownMenuItem>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredMembers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No members found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Failed Recharges */}
      <Card>
        <CardHeader>
          <CardTitle>Failed Recharges</CardTitle>
          <CardDescription>Recent recharge attempts that failed</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Failed Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No failed recharges at this time.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recharge;
