// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import SwipeCard from '@/components/SwipeCard';
// import { Filter, TrendingUp, Clock, Tag, Check } from 'lucide-react';

// const Explore = () => {
//   const [cards, setCards] = useState([
//     {
//       id: '1',
//       title: 'AI-Powered Sustainability Tracker',
//       description: 'A mobile app that uses AI to track and gamify personal carbon footprint reduction. Users scan receipts, log activities, and get personalized recommendations to reduce their environmental impact.',
//       tags: ['AI', 'Sustainability', 'Mobile', 'Gamification'],
//       category: 'CleanTech',
//       likes: 234,
//       views: 1250,
//       comments: 43,
//       trending: true,
//       author: 'Sarah Chen',
//       avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
//       image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop'
//     },
//     {
//       id: '2',
//       title: 'Remote Team Virtual Reality Workspace',
//       description: 'Create immersive VR workspaces where remote teams can collaborate as if they were in the same room. Features include 3D whiteboards, spatial audio, and customizable environments.',
//       tags: ['VR', 'Remote Work', 'Collaboration', 'SaaS'],
//       category: 'Enterprise',
//       likes: 189,
//       views: 890,
//       comments: 32,
//       author: 'Marcus Johnson',
//       avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
//       image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop'
//     },
//     {
//       id: '3',
//       title: 'Micro-Investment Platform for Gen Z',
//       description: 'A social investing app that allows users to invest spare change from daily purchases into curated portfolios. Features social sharing, educational content, and competitive challenges.',
//       tags: ['FinTech', 'Social', 'Investment', 'Mobile'],
//       category: 'FinTech',
//       likes: 312,
//       views: 1580,
//       comments: 67,
//       trending: true,
//       author: 'Alex Rivera',
//       avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
//       image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop'
//     }
//   ]);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [sortBy, setSortBy] = useState('Most Recent');

//   const categories = [
//     'All',
//     'AI & Machine Learning',
//     'Sustainability', 
//     'Health & Wellness',
//     'Remote Work',
//     'Fintech',
//     'Education'
//   ];

//   const handleSwipe = (direction: 'left' | 'right' | 'up') => {
//     console.log(`Swiped ${direction} on card ${cards[currentIndex]?.id}`);
//     setCurrentIndex(prev => prev + 1);
//   };

//   const handleCardClick = () => {
//     const cardId = cards[currentIndex]?.id;
//     if (cardId) {
//       window.location.href = `/idea/${cardId}`;
//     }
//   };

//   const trendingIdeas = [
//     { title: 'AI Content Creator', likes: 445, views: 2150, image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=120&fit=crop' },
//     { title: 'Mental Health App', likes: 398, views: 1890, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=120&fit=crop' },
//     { title: 'Carbon Tracker', likes: 312, views: 1456, image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=120&fit=crop' },
//     { title: 'Smart City Platform', likes: 289, views: 1234, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=120&fit=crop' },
//     { title: 'EdTech for Kids', likes: 267, views: 1123, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=120&fit=crop' }
//   ];

//   const currentCard = cards[currentIndex];
//   const nextCard = cards[currentIndex + 1];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 md:pt-24 pb-20 md:pb-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Ideas</h1>
//             <p className="text-gray-600">Discover and swipe through innovative startup concepts</p>
//           </div>
          
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
//           >
//             <Filter size={20} />
//             <span>Filters</span>
//           </motion.button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Left Sidebar - Enhanced Filters */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="hidden lg:block space-y-6"
//           >
//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
//               <div className="space-y-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
//                       selectedCategory === category 
//                         ? 'bg-green-100 text-green-700 font-medium' 
//                         : 'hover:bg-green-50 hover:text-green-700'
//                     }`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
//               <select 
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 <option value="Most Recent">Most Recent</option>
//                 <option value="Most Popular">Most Popular</option>
//                 <option value="Most Liked">Most Liked</option>
//                 <option value="Most Viewed">Most Viewed</option>
//               </select>
//             </div>

//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <h3 className="font-semibold text-gray-900 mb-4">Popular Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {['AI', 'SaaS', 'Mobile', 'Social', 'B2B', 'Consumer'].map((tag) => (
//                   <span
//                     key={tag}
//                     className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full cursor-pointer hover:bg-green-100 transition-colors"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
//             >
//               Apply Filters
//             </motion.button>

