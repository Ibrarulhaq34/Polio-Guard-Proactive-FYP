import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from './PostForm';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/posts/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/posts/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
      padding: '15px 20px',
      textAlign: 'center',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    headerText: { fontSize: '22px', margin: 0 },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '20px',
      paddingTop: "20px",
    },
    postItem: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', 
      height: '100%', 
      textAlign: 'center',
      border: '2px solid #FF7518',
      paddingBottom: "20px",
      paddingTop: "20px",
    },
    postImage: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '15px',
    },
    postTitle: {
      fontSize: '18px', 
      color: '#333',
      fontWeight: 'bold',
      marginBottom: '12px', 
    },
    postDescription: {
      fontSize: '14px', 
      color: '#555',
      marginBottom: '15px', 
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 3, 
    },
    postDate: {
      fontSize: '12px', 
      color: '#999',
      marginBottom: '15px', 
    },
    postActions: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '15px',
      marginTop: 'auto', 
    },
    button: {
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
      border: 'none',
      padding: '8px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px', 
      transition: 'background-color 0.3s ease, transform 0.3s ease', 
    },
    buttonHover: {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)', 
    },
    noPosts: {
      textAlign: 'center',
      color: '#999',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Posts</h1>
      </div>
      {posts.length === 0 ? (
        <p style={styles.noPosts}>No posts available</p>
      ) : (
        <div style={styles.gridContainer}>
          {posts.map((post) => (
            <div key={post._id} style={styles.postItem}>
              {post.imageUrl && (
                <img
                  style={styles.postImage}
                  src={`http://localhost:2000${post.imageUrl}`}
                  alt={post.title}
                />
              )}
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postDescription}>{post.content}</p>
              <p style={styles.postDate}>
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div style={styles.postActions}>
                <button
                  style={styles.button}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = styles.button.backgroundColor)
                  }
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </button>
                <button
                  style={styles.button}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = styles.button.backgroundColor)
                  }
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <PostForm
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
        fetchPosts={fetchPosts}
      />
    </div>
  );
};

export default PostList;
