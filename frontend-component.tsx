import React, { useState, useEffect } from 'react';
import { Monitor, ExternalLink, RefreshCw, Server } from 'lucide-react';

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3333/api/services');
      const data = await response.json();
      setServices(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch services. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    const interval = setInterval(fetchServices, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Monitor className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">Localhost Dashboard</h1>
          </div>
          <button
            onClick={fetchServices}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </header>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-100 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.port}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Server className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-semibold">{service.name}</h2>
                </div>
                <div className="space-y-2 text-gray-400">
                  <p>Port: {service.port}</p>
                  <p className="text-sm truncate" title={service.processInfo}>
                    Process: {service.processInfo}
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open in Browser
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && services.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl">No services currently running on localhost</p>
            <p className="mt-2">Start some services and refresh the dashboard</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;