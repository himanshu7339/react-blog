const Category = require("../models/categoryModel");
const { throwResponseError } = require("../utils/Feature");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    // fetch the category name through request body
    const { name } = req.body;

    // check filed is empty
    if (!name) {
      return throwResponseError(
        res,
        404,
        false,
        `You must provide a category name`
      );
    }

    // check the category name is already available
    const existingCategory = await Category.findOne({ name: name });

    if (existingCategory) {
      return throwResponseError(
        res,
        404,
        false,
        `Category ${existingCategory} already exists`
      );
    }

    // all thing are correct then create new category
    const category = await Category.create({
      name,
    });

    return res.status(200).json({
      category,
      success: true,
      message: `New category create successfully`,
    });
  } catch (error) {
    console.log("Category Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `something went wrong while creating category`
    );
  }
};

// find all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    // check categories is not found
    if (!categories) {
      return throwResponseError(res, 404, false, `Categories not found`);
    }
    // if check doing correct send true response
    return res.status(200).json({
      categories,
      success: true,
      message: `Categories fetch successfully`,
    });
  } catch (error) {
    console.log("Fetch Category Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `something went wrong while fetching categories`
    );
  }
};
// get all categories admin
exports.getAllAdminCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    // check categories is not found
    if (!categories) {
      return throwResponseError(res, 404, false, `Categories not found`);
    }
    // if check doing correct send true response
    return res.status(200).json({
      categories,
      success: true,
      message: `Categories fetch successfully`,
    });
  } catch (error) {
    console.log("Fetch Category Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `something went wrong while fetching categories`
    );
  }
};
// find category details
exports.getCategoryDetails = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    // check categories is not found
    if (!category) {
      return throwResponseError(res, 404, false, `Category not found`);
    }
    // if check doing correct send true response
    return res.status(200).json({
      category,
      success: true,
      message: `Category details fetch successfully`,
    });
  } catch (error) {
    console.log("Fetch category Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `something went wrong while fetching category`
    );
  }
};

// update category

exports.updateCategoryDetails = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name: name },
      { new: true }
    );
    return res.status(200).json({
      category,
      success: true,
      message: `Category details Update successfully`,
    });
  } catch (error) {
    console.log("Update category Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `something went wrong while update category`
    );
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return throwResponseError(res, 404, false, `Category not found`);
    }
    return res.status(200).json({
      category,
      success: true,
      message: `Category delete successfully`,
    });
  } catch (error) {
    console.log("Delete category Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `something went wrong while delete category`
    );
  }
};
