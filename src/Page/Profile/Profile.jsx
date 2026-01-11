import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosAPi from "../../hook/useAPi";
import { useQuery } from "@tanstack/react-query";
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Crown, 
  Edit, 
  Settings,
  LogOut,
  Check,
  Star
} from "lucide-react";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosApi = useAxiosAPi();

  const { data: singleUser, isLoading } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosApi.get(`singleUser?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  const userData = singleUser || {};
  const isAdmin = userData?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-500 animate-slide-up">
          {/* Cover Background */}
          <div className="h-32 sm:h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 backdrop-blur-sm"></div>
            {isAdmin && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg animate-bounce-slow">
                <Crown className="w-5 h-5" />
                <span>Admin</span>
              </div>
            )}
          </div>

          {/* Profile Image Section */}
          <div className="relative px-6 sm:px-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-20">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white transform group-hover:scale-105 transition-transform duration-300">
                  {userData?.photoURL ? (
                    <img 
                      src={userData.photoURL} 
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
                <button className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transform hover:scale-110 transition-all">
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              {/* Name and Role */}
              <div className="flex-1 text-center sm:text-left pb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 animate-slide-in-left break-words">
                  {userData?.name || "User"}
                </h2>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 flex-wrap">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm sm:text-base break-all">{userData?.email}</span>
                </div>
                {isAdmin && (
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <div className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                      <Shield className="w-4 h-4" />
                      <span>Administrator</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pb-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </button>
                <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow transform hover:-translate-y-1 transition-all">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Information Cards */}
          <div className="px-6 sm:px-12 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-800">{userData?.name || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-semibold text-gray-800 break-all">{userData?.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="font-semibold text-gray-800 capitalize">{userData?.role || "User"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in animation-delay-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Account Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-semibold text-gray-800">
                      {userData?.userCreatAt 
                        ? new Date(userData.userCreatAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Authentication</p>
                    <p className="font-semibold text-gray-800 capitalize">{userData?.providerId || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Account Status</p>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <p className="font-semibold text-green-600">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 sm:px-12 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 animate-slide-up animation-delay-400">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-indigo-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">100%</h4>
            <p className="text-sm text-gray-600">Profile Complete</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">Verified</h4>
            <p className="text-sm text-gray-600">Account Status</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-all">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-pink-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">{isAdmin ? 'Premium' : 'Standard'}</h4>
            <p className="text-sm text-gray-600">Membership</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Profile;