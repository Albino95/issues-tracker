// Add neccessary lib
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// Some demo data
let issues = [
  { id: uuidv4(), title: "First Issue", description: "This is the first issue" },
  { id: uuidv4(), title: "Second Issue", description: "This is the second issue" }
];

//get all issues
app.get('/issues', (req, res) => {
  res.json(issues);
});

// add issue
app.post('/issues', (req, res) => {
  const newIssue = { 
    id: uuidv4(), 
    title: req.body.title, 
    description: req.body.description 
  };
  issues.push(newIssue);
  console.log('Issue created:', newIssue);
  res.status(201).json(newIssue);
});

// update
app.put('/issues/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const issue = issues.find(issue => issue.id === id);
  if (issue) {
    issue.title = title;
    issue.description = description;
    console.log('Issue updated:', issue);
    res.json(issue);
  } else {
    res.status(404).json({ message: 'Issue not found' });
  }
});

// remove
app.delete('/issues/:id', (req, res) => {
  const { id } = req.params;
  issues = issues.filter(issue => issue.id !== id);
  console.log('Issue deleted:', id);
  res.json({ message: 'Issue deleted' });
});

// run the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
