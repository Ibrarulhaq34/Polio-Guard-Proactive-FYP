import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostForm = ({ currentPost, setCurrentPost, fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setContent(currentPost.content);
      setImage(null); 
    } else {
      setTitle('');
      setContent('');
      setImage(null);
    }
  }, [currentPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (currentPost) {
       
        const response = await axios.put(`http://localhost:2000/api/posts/posts/${currentPost._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage(response.data.message);
      } else {
       
        const response = await axios.post('http://localhost:2000/api/posts/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage(response.data.message);
      }
      setCurrentPost(null); 
      fetchPosts(); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to save post');
    }
  };

  const styles = {
    button: {
      backgroundColor: 'rgb(0, 51, 102)',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    formGroup: {
      marginBottom: '15px',
      textAlign: 'left',  
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      minHeight: '100px',
    },
    message: {
      marginTop: '15px',
      fontSize: '14px',
      color: 'green',
    },
    formContainer: {
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto', 
    },
  };

  return (
    <div style={styles.formContainer}>
      <h2>{currentPost ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          {currentPost ? 'Update Post' : 'Create Post'}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default PostForm;
