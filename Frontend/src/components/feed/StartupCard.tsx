import { useState } from 'react';
import { Heart, Eye, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

export interface Startup {
  _id: string;
  title: string;
  description: string;
  category: 
    | "AI/ML"
    | "FinTech"
    | "HealthTech"
    | "EdTech"
    | "CleanTech"
    | "Enterprise"
    | "Consumer"
    | "Social"
    | "Gaming"
    | "Other";
  postedBy: {
    _id: string;
    name: string;
    profilepic?: {
      url: string;
    };
  };
  tags: string[];
  media: {
    imageUrls: {
      public_id: string;
      url: string;
    }[];
    video?: {
      public_id: string;
      url: string;
    };
  };
  likes: number;
  views: number;
  commentsCount: number;
  createdAt: string;
}

interface StartupCardProps {
  startup: Startup;
  onLike?: (startupId: string) => void;
  comments?: Array<{
    id: string;
    text: string;
    user: string;
    createdAt: string;
  }>;
  showComments?: boolean;
  onCommentClick?: (startupId: string) => void;
  newComment?: string;
  onCommentChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommentSubmit?: (startupId: string) => void;
}

const StartupCard = ({ 
  startup, 
  onLike,
  comments = [], 
  showComments = false, 
  onCommentClick, 
  newComment = '', 
  onCommentChange, 
  onCommentSubmit
}: StartupCardProps) => {
  const [localLikes, setLocalLikes] = useState(startup.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const handleLike = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    
    // Update local likes count immediately for responsive UI
    setLocalLikes(prev => newLikeStatus ? prev + 1 : prev - 1);
    
    // Call the parent like handler if provided
    if (onLike) {
      onLike(startup._id);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCommentSubmit && newComment.trim()) {
      onCommentSubmit(startup._id);
    }
  };

  // Get first image URL if available
  const mediaUrl = startup.media?.imageUrls?.[0]?.url || '';

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        {/* Media Thumbnail */}
        {mediaUrl && (
          <div className="relative">
            <img
              src={mediaUrl}
              alt={startup.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <CardContent className="p-5">
          {/* Header with User Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage 
                src={startup.postedBy?.profilepic?.url} 
                alt={startup.postedBy?.name} 
              />
              <AvatarFallback>
                {startup.postedBy?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {startup.postedBy?.name || 'Unknown User'}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                {startup.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {startup.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {startup.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {startup.tags?.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{startup.tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Category */}
            <div>
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                {startup.category}
              </Badge>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <motion.button
                className={`flex items-center gap-1 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
              >
                <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
                <span className="text-sm font-medium">
                  {formatCount(localLikes)}
                </span>
              </motion.button>
              
              <div className="flex items-center gap-1 text-gray-500">
                <Eye className="w-4 h-4" />
                <span className="text-sm">
                  {formatCount(startup.views || 0)}
                </span>
              </div>
              
              <motion.button
                className={`flex items-center gap-1 ${showComments ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                onClick={() => onCommentClick?.(startup._id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">
                  {formatCount(comments.length || startup.commentsCount || 0)}
                </span>
              </motion.button>
            </div>
            
            <div className="text-xs text-gray-400">
              {new Date(startup.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                {comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment.id} className="text-sm">
                      <p className="font-medium">{comment.user}</p>
                      <p className="text-gray-600">{comment.text}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No comments yet</p>
                )}
              </div>
              
              <form onSubmit={handleCommentSubmit} className="flex gap-2">
                <Input
                  type="text"
                  value={newComment}
                  onChange={onCommentChange}
                  placeholder="Add a comment..."
                  className="flex-1 text-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={!newComment.trim()}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StartupCard;