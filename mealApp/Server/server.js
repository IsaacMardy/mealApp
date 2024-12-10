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

function getMealIDs(list) {
    const idArrays = [];
    for (const item of list) {
        idArrays.push(new ObjectId(item._id));
    }
    return idArrays;
}


app.put('/addPersonalSchedule', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('PersonalSchedule');

        // Transform the schedule
        const updatedBody = {
            scheduleName: req.body.scheduleName,
            userId: new ObjectId(req.body.userId), // Ensure userId is an ObjectId
            SundayBreakfast: getMealIDs(req.body.SundayBreakfast),
            SundayLunch: getMealIDs(req.body.SundayLunch),
            SundayDinner: getMealIDs(req.body.SundayDinner),
            MondayBreakfast: getMealIDs(req.body.MondayBreakfast),
            MondayLunch: getMealIDs(req.body.MondayLunch),
            MondayDinner: getMealIDs(req.body.MondayDinner),
            TuesdayBreakfast: getMealIDs(req.body.TuesdayBreakfast),
            TuesdayLunch: getMealIDs(req.body.TuesdayLunch),
            TuesdayDinner: getMealIDs(req.body.TuesdayDinner),
            WednesdayBreakfast: getMealIDs(req.body.WednesdayBreakfast),
            WednesdayLunch: getMealIDs(req.body.WednesdayLunch),
            WednesdayDinner: getMealIDs(req.body.WednesdayDinner),
            ThursdayBreakfast: getMealIDs(req.body.ThursdayBreakfast),
            ThursdayLunch: getMealIDs(req.body.ThursdayLunch),
            ThursdayDinner: getMealIDs(req.body.ThursdayDinner),
            FridayBreakfast: getMealIDs(req.body.FridayBreakfast),
            FridayLunch: getMealIDs(req.body.FridayLunch),
            FridayDinner: getMealIDs(req.body.FridayDinner),
            SaturdayBreakfast: getMealIDs(req.body.SaturdayBreakfast),
            SaturdayLunch: getMealIDs(req.body.SaturdayLunch),
            SaturdayDinner: getMealIDs(req.body.SaturdayDinner)
        };

        // Use upsert to update or insert
        const result = await collection.updateOne(
            { userId: updatedBody.userId },
            { $set: updatedBody },
            { upsert: true }
        );

        return res.status(200).json({ success: true, result: result });
    } catch (error) {
        console.error('Error in adding personal schedule:', error);
        return res.status(500).send(error);
    }
});


app.post('/publishSchedule', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Schedules');

        const updatedBody = {
            scheduleName: req.body.scheduleName,
            userId: new ObjectId(req.body.userId),
            SundayBreakfast: getMealIDs(req.body.SundayBreakfast),
            SundayLunch: getMealIDs(req.body.SundayLunch),
            SundayDinner: getMealIDs(req.body.SundayDinner),
            MondayBreakfast: getMealIDs(req.body.MondayBreakfast),
            MondayLunch: getMealIDs(req.body.MondayLunch),
            MondayDinner: getMealIDs(req.body.MondayDinner),
            TuesdayBreakfast: getMealIDs(req.body.TuesdayBreakfast),
            TuesdayLunch: getMealIDs(req.body.TuesdayLunch),
            TuesdayDinner: getMealIDs(req.body.TuesdayDinner),
            WednesdayBreakfast: getMealIDs(req.body.WednesdayBreakfast),
            WednesdayLunch: getMealIDs(req.body.WednesdayLunch),
            WednesdayDinner: getMealIDs(req.body.WednesdayDinner),
            ThursdayBreakfast: getMealIDs(req.body.ThursdayBreakfast),
            ThursdayLunch: getMealIDs(req.body.ThursdayLunch),
            ThursdayDinner: getMealIDs(req.body.ThursdayDinner),
            FridayBreakfast: getMealIDs(req.body.FridayBreakfast),
            FridayLunch: getMealIDs(req.body.FridayLunch),
            FridayDinner: getMealIDs(req.body.FridayDinner),
            SaturdayBreakfast: getMealIDs(req.body.SaturdayBreakfast),
            SaturdayLunch: getMealIDs(req.body.SaturdayLunch),
            SaturdayDinner: getMealIDs(req.body.SaturdayDinner)
        };

        // Insert the updated object into the database
        const result = await collection.insertOne(updatedBody);

        return res.status(200).json({ success: true, result: result });
    } catch (error) {
        console.error('Error in adding personal schedule:', error);
        return res.status(500).send(error);
    }
});



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

//added by Isaac
// Filter meals by ingredients
app.get('/filterMeals', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Meals');

        // Extract the ingredients from the query parameter
        const { ingredients } = req.query;
        const ingredientArray = ingredients.split(',').map(ing => ing.trim());

        const filteredMeals = await collection.find({
            ingredients: { $all: ingredientArray }
        }).toArray();

        return res.status(200).json({ success: true, meals: filteredMeals });
    } catch (error) {
        console.error('Error filtering meals:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

//Dietician routing

// Add a new dietician
app.post('/addDietician', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Dieticians');
        const existingDietician = await collection.findOne({ email: req.body.email });
        if (existingDietician) {
            return res.status(400).json({ message: 'Dietician already exists' });
        } else {
            await collection.insertOne(req.body);
            return res.status(201).json({ success: true, message: 'Dietician added successfully' });
        }
    } catch (err) {
        console.error('Error adding dietician:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a dietician
app.delete('/deleteDietician', async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id || !ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid dietician ID' });
        }

        const db = client.db('Mealdatabase');
        const collection = db.collection('Dieticians');
        const result = await collection.deleteOne({ _id: new ObjectId(_id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Dietician not found' });
        }

        return res.status(200).json({ success: true, message: 'Dietician deleted successfully' });
    } catch (err) {
        console.error('Error deleting dietician:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all dieticians
app.get('/getAllDieticians', async (req, res) => {
    try {
        const db = client.db('Mealdatabase');
        const collection = db.collection('Dieticians');
        const dieticians = await collection.find({}).toArray();
        return res.status(200).json({ success: true, dieticians });
    } catch (err) {
        console.error('Error retrieving dieticians:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get dietician details by ID
app.get('/getDieticianDetail', async (req, res) => {
    try {
        const { id } = req.query;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid dietician ID format' });
        }

        const db = client.db('Mealdatabase');
        const collection = db.collection('Dieticians');
        const dietician = await collection.findOne({ _id: new ObjectId(id) });

        if (!dietician) {
            return res.status(404).json({ message: 'Dietician not found' });
        }

        return res.status(200).json({ success: true, dietician });
    } catch (err) {
        console.error('Error retrieving dietician detail:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/getUserRole', authenticateUser, (req, res) => {
    const user = req.user; // Assuming user info is attached to the request
    res.json({ role: user.role });
});

