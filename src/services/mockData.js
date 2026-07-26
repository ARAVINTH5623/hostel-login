export const INITIAL_USERS = [
  {
    id: 'usr_student_1',
    role: 'student',
    email: 'student@hostel.edu',
    name: 'Aravinth Kumar',
    studentId: 'STU-2024-8841',
    block: 'Block A (Everest)',
    roomNo: '102-B',
    phone: '+91 98765 43210',
    guardianPhone: '+91 98123 45678',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    feeStatus: 'Paid',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr_warden_1',
    role: 'warden',
    email: 'warden@hostel.edu',
    name: 'Dr. Rajesh Sharma',
    employeeId: 'WRD-102',
    assignedBlock: 'Block A & Block B',
    phone: '+91 94433 22110',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr_admin_1',
    role: 'administrator',
    email: 'admin@hostel.edu',
    name: 'Prof. Meenakshi Sundaram',
    employeeId: 'ADM-001',
    department: 'Chief Warden & Hostel Admin',
    phone: '+91 98400 11223',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr_security_1',
    role: 'security',
    email: 'security@hostel.edu',
    name: 'Inspector Vikram Singh',
    employeeId: 'SEC-409',
    gateAssigned: 'Main Gate 1',
    phone: '+91 97890 65432',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr_maint_1',
    role: 'maintenance',
    email: 'maintenance@hostel.edu',
    name: 'Suresh Electrician & Plumbing Lead',
    employeeId: 'MNT-204',
    specialization: 'Electrical & General Repairs',
    phone: '+91 96555 12345',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80'
  }
]

export const INITIAL_BLOCKS = [
  { id: 'blk_1', name: 'Block A - Everest (Boys)', totalRooms: 40, totalBeds: 80, occupiedBeds: 72, warden: 'Dr. Rajesh Sharma' },
  { id: 'blk_2', name: 'Block B - K2 (Girls)', totalRooms: 40, totalBeds: 80, occupiedBeds: 68, warden: 'Dr. Anita Roy' },
  { id: 'blk_3', name: 'Block C - Annapurna (PG)', totalRooms: 20, totalBeds: 40, occupiedBeds: 34, warden: 'Dr. Rajesh Sharma' }
]

export const INITIAL_ROOMS = [
  { id: 'rm_101', block: 'Block A - Everest (Boys)', roomNo: '101', floor: '1st Floor', capacity: 2, occupied: 2, status: 'Occupied', type: 'Double AC', occupants: ['Sanjay V', 'Karthik N'] },
  { id: 'rm_102', block: 'Block A - Everest (Boys)', roomNo: '102', floor: '1st Floor', capacity: 2, occupied: 2, status: 'Occupied', type: 'Double Non-AC', occupants: ['Aravinth Kumar', 'Preetham S'] },
  { id: 'rm_103', block: 'Block A - Everest (Boys)', roomNo: '103', floor: '1st Floor', capacity: 2, occupied: 1, status: 'Available', type: 'Double Non-AC', occupants: ['Rohan Gupta'] },
  { id: 'rm_104', block: 'Block A - Everest (Boys)', roomNo: '104', floor: '1st Floor', capacity: 2, occupied: 0, status: 'Available', type: 'Double AC', occupants: [] },
  { id: 'rm_201', block: 'Block B - K2 (Girls)', roomNo: '201', floor: '2nd Floor', capacity: 2, occupied: 2, status: 'Occupied', type: 'Double Non-AC', occupants: ['Priya Sharma', 'Ananya Patel'] },
  { id: 'rm_202', block: 'Block B - K2 (Girls)', roomNo: '202', floor: '2nd Floor', capacity: 2, occupied: 0, status: 'Maintenance', type: 'Double AC', occupants: [] }
]

