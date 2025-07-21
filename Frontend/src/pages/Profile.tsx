import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Edit3, Heart, Eye, MessageCircle, TrendingUp, X, Check } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('posted');
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState(null);
  
  // User profile state
  const [profile, setProfile] = useState({
    name: 'Selina Williams',
    title: 'Product Manager & Entrepreneur',
    bio: 'Passionate about building products that make a positive impact. Always looking for the next big idea to bring to life.',
    avatar: 'https://res.cloudinary.com/dnwmgdyck/image/upload/v1750688380/wp6spgklqyu3mvbcv3pq.png',
    stats: {
      posted: 4,
      likes: 49,
      saved: 3,
      followers: 15
    }
  });

  const [userIdeas, setUserIdeas] = useState([
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
      likes: 48,
      views: 154,
      comments: 12,
      status: 'active',
      postedAt: '2024-01-10'
    }
  ]);

  const tabs = [
    { id: 'posted', label: 'Posted', count: profile.stats.posted },
    { id: 'liked', label: 'Liked', count: profile.stats.likes },
    { id: 'saved', label: 'Saved', count: profile.stats.saved }
  ];

  const handleEditField = (field) => {
    setEditField(field);
    setIsEditing(true);
  };

  const handleSaveField = (e, field) => {
    e.preventDefault();
    const value = e.target[field].value;
    
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
    
    setEditField(null);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditField(null);
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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
              <div className="relative group">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer p-2 bg-white bg-opacity-80 rounded-full">
                    <Edit3 size={16} />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex-1">
                {editField === 'name' ? (
                  <form onSubmit={(e) => handleSaveField(e, 'name')}>
                    <div className="flex items-center space-x-2 mb-1">
                      <input
                        type="text"
                        name="name"
                        defaultValue={profile.name}
                        className="text-2xl font-bold text-gray-900 border border-gray-300 rounded px-2 py-1 w-full"
                        autoFocus
                      />
                      <button type="submit" className="text-green-600">
                        <Check size={18} />
                      </button>
                      <button type="button" onClick={handleCancelEdit} className="text-gray-500">
                        <X size={18} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h1 
                      className="text-2xl font-bold text-gray-900 mb-1 cursor-pointer hover:underline"
                      onClick={() => handleEditField('name')}
                    >
                      {profile.name}
                    </h1>
                    <Edit3 
                      size={16} 
                      className="text-gray-400 hover:text-gray-600 cursor-pointer" 
                      onClick={() => handleEditField('name')}
                    />
                  </div>
                )}
                
                {editField === 'title' ? (
                  <form onSubmit={(e) => handleSaveField(e, 'title')} className="mb-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        name="title"
                        defaultValue={profile.title}
                        className="text-gray-600 border border-gray-300 rounded px-2 py-1 w-full"
                        autoFocus
                      />
                      <button type="submit" className="text-green-600">
                        <Check size={18} />
                      </button>
                      <button type="button" onClick={handleCancelEdit} className="text-gray-500">
                        <X size={18} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2">
                    <p 
                      className="text-gray-600 mb-2 cursor-pointer hover:underline"
                      onClick={() => handleEditField('title')}
                    >
                      {profile.title}
                    </p>
                    <Edit3 
                      size={14} 
                      className="text-gray-400 hover:text-gray-600 cursor-pointer" 
                      onClick={() => handleEditField('title')}
                    />
                  </div>
                )}
                
                {editField === 'bio' ? (
                  <form onSubmit={(e) => handleSaveField(e, 'bio')}>
                    <div className="flex items-start space-x-2">
                      <textarea
                        name="bio"
                        defaultValue={profile.bio}
                        className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-1 w-full"
                        rows="3"
                        autoFocus
                      />
                      <div className="flex flex-col space-y-1">
                        <button type="submit" className="text-green-600">
                          <Check size={18} />
                        </button>
                        <button type="button" onClick={handleCancelEdit} className="text-gray-500">
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="group relative">
                    <p 
                      className="text-sm text-gray-500 max-w-md cursor-pointer hover:underline"
                      onClick={() => handleEditField('bio')}
                    >
                      {profile.bio}
                    </p>
                    <Edit3 
                      size={14} 
                      className="absolute -right-6 top-0 text-gray-400 hover:text-gray-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
                      onClick={() => handleEditField('bio')}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-6 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit3 size={16} />
                <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
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
              { label: 'Ideas Posted', value: profile.stats.posted, icon: <Edit3 className="w-5 h-5" /> },
              { label: 'Total Likes', value: profile.stats.likes, icon: <Heart className="w-5 h-5" /> },
              { label: 'Ideas Saved', value: profile.stats.saved, icon: <Heart className="w-5 h-5" /> },
              { label: 'Followers', value: profile.stats.followers, icon: <TrendingUp className="w-5 h-5" /> }
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
                      {isEditing && (
                        <button className="text-gray-400 hover:text-gray-600 ml-4">
                          <Edit3 size={16} />
                        </button>
                      )}
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