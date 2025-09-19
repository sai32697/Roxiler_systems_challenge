'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import api from '@/lib/api';
import { Store, Star, Users, TrendingUp, Calendar } from 'lucide-react';
import { formatRating, getRatingText } from '@/utils/helpers';

interface StoreRating {
  id: number;
  stars: number;
  comment?: string;
  userId: number;
  createdAt: string;
  User: {
    id: number;
    name: string;
    email: string;
    address?: string;
  };
}

interface StoreData {
  store: {
    id: number;
    name: string;
    email?: string;
    address?: string;
  };
  average: number;
  ratings: StoreRating[];
}

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (user.role !== 'owner') {
      router.push('/');
      return;
    }
    fetchStoreData();
  }, [user, router]);

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // First, get all stores to find the owner's store
      const storesResponse = await api.get('/stores');
      const ownerStores = storesResponse.data.filter((store: any) => store.ownerId === user?.id);
      
      if (ownerStores.length === 0) {
        setError('No stores found for this owner. Please contact an administrator to assign a store to your account.');
        return;
      }
      
      // Use the first store owned by this user
      const storeId = ownerStores[0].id;
      const response = await api.get(`/stores/${storeId}/owner`);
      setStoreData(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch store data';
      setError(errorMessage);
      console.error('Owner dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!user || user.role !== 'owner') {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Store Dashboard</h1>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
              <p className="text-gray-500 font-medium">Loading store data...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Store Data */}
        {!loading && !error && storeData && (
          <>
            {/* Store Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{storeData.store.name}</h2>
                  {storeData.store.email && (
                    <p className="text-gray-600">{storeData.store.email}</p>
                  )}
                  {storeData.store.address && (
                    <p className="text-gray-600">{storeData.store.address}</p>
                  )}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Star className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600">Average Rating</p>
                      <div className="flex items-center space-x-1">
                        {renderStars(Math.round(formatRating(storeData.average)))}
                        <span className="text-2xl font-bold text-blue-900">
                          {getRatingText(storeData.average)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-600">Total Reviews</p>
                      <p className="text-2xl font-bold text-green-900">
                        {storeData.ratings.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-600">Rating Trend</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {storeData.average >= 4 ? 'Excellent' : 
                         storeData.average >= 3 ? 'Good' : 
                         storeData.average >= 2 ? 'Fair' : 'Poor'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
              
              {storeData.ratings.length === 0 ? (
                <div className="text-center py-12">
                  <Star className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Customer reviews will appear here once they start rating your store.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {storeData.ratings.map((rating) => (
                    <div key={rating.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {rating.User.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{rating.User.name}</p>
                            <p className="text-sm text-gray-600">{rating.User.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(rating.stars)}
                        </div>
                      </div>
                      
                      {rating.comment && (
                        <p className="text-gray-700 mb-3">{rating.comment}</p>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Reviewed on {formatDate(rating.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default OwnerDashboard;
