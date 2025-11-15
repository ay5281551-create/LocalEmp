import { createContext, useContext, useState, ReactNode } from 'react';
import { Job, Application } from '../types';

interface AppContextType {
  jobs: Job[];
  applications: Application[];
  addJob: (job: Omit<Job, 'id' | 'postedAt'>) => void;
  deleteJob: (id: string) => void;
  addApplication: (application: Omit<Application, 'id' | 'appliedAt'>) => void;
  deleteApplication: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Typist',
    description: 'Looking for a skilled typist with good typing speed and accuracy. Knowledge of MS Office required.',
    salary: '₹15,000 - ₹20,000/month',
    location: 'Hyderabad',
    contact: '+91 98765 43210',
    postedAt: new Date('2025-11-10'),
  },
  {
    id: '2',
    title: 'Delivery Boy',
    description: 'Need delivery personnel for local deliveries. Must have a two-wheeler and valid driving license.',
    salary: '₹12,000 - ₹18,000/month',
    location: 'Bangalore',
    contact: '+91 98765 43211',
    postedAt: new Date('2025-11-11'),
  },
  {
    id: '3',
    title: 'Teacher (Primary)',
    description: 'Experienced primary school teacher required. B.Ed qualification preferred.',
    salary: '₹25,000 - ₹35,000/month',
    location: 'Chennai',
    contact: '+91 98765 43212',
    postedAt: new Date('2025-11-12'),
  },
  {
    id: '4',
    title: 'Shop Assistant',
    description: 'Retail store assistant needed. Good communication skills and customer service experience.',
    salary: '₹10,000 - ₹15,000/month',
    location: 'Mumbai',
    contact: '+91 98765 43213',
    postedAt: new Date('2025-11-13'),
  },
  {
    id: '5',
    title: 'Electrician',
    description: 'Licensed electrician required for residential and commercial projects.',
    salary: '₹20,000 - ₹30,000/month',
    location: 'Pune',
    contact: '+91 98765 43214',
    postedAt: new Date('2025-11-14'),
  },
  {
    id: '6',
    title: 'Cook',
    description: 'Experienced cook needed for a small restaurant. South Indian cuisine expertise preferred.',
    salary: '₹18,000 - ₹25,000/month',
    location: 'Kochi',
    contact: '+91 98765 43215',
    postedAt: new Date('2025-11-15'),
  },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>([]);

  const addJob = (jobData: Omit<Job, 'id' | 'postedAt'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      postedAt: new Date(),
    };
    setJobs([...jobs, newJob]);
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const addApplication = (appData: Omit<Application, 'id' | 'appliedAt'>) => {
    const newApplication: Application = {
      ...appData,
      id: Date.now().toString(),
      appliedAt: new Date(),
    };
    setApplications([...applications, newApplication]);
  };

  const deleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        applications,
        addJob,
        deleteJob,
        addApplication,
        deleteApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
