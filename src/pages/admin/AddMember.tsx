
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CalendarIcon, ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

const AddMember = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/members')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Member</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Member Information</CardTitle>
          <CardDescription>Add a new cable subscription member to the system.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter member's full name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="Enter phone number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="uniqueId">Unique ID</Label>
              <Input id="uniqueId" placeholder="Enter unique ID or customer number" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" placeholder="Enter complete address" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription Plan</Label>
              <Select>
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Pack - ₹250/month</SelectItem>
                  <SelectItem value="standard">Standard Pack - ₹450/month</SelectItem>
                  <SelectItem value="premium">Premium Pack - ₹650/month</SelectItem>
                  <SelectItem value="sports">Sports Pack - ₹350/month</SelectItem>
                  <SelectItem value="movies">Movies Pack - ₹550/month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Cable Provider</Label>
              <Select>
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="airtel">Airtel Digital TV</SelectItem>
                  <SelectItem value="tata">Tata Play</SelectItem>
                  <SelectItem value="dish">Dish TV</SelectItem>
                  <SelectItem value="sun">Sun Direct</SelectItem>
                  <SelectItem value="den">DEN Networks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Validity Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Subscription Duration</Label>
              <Select defaultValue="1">
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Month</SelectItem>
                  <SelectItem value="3">3 Months</SelectItem>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stbNumber">Set-Top Box Number</Label>
              <Input id="stbNumber" placeholder="Enter STB number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Smart Card Number</Label>
              <Input id="cardNumber" placeholder="Enter smart card number" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="autoRecharge" className="rounded border-gray-300" />
            <Label htmlFor="autoRecharge">Enable Auto-Recharge</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/admin/members')}>Cancel</Button>
          <Button onClick={() => navigate('/admin/members')}>Add Member</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddMember;
