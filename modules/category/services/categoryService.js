const Category = require('../models/Category')

/**
 * Create new category
 * @param {Object} categoryInput - Category input, validated by category validation
 * @returns {Category}
 */
const addCategory = async (categoryInput) => {
  const category = new Category(categoryInput)
  await category.save()
  return category
}

const getNonLeafCategories = async () => {
  const categories = await Category.find({
    isLeaf: false,
    isActive: true
  }).lean()
  return categories
}

module.exports = {
  addCategory,
  getNonLeafCategories
}
