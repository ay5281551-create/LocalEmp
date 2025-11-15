import { FileText, Shield, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface HomePageProps {
  onNavigate: (page: 'home' | 'find-jobs' | 'apply-job' | 'admin') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="absolute top-6 right-6">
        <LanguageSelector />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            {t.appTitle}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.appSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <button
            onClick={() => onNavigate('find-jobs')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t.findJobs}
              </h3>
              <p className="text-sm text-gray-600">
                Browse available local job opportunities
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('apply-job')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t.applyJob}
              </h3>
              <p className="text-sm text-gray-600">
                Submit your application for jobs
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t.adminPanel}
              </h3>
              <p className="text-sm text-gray-600">
                Manage jobs and applications
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
