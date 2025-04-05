
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { members } from '@/data/mockData';
import { format } from 'date-fns';

const Recharge = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Use the first member as the current member (in a real app, this would be based on auth)
  const member = members[0];
  
  const handleRecharge = () => {
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
        description: `Your account has been recharged with ₹${amount}`,
        variant: "default",
      });
      
      // Reset after showing success
      setTimeout(() => {
        navigate('/member');
      }, 2000);
    }, 1500);
  };
  
  // For demo, calculate next validity based on current date
  const currentDate = new Date();
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(currentDate.getMonth() + 1);
  
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-green-50 rounded-full p-4 mb-6">
          <CheckCircle className="h-16 w-16 text-success" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Recharge Successful!</h2>
        <p className="text-muted-foreground text-center mb-6">
          Your subscription has been extended until {format(nextMonth, 'dd MMM yyyy')}
        </p>
        <Button onClick={() => navigate('/member')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/member')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">Recharge Subscription</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manual Recharge</CardTitle>
          <CardDescription>Recharge your cable TV subscription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Plan Info */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Current Plan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium">{member.plan}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{member.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valid Until</p>
                <p className="font-medium">{format(new Date(member.validityEnd), 'dd MMM yyyy')}</p>
              </div>
            </div>
          </div>
          
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
                <SelectItem value="netbanking">Net Banking</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="mt-4 space-y-2">
              {paymentMethod === 'credit-card' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input placeholder="Card Number" />
                  </div>
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" type="password" />
                </div>
              )}
              
              {paymentMethod === 'upi' && (
                <Input placeholder="Enter UPI ID (e.g. name@upi)" />
              )}
              
              {paymentMethod === 'netbanking' && (
                <Select defaultValue="sbi">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sbi">State Bank of India</SelectItem>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="axis">Axis Bank</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {paymentMethod === 'debit-card' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input placeholder="Card Number" />
                  </div>
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" type="password" />
                </div>
              )}
            </div>
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
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleRecharge}
            disabled={!selectedAmount || isProcessing}
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                Proceed to Pay
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Recharge;
