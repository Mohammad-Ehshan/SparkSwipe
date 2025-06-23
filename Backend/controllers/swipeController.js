import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import { Swipe } from "../models/swipeSchema.js";
import { User } from "../models/userSchema.js";

// Constants for swipe scoring
const SWIPE_SCORE_WEIGHTS = {
  LIKE: 1.5,
  DISLIKE: -1.2,
  SKIP: -0.5
};

// Record swipe action
// export const recordSwipe = catchAsyncErrors(async (req, res, next) => {
//   const { projectId, action } = req.body;
//   const userId = req.user._id;

//   // Validate action type
//   if (!['like', 'dislike', 'skip'].includes(action)) {
//     return next(new ErrorHandler('Invalid swipe action. Must be like/dislike/skip', 400));
//   }

//   // Prevent duplicate swipes
//   const existingSwipe = await Swipe.findOne({ userId, projectId });
//   if (existingSwipe) {
//     return next(new ErrorHandler('Project already swiped', 409));
//   }

//   // Get project
//   const project = await Project.findById(projectId);
//   if (!project) {
//     return next(new ErrorHandler('Project not found', 404));
//   }

//   // Prevent swiping own projects
//   if (project.postedBy.equals(userId)) {
//     return next(new ErrorHandler("Cannot swipe your own project", 403));
//   }

//   // Create swipe record
//   await Swipe.create({
//     userId,
//     projectId,
//     action
//   });

//   // Prepare update object
//   const updateData = {
//     $inc: { views: 1 },
//     $set: { lastSwipedAt: new Date() }
//   };

//   if (action === 'like') {
//     updateData.$inc.likes = 1;

//     // Add to user's liked projects
//     await User.findByIdAndUpdate(userId, {
//       $addToSet: { likedProjects: projectId }
//     });
//   } else if (action === 'dislike') {
//     updateData.$inc.dislikes = 1;
//   } else if (action === 'skip') {
//     updateData.$inc.skip = 1;
//   }

//   await Project.findByIdAndUpdate(projectId, updateData, { new: true });

//   res.status(201).json({
//     success: true,
//     message: `Project ${action}d`,
//     action
//   });
// });


export const recordSwipe = catchAsyncErrors(async (req, res, next) => {
  const { projectId, action } = req.body;
  const userId = req.user._id;

  // Validate action type
  if (!['like', 'dislike', 'skip'].includes(action)) {
    return next(new ErrorHandler('Invalid swipe action. Must be like/dislike/skip', 400));
  }

  // Prevent duplicate swipes
  const existingSwipe = await Swipe.findOne({ userId, projectId });
  if (existingSwipe) {
    return next(new ErrorHandler('Project already swiped', 409));
  }

  // Get project
  const project = await Project.findById(projectId);
  if (!project) {
    return next(new ErrorHandler('Project not found', 404));
  }

  // Prevent swiping own projects
  if (project.postedBy.equals(userId)) {
    return next(new ErrorHandler("Cannot swipe your own project", 403));
  }

  // Create swipe record
  await Swipe.create({
    userId,
    projectId,
    action
  });

  // Prepare update object
  const updateData = {
    $inc: { views: 1 },
    $set: { lastSwipedAt: new Date() }
  };

  if (action === 'like') {
    updateData.$inc.likes = 1;
    updateData.$inc.swipeScore = SWIPE_SCORE_WEIGHTS.LIKE;

    // Add to user's liked projects
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedProjects: projectId }
    });
  } else if (action === 'dislike') {
    updateData.$inc.dislikes = 1;
    updateData.$inc.swipeScore = SWIPE_SCORE_WEIGHTS.DISLIKE;
  } else if (action === 'skip') {
    updateData.$inc.skip = 1;
    updateData.$inc.swipeScore = SWIPE_SCORE_WEIGHTS.SKIP;
  }

  await Project.findByIdAndUpdate(projectId, updateData, { new: true });

  res.status(201).json({
    success: true,
    message: `Project ${action}d`,
    action
  });
});


