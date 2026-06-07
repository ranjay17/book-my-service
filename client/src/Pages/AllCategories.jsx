import React, {useState} from 'react'
import categories from '../utils/categoriesData';
import CartegoryCard from '../Components/CartegoryCard';

const AllCategories = () => {
    const [allCategories, setAllCategories] = useState(categories);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {allCategories.map((c) => (
          <CartegoryCard
            key={c.id}
            title={c.title}
            desc={c.description}
            img={c.image}
          />
        ))}
      </div>
    </div>
  );
}

export default AllCategories
