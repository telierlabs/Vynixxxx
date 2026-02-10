import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="px-6 md:px-10 mb-6">
      <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-2">
        <button
          onClick={() => onSelectCategory('All')}
          className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all ${
            activeCategory === 'All'
              ? 'bg-white text-black'
              : 'bg-zinc-900 text-zinc-500 hover:text-white border border-white/5'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all ${
              activeCategory === category
                ? 'bg-white text-black'
                : 'bg-zinc-900 text-zinc-500 hover:text-white border border-white/5'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