// Get next swipeable project
export const getNextCard = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const { category, tags, limit = 5 } = req.query;

  // 1. Get exclusion lists (swiped and own projects) in parallel
  const [swipedProjects, ownProjects] = await Promise.all([
    Swipe.find({ userId }).distinct('projectId'),
    Project.find({ postedBy: userId }).distinct('_id')
  ]);

  // 2. Build the base query with combined filters
  const query = {
    _id: { $nin: [...swipedProjects, ...ownProjects] },
    ...(category && { category }),
    ...(tags && { tags: { $in: tags.split(',') } })
  };

  // 3. Get total available projects count
  const totalAvailable = await Project.countDocuments(query);
  
  if (totalAvailable === 0) {
    return res.status(200).json({
      success: true,
      message: "No more projects to swipe",
      cards: [],
      remaining: 0
    });
  }

  // 4. Determine optimal fetch size (all if <100, else cap at 100)
  const sampleSize = Math.min(totalAvailable, 100);

  // 5. Fetch projects (using find for small sets, aggregate for large)
  const projectPool = totalAvailable <= sampleSize
    ? await Project.find(query).lean()
    : await Project.aggregate([
        { $match: query },
        { $sample: { size: sampleSize } }
      ]);

  // 6. Score and sort projects
  const scoredProjects = projectPool.map(project => {
    let score = 0;
    
    // Followed users boost (30%)
    if (req.user.followedUsers.some(id => id.equals(project.postedBy))) {
      score += 30;
    }
    
    // Engagement metrics (65%)
    score += (project.swipeScore || 0) * 0.4;  // 40%
    score += project.likes * 0.2;              // 20%
    score += project.views * 0.05;             // 5%
    
    // Recency boost (25%)
    const hoursSinceLastSwipe = project.lastSwipedAt
      ? (new Date() - project.lastSwipedAt) / (1000 * 60 * 60)
      : 24;
    score += (24 - Math.min(hoursSinceLastSwipe, 24)) * 0.25;
    
    return { ...project, score };
  }).sort((a, b) => b.score - a.score);

  // 7. Prepare final response (limit to requested count, max 10)
  const resultLimit = Math.min(parseInt(limit) || 5, 10);
  const cards = scoredProjects.slice(0, resultLimit).map(project => ({
    _id: project._id,
    title: project.title,
    description: project.description.substring(0, 120),
    tags: project.tags,
    category: project.category,
    likes: project.likes,
    views: project.views,
    swipeScore: project.swipeScore,
    creator: project.postedBy,
    media: project.media?.imageUrls?.[0] || null,
    lastSwipedAt: project.lastSwipedAt
  }));

  // 8. Return response with remaining count
  res.status(200).json({
    success: true,
    cards,
    remaining: totalAvailable - resultLimit,
    filters: {
      appliedCategory: category || null,
      appliedTags: tags ? tags.split(',') : []
    }
  });
});

// Undo last swipe action
export const undoSwipe = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  // 1. Get most recent swipe with project details
  const lastSwipe = await Swipe.findOne({ userId })
    .sort({ createdAt: -1 })
    .populate('projectId', 'postedBy likes views swipeScore');

  if (!lastSwipe) {
    return next(new ErrorHandler("No swipes to undo", 404));
  }

  // 2. Delete the swipe record
  await Swipe.findByIdAndDelete(lastSwipe._id);

  // 3. Prepare project update
  const updateData = {
    $inc: { views: -1 },
    $pull: { recentLikers: userId }
  };

  // 4. Action-specific updates
  if (lastSwipe.action === 'like') {
    updateData.$inc.likes = -1;
    updateData.$inc.swipeScore = -SWIPE_SCORE_WEIGHTS.LIKE;

    // Remove from user's liked projects
    await User.findByIdAndUpdate(userId, {
      $pull: { likedProjects: lastSwipe.projectId._id }
    });

  } else if (lastSwipe.action === 'dislike') {
    updateData.$inc.dislikes = -1;
    updateData.$inc.swipeScore = -SWIPE_SCORE_WEIGHTS.DISLIKE;
  } else if (lastSwipe.action === 'skip') {
    updateData.$inc.skip = -1;
    updateData.$inc.swipeScore = -SWIPE_SCORE_WEIGHTS.SKIP;
  }

  // 5. Update project stats
  await Project.findByIdAndUpdate(
    lastSwipe.projectId._id,
    updateData,
    { new: true }
  );

  // 6. Return the undone swipe details
  res.status(200).json({
    success: true,
    message: "Swipe undone successfully",
    undoneSwipe: {
      action: lastSwipe.action,
      projectId: lastSwipe.projectId._id,
      projectTitle: lastSwipe.projectId.title,
      timestamp: lastSwipe.createdAt
    },
    updatedStats: {
      likes: lastSwipe.projectId.likes + (lastSwipe.action === 'like' ? -1 : 0),
      views: lastSwipe.projectId.views - 1,
      swipeScore: lastSwipe.projectId.swipeScore - 
        SWIPE_SCORE_WEIGHTS[lastSwipe.action.toUpperCase()]
    }
  });
});

// Get swipe history
export const getSwipeHistory = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const { action, limit = 20 } = req.query;
  
  // 1. Build query with consistent field names
  const query = { 
    userId,
    ...(action && { action }) 
  };

  // 2. Get swipes with basic project info
  const swipes = await Swipe.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .populate({
      path: 'projectId',
      select: 'title description tags category likes views postedBy media.imageUrls createdAt'
    })
    .lean();

  // 3. Format response to match other endpoints
  const history = swipes.map(swipe => ({
    _id: swipe._id,
    action: swipe.action,
    timestamp: swipe.createdAt,
    project: {
      _id: swipe.projectId?._id,
      title: swipe.projectId?.title,
      description: swipe.projectId?.description?.substring(0, 100),
      category: swipe.projectId?.category,
      tags: swipe.projectId?.tags,
      likes: swipe.projectId?.likes,
      views: swipe.projectId?.views,
      creator: swipe.projectId?.postedBy,
      media: swipe.projectId?.media?.imageUrls?.[0],
      createdAt: swipe.projectId?.createdAt
    }
  }));

  res.status(200).json({
    success: true,
    count: history.length,
    history,
    filters: {
      actionFilter: action || 'all'
    }
  });
});