export const INITIAL_LEAVES = [
  {
    id: 'LV-2026-001',
    studentId: 'STU-2024-8841',
    studentName: 'Aravinth Kumar',
    roomNo: '102-B',
    block: 'Block A',
    reason: 'Attending Cousin Sister Marriage Ceremony',
    destination: 'Coimbatore, Tamil Nadu',
    travelMode: 'Express Train',
    fromDate: '2026-07-28',
    toDate: '2026-07-31',
    emergencyPhone: '+91 98123 45678',
    status: 'Approved',
    approvedBy: 'Dr. Rajesh Sharma',
    gatepassCode: 'GP-988214',
    createdAt: '2026-07-25 10:30 AM'
  },
  {
    id: 'LV-2026-002',
    studentId: 'STU-2024-9102',
    studentName: 'Sanjay V',
    roomNo: '101-A',
    block: 'Block A',
    reason: 'Medical Checkup & Dental Procedure',
    destination: 'Chennai, Tamil Nadu',
    travelMode: 'Intercity Bus',
    fromDate: '2026-07-30',
    toDate: '2026-08-01',
    emergencyPhone: '+91 97711 22334',
    status: 'Pending',
    approvedBy: null,
    gatepassCode: 'GP-PENDING',
    createdAt: '2026-07-26 09:15 AM'
  }
]

export const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-8812',
    studentId: 'STU-2024-8841',
    studentName: 'Aravinth Kumar',
    roomNo: '102-B',
    category: 'Electrical',
    title: 'Ceiling Fan Making Squeaking Noise & Running Slow',
    description: 'The ceiling fan speed regulator is loose and fan makes loud friction noise at night.',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Suresh Electrician & Plumbing Lead',
    createdAt: '2026-07-24 04:20 PM',
    updatedAt: '2026-07-25 11:00 AM'
  },
  {
    id: 'CMP-8813',
    studentId: 'STU-2024-8841',
    studentName: 'Aravinth Kumar',
    roomNo: '102-B',
    category: 'Internet',
    title: 'Wi-Fi Access Point Frequent Disconnection in 1st Floor Corridor',
    description: 'Hostel Wi-Fi keeps disconnecting every 10 minutes near room 102.',
    priority: 'High',
    status: 'Pending',
    assignedTo: 'Unassigned',
    createdAt: '2026-07-26 08:45 AM',
    updatedAt: '2026-07-26 08:45 AM'
  },
  {
    id: 'CMP-8790',
    studentId: 'STU-2024-9102',
    studentName: 'Sanjay V',
    roomNo: '101-A',
    category: 'Plumbing',
    title: 'Bathroom Tap Leaking Water Continuously',
    description: 'Tap nozzle seal is damaged in Room 101 attached bathroom.',
    priority: 'Urgent',
    status: 'Resolved',
    assignedTo: 'Suresh Electrician & Plumbing Lead',
    createdAt: '2026-07-22 10:00 AM',
    updatedAt: '2026-07-23 02:30 PM'
  }
]

export const INITIAL_VISITORS = [
  {
    id: 'VIS-901',
    studentId: 'STU-2024-8841',
    studentName: 'Aravinth Kumar',
    visitorName: 'Ramesh Kumar (Father)',
    relation: 'Father',
    phone: '+91 98123 45678',
    purpose: 'Delivering Winter Clothes & Family Visit',
    date: '2026-07-27',
    timeSlot: '04:00 PM - 06:00 PM',
    idProof: 'Aadhaar XXXX-4321',
    status: 'Approved',
    checkInTime: '2026-07-27 04:10 PM',
    checkOutTime: null,
    gateStatus: 'Inside Premises'
  }
]

export const INITIAL_FEES = [
  {
    id: 'FEE-2026-01',
    studentId: 'STU-2024-8841',
    studentName: 'Aravinth Kumar',
    academicYear: '2025-2026 (Odd Semester)',
    hostelRent: 35000,
    messCharges: 22000,
    maintenanceFee: 3000,
    totalAmount: 60000,
    paidAmount: 60000,
    dueAmount: 0,
    status: 'Paid',
    paymentDate: '2026-07-10',
    transactionId: 'TXN-99882211',
    receiptNo: 'REC-HST-4091'
  },
  {
    id: 'FEE-2026-02',
    studentId: 'STU-2024-9102',
    studentName: 'Sanjay V',
    academicYear: '2025-2026 (Odd Semester)',
    hostelRent: 35000,
    messCharges: 22000,
    maintenanceFee: 3000,
    totalAmount: 60000,
    paidAmount: 30000,
    dueAmount: 30000,
    status: 'Partial',
    paymentDate: '2026-07-15',
    transactionId: 'TXN-77441100',
    receiptNo: 'REC-HST-4092'
  }
]

