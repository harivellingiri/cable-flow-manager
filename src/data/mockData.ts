
import { format, addDays, subDays } from 'date-fns';

// Types
export interface Member {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'active' | 'inactive' | 'pending';
  provider: string;
  nextRechargeDate: string;
  allotter: string;
  validityStart: string;
  validityEnd: string;
}

export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  status: 'successful' | 'failed' | 'pending';
  transactionId: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  channels: number;
  description: string;
  popular: boolean;
}

export interface Provider {
  id: string;
  name: string;
  coverage: string[];
}

// Mock Members
export const members: Member[] = [
  {
    id: 'MEM001',
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Premium HD',
    status: 'active',
    provider: 'CableTech',
    nextRechargeDate: format(addDays(new Date(), 15), 'yyyy-MM-dd'),
    allotter: 'Regional Cable Networks',
    validityStart: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
    validityEnd: format(addDays(new Date(), 15), 'yyyy-MM-dd')
  },
  {
    id: 'MEM002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    plan: 'Basic',
    status: 'inactive',
    provider: 'SatelliteVision',
    nextRechargeDate: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    allotter: 'City Satellite Services',
    validityStart: format(subDays(new Date(), 35), 'yyyy-MM-dd'),
    validityEnd: format(subDays(new Date(), 5), 'yyyy-MM-dd')
  },
  {
    id: 'MEM003',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    plan: 'Sports Package',
    status: 'active',
    provider: 'CableTech',
    nextRechargeDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    allotter: 'Regional Cable Networks',
    validityStart: format(subDays(new Date(), 23), 'yyyy-MM-dd'),
    validityEnd: format(addDays(new Date(), 7), 'yyyy-MM-dd')
  },
  {
    id: 'MEM004',
    name: 'Emily Williams',
    email: 'emily@example.com',
    plan: 'Movies Pack',
    status: 'active',
    provider: 'TeleStream',
    nextRechargeDate: format(addDays(new Date(), 20), 'yyyy-MM-dd'),
    allotter: 'Metro Cable Company',
    validityStart: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
    validityEnd: format(addDays(new Date(), 20), 'yyyy-MM-dd')
  },
  {
    id: 'MEM005',
    name: 'Michael Brown',
    email: 'michael@example.com',
    plan: '4K Ultra HD',
    status: 'pending',
    provider: 'SatelliteVision',
    nextRechargeDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    allotter: 'City Satellite Services',
    validityStart: format(subDays(new Date(), 28), 'yyyy-MM-dd'),
    validityEnd: format(addDays(new Date(), 2), 'yyyy-MM-dd')
  },
];

// Mock Payments
export const payments: Payment[] = [
  {
    id: 'PAY001',
    memberId: 'MEM001',
    amount: 499,
    date: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
    status: 'successful',
    transactionId: 'TRX78945612'
  },
  {
    id: 'PAY002',
    memberId: 'MEM002',
    amount: 299,
    date: format(subDays(new Date(), 35), 'yyyy-MM-dd'),
    status: 'successful',
    transactionId: 'TRX45678912'
  },
  {
    id: 'PAY003',
    memberId: 'MEM003',
    amount: 599,
    date: format(subDays(new Date(), 23), 'yyyy-MM-dd'),
    status: 'successful',
    transactionId: 'TRX12345678'
  },
  {
    id: 'PAY004',
    memberId: 'MEM004',
    amount: 399,
    date: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
    status: 'successful',
    transactionId: 'TRX98765432'
  },
  {
    id: 'PAY005',
    memberId: 'MEM005',
    amount: 799,
    date: format(subDays(new Date(), 28), 'yyyy-MM-dd'),
    status: 'successful',
    transactionId: 'TRX65432198'
  },
  {
    id: 'PAY006',
    memberId: 'MEM001',
    amount: 499,
    date: format(subDays(new Date(), 45), 'yyyy-MM-dd'),
    status: 'successful',
    transactionId: 'TRX12398745'
  },
  {
    id: 'PAY007',
    memberId: 'MEM002',
    amount: 299,
    date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    status: 'failed',
    transactionId: 'TRX45678123'
  },
  {
    id: 'PAY008',
    memberId: 'MEM003',
    amount: 599,
    date: format(subDays(new Date(), 53), 'yyyy-MM-dd'),
    status: 'successful',
    transactionId: 'TRX87456321'
  }
];

// Mock Plans
export const plans: Plan[] = [
  {
    id: 'PLAN001',
    name: 'Basic',
    price: 299,
    channels: 100,
    description: 'Essential channels for everyday viewing',
    popular: false
  },
  {
    id: 'PLAN002',
    name: 'Premium HD',
    price: 499,
    channels: 200,
    description: 'HD channels with premium content',
    popular: true
  },
  {
    id: 'PLAN003',
    name: 'Sports Package',
    price: 599,
    channels: 220,
    description: 'All sports channels including premium sports networks',
    popular: false
  },
  {
    id: 'PLAN004',
    name: 'Movies Pack',
    price: 399,
    channels: 150,
    description: 'Movie channels from around the world',
    popular: false
  },
  {
    id: 'PLAN005',
    name: '4K Ultra HD',
    price: 799,
    channels: 250,
    description: 'Ultra HD content with premium movie and sports channels',
    popular: false
  }
];

// Mock Providers
export const providers: Provider[] = [
  {
    id: 'PROV001',
    name: 'CableTech',
    coverage: ['Northeast', 'Midwest']
  },
  {
    id: 'PROV002',
    name: 'SatelliteVision',
    coverage: ['Nationwide']
  },
  {
    id: 'PROV003',
    name: 'TeleStream',
    coverage: ['West', 'Southwest']
  }
];

// Dashboard summary data
export const dashboardSummary = {
  totalMembers: 238,
  activeMembers: 187,
  inactiveMembers: 51,
  totalRevenue: 95600,
  pendingRecharges: 12,
  failedRecharges: 3
};

// Helper to get payments for a specific member
export const getMemberPayments = (memberId: string): Payment[] => {
  return payments.filter(payment => payment.memberId === memberId);
};

// Helper to get member by ID
export const getMemberById = (memberId: string): Member | undefined => {
  return members.find(member => member.id === memberId);
};
