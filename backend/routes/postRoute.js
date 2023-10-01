const express = require("express");
const { createPost, getPostDetails, updatePostDetails, deletePost, getAllPosts, getAllAdminPosts } = require("../controllers/postController");
const { isAdmin, isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/post/create").post(isAuthenticated,isAdmin ,createPost);
router.route("/posts").get(getAllPosts);
router.route("/admin/posts").get(isAuthenticated,isAdmin ,getAllAdminPosts);
router.route("/post/:postId").get(getPostDetails)
router.route("/admin/post/:postId").put( isAuthenticated,isAdmin,updatePostDetails).delete( isAuthenticated,isAdmin,deletePost);

module.exports = router;
