
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Filter, Clock, Heart, Eye, MessageCircle } from 'lucide-react';

const Saved = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');


  const savedIdeas = [
  {
    _id: 1,
    title: "AI-Powered Sustainability Tracker",
    description: "A mobile app that uses AI to track and gamify personal carbon footprint reduction.",
    category: "CleanTech",
    postedBy: "685961e91800e13a607357f8", // Assuming same author as "Calendo" and "FirmFlex"
    tags: ["AI", "Sustainability", "Mobile"],
    media: {}, // Placeholder (no media data in original)
    likes: 23,
    dislikes: 0, // Added to match schema
    skip: 0,     // Added to match schema
    views: 30,
    commentsCount: 3, // Renamed from "comments"
    reports: 0,       // Added to match schema
    createdAt: "2024-01-15T00:00:00.000+00:00", // Replaced "savedAt" with ISO format
    __v: 0,
    author: "David Wan", // Optional (not in sample schema)
    avatar: "https://res.cloudinary.com/dnwmgdyck/image/upload/v1750688235/lka8kkfeazauj0cnkopx.png" // Optional
  },
  {
    _id: 2,
    title: "Remote Team VR Workspace",
    description: "Create immersive VR workspaces where remote teams can collaborate as if they were in the same room.",
    category: "Enterprise",
    postedBy: "6859627a1800e13a60735812", // Assuming same author as "UniShell"
    tags: ["VR", "Remote Work", "Collaboration"],
    media: {},
    likes: 18,
    dislikes: 0,
    skip: 0,
    views: 49,
    commentsCount: 2,
    reports: 0,
    createdAt: "2024-01-14T00:00:00.000+00:00",
    __v: 0,
    author: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    _id: 3,
    title: "Micro-Investment Platform for Gen Z",
    description: "A social investing app that allows users to invest spare change from daily purchases.",
    category: "FinTech",
    postedBy: "685961e91800e13a607357f8", // Reused author ID
    tags: ["FinTech", "Social", "Investment"],
    media: {},
    likes: 12,
    dislikes: 0,
    skip: 0,
    views: 15,
    commentsCount: 6,
    reports: 0,
    createdAt: "2024-01-13T00:00:00.000+00:00",
    __v: 0,
    author: "Alex Rivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
];

  const handleViewIdea = (ideaId: string) => {
    console.log('Viewing idea:', ideaId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 md:pt-24 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Ideas</h1>
            <p className="text-gray-600">Your collection of inspiring startup concepts</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="likes">Most Liked</option>
              <option value="category">Category</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Saved', value: savedIdeas.length, icon: <Heart className="w-5 h-5" /> },
            { label: 'This Week', value: '2', icon: <Clock className="w-5 h-5" /> },
            { label: 'Categories', value: '3', icon: <Filter className="w-5 h-5" /> },
            { label: 'Total Likes', value: '49', icon: <Heart className="w-5 h-5" /> }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-green-600">{stat.icon}</div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Ideas Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {savedIdeas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                viewMode === 'list' ? 'p-6' : 'overflow-hidden'
              }`}
              onClick={() => handleViewIdea(idea.id)}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={idea.avatar}
                          alt={idea.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{idea.author}</p>
                          <p className="text-xs text-gray-500">{idea.category}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        Saved {new Date(idea.savedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {idea.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {idea.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {idea.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {idea.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{idea.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart size={14} />
                          <span>{idea.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye size={14} />
                          <span>{idea.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={14} />
                          <span>{idea.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={idea.avatar}
                      alt={idea.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{idea.author}</p>
                      <p className="text-sm text-gray-500">{idea.category}</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{idea.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{idea.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-gray-500 text-sm mb-2">
                      <div className="flex items-center space-x-1">
                        <Heart size={14} />
                        <span>{idea.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={14} />
                        <span>{idea.views}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Saved {new Date(idea.savedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {savedIdeas.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved ideas yet</h3>
            <p className="text-gray-600 mb-6">
              Start exploring and save ideas that inspire you
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Explore Ideas
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Saved;