//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <h3 className="font-semibold text-gray-900 mb-4">Stats</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Ideas Today</span>
//                   <span className="font-semibold">47</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Most Liked</span>
//                   <span className="font-semibold">312</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Your Swipes</span>
//                   <span className="font-semibold">23</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Center Panel - Swipe Cards */}
//           <div className="lg:col-span-2">
//             <div className="relative w-full h-[600px] md:h-[700px]">
//               <AnimatePresence>
//                 {currentCard && (
//                   <SwipeCard
//                     key={currentCard.id}
//                     idea={currentCard}
//                     onSwipe={handleSwipe}
//                     onClick={handleCardClick}
//                   />
//                 )}
//                 {nextCard && (
//                   <motion.div
//                     key={nextCard.id}
//                     className="absolute inset-0 -z-10"
//                     initial={{ scale: 0.95, opacity: 0.5 }}
//                     animate={{ scale: 0.95, opacity: 0.5 }}
//                   >
//                     <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100" />
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {!currentCard && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="flex items-center justify-center h-full bg-white rounded-2xl shadow-xl border border-gray-100"
//                 >
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Check className="w-8 h-8 text-green-600" />
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
//                     <p className="text-gray-600">Check back later for more ideas</p>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>

//           {/* Right Sidebar - Enhanced Trending */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="hidden lg:block space-y-6"
//           >
//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <div className="flex items-center space-x-2 mb-4">
//                 <TrendingUp className="w-5 h-5 text-orange-500" />
//                 <h3 className="font-semibold text-gray-900">Trending Now</h3>
//               </div>
//               <div className="space-y-4 max-h-96 overflow-y-auto">
//                 {trendingIdeas.map((item, index) => (
//                   <motion.div 
//                     key={index} 
//                     whileHover={{ scale: 1.02, y: -2 }}
//                     className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-gray-100"
//                   >
//                     <img 
//                       src={item.image} 
//                       alt={item.title}
//                       className="w-12 h-12 rounded-lg object-cover"
//                     />
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900 text-sm">{item.title}</p>
//                       <div className="flex items-center space-x-2 text-xs text-gray-500">
//                         <span>{item.likes} likes</span>
//                         <span>•</span>
//                         <span>{item.views} views</span>
//                       </div>
//                     </div>
//                     <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-6 shadow-lg">
//               <div className="flex items-center space-x-2 mb-4">
//                 <Clock className="w-5 h-5 text-blue-500" />
//                 <h3 className="font-semibold text-gray-900">Recently Liked</h3>
//               </div>
//               <div className="space-y-3">
//                 {[
//                   'Fitness Gamification',
//                   'Smart City Platform',
//                   'EdTech for Kids'
//                 ].map((title, index) => (
//                   <div key={index} className="p-3 rounded-lg bg-green-50 border border-green-100">
//                     <p className="font-medium text-green-800 text-sm">{title}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Explore;








import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from '@/components/SwipeCard';
import { Filter, TrendingUp, Clock, Tag, Check } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  likes: number;
  views: number;
  commentsCount: number;
  postedBy: {
    _id: string;
    name: string;
    profilepic?: {
      url: string;
    };
  };
  media?: {
    imageUrls: Array<{
      url: string;
    }>;
  };
  createdAt: string;
}

