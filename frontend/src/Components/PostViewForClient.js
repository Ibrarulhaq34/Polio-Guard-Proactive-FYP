import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostViewForClient = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); 

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/posts/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const styles = {
    container: {
      textAlign: 'center',
      padding: '0px',
      width: '100%',
      backgroundColor: '#f8f9fa',
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
      boxSizing: 'border-box',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    headerText: { fontSize: '22px', margin: 0 },

    postList: {
      listStyleType: 'none',
      padding: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Grid for images
      gap: '5px', // Reduced gap to make the images closer
      justifyContent: 'center',
    },
    postItem: {
      backgroundColor: 'transparent', // No background
      borderRadius: '0', // Remove border radius to make images appear close
      boxShadow: 'none', // Remove shadow
      padding: '0', // No padding
      cursor: 'pointer',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
    postImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover', // Ensures images cover the container area without stretching
      borderRadius: '0', // Remove border radius
      margin: '0', // Remove margin between images
    },
    postTitle: {
      fontSize: '20px',
      color: '#333',
      marginBottom: '10px',
      textAlign: 'center',
    },
    postDescription: {
      fontSize: '16px',
      color: '#555',
      textAlign: 'center',
      marginBottom: '10px',
    },
    noPosts: {
      textAlign: 'center',
      color: '#999',
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      display: selectedPost ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: '100',
    },
    modalContent: {
      backgroundColor: 'white', // Set the background color to white
      borderRadius: '8px',
      padding: '20px',
      width: '80%',
      maxWidth: '600px',
      textAlign: 'center',
      border: '5px solid #FF7518', // Add border with #FF7518 color
    },
    modalImage: {
      width: '100%',
      height: 'auto',
      maxWidth: '500px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    modalTitle: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '15px',
    },
    modalDescription: {
      fontSize: '18px',
      color: '#555',
      marginBottom: '20px',
    },
    closeButton: {
      padding: '10px 20px',
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
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
        <ul style={styles.postList}>
          {posts.map((post) => (
            <li
              key={post._id}
              style={styles.postItem}
              onClick={() => openModal(post)} // Open modal on image click
            >
              <img
                style={styles.postImage}
                src={`http://localhost:2000${post.imageUrl}`}
                alt={post.title}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Modal for enlarged view */}
      {selectedPost && (
        <div style={styles.modal} onClick={closeModal}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            <img
              style={styles.modalImage}
              src={`http://localhost:2000${selectedPost.imageUrl}`}
              alt={selectedPost.title}
            />
            <h2 style={styles.modalTitle}>{selectedPost.title}</h2>
            <p style={styles.modalDescription}>{selectedPost.content}</p>
            <button style={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostViewForClient;