export const INITIAL_NOTICES = [
  {
    id: 'NTC-501',
    title: '📢 Mandatory Hostel Fire Safety & Evacuation Drill',
    category: 'Urgent',
    target: 'All Hostel Residents',
    publishedBy: 'Chief Warden Office',
    date: '2026-07-26',
    content: 'All residents of Block A, B, and C are informed that a mandatory fire safety drill will be conducted tomorrow at 5:00 PM. All students must assemble in the central quadrangle upon hearing the alarm siren.'
  },
  {
    id: 'NTC-502',
    title: '🍲 Mess Menu Special Feast on Coming Sunday',
    category: 'Event',
    target: 'All Students',
    publishedBy: 'Mess Committee & Warden',
    date: '2026-07-24',
    content: 'Special dinner feast including Paneer Butter Masala, Butter Naan, Gulab Jamun, and Chicken Biryani will be served on Sunday evening.'
  }
]

export const INITIAL_MESS_MENU = {
  Monday: { breakfast: 'Idli, Vada, Sambar, Coconut Chutney & Tea/Coffee', lunch: 'South Indian Thali (Rice, Sambar, Rasam, Poriyal, Curd)', snacks: 'Samosa & Hot Tea', dinner: 'Chapati, Dal Tadka, Jeera Rice, Fruit Salad' },
  Tuesday: { breakfast: 'Puri Masala, Banana & Tea/Coffee', lunch: 'North Indian Thali (Roti, Rajma Masala, Rice, Salad)', snacks: 'Veg Cutlet & Coffee', dinner: 'Egg Curry / Paneer Gravy, Ghee Rice, Ice Cream' },
  Wednesday: { breakfast: 'Dosai, Tomato Chutney, Potato Sagoo & Tea', lunch: 'Curd Rice, Lemon Rice, Potato Fry, Appalam', snacks: 'Pakoda & Tea', dinner: 'Veg Biryani, Raita, Gulab Jamun' },
  Thursday: { breakfast: 'Poha, Sev, Chutney & Milk/Coffee', lunch: 'Roti, Mixed Veg Gravy, Dal Fry, Steamed Rice', snacks: 'Biscuits & Tea', dinner: 'Phulka, Aloo Gobi, Rasam Rice, Payasam' },
  Friday: { breakfast: 'Ven Pongal, Medu Vada, Gotshu & Tea', lunch: 'Variety Rice (Veg Pulav, Kara Kuzhambu, Beans Poriyal)', snacks: 'Sundal & Coffee', dinner: 'Chapati, Paneer Butter Masala, Curd Rice' },
  Saturday: { breakfast: 'Aloo Paratha, Curd, Pickle & Tea', lunch: 'Meal Special (Chapati, Chana Masala, Curd Rice)', snacks: 'Mirchi Bajji & Tea', dinner: 'Fried Rice, Manchurian, Sweet Corn Soup' },
  Sunday: { breakfast: 'Masala Dosa, Mint Chutney & Coffee', lunch: 'Special Biryani (Chicken / Paneer), Raita, Sweet', snacks: 'Cake & Milk', dinner: 'Roti, Dal Makhani, Custard Fruit Bowl' }
}

export const INITIAL_GATE_LOGS = [
  { id: 'GL-101', studentName: 'Aravinth Kumar', studentId: 'STU-2024-8841', type: 'Exit', timestamp: '2026-07-25 04:30 PM', gatepassCode: 'GP-988214', verifiedBy: 'Inspector Vikram Singh' },
  { id: 'GL-102', studentName: 'Preetham S', studentId: 'STU-2024-7700', type: 'Entry', timestamp: '2026-07-26 08:15 AM', gatepassCode: 'GP-772109', verifiedBy: 'Inspector Vikram Singh' }
]
