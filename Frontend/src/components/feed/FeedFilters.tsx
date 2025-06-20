
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FeedFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOptions: string[];
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const FeedFilters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  sortOptions,
  sortBy,
  onSortChange 
}: FeedFiltersProps) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FeedFilters;