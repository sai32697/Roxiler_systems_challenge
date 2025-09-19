'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout/Layout';
import { Rating } from '@/types';
import api from '@/lib/api';
import { Star, Calendar, Edit } from 'lucide-react';

const MyRatingsPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchMyRatings();
  }, [user, router]);

  const fetchMyRatings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/user/ratings');
      setRatings(response.data);
    } catch (err: any) {
      setError('Failed to fetch your ratings');
    } finally {
      setLoading(false);
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Ratings</h1>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Ratings List */}
        {!loading && !error && (
          <>
            {ratings.length === 0 ? (
              <div className="text-center py-12">
                <Star className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No ratings yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start by rating some stores to see them here.
                </p>
                <div className="mt-6">
                  <a
                    href="/stores"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Browse Stores
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {ratings.map((rating) => (
                  <div key={rating.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {rating.Store?.name}
                        </h3>
                        {rating.Store?.address && (
                          <p className="text-sm text-gray-600">{rating.Store.address}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(rating.stars)}
                        <span className="text-sm text-gray-600 ml-1">
                          ({rating.stars}/5)
                        </span>
                      </div>
                    </div>

                    {rating.comment && (
                      <p className="text-gray-700 mb-4">{rating.comment}</p>
                    )}

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Rated on {formatDate(rating.createdAt)}</span>
                      </div>
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default MyRatingsPage;
