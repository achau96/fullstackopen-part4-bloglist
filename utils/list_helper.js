const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum,item) => {
    return sum + item
  }
  const blogLikes = blogs.map(blog => blog.likes)
  return blogLikes.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  let likes = 0
  let favBlog = {
    title: String,
    author: String,
    likes: String}
  blogs.forEach(function(blog) {
    if(blog.likes >= likes){
      likes = blog.likes
      favBlog = blog
    }
  })
  //Array destructuring. explained at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  return (({title,author,likes}) => ({title,author,likes}))(favBlog)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}