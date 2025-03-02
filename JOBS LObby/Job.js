const db = require("../Database/database");

// Fetch All Jobs
const JobLobby = async (req, res) => {
    const query = "SELECT * FROM jobs";

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching jobs" });
        }

        // Convert logo path to full URL
        const jobsWithFullPath = result.map(job => ({
            ...job,
            logo: job.logo ? `http://localhost:5000${job.logo}` : null,
            banner: job.banner ? `http://localhost:5000${job.banner}` : null
        }));

        res.json(jobsWithFullPath);
    });
};

// Fetch Job by ID
const Jobid = async (req, res) => {
    const jobId = req.params.id;
    const query = "SELECT * FROM jobs WHERE id = ?";

    db.query(query, [jobId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching job details" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json({
            ...result[0],
            logo: result[0].logo ? `http://localhost:5000${result[0].logo}` : null,
            banner: result[0].banner ? `http://localhost:5000${result[0].banner}` : null
        });
    });
};

// Post a Job (Logo & Banner handled in Router)
const JobPost = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        const { title, jobType, description, salary, company, location } = req.body;

        const logo = req.files && req.files["logo"] ? `/uploads/${req.files["logo"][0].filename}` : null;

        if (!title || !jobType || !description || !salary || !company || !location) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const query = "INSERT INTO jobs (title, jobType, description, salary, company, location, logo) VALUES (?, ?, ?, ?, ?, ?, ?)";

        db.query(query, [title, jobType, description, salary, company, location, logo], (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ error: "Failed to post job" });
            }
            res.status(201).json({ message: "Job posted successfully", jobId: result.insertId });
        });

    } catch (error) {
        console.error("❌ Error posting job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { JobLobby, Jobid, JobPost };
