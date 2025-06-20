
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Edit3, Heart, Eye, MessageCircle, TrendingUp } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posted');

  const userStats = {
    posted: 12,
    likes: 1205,
    saved: 34,
    followers: 156
  };

  const userIdeas = [
    {
      id: '1',
      title: 'AI-Powered Sustainability Tracker',
      description: 'A mobile app that uses AI to track and gamify personal carbon footprint reduction.',
      category: 'CleanTech',
      tags: ['AI', 'Sustainability', 'Mobile'],
      likes: 234,
      views: 1250,
      comments: 43,
      status: 'trending',
      postedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Local Business Discovery App',
      description: 'Connect consumers with nearby small businesses through AR-powered exploration.',
      category: 'Consumer',
      tags: ['AR', 'Local', 'Discovery'],
      likes: 156,
      views: 892,
      comments: 28,
      status: 'active',
      postedAt: '2024-01-10'
    }
  ];

  const tabs = [
    { id: 'posted', label: 'Posted', count: userStats.posted },
    { id: 'liked', label: 'Liked', count: userStats.likes },
    { id: 'saved', label: 'Saved', count: userStats.saved }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 md:pt-24 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Alex Chen</h1>
                <p className="text-gray-600 mb-2">Product Manager & Entrepreneur</p>
                <p className="text-sm text-gray-500 max-w-md">
                  Passionate about building products that make a positive impact. 
                  Always looking for the next big idea to bring to life.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-6 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings size={20} />
              </motion.button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
            {[
              { label: 'Ideas Posted', value: userStats.posted, icon: <Edit3 className="w-5 h-5" /> },
              { label: 'Total Likes', value: userStats.likes, icon: <Heart className="w-5 h-5" /> },
              { label: 'Ideas Saved', value: userStats.saved, icon: <Heart className="w-5 h-5" /> },
              { label: 'Followers', value: userStats.followers, icon: <TrendingUp className="w-5 h-5" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2 text-green-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600 bg-green-50 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label} ({tab.count})
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'posted' && (
              <div className="space-y-6">
                {userIdeas.map((idea, index) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{idea.title}</h3>
                          {idea.status === 'trending' && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                              🔥 Trending
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{idea.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {idea.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-6 text-gray-500 text-sm">
                          <div className="flex items-center space-x-1">
                            <Heart size={16} />
                            <span>{idea.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye size={16} />
                            <span>{idea.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle size={16} />
                            <span>{idea.comments}</span>
                          </div>
                          <span>Posted {new Date(idea.postedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {(activeTab === 'liked' || activeTab === 'saved') && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {activeTab === 'liked' ? 'No liked ideas yet' : 'No saved ideas yet'}
                </h3>
                <p className="text-gray-600">
                  {activeTab === 'liked' 
                    ? 'Ideas you like will appear here' 
                    : 'Ideas you save will appear here'
                  }
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
