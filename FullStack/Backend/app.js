const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// app.get('/users', (req, res) => {

//     const filePath = path.join(__dirname, 'users.json');

//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading the file:', err);
//             return;
//         }

//         try {
//             const users = JSON.parse(data);
//             console.log('Users:', users);
//         } catch (parseError) {
//             console.error('Error parsing JSON:', parseError);
//         }
//     });
// });

app.get('/topUsers', (req, res) => {
    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).send('Server Error');
        }

        try {
            const users = JSON.parse(data);

            const topUsers = users
                .sort((a, b) => b.postCount - a.postCount)
                .slice(0, 5);

            res.json(topUsers);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Server Error');
        }
    });
});



app.get('/topPosts', (req, res) => {
    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).send('Server Error');
        }

        try {
            // const users = JSON.parse(data);

            // const allPosts = users.map(user => user.posts);
            // console.log('All Posts:', allPosts);

            // const topPosts = allPosts
            //     .sort((a, b) => b.number_of_comments - a.number_of_comments)
            //     .slice(0, 5);

            const users = JSON.parse(data);
            const allPosts = [];
            users.forEach(user => {
                users.posts.forEach(post => {
                    allPosts.push({
                        userId: user.id,
                        postId: post.id,
                        title: post.title,
                        body: post.body,
                        number_of_comments: post.comments.length
                    });
                });

            });

            allPosts.sort((a, b) => b.number_of_comments - a.number_of_comments);

            res.json(allPosts);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Server Error');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});

