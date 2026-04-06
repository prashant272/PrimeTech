const express = require('express');
const router = express.Router();
const { 
    getAllVisaPricing,
    getVisaPricing, 
    updateVisaPricing, 
    getProducts, 
    getProductBySlug,
    upsertProduct,
    deleteProduct,
    getVisas,
    getVisaBySlug,
    upsertVisa,
    deleteVisa,
    getCaseStudies,
    getCaseStudyBySlug,
    upsertCaseStudy,
    deleteCaseStudy,
    getBlogs,
    getBlogBySlug,
    upsertBlog,
    deleteBlog,
    getJobs,
    getJobById,
    upsertJob,
    deleteJob
} = require('../controllers/contentController');
const { upload } = require('../middleware/uploadMiddleware');

// Visa Pricing Routes (Legacy)
router.get('/visa-pricing', getAllVisaPricing);
router.get('/visa-pricing/:countrySlug', getVisaPricing);
router.post('/visa-pricing', updateVisaPricing);

// Product Routes
router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.post('/products', upsertProduct);
router.delete('/products/:slug', deleteProduct);

// Visa CMS Routes
router.get('/visas', getVisas);
router.get('/visas/:slug', getVisaBySlug);
router.post('/visas', upsertVisa);
router.delete('/visas/:slug', deleteVisa);

// Case Study Routes
router.get('/case-studies', getCaseStudies);
router.get('/case-studies/:slug', getCaseStudyBySlug);
router.post('/case-studies', upsertCaseStudy);
router.delete('/case-studies/:slug', deleteCaseStudy);

// Blog Routes
router.get('/blogs', getBlogs);
router.get('/blogs/:slug', getBlogBySlug);
router.post('/blogs', upload.single('image'), upsertBlog);
router.delete('/blogs/:slug', deleteBlog);

// Job Routes
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);
router.post('/jobs', upsertJob);
router.delete('/jobs/:id', deleteJob);

module.exports = router;
