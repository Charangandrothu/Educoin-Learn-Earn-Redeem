import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockStudents, mockTasks, redemptionOptions } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('educoin_students');
    const savedTasks = localStorage.getItem('educoin_tasks');
    const savedRedemptions = localStorage.getItem('educoin_redemptions');
    const savedStudent = localStorage.getItem('educoin_current_student');
    const savedAdmin = localStorage.getItem('educoin_is_admin');

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      setStudents(mockStudents);
      localStorage.setItem('educoin_students', JSON.stringify(mockStudents));
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(mockTasks);
      localStorage.setItem('educoin_tasks', JSON.stringify(mockTasks));
    }

    if (savedRedemptions) {
      setRedemptions(JSON.parse(savedRedemptions));
    } else {
      localStorage.setItem('educoin_redemptions', JSON.stringify([]));
    }

    if (savedStudent) {
      setCurrentStudent(JSON.parse(savedStudent));
    }

    if (savedAdmin) {
      setIsAdmin(JSON.parse(savedAdmin));
    }
  }, []);

  // Save students to localStorage whenever it changes
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('educoin_students', JSON.stringify(students));
    }
  }, [students]);

  // Save tasks to localStorage whenever it changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('educoin_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Save current student to localStorage
  useEffect(() => {
    if (currentStudent) {
      localStorage.setItem('educoin_current_student', JSON.stringify(currentStudent));
    } else {
      localStorage.removeItem('educoin_current_student');
    }
  }, [currentStudent]);

  // Save admin status
  useEffect(() => {
    localStorage.setItem('educoin_is_admin', JSON.stringify(isAdmin));
  }, [isAdmin]);

  const login = (rollNo, password) => {
    // Check for admin login
    if (rollNo === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      setCurrentStudent({ RollNo: 'admin', Name: 'Admin', isAdmin: true });
      return { success: true, isAdmin: true };
    }

    // Check for regular student login
    const student = students.find(
      s => s.RollNo === rollNo && s.Password === password
    );

    if (student) {
      setCurrentStudent(student);
      setIsAdmin(false);
      return { success: true, isAdmin: false };
    }

    return { success: false, message: 'Invalid Roll Number or Password' };
  };

  const logout = () => {
    setCurrentStudent(null);
    setIsAdmin(false);
    localStorage.removeItem('educoin_current_student');
    localStorage.removeItem('educoin_is_admin');
  };

  const completeTask = (taskId) => {
    if (!currentStudent) return false;

    const task = tasks.find(t => t.id === taskId);
    if (!task) return false;

    // Check if task already completed
    if (currentStudent.TasksCompleted.includes(taskId)) {
      return false;
    }

    // Update student's coins
    const updatedStudent = {
      ...currentStudent,
      [task.rewardType]: currentStudent[task.rewardType] + task.rewardAmount,
      TasksCompleted: [...currentStudent.TasksCompleted, taskId]
    };

    // Update students array
    const updatedStudents = students.map(s =>
      s.RollNo === currentStudent.RollNo ? updatedStudent : s
    );

    setStudents(updatedStudents);
    setCurrentStudent(updatedStudent);

    return true;
  };

  const redeemCoins = (redemptionId) => {
    if (!currentStudent) return false;

    const redemption = redemptionOptions.find(r => r.id === redemptionId);
    if (!redemption) return false;

    const { Silver, Gold, Platinum } = redemption.cost;

    // Check if student has enough coins
    if (
      currentStudent.Silver < Silver ||
      currentStudent.Gold < Gold ||
      currentStudent.Platinum < Platinum
    ) {
      return false;
    }

    // Deduct coins
    const updatedStudent = {
      ...currentStudent,
      Silver: currentStudent.Silver - Silver,
      Gold: currentStudent.Gold - Gold,
      Platinum: currentStudent.Platinum - Platinum
    };

    // Update students array
    const updatedStudents = students.map(s =>
      s.RollNo === currentStudent.RollNo ? updatedStudent : s
    );

    setStudents(updatedStudents);
    setCurrentStudent(updatedStudent);

    // Add to redemptions log
    const redemptionLog = {
      id: Date.now().toString(),
      studentRollNo: currentStudent.RollNo,
      studentName: currentStudent.Name,
      redemptionId,
      redemptionTitle: redemption.title,
      timestamp: new Date().toISOString()
    };

    const updatedRedemptions = [...redemptions, redemptionLog];
    setRedemptions(updatedRedemptions);
    localStorage.setItem('educoin_redemptions', JSON.stringify(updatedRedemptions));

    return true;
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: `task${Date.now()}`,
      status: 'available'
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, ...updates } : t));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const addStudent = (student) => {
    const newStudent = {
      ...student,
      Silver: 0,
      Gold: 0,
      Platinum: 0,
      TasksCompleted: []
    };
    setStudents([...students, newStudent]);
    return newStudent;
  };

  const updateStudent = (rollNo, updates) => {
    setStudents(students.map(s => s.RollNo === rollNo ? { ...s, ...updates } : s));
    if (currentStudent && currentStudent.RollNo === rollNo) {
      setCurrentStudent({ ...currentStudent, ...updates });
    }
  };

  const deleteStudent = (rollNo) => {
    setStudents(students.filter(s => s.RollNo !== rollNo));
  };

  const getLeaderboard = () => {
    return students
      .map(s => ({
        ...s,
        totalCoins: s.Silver + (s.Gold * 10) + (s.Platinum * 100)
      }))
      .sort((a, b) => b.totalCoins - a.totalCoins)
      .slice(0, 10);
  };

  const value = {
    currentStudent,
    students,
    tasks,
    redemptions,
    isAdmin,
    login,
    logout,
    completeTask,
    redeemCoins,
    addTask,
    updateTask,
    deleteTask,
    addStudent,
    updateStudent,
    deleteStudent,
    getLeaderboard,
    redemptionOptions
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

