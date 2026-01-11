import React, { useState } from "react";
import {
  Bell,
  Lock,
  User,
  Palette,
  Globe,
  Shield,
  Mail,
  Moon,
  Sun,
} from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  });
  const [language, setLanguage] = useState("en");
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showActivity: true,
  });

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className={`mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Appearance */}
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-md p-6`}
          >
            <div className="flex items-center mb-4">
              <Palette
                className={`w-6 h-6 mr-3 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Appearance
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Dark Mode
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Toggle dark mode for better viewing at night
                </p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  darkMode ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform flex items-center justify-center ${
                    darkMode ? "transform translate-x-7" : ""
                  }`}
                >
                  {darkMode ? (
                    <Moon className="w-3 h-3" />
                  ) : (
                    <Sun className="w-3 h-3" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-md p-6`}
          >
            <div className="flex items-center mb-4">
              <Bell
                className={`w-6 h-6 mr-3 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p
                      className={`font-medium capitalize ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {key} Notifications
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Receive notifications via {key}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      value ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                        value ? "transform translate-x-7" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Language & Region */}
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-md p-6`}
          >
            <div className="flex items-center mb-4">
              <Globe
                className={`w-6 h-6 mr-3 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Language & Region
              </h2>
            </div>
            <div>
              <label
                className={`block font-medium mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Preferred Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>

          {/* Privacy & Security */}
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-md p-6`}
          >
            <div className="flex items-center mb-4">
              <Shield
                className={`w-6 h-6 mr-3 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Privacy & Security
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  className={`block font-medium mb-2 ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Profile Visibility
                </label>
                <select
                  value={privacy.profileVisibility}
                  onChange={(e) =>
                    setPrivacy((prev) => ({
                      ...prev,
                      profileVisibility: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Show Email
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Display email on your profile
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPrivacy((prev) => ({
                      ...prev,
                      showEmail: !prev.showEmail,
                    }))
                  }
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    privacy.showEmail ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                      privacy.showEmail ? "transform translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`font-medium ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Show Activity Status
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Let others see when you're active
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPrivacy((prev) => ({
                      ...prev,
                      showActivity: !prev.showActivity,
                    }))
                  }
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    privacy.showActivity ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                      privacy.showActivity ? "transform translate-x-7" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-md p-6`}
          >
            <div className="flex items-center mb-4">
              <Lock
                className={`w-6 h-6 mr-3 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h2
                className={`text-xl font-semibold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Account
              </h2>
            </div>
            <div className="space-y-3">
              <button
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Change Password
              </button>
              <button
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                }`}
              >
                Export Data
              </button>
              <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
