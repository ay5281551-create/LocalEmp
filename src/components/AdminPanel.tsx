import { ArrowLeft, Trash2, Plus, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import LanguageSelector from './LanguageSelector';
import { useState } from 'react';
import Modal from './Modal';

interface AdminPanelProps {
  onNavigate: (page: 'home' | 'find-jobs' | 'apply-job' | 'admin') => void;
}

export default function AdminPanel({ onNavigate }: AdminPanelProps) {
  const { t } = useLanguage();
  const { jobs, applications, addJob, deleteJob, deleteApplication } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    contact: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
      setPassword('');
    } else {
      alert(t.invalidPassword);
    }
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    addJob(jobFormData);
    setJobFormData({
      title: '',
      description: '',
      salary: '',
      location: '',
      contact: '',
    });
    setShowPostJobModal(false);
    alert(t.jobPosted);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="absolute top-6 right-6">
          <LanguageSelector />
        </div>
        <div className="absolute top-6 left-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.backToHome}</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {t.adminLogin}
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.password}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="admin123"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              {t.login}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.backToHome}</span>
          </button>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.logout}</span>
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          {t.adminPanel}
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {t.postedJobs}
              </h2>
              <button
                onClick={() => setShowPostJobModal(true)}
                className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t.postJob}</span>
              </button>
            </div>

            {jobs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">{t.noJobs}</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-800">
                        {job.title}
                      </h3>
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>{t.location}:</strong> {job.location}</p>
                      <p><strong>{t.salary}:</strong> {job.salary}</p>
                      <p><strong>{t.contact}:</strong> {job.contact}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {t.jobApplications}
            </h2>

            {applications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">{t.noApplications}</p>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {app.name}
                        </h3>
                        <p className="text-sm text-blue-600 font-medium">
                          {app.jobTitle}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>{t.contact}:</strong> {app.contact}</p>
                      <p><strong>{t.message}:</strong> {app.message}</p>
                      <p className="text-xs text-gray-500">
                        {t.appliedAt}: {app.appliedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showPostJobModal && (
        <Modal onClose={() => setShowPostJobModal(false)}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t.postJob}
          </h2>
          <form onSubmit={handlePostJob} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.jobTitle}
              </label>
              <input
                type="text"
                required
                value={jobFormData.title}
                onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.description}
              </label>
              <textarea
                required
                rows={3}
                value={jobFormData.description}
                onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.salary}
              </label>
              <input
                type="text"
                required
                value={jobFormData.salary}
                onChange={(e) => setJobFormData({ ...jobFormData, salary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.location}
              </label>
              <input
                type="text"
                required
                value={jobFormData.location}
                onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.contact}
              </label>
              <input
                type="tel"
                required
                value={jobFormData.contact}
                onChange={(e) => setJobFormData({ ...jobFormData, contact: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowPostJobModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                {t.submit}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