const Explore = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Most Recent');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const categories = [
    'All',
    'AI & Machine Learning',
    'Sustainability', 
    'Health & Wellness',
    'Remote Work',
    'Fintech',
    'Education'
  ];

  // const fetchProjects = async (reset = false) => {
  //   try {
  //     setLoading(true);
  //     if (reset) {
  //       setProjects([]);
  //       setCurrentIndex(0);
  //       setPage(1);
  //       setHasMore(true);
  //     }

  //     const params = {
  //       page,
  //       limit: 10,
  //       explore: 'true',
  //       excludeSwiped: 'true',
  //       excludeOwn: 'true',
  //       category: selectedCategory === 'All' ? null : selectedCategory,
  //       sortBy: sortBy === 'Most Recent' ? 'Recent' : 
  //               sortBy === 'Most Liked' ? 'Most Liked' : 
  //               'Most Viewed'
  //     };

  //     const res = await axios.get('https://sparkswipebackend.onrender.com/api/v1/swipe/next', { 
  //       params,
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     if (res.data.projects.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       setProjects(prev => reset ? res.data.projects : [...prev, ...res.data.projects]);
  //       setPage(prev => reset ? 2 : prev + 1);
  //     }
  //   } catch (err) {
  //     setError('Failed to fetch projects');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchProjects = async (reset = false) => {
  try {
    setLoading(true);
    if (reset) {
      setProjects([]);
      setCurrentIndex(0);
      setPage(1);
      setHasMore(true);
    }

    const params = {
      page,
      limit: 10,
      explore: 'true',
      excludeSwiped: 'true',
      excludeOwn: 'true',
      category: selectedCategory === 'All' ? null : selectedCategory,
      sortBy: sortBy === 'Most Recent' ? 'Recent' : 
              sortBy === 'Most Liked' ? 'Most Liked' : 
              'Most Viewed'
    };

    const res = await axios.get('http://localhost:4000/api/v1/project/getall', { 
      params,
      withCredentials: true, // ✅ Use cookies
    });

    if (res.data.projects.length === 0) {
      setHasMore(false);
    } else {
      setProjects(prev => reset ? res.data.projects : [...prev, ...res.data.projects]);
      setPage(prev => reset ? 2 : prev + 1);
    }
  } catch (err) {
    setError('Failed to fetch projects');
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (token) {
      fetchProjects(true);
    }
  }, [selectedCategory, sortBy, token]);

  // const handleSwipe = async (direction: 'left' | 'right' | 'up') => {
  //   const currentProject = projects[currentIndex];
  //   if (!currentProject) return;

  //   try {
  //     const action = 
  //       direction === 'right' ? 'like' : 
  //       direction === 'left' ? 'dislike' : 'skip';
      
  //     await axios.post('https://sparkswipebackend.onrender.com/api/v1/swipe/', {
  //       projectId: currentProject._id,
  //       action
  //     }, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     setCurrentIndex(prev => prev + 1);

  //     if (currentIndex >= projects.length - 3 && hasMore) {
  //       fetchProjects();
  //     }
  //   } catch (err) {
  //     console.error('Swipe error:', err);
  //   }
  // };

  const handleSwipe = async (direction: 'left' | 'right' | 'up') => {
  const currentProject = projects[currentIndex];
  if (!currentProject) return;

  try {
    const action = 
      direction === 'right' ? 'like' : 
      direction === 'left' ? 'dislike' : 'skip';
    
    await axios.post('http://localhost:4000/api/v1/swipe/', {
      projectId: currentProject._id,
      action
    }, {
      withCredentials: true // ✅ Use cookies
    });

    setCurrentIndex(prev => prev + 1);

    if (currentIndex >= projects.length - 3 && hasMore) {
      fetchProjects();
    }
  } catch (err) {
    console.error('Swipe error:', err);
  }
};

  const handleCardClick = () => {
    const projectId = projects[currentIndex]?._id;
    if (projectId) {
      window.location.href = `/idea/${projectId}`;
    }
  };

  const formatProjectForCard = (project: Project) => {
    return {
      id: project._id,
      title: project.title,
      description: project.description,
      tags: project.tags,
      category: project.category,
      likes: project.likes,
      views: project.views,
      comments: project.commentsCount,
      author: project.postedBy?.name || 'Unknown',
      avatar: project.postedBy?.profilepic?.url || '/default-avatar.png',
      image: project.media?.imageUrls?.[0]?.url || '/default-project.jpg'
    };
  };

  const currentProject = projects[currentIndex];
  const nextProject = projects[currentIndex + 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 md:pt-24 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Ideas</h1>
            <p className="text-gray-600">Discover and swipe through innovative startup concepts</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Filter size={20} />
            <span>Filters</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category 
                        ? 'bg-green-100 text-green-700 font-medium' 
                        : 'hover:bg-green-50 hover:text-green-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Most Recent">Most Recent</option>
                <option value="Most Liked">Most Liked</option>
                <option value="Most Viewed">Most Viewed</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fetchProjects(true)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Apply Filters
            </motion.button>
          </motion.div>

          {/* Center Panel - Swipe Cards */}
          <div className="lg:col-span-2">
            <div className="relative w-full h-[600px] md:h-[700px]">
              {loading && !projects.length ? (
                <div className="flex items-center justify-center h-full">
                  <p>Loading projects...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <AnimatePresence>
                  {currentProject ? (
                    <SwipeCard
                      key={currentProject._id}
                      idea={formatProjectForCard(currentProject)}
                      onSwipe={handleSwipe}
                      onClick={handleCardClick}
                    />
                  ) : null}
                  
                  {nextProject ? (
                    <motion.div
                      key={nextProject._id}
                      className="absolute inset-0 -z-10"
                      initial={{ scale: 0.95, opacity: 0.5 }}
                      animate={{ scale: 0.95, opacity: 0.5 }}
                    >
                      <div className="w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100" />
                    </motion.div>
                  ) : null}

                  {!currentProject && !loading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center h-full bg-white rounded-2xl shadow-xl border border-gray-100"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
                        <p className="text-gray-600">Check back later for more ideas</p>
                        {hasMore && (
                          <button 
                            onClick={() => fetchProjects()}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                          >
                            Load More
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Right Sidebar - Trending */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-gray-900">Trending Now</h3>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {projects.slice(0, 5).map((project) => (
                  <motion.div 
                    key={project._id} 
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-gray-100"
                  >
                    <img 
                      src={project.media?.imageUrls?.[0]?.url || '/default-project.jpg'} 
                      alt={project.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{project.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{project.likes} likes</span>
                        <span>•</span>
                        <span>{project.views} views</span>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Explore;