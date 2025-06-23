import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Eye,
  MessageCircle,
  Share,
  Flag,
  Send,
  ThumbsUp,
} from "lucide-react";

const IdeaDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Emily Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      text: "This is exactly what the sustainability space needs! Have you considered partnering with grocery chains?",
      time: "2h ago",
      likes: 12,
    },
    {
      id: 2,
      author: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      text: "Love the gamification aspect. Would be interested in investing if you need funding.",
      time: "4h ago",
      likes: 8,
    },
    {
      id: 3,
      author: "Maria Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=50&h=50&fit=crop&crop=face",
      text: "The AI component could be revolutionary. How accurate is the carbon tracking?",
      time: "6h ago",
      likes: 5,
    },
  ]);

  // Mock data - in real app this would come from API
  const idea = {
    id: id || "1",
    title: "FirmFlex – AI-Driven Legal Services Platform",
    description:
      "A cutting-edge legal tech platform that empowers law firms to deliver on-demand legal services without the constraints of hourly billing or fixed retainers.\n\nFirmFlex leverages AI and automation to streamline legal workflows, enhance efficiency, and provide flexible, client-centric solutions.\n\nKey Features Include:\n• On-Demand Legal Services – Clients access legal support as needed, without retainers or rigid contracts.\n• No Time-Bound Billing – Transparent, value-based pricing instead of traditional hourly rates.\n• AI-Powered Legal Assistance – Smart document review, contract analysis, and case research automation.\n• Flexible Client Engagement – Subscription-based or pay-per-use models tailored to different needs.\n• Seamless Collaboration Tools – Secure client portals, real-time updates, and integrated communication.\n• Performance Analytics – Track case progress, client satisfaction, and firm efficiency with data-driven insights.\n\nMarket Opportunity:\nThe legal industry is shifting toward flexible, tech-driven solutions. Firms are seeking ways to reduce overhead, attract modern clients, and compete with alternative legal service providers. FirmFlex targets forward-thinking law firms, solo practitioners, and in-house legal teams looking to optimize operations and improve client retention.\n\nRevenue Model:\n• Platform Subscription Fees – Tiered pricing for firms based on size and usage.\n• Transaction-Based Commissions – For on-demand legal services facilitated through the platform.\n• Premium Add-Ons – Advanced AI tools, white-label solutions, and enterprise integrations.",
    tags: [
      "LegalTech",
      "AI",
      "On-Demand Services",
      "Flexible Billing",
      "Law Firms",
    ],
    category: "LegalTech",
    likes: 17,
    views: 45,
    comments: comments.length,
    trending: true,
    author: "David Wan",
    authorBio: "Environmental Engineer & AI Enthusiast",
    avatar:
      "https://res.cloudinary.com/dnwmgdyck/image/upload/v1750688235/lka8kkfeazauj0cnkopx.png",
    image:
      "https://res.cloudinary.com/dnwmgdyck/image/upload/v1750688677/Screenshot_2025-06-23_195053_diednl.png",
    createdAt: "1 days ago",
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        text: newComment,
        time: "now",
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link to="/explore">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <ArrowLeft size={20} />
              <span>Back to Explore</span>
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Flag size={18} />
            <span>Report</span>
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Hero Image */}
          {idea.image && (
            <div className="w-full h-64 md:h-80 relative overflow-hidden">
              <img
                src={idea.image}
                alt={idea.title}
                className="w-full h-full object-cover"
              />
              {idea.trending && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-sm font-semibold rounded-full">
                  🔥 Trending
                </div>
              )}
            </div>
          )}

          <div className="p-8">
            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={idea.avatar}
                alt={idea.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {idea.author}
                </h3>
                <p className="text-gray-500">{idea.authorBio}</p>
                <p className="text-sm text-gray-400">{idea.createdAt}</p>
              </div>
            </div>

            {/* Title and Category */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full mb-3">
                {idea.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {idea.title}
              </h1>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 mb-6 text-gray-500">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-2 transition-colors ${
                  isLiked ? "text-red-500" : "hover:text-red-500"
                }`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                <span>{idea.likes + (isLiked ? 1 : 0)}</span>
              </motion.button>

              <div className="flex items-center space-x-2">
                <Eye size={20} />
                <span>{idea.views}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-2 hover:text-green-600 transition-colors"
              >
                <MessageCircle size={20} />
                <span>{comments.length}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
              >
                <Share size={20} />
                <span>Share</span>
              </motion.button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {idea.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full font-medium"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {idea.description}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Connect with Creator
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-3 px-6 rounded-lg font-semibold transition-all"
              >
                Save Idea
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Comments ({comments.length})
                </h3>

                {/* Add Comment */}
                <div className="flex space-x-3 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
                    alt="You"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      rows={3}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="mt-2 flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={16} />
                      <span>Comment</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="p-6 space-y-6">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex space-x-3"
                  >
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {comment.author}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors"
                        >
                          <ThumbsUp size={14} />
                          <span className="text-sm">{comment.likes}</span>
                        </motion.button>
                        <button className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IdeaDetail;
