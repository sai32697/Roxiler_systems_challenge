'use client';

import React from 'react';
import { Store } from '@/types';
import { Star, MapPin, Mail, Heart } from 'lucide-react';
import { formatRating, getRatingText, getRatingCountText } from '@/utils/helpers';

interface StoreCardProps {
  store: Store;
  onRate?: (store: Store) => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onRate }) => {
  const rating = formatRating(store.avgRating);
  const ratingCount = getRatingCountText(store.ratingCount);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 transition-all duration-200 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current transform scale-110' 
            : 'text-gray-300 hover:text-yellow-200'
        }`}
      />
    ));
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 transform hover:-translate-y-2 hover:scale-105 border border-gray-100">
      {/* Header with rating */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {store.name}
          </h3>
          {rating > 0 && (
            <div className="flex items-center space-x-1 mt-1">
              {renderStars(rating)}
              <span className="text-sm font-medium text-gray-600 ml-1">
                ({getRatingText(store.avgRating)})
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-gray-300 group-hover:text-red-400 transition-colors duration-200" />
        </div>
      </div>

      {/* Store details */}
      <div className="space-y-3 mb-6">
        {store.address && (
          <div className="flex items-start text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm leading-relaxed">{store.address}</span>
          </div>
        )}
        {store.email && (
          <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
            <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{store.email}</span>
          </div>
        )}
      </div>

      {/* Rating count */}
      {store.ratingCount && (
        <div className="text-sm text-gray-500 mb-4 font-medium">
          {ratingCount}
        </div>
      )}

      {/* Action button */}
      {onRate && (
        <button
          onClick={() => onRate(store)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95 font-semibold shadow-lg hover:shadow-xl"
        >
          <span className="flex items-center justify-center space-x-2">
            <Star className="h-4 w-4" />
            <span>Rate This Store</span>
          </span>
        </button>
      )}
    </div>
  );
};

export default StoreCard;
