import React, { useEffect, useState } from "react";

const ViewAlert = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await fetch("http://localhost:2000/api/alerts/getPost");
                const data = await response.json();
                setAlerts(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch alerts. Please try again later.");
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    if (loading) return <p style={styles.message}>Loading...</p>;
    if (error) return <p style={{ ...styles.message, color: "red" }}>{error}</p>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.headerText}>Worker Alerts</h1>
            </div>
            {alerts.length === 0 ? (
                <p style={styles.message}>No alerts available.</p>
            ) : (
                <ul style={styles.alertList}>
                    {alerts.map((alert) => (
                        <li key={alert._id} style={styles.alertItem}>
                            <h2 style={styles.alertWorker}>Worker Name: {alert.workerName}</h2>
                            <p style={styles.alertMessage}>Alert: {alert.message}</p>
                            <p style={styles.alertDate}>
                                Date: {new Date(alert.createdAt).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "0px",
        width: "100%",
        backgroundColor: "#f8f9fa",
    },
    header: {
        backgroundColor: "rgb(0, 51, 102)",
        color: "white",
        padding: "15px 20px",
        textAlign: "center",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        zIndex: 10,
    },
    headerText: { fontSize: "22px", margin: 0 },
    message: {
        fontSize: "16px",
        textAlign: "center",
        marginTop: "20px",
    },
    alertList: {
        listStyleType: "none",
        padding: "15px 20px",
    },
    alertItem: {
        marginBottom: "15px",
        padding: "15px",
        border: "2px solid #FF7518",
        borderRadius: "8px",
        textAlign: "left",
    },
    alertWorker: {
        fontSize: "18px", // Slightly larger for emphasis
        color: "black",
        fontWeight: "bold", // Emphasize worker name
        marginBottom: "10px",
    },
    alertMessage: {
        fontSize: "16px", // Smaller but readable
        color: "black",
        marginBottom: "5px", // Consistent spacing
    },
    alertDate: {
        fontSize: "16px", // Same size as the alert message
        color: "black",
        marginTop: "5px", // Consistent spacing
    },
};


export default ViewAlert;
