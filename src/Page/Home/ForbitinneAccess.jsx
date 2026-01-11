import React from 'react';
import { ShieldX, Lock, Home, ArrowLeft } from 'lucide-react';

const ForbiddenAccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 opacity-20 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-orange-600 p-6 rounded-full">
                <ShieldX className="w-16 h-16 md:w-20 md:h-20 text-white" />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-4">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              403
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Access Forbidden
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-2 text-sm md:text-base">
            দুঃখিত! এই পেজটি অ্যাক্সেস করার অনুমতি নেই।
          </p>
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            You don't have permission to access this page.
          </p>

          {/* Lock Icon Animation */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 bg-red-50 px-6 py-3 rounded-full">
              <Lock className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-red-700">Admin Access Required</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              যদি আপনি মনে করেন এটি একটি ভুল, অনুগ্রহ করে অ্যাডমিনিস্ট্রেটরের সাথে যোগাযোগ করুন।
            </p>
            <p className="text-sm text-gray-500 mt-1">
              If you believe this is a mistake, please contact the administrator.
            </p>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenAccess;