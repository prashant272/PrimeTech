const mongoose = require('mongoose');
const VisaPricing = require('../models/VisaPricing');
const Product = require('../models/Product');
const Visa = require('../models/Visa');
const CaseStudy = require('../models/CaseStudy');
const Blog = require('../models/Blog');
const Job = require('../models/Job');

// --- VISA PRICING CONTROLLERS ---

// @desc    Get all visa pricing records
// @route   GET /api/content/visa-pricing
exports.getAllVisaPricing = async (req, res) => {
    try {
        const pricings = await VisaPricing.find();
        res.status(200).json({ success: true, count: pricings.length, data: pricings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get visa pricing for a specific country
// @route   GET /api/content/visa-pricing/:countrySlug
exports.getVisaPricing = async (req, res) => {
    try {
        const pricing = await VisaPricing.findOne({ countrySlug: req.params.countrySlug });
        if (!pricing) {
            return res.status(404).json({ success: false, message: 'Pricing not found' });
        }
        res.status(200).json({ success: true, data: pricing });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update visa pricing
// @route   POST /api/content/visa-pricing
exports.updateVisaPricing = async (req, res) => {
    try {
        const { countrySlug, visaTypes } = req.body;
        const pricing = await VisaPricing.findOneAndUpdate(
            { countrySlug },
            { visaTypes, updatedAt: Date.now() },
            { upsert: true, new: true }
        );
        res.status(200).json({ success: true, data: pricing });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- PRODUCT CONTROLLERS ---

// @desc    Get all products
// @route   GET /api/content/products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ active: true });
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single product by slug
// @route   GET /api/content/products/:slug
exports.getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug, active: true });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create or update product
// @route   POST /api/content/products
exports.upsertProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { slug: req.body.slug },
            { ...req.body },
            { upsert: true, new: true }
        );
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete product by slug
// @route   DELETE /api/content/products/:slug
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ slug: req.params.slug });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};// --- VISA CMS CONTROLLERS ---

// @desc    Get all visas
// @route   GET /api/content/visas
exports.getVisas = async (req, res) => {
    try {
        const visas = await Visa.find({ active: true });
        res.status(200).json({ success: true, count: visas.length, data: visas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single visa by slug
// @route   GET /api/content/visas/:slug
exports.getVisaBySlug = async (req, res) => {
    try {
        const visa = await Visa.findOne({ slug: req.params.slug, active: true });
        if (!visa) {
            return res.status(404).json({ success: false, message: 'Visa not found' });
        }
        res.status(200).json({ success: true, data: visa });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create or update visa
// @route   POST /api/content/visas
exports.upsertVisa = async (req, res) => {
    try {
        const visa = await Visa.findOneAndUpdate(
            { slug: req.body.slug },
            { ...req.body, updatedAt: Date.now() },
            { upsert: true, new: true }
        );
        res.status(200).json({ success: true, data: visa });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete visa by slug
// @route   DELETE /api/content/visas/:slug
exports.deleteVisa = async (req, res) => {
    try {
        const visa = await Visa.findOneAndDelete({ slug: req.params.slug });
        if (!visa) {
            return res.status(404).json({ success: false, message: 'Visa not found' });
        }
        res.status(200).json({ success: true, message: 'Visa deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// --- CASE STUDY CONTROLLERS ---

// @desc    Get all case studies
// @route   GET /api/content/case-studies
exports.getCaseStudies = async (req, res) => {
    try {
        const cases = await CaseStudy.find({ active: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: cases.length, data: cases });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single case study by slug
// @route   GET /api/content/case-studies/:slug
exports.getCaseStudyBySlug = async (req, res) => {
    try {
        const caseStudy = await CaseStudy.findOne({ slug: req.params.slug, active: true });
        if (!caseStudy) {
            return res.status(404).json({ success: false, message: 'Case study not found' });
        }
        res.status(200).json({ success: true, data: caseStudy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create or update case study
// @route   POST /api/content/case-studies
exports.upsertCaseStudy = async (req, res) => {
    try {
        const { slug } = req.body;
        const caseStudy = await CaseStudy.findOneAndUpdate(
            { slug },
            { ...req.body, updatedAt: Date.now() },
            { upsert: true, new: true }
        );
        res.status(200).json({ success: true, data: caseStudy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete case study by slug
// @route   DELETE /api/content/case-studies/:slug
exports.deleteCaseStudy = async (req, res) => {
    try {
        const caseStudy = await CaseStudy.findOneAndDelete({ slug: req.params.slug });
        if (!caseStudy) {
            return res.status(404).json({ success: false, message: 'Case study not found' });
        }
        res.status(200).json({ success: true, message: 'Case study deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- BLOG CMS CONTROLLERS ---

// @desc    Get all blogs
// @route   GET /api/content/blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ active: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single blog by slug
// @route   GET /api/content/blogs/:slug
exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, active: true });
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create or update blog
// @route   POST /api/content/blogs
exports.upsertBlog = async (req, res) => {
    try {
        const blogData = { ...req.body };
        
        // If file is uploaded via multerS3
        if (req.file) {
            blogData.image = req.file.location;
        }

        const blog = await Blog.findOneAndUpdate(
            { slug: blogData.slug },
            { ...blogData, updatedAt: Date.now() },
            { upsert: true, new: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete blog
// @route   DELETE /api/content/blogs/:slug
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- JOB CMS CONTROLLERS ---

// @desc    Get all jobs
// @route   GET /api/content/jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ active: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single job by ID
// @route   GET /api/content/jobs/:id
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create or update job
// @route   POST /api/content/jobs
exports.upsertJob = async (req, res) => {
    try {
        const jobData = { ...req.body };
        const id = jobData._id;
        delete jobData._id;

        const job = await Job.findOneAndUpdate(
            { _id: id || new mongoose.Types.ObjectId() },
            { ...jobData, updatedAt: Date.now() },
            { upsert: true, new: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete job
// @route   DELETE /api/content/jobs/:id
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
