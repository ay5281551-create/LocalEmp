import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import LanguageSelector from './LanguageSelector';
import { useState } from 'react';

interface ApplyJobPageProps {
  onNavigate: (page: 'home' | 'find-jobs' | 'apply-job' | 'admin') => void;
}

export default function ApplyJobPage({ onNavigate }: ApplyJobPageProps) {
  const { t } = useLanguage();
  const { jobs, addApplication } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    jobTitle: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addApplication(formData);
    setFormData({ name: '', contact: '', jobTitle: '', message: '' });
    alert(t.applicationSubmitted);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.backToHome}</span>
          </button>
          <LanguageSelector />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {t.applyJob}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.name}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.name}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.contact}
              </label>
              <input
                type="tel"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.selectJob}
              </label>
              <select
                required
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t.selectJob}</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.title}>
                    {job.title} - {job.location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.message}
              </label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.message}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              {t.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
