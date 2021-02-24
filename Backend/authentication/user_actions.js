const dotenv = require("dotenv");
dotenv.config();

const router = require("express").Router()
const jwt = require("jsonwebtoken")
const EventEmitter = require('events');
const multer = require('multer')
const path = require('path');

const User = require("../models/User")
const primaryResearch = require("../models/PrimaryResearch");
const JobOffer = require("../models/JobOffer");
const Notification = require('../models/Notification')
const UserSearch = require("../models/UserSearch");

//Uploading cv
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/upload', upload.single('cv'), async (req, res, next) => {

    console.log(req.file)

    let token = req.header('auth-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    User.findOneAndUpdate({
        "_id": payload.id
    }, {
        "$set": {
            "cv": req.file.path
        }
    }, function (err, updatedObject) {

        if (err) {
            console.log(err)
            return res.status(500).send(err)

        } else {
            console.log("success")
            return res.status(200).send()
        }
    });

});

router.get('/profile', async (req, res) => {
    let token = req.header('auth-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    try {
        const user = await User.find({
            _id: payload.id
        })
        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

});
router.put('/profile', async (req, res) => {

    let token = req.header('auth-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(payload.id)
    const filter = {
        _id: payload.id
    };
    const updateObject = req.body;

    try {
        let updatedObject = await User.findOneAndUpdate(filter, updateObject)
        return res.status(200).send(updatedObject)
    } catch (err) {
        return res.status(500).send(err)
    }

});

//Submitting resaerch + keyword to scraper
router.post('/search', (req, res) => {

    let token = req.header('auth-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const myEmitter = new EventEmitter();

    let req_words = req.body.link.split(" ");
    let req_keywords = req.body.keywords.split(" ");

    req_keywords = req_keywords.filter(function (el) {
        return el != "";
      });
    
    let pages = parseInt(req.body.pages) + 1;

    if (pages > myEmitter.getMaxListeners()) {
        pages = myEmitter.getMaxListeners()
    }

    let words_concat = req_words.join("+")

    let links_array = []

    for (let i = 1; i < pages; i++) {
        links_array.push(`https://www.talents.tn/listing?location=Tout+Tunisia&latitude=&longitude=&placetype=country&placeid=TN&keywords=${words_concat}&cat=&subcat=&page=${i}`)
    }

    const document = new primaryResearch({
        "links": links_array,
        "keywords": req_keywords,
        "search_text": req.body.link,
        "user_id": payload.id
    });

    document.save(function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Success")
        }
    });

    const usersearch = new UserSearch({
        "keywords": req_keywords,
        "search_text": req.body.link,
        "user_id": payload.id
    });

    usersearch.save(function (err) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log("Success")
            res.send(`usersearch added to collection`)
        }
    });
});

//Getting all jobs
router.get('/jobs', async (req, res) => {

    let token = req.header('auth-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    try {
        const allObjects = await JobOffer.find({
            user_id: payload.id
        })
        res.json(allObjects);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

});

//Getting all submitted jobs
router.get('/jobs/submitted', async (req, res) => {

    let token = req.header('auth-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    try {
        const allObjects = await JobOffer.find({
            user_id: payload.id,
            status: "submitted"
        })
        res.json(allObjects);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

});

//Get job by id 
router.get('/job', getJob, (req, res) => {
    res.send(res.job)
});

//Get usersearches
router.get('/usersearch', async (req, res) => {

    let token = req.header('auth-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    try {
        const userSearch = await UserSearch.find({
            user_id: payload.id
        })
        res.json(userSearch);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

});

//Get job by search_text
router.get('/job/bytext', async (req, res) => {

    let token = req.header('auth-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    try {
        const job_by_search_id = await JobOffer.find({
            user_id: payload.id,
            search_text: req.header('search-text')
        })
        res.json(job_by_search_id);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

});


//Submit to job 
router.get('/job/submit', getJob, async (req, res) => {

    if (res.job.status == "submitted") {
        return res.status(200).json({
            message: `You have already submitted ${res.job.title} : ${res.job.job_link} !`
        });
    }

    let user = await User.findById(res.job.user_id)

    const email = new Notification({
        url: res.job.id,
        title: res.job.title,
        user_id: user,
        source: "1"
    });

    email.save(function (err) {
        if (err) {
            return res.status(200).json({
                message: `error saving email to send  ${err}`
            });
        };
        console.log("Email to send added")
        return res.status(200).json({
            message: `Your job submission to  ${res.job.title} is on its way :)`
        });
    });


});


//Delete job
router.delete('/job/delete', getJob, async (req, res) => {
    try {
        await res.job.remove();
        return res.status(200).json({
            message: `Job deleted with success`
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

//Delete all user jobs
router.delete('/jobs/delete', async (req, res) => {

    let token = req.header('auth-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    UserSearch.remove({
        "user_id": payload.id
    }, function (err) {
        if (err) {
            return res.status(500).json({
                message: error.message
            });
        }
    });

    JobOffer.remove({
        "user_id": payload.id
    }, function (err) {
        if (err) {
            return res.status(500).json({
                message: error.message
            });
        } else {
            return res.status(200).json({
                message: `Jobs deleted with success`
            });
        }
    });
});

//Delete  user searchs
router.delete('/search/delete', async (req, res) => {

    let token = req.header('auth-token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    JobOffer.remove({
        "search_text": req.header('search-text'),
        "user_id": payload.id,
        "status": "unchanged"
    }, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("All jobs under this search text are deleted with success ")
        }
    });

    UserSearch.remove({
        "_id": req.header('search_id')
    }, function (err) {
        if (err) {
            return res.status(500).write({
                message: error.message
            });
        } else {
            return res.status(200).json({
                message: `Search + its under jobs are deleted with success`
            });
        }
    });
});


// Getting jobs by id middleware
async function getJob(req, res, next) {

    let job

    try {
        job = await JobOffer.findById(req.header('job_id'))
        if (job == null) {
            return res.status(404).json({
                message: `No job with id: ${req.header('job_id')} is found`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

    res.job = job
    next()
}


module.exports = router