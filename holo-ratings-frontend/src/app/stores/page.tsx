'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import StoreCard from '@/components/Store/StoreCard';
import RatingModal from '@/components/Store/RatingModal';
import { Store } from '@/types';
import api from '@/lib/api';
import { Search, Filter } from 'lucide-react';

const StoresPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchStores();
  }, [user, router]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await api.get('/stores');
      setStores(response.data);
    } catch (err: any) {
      setError('Failed to fetch stores');
    } finally {
      setLoading(false);
    }
  };

  const handleRateStore = (store: Store) => {
    setSelectedStore(store);
    setShowRatingModal(true);
  };

  const handleRatingSuccess = () => {
    fetchStores(); // Refresh stores to update ratings
  };

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (store.address && store.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Stores</h1>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search stores by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
              <p className="text-gray-500 font-medium">Loading stores...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Stores Grid */}
        {!loading && !error && (
          <>
            {filteredStores.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'No stores found matching your search.' : 'No stores available.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStores.map((store, index) => (
                  <div
                    key={store.id}
                    className="animate-slideUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <StoreCard
                      store={store}
                      onRate={handleRateStore}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Rating Modal */}
        <RatingModal
          store={selectedStore}
          isOpen={showRatingModal}
          onClose={() => {
            setShowRatingModal(false);
            setSelectedStore(null);
          }}
          onSuccess={handleRatingSuccess}
        />
      </div>
    </Layout>
  );
};

export default StoresPage;
