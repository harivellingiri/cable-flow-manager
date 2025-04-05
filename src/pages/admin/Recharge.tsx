
import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, MoreHorizontal, RefreshCw, ArrowRight, CheckCircle, Wallet } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Recharge = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Filter members based on search
  const filteredMembers = members.filter(member => {
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleProcessRecharge = () => {
    if (!selectedMember) {
      toast({
        title: "No Member Selected",
        description: "Please select a member to recharge",
        variant: "destructive",
      });
      return;
    }
    
    const amount = selectedAmount === 'custom' ? customAmount : selectedAmount;
    
    if (!amount || (selectedAmount === 'custom' && !customAmount)) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid recharge amount",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate recharge process
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      toast({
        title: "Recharge Successful",
        description: `Successfully recharged with ₹${amount}`,
        variant: "default",
      });
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedMember(null);
        setSelectedAmount('');
        setCustomAmount('');
      }, 2000);
    }, 1500);
  };

  const selectMemberForRecharge = (memberId: string) => {
    setSelectedMember(memberId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Recharge Management</h1>
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Recharges</TabsTrigger>
          <TabsTrigger value="manual">Manual Recharge</TabsTrigger>
          <TabsTrigger value="failed">Failed Recharges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
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
                            <DropdownMenuItem onClick={() => selectMemberForRecharge(member.id)}>
                              Process Recharge
                            </DropdownMenuItem>
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
        </TabsContent>
        
        <TabsContent value="manual">
          {isSuccess ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="bg-green-50 rounded-full p-4 mb-6">
                  <CheckCircle className="h-16 w-16 text-success" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Recharge Successful!</h2>
                <p className="text-muted-foreground text-center mb-6">
                  The subscription has been successfully recharged.
                </p>
                <Button onClick={() => {
                  setIsSuccess(false);
                  setSelectedMember(null);
                  setSelectedAmount('');
                  setCustomAmount('');
                }}>
                  Process Another Recharge
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Manual Recharge</CardTitle>
                <CardDescription>Process a manual recharge for any member</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Member Selection */}
                <div>
                  <h3 className="font-medium mb-4">Select Member</h3>
                  <div className="grid gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search members..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div className="border rounded-md h-48 overflow-auto">
                      {filteredMembers.length > 0 ? (
                        <div className="divide-y">
                          {filteredMembers.map(member => (
                            <div 
                              key={member.id}
                              className={cn(
                                "p-2 cursor-pointer hover:bg-muted flex items-center justify-between",
                                selectedMember === member.id && "bg-muted"
                              )}
                              onClick={() => setSelectedMember(member.id)}
                            >
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">ID: {member.id}</p>
                              </div>
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
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                          No members found
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {selectedMember && (
                  <>
                    <Separator />
                    
                    {/* Member Details */}
                    {(() => {
                      const member = members.find(m => m.id === selectedMember);
                      if (!member) return null;
                      
                      return (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Selected Member</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Name</p>
                              <p className="font-medium">{member.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Plan</p>
                              <p className="font-medium">{member.plan}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Current Status</p>
                              <p className="font-medium capitalize">{member.status}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Valid Until</p>
                              <p className="font-medium">{format(new Date(member.validityEnd), 'dd MMM yyyy')}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Next Recharge</p>
                              <p className="font-medium">{format(new Date(member.nextRechargeDate), 'dd MMM yyyy')}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    
                    <Separator />
                    
                    {/* Recharge Options */}
                    <div>
                      <h3 className="font-medium mb-4">Select Recharge Amount</h3>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {['499', '799', '999'].map((amount) => (
                          <Button 
                            key={amount}
                            variant={selectedAmount === amount ? "default" : "outline"}
                            className="h-14"
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount('');
                            }}
                          >
                            ₹{amount}
                          </Button>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Button 
                          variant={selectedAmount === 'custom' ? "default" : "outline"}
                          className="h-14 w-24"
                          onClick={() => setSelectedAmount('custom')}
                        >
                          Custom
                        </Button>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedAmount('custom');
                          }}
                          className={selectedAmount === 'custom' ? "border-primary" : ""}
                          disabled={selectedAmount !== 'custom'}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Payment Method */}
                    <div>
                      <h3 className="font-medium mb-4">Payment Method</h3>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit-card">Credit Card</SelectItem>
                          <SelectItem value="debit-card">Debit Card</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="online-transfer">Online Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {(paymentMethod === 'cash' || paymentMethod === 'online-transfer') && (
                        <div className="mt-4 p-3 bg-muted rounded-md">
                          <p className="text-sm flex items-center">
                            <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {paymentMethod === 'cash' 
                                ? 'Cash payment will be recorded directly' 
                                : 'Record the transfer reference number after payment'}
                            </span>
                          </p>
                        </div>
                      )}
                      
                      {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <Input placeholder="Card Number" />
                          </div>
                          <Input placeholder="MM/YY" />
                          <Input placeholder="CVV" type="password" />
                        </div>
                      )}
                      
                      {paymentMethod === 'upi' && (
                        <Input className="mt-4" placeholder="Enter UPI ID (e.g. name@upi)" />
                      )}
                    </div>
                    
                    {/* Summary */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Recharge Summary</h3>
                      <div className="flex justify-between mb-2">
                        <span>Recharge Amount</span>
                        <span className="font-medium">
                          ₹{selectedAmount === 'custom' ? customAmount || '0' : selectedAmount || '0'}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>GST (18%)</span>
                        <span className="font-medium">
                          ₹{selectedAmount === 'custom' 
                            ? (parseFloat(customAmount || '0') * 0.18).toFixed(2) 
                            : (parseFloat(selectedAmount || '0') * 0.18).toFixed(2)}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total Amount</span>
                        <span>
                          ₹{selectedAmount === 'custom'
                            ? (parseFloat(customAmount || '0') * 1.18).toFixed(2)
                            : (parseFloat(selectedAmount || '0') * 1.18).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleProcessRecharge}
                  disabled={!selectedMember || !selectedAmount || isProcessing}
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Process Recharge
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="failed">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Recharge;
