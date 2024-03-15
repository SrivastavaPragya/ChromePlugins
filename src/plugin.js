// Function to start a session
function startSession() {
    fetch('http://yourserver.com/start-session', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('sessionId', data.sessionId);
            console.log('Session started with ID:', data.sessionId);
        })
        .catch(err => console.error('Error starting session:', err));
}

// Function to end a session
function endSession() {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
        fetch('http://yourserver.com/stop-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId: sessionId }),
        })
        .then(() => {
            localStorage.removeItem('sessionId');
            console.log('Session ended');
        })
        .catch(err => console.error('Error ending session:', err));
    }
}

// Example function that sends data, conditional on an active session
function sendData(data) {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
        const payload = { ...data, sessionId };
        // Send payload to server
        console.log("Sending data payload to server with session ID:", sessionId);
        // Here, implement the logic to send the payload to your server
    } else {
        console.log("No active session, not sending data");
    }
}
