export const selectorGetAllposts = (state) => state.post.posts;
export const selectorGetCurrentPost = (state) => state.post.currentPost;
export const selectorGetPopularPost = (state) => state.post.popularPosts;
export const selectorGetUserPost = (state) => state.post.userPosts;
export const selectorGetErrorPost = (state) => state.post.error;
export const selectorGetIsLoading = (state) => state?.post?.isLoading;
