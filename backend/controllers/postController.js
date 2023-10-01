const Post = require("../models/PostModel");
const Category = require("../models/categoryModel");
const { throwResponseError } = require("../utils/Feature");

// create a new post
exports.createPost = async (req, res) => {
  try {
    // fetch the category name through request body
    const { title, image, content, readingTime, category } = req.body;

    // check filed is empty
    if ((!title || !image || !content || !readingTime, !category)) {
      return throwResponseError(
        res,
        404,
        false,
        `You must provide a all filed`
      );
    }
    // check category is existing
    const checkCategoryExist = await Category.findById(category);

    if (!checkCategoryExist) {
      return throwResponseError(res, 404, false, `Category does not exist`);
    }
    
    // all thing are correct then create new category
    const post = await Post.create({
      title,
      image,
      content,
      readingTime,
      category,
    });

     await Category.findByIdAndUpdate(checkCategoryExist._id,{$push:{
      post: post._id
    }})


    return res.status(200).json({
      post,
      success: true,
      message: `New post create successfully`,
    });
  } catch (error) {
    console.log("Post Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `Something went wrong while creating category`
    );
  }
};

// get all post
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("category").exec();
    // check Posts is not found
    if (!posts) {
      return throwResponseError(res, 404, false, `Posts not found`);
    }
    // if check doing correct send true response
    return res.status(200).json({
      posts,
      success: true,
      message: `Posts fetch successfully`,
    });
  } catch (error) {
    console.log("Fetch posts Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `Something went wrong while fetching posts`
    );
  }
};
exports.getAllAdminPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("category","name").exec();
    // check Posts is not found
    if (!posts) {
      return throwResponseError(res, 404, false, `Posts not found`);
    }
    // if check doing correct send true response
    return res.status(200).json({
      posts,
      success: true,
      message: `Posts fetch successfully`,
    });
  } catch (error) {
    console.log("Fetch posts Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `Something went wrong while fetching posts`
    );
  }
};

// Get single post details

exports.getPostDetails = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate("category").exec();
    // check Posts is not found
    if (!post) {
      return throwResponseError(res, 404, false, `Post not found`);
    }
    // if check doing correct send true response
    return res.status(200).json({
      post,
      success: true,
      message: `Post details fetch successfully`,
    });
  } catch (error) {
    console.log("Fetch post Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `Something went wrong while fetching post`
    );
  }
};

// update post
exports.updatePostDetails = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, image, content, readingTime, category } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        image,
        content,
        readingTime,
        category,
      },
      { new: true }
    );
    return res.status(200).json({
      post,
      success: true,
      message: `Post details Update successfully`,
    });
  } catch (error) {
    console.log("Update post Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `Something went wrong while update post`
    );
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return throwResponseError(res, 404, false, `Post not found`);
    }
    return res.status(200).json({
      success: true,
      message: `Post delete successfully`,
    });
  } catch (error) {
    console.log("Delete Post Error", error);
    return throwResponseError(
      res,
      404,
      false,
      `something went wrong while delete Post`
    );
  }
};
