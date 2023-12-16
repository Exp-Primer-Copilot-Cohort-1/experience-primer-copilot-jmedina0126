// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Create an event handler for the event type of comment created
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  // If the event type is comment created
  if (type === 'CommentCreated') {
    // Get the content from the comment created event
    const { id, content, postId, status } = data;
    // Replace the content of the comment with the content of the comment and the status of the comment
    const status = content.includes('orange') ? 'rejected' : 'approved';

    // Make a post request to the event bus and send the comment updated event
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  // Send a response to the event bus
  res.send({});
});

// Run the web server on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});