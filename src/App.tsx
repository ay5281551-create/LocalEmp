import { useState } from 'react';
import HomePage from './components/HomePage';
import FindJobsPage from './components/FindJobsPage';
import ApplyJobPage from './components/ApplyJobPage';
import AdminPanel from './components/AdminPanel';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider } from './context/AppContext';

type Page = 'home' | 'find-jobs' | 'apply-job' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'find-jobs':
        return <FindJobsPage onNavigate={setCurrentPage} />;
      case 'apply-job':
        return <ApplyJobPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminPanel onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <AppProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          {renderPage()}
        </div>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
