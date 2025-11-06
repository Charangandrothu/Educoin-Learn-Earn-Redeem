// Mock data simulating Google Sheets database
export const mockStudents = [
  {
    RollNo: '24B95A041*',
    Name: 'Siddu sundar',
    Password: 'password123',
    Silver: 25,
    Gold: 10,
    Platinum: 2,
    TasksCompleted: ['task1', 'task2']
  },
  {
    RollNo: '2024002',
    Name: 'Jeevan Kumar K',
    Password: 'password123',
    Silver: 50,
    Gold: 20,
    Platinum: 5,
    TasksCompleted: ['task1', 'task2', 'task3']
  },
  {
    RollNo: '2024003',
    Name: 'Charan Gandrothu',
    Password: 'password123',
    Silver: 15,
    Gold: 5,
    Platinum: 1,
    TasksCompleted: ['task1']
  },
  {
    RollNo: '2024004',
    Name: 'Yashwanth A',
    Password: 'password123',
    Silver: 75,
    Gold: 30,
    Platinum: 8,
    TasksCompleted: ['task1', 'task2', 'task3', 'task4']
  },
  {
    RollNo: '2024005',
    Name: 'Likhith T',
    Password: 'password123',
    Silver: 30,
    Gold: 12,
    Platinum: 3,
    TasksCompleted: ['task1', 'task2']
  }
];

export const mockTasks = [
  {
    id: 'task1',
    title: '📘 Read English Chapter 2',
    description: 'Read Chapter 2 of your English textbook and summarize the main points. This will help you understand the concepts better.',
    type: 'Reading',
    rewardType: 'Silver',
    rewardAmount: 5,
    status: 'available'
  },
  {
    id: 'task2',
    title: '🧠 Attempt Weekly Quiz',
    description: 'Complete the weekly quiz covering topics from this week\'s lessons. Answer all questions to the best of your ability.',
    type: 'Quiz',
    rewardType: 'Gold',
    rewardAmount: 10,
    status: 'available'
  },
  {
    id: 'task3',
    title: '💻 Complete Digital Literacy Lesson',
    description: 'Finish the digital literacy module on online safety and digital citizenship. Complete all interactive exercises.',
    type: 'Assignment',
    rewardType: 'Platinum',
    rewardAmount: 15,
    status: 'available'
  },
  {
    id: 'task4',
    title: '📝 Write Science Lab Report',
    description: 'Complete and submit your science lab report for the chemistry experiment conducted last week.',
    type: 'Assignment',
    rewardType: 'Gold',
    rewardAmount: 8,
    status: 'available'
  },
  {
    id: 'task5',
    title: '🎨 Create Art Project',
    description: 'Create an art project based on the theme "Nature and Environment". Submit your artwork with a brief description.',
    type: 'Assignment',
    rewardType: 'Silver',
    rewardAmount: 7,
    status: 'available'
  },
  {
    id: 'task6',
    title: '📚 Read History Chapter 5',
    description: 'Read Chapter 5 about ancient civilizations and prepare a timeline of major events.',
    type: 'Reading',
    rewardType: 'Silver',
    rewardAmount: 6,
    status: 'available'
  }
];

export const redemptionOptions = [
  {
    id: 'redeem1',
    title: '🍔 Free Snack (Canteen)',
    description: 'Get a free snack from the school canteen',
    cost: {
      Silver: 50,
      Gold: 0,
      Platinum: 0
    }
  },
  {
    id: 'redeem2',
    title: '📗 ₹50 Bookstore Coupon',
    description: 'Redeem for a ₹50 coupon at the school bookstore',
    cost: {
      Silver: 0,
      Gold: 100,
      Platinum: 0
    }
  },
  {
    id: 'redeem3',
    title: '💎 School Kit / Badge',
    description: 'Get an exclusive school kit or badge',
    cost: {
      Silver: 0,
      Gold: 0,
      Platinum: 200
    }
  },
  {
    id: 'redeem4',
    title: '🍕 Pizza Party Ticket',
    description: 'Get a ticket for the monthly pizza party',
    cost: {
      Silver: 0,
      Gold: 150,
      Platinum: 0
    }
  },
  {
    id: 'redeem5',
    title: '🎁 Stationery Set',
    description: 'Get a premium stationery set',
    cost: {
      Silver: 30,
      Gold: 0,
      Platinum: 0
    }
  }
];

