import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5001;

app.use(cors());

app.use(bodyParser.json());

const uri = 'mongodb+srv://yhshin316:6EFS8HwBZfw1oWxP@cluster0.civuo.mongodb.net/';
const client = new MongoClient(uri);
const JWT_SECRET = 'your-jwt-secret';

client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.get('/loginCheck', async (req, res) => {
    const user = req.query;
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Users')
        const existingUser = await collection.findOne({ userID: user.userID, password: user.password });
        if (existingUser) {
            return res.status(200).json({ success: true, user: existingUser, message: 'Login Successful' });
        } else {
            return res.status(400).json({ message: 'UserID or Password is wrong' });
        }
    } catch (err) { }
}
);

app.post('/signup', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Users')
        const existingUser = await collection.findOne({ userID: req.body.userID });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        } else {
            await collection.insertOne(req.body)
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
);

app.get('/getAllUsers', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Users')
        const allExistingUsers = await collection.find({ firstName: { $exists: true }, lastName: { $exists: true } }, { firstName: 1, lastName: 1 }).toArray();
        return res.status(200).json({ success: true, users: allExistingUsers })
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/updateSchedule', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Users')
        const { _id, schedule } = req.body
        schedule._id = new ObjectId(schedule._id); // Convert string _id to ObjectId
        const result = await collection.updateOne(
            { _id: new ObjectId(_id) },
            { $set: { schedule: schedule } }
        );
        return res.status(200).json({ success: true, result: result })
    }
    catch (error) {
        res.status(500).send(error)
    }
})


//meals
app.post('/addMeal', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Meals')
        const meal = await collection.findOne({ mealName: req.body.mealName });
        if (meal) {
            return res.status(400).json({ message: 'Meal name already exists' });
        } else {
            await collection.insertOne(req.body)
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
);

app.get('/getAllMeals', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Meals')
        const meals = await collection.find({ mealName: { $exists: true } }).toArray();
        return res.status(200).json({ success: true, meals: meals })
    } catch (error) {
        res.status(500).send(error)
    }
})















//new project route
app.post('/createTeam', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Team')
        const exist = await collection.findOne({ teamName: req.body.teamName });
        if (exist) {
            return res.status(400).json({ message: 'Team name already exists' });
        } else {
            await collection.insertOne(req.body)
        }
        return res.status(200)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getAllTeamNames', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Team')
        const allTeams = await collection.find({ teamName: { $exists: true } }).toArray();
        return res.status(200).json({ success: true, teams: allTeams })
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getTeamDetail', async (req, res) => {
    try {

        if (!ObjectId.isValid(req.query._id)) {
            return res.status(400).json({ success: false, message: 'Invalid team ID format' });
        }

        const db = client.db('Mealdatabase');
        const collection = db.collection('Team')
        const teamDetail = await collection.findOne({ _id: new ObjectId(req.query._id) });
        return res.status(200).json({ success: true, team: teamDetail, message: 'Team Details Found' });
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/updateTeamDetail', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Team')
        const { _id, teamName, teamMembers } = req.body;
        const result = await collection.updateOne(
            { _id: new ObjectId(_id) },
            { $set: { teamName, teamMembers } }
        );
        return res.status(200)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

//new project route
app.post('/createProject', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Project')
        const exist = await collection.findOne({ projectName: req.body.projectName });
        if (exist) {
            return res.status(400).json({ message: 'Project name already exists' });
        } else {
            await collection.insertOne(req.body)
        }
        return res.status(200)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getAllProjects', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Project')
        const allProjects = await collection.find({ projectName: { $exists: true } }).toArray();
        return res.status(200).json({ success: true, projects: allProjects })
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/updateProject', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Project')
        const { _id, projectName, projectDescription, projectOwner, Manager, Team } = req.body
        const result = await collection.updateOne(
            { _id: new ObjectId(_id) },
            { $set: { projectName, projectDescription, projectOwner, Manager, Team } }
        );
        return res.status(200)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getProjectDetail', async (req, res) => {
    try {

        if (!ObjectId.isValid(req.query._id)) {
            return res.status(400).json({ success: false, message: 'Invalid team ID format' });
        }

        const db = client.db('Mealdatabase');
        const collection = db.collection('Project')
        const teamDetail = await collection.findOne({ _id: new ObjectId(req.query._id) });
        return res.status(200).json({ success: true, project: teamDetail, message: 'Team Details Found' });
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/createUserStory', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('UserStory')

        const { user_Story, proj_id, priority } = req.body;

        const newUserStory = {
            user_Story,
            proj_id: new ObjectId(proj_id),
            priority
        }


        await collection.insertOne(newUserStory)
        return res.status(200)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getAllProjectUserStories', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('UserStory')
        const allUserStories = await collection.find({ proj_id: new ObjectId(req.query._id) }).toArray();
        return res.status(200).json({ success: true, stories: allUserStories })
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/updateUserStory', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('UserStory')
        const { _id, user_Story, proj_id, priority, Assignee } = req.body
        const result = await collection.updateOne(
            { _id: new ObjectId(_id) },
            { $set: { user_Story, proj_id: new ObjectId(proj_id), priority, Assignee: new ObjectId(Assignee) } }
        );
        return res.status(200)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/deleteUserStory', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('UserStory');

        const result = await collection.deleteOne({ _id: new ObjectId(req.body._id) });

        if (result.deletedCount === 1) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(404).json({ success: false, message: 'Story not found' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});