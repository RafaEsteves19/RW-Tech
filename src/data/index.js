const modules = import.meta.glob("./*.js", {
  eager: true
});

const reviewsData = [];

Object.entries(modules).forEach(([path, module]) => {
  if (path.endsWith("index.js")) return;

  if (Array.isArray(module.default)) {
    reviewsData.push(...module.default);
  }
});

reviewsData.sort((a, b) => b.rating - a.rating);

export default Object.freeze(reviewsData);