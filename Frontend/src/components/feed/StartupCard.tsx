
import { Heart, Eye, MessageCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Startup {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  media: string;
  likes: number;
  views: number;
  comments: number;
  trending: boolean;
  createdAt: string;
}

interface StartupCardProps {
  startup: Startup;
}

const StartupCard = ({ startup }: StartupCardProps) => {
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        {/* Media Thumbnail */}
        <div className="relative">
          <img
            src={startup.media}
            alt={startup.title}
            className="w-full h-48 object-cover"
          />
          {startup.trending && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5">
          {/* Header with User Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={startup.user.avatar} alt={startup.user.name} />
              <AvatarFallback>{startup.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{startup.user.name}</p>
              <p className="text-sm text-gray-500 truncate">{startup.user.role}</p>
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
              {startup.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {startup.tags.length > 3 && (
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
                className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">{formatCount(startup.likes)}</span>
              </motion.button>
              
              <div className="flex items-center gap-1 text-gray-500">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{formatCount(startup.views)}</span>
              </div>
              
              <div className="flex items-center gap-1 text-gray-500">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{formatCount(startup.comments)}</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-400">
              {new Date(startup.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StartupCard;