import "./CategoryFilter.css";

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  const allCategories = ["Todos", ...categories];

  return (
    <div className="category-filter">

      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() =>
            onCategoryChange(category === "Todos" ? "" : category)
          }
          className={`category-button ${
            (category === "Todos" && !selectedCategory) ||
            selectedCategory === category
              ? "active"
              : ""
          }`}
        >
          {category}
        </button>
      ))}

    </div>
  );
}

export default CategoryFilter;