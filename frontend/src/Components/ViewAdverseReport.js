import React, { useEffect, useState } from "react";

const ViewAdverseReport = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:2000/api/clientPost/getPost");
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={{ ...styles.message, color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Adverse Reports</h1>
      </div>
      {posts.length === 0 ? (
        <p style={styles.message}>No posts available.</p>
      ) : (
        <ul style={styles.postList}>
          {posts.map((post) => (
            <li key={post._id} style={styles.postItem}>
              <h2 style={styles.postTitle}>{post.name}</h2>
              <p style={styles.postContent}>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
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
  message: {
    fontSize: "16px",
    textAlign: "center",
    marginTop: "20px",
    
  },
  postList: {
    listStyleType: "none",
    padding: 0,
    padding: '15px 20px',
  },
  postItem: {
    marginBottom: "15px",
    padding: "15px",
    border: "2px solid #FF7518",  
    borderRadius: "8px",  
    textAlign: "left", 
  },
  postTitle: {
    fontSize: "20px",
    color: "black",
    marginBottom: "10px",  
  },
  postContent: {
    fontSize: "16px",
    color: "black",
  },
};

export default ViewAdverseReport;
