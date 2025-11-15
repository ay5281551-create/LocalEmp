import { ArrowLeft, MapPin, DollarSign, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import LanguageSelector from './LanguageSelector';
import { useState } from 'react';
import Modal from './Modal';

interface FindJobsPageProps {
  onNavigate: (page: 'home' | 'find-jobs' | 'apply-job' | 'admin') => void;
}

export default function FindJobsPage({ onNavigate }: FindJobsPageProps) {
  const { t } = useLanguage();
  const { jobs, addApplication } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });

  const handleApply = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addApplication({
      ...formData,
      jobTitle: selectedJob,
    });
    setFormData({ name: '', contact: '', message: '' });
    setShowModal(false);
    alert(t.applicationSubmitted);
  };

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
          <LanguageSelector />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          {t.findJobs}
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {job.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{job.contact}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {job.description}
              </p>

              <button
                onClick={() => handleApply(job.title)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t.apply}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t.apply} - {selectedJob}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.name}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t.message}
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
