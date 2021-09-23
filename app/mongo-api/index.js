
const dotenv = require('dotenv').config();
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const mongodbDebugger = require('debug')('app:mongodb');
const Joi = require('joi'); 
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')
const app = express();
// const logger = require('./logger');
// const authenticator = require('./authenticator');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.use(helmet());

// Configuration 



const env = process.env.NODE_ENV || 'development'

if (env === 'development'){

    startupDebugger('Application Name: ' + config.get('name'))
    startupDebugger(`Morgan: enabled`);
    startupDebugger(`Helmet: enabled`);
    startupDebugger(`JOI: enabled`);
    
    mongodbDebugger('Database.Host: ' + config.get('mongodb.host'))
    mongodbDebugger('Database.Name: ' + config.get('mongodb.database'))
    mongodbDebugger('Database.Collection: ' + config.get('mongodb.collection'))


    app.use(morgan('dev'));
}; 


/**
 * Custom Middleware
 */
// app.use(logger);
// app.use(authenticator);


const challenges = [
    {id: 1, name: 'challenge sample 1'},
    {id: 2, name: 'challenge sample 2'},
    {id: 3, name: 'challenge sample 3'},
];


/**
 * 
 */
app.get('/api', (req,res) => {
    res.send('Hello World')
});


/**
 * 
 */
app.get('/api/challenges', (req,res) => {
    res.send(challenges);
});


/**
 * 
 */
app.get('/api/challenges/:id', (req,res) => {
    const challenge = challenges.find(c => c.id === parseInt(req.params.id));
    if (!challenge) return res.status(404).send('Challenge ID not found');
    res.send(challenge);
});

/**
 * @todo move to asyn methods for schema validation 
 * 
 * @
 */ 
app.post('/api/challenges', (req,res) => {
    const {error} = validate_challenge(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const challenge = {
        id: challenges.length + 1,
        name: req.body.name
    };

    challenges.push(challenge);
    res.send(challenge);
});

/**
 * 
 */
app.put('/api/challenges/:id', (req,res) => {
    const challenge = challenges.find(c => c.id === parseInt(req.params.id));
    if (!challenge) return res.status(404).send('Challenge ID not found');
    
    const {error} = validate_challenge(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    
    challenge.name = req.body.name;
    res.send(challenge);
});

/**
 * 
 */
app.delete('/api/challenges/:id', (req,res) => {
    const challenge = challenges.find(c => c.id === parseInt(req.params.id));
    if (!challenge) return res.status(404).send('Challenge ID not found');

    const index = challenges.indexOf(challenge)
    challenges.splice(index,1)
    res.send(challenge)
});

/**
 * 
 */
function validate_challenge(challenge) {
    const challenges_schema = Joi.object({ 
        name: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[a-zA-Z0-9_ ]$'))
            .required(),
    })

    return result = challenges_schema.validate({ 
        name: challenge.name
    });

};


/**
 * 
 */
function locate_challenge(id) {
    const result = challenges.find(c => c.id === parseInt(id));
    if (!result) 
        return undefined;
    else 
        return result;

};


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`));

