const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryDetails,
  updateCategoryDetails,
  deleteCategory,
  getAllAdminCategories,
} = require("../controllers/categoryController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.route("/category/create").post(isAuthenticated, isAdmin, createCategory);
router.route("/categories").get(getAllCategories);
router
  .route("/admin/categories")
  .get(isAuthenticated, isAdmin, getAllAdminCategories);
router
  .route("/admin/category/:categoryId")
  .get(getCategoryDetails)
  .put( isAuthenticated,isAdmin, updateCategoryDetails)
  .delete( isAuthenticated,isAdmin, deleteCategory);

module.exports = router;
