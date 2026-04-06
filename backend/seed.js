const axios = require('axios');

const seedData = async () => {
    try {
        // 1. Seed Visa Prices
        const visaPricing = [
            {
                countrySlug: 'uk-visa',
                visaTypes: [
                    { type: 'Standard Visitor Visa', fee: '£115' },
                    { type: 'Priority Visa', fee: '£615' },
                    { type: 'Super Priority Visa', fee: '£1,115' }
                ]
            },
            {
                countrySlug: 'us-visa',
                visaTypes: [
                    { type: 'B1/B2 Visitor Visa', fee: '$185' },
                    { type: 'Student (F/J) Visa', fee: '$185' },
                    { type: 'Employment (H) Visa', fee: '$205' }
                ]
            },
            {
                countrySlug: 'vietnam-visa',
                visaTypes: [
                    { type: 'E-visa (Single Entry)', fee: '$25' },
                    { type: 'E-visa (Multiple Entry)', fee: '$50' }
                ]
            }
        ];

        for (const visa of visaPricing) {
            await axios.post('http://localhost:5000/api/content/visa-pricing', visa);
            console.log(`Seeded visa pricing for ${visa.countrySlug}`);
        }

        // 2. Seed Enterprise Products
        const products = [
            {
                title: 'Hospital Management System',
                slug: 'hospital-management',
                category: 'Application',
                icon: 'Activity',
                heroDesc: 'Complete ERP for modern healthcare institutions.',
                fullDesc: 'Prime Impact Hospital Management System (HMS) is a state-of-the-art solution designed to streamline all aspects of hospital operations.',
                detailedInfo: 'Automate your healthcare facility with our comprehensive HMS solution that covers everything from patient registration to billing and discharge.',
                whyChooseUs: ['24/7 Technical Support', 'Cloud-based & On-premise options', 'NABH compliance ready', 'Mobile app for doctors'],
                features: [
                    { title: 'Electronic Health Records', desc: 'Secure digital storage of patient history.', icon: 'Clipboard' },
                    { title: 'OPD/IPD Management', desc: 'Efficient handling of outpatient and inpatient flows.', icon: 'Users' },
                    { title: 'Billing & Pharmacy', desc: 'Integrated billing, insurance and pharmacy management.', icon: 'Zap' }
                ],
                process: [
                    { title: 'Requirement Audit', desc: 'We analyze your hospital size.' },
                    { title: 'Configuration', desc: 'Custom modules setup.' },
                    { title: 'Training', desc: 'Staff onboarding.' },
                    { title: 'Deployment', desc: 'On-premise or cloud installation.' }
                ],
                active: true
            },
            {
                title: 'School Management System',
                slug: 'school-management',
                category: 'Application',
                icon: 'Laptop',
                heroDesc: 'The ultimate digital campus experience.',
                fullDesc: 'A unified platform for students, teachers, and parents that brings transparency and efficiency to every part of school operations.',
                detailedInfo: 'Manage attendance, grades, fees, communication, and timetables in one integrated platform.\n\nDesigned for CBSE, ICSE and state board schools with customizable modules for any scale.',
                whyChooseUs: ['Parent app included', 'Biometric integration', 'One-click report cards', 'Fee payment portal'],
                features: [
                    { title: 'Smart Attendance', desc: 'RFID and biometric integration.', icon: 'CheckCircle' },
                    { title: 'Fees Management', desc: 'Online payment gateway integration.', icon: 'Zap' },
                    { title: 'Timetable Engine', desc: 'Auto-generate class schedules.', icon: 'Calendar' }
                ],
                process: [
                    { title: 'Consultation', desc: 'Understanding school workflow.' },
                    { title: 'Setup', desc: 'Data migration and configuration.' },
                    { title: 'Training', desc: 'Staff and teacher onboarding.' },
                    { title: 'Go Live', desc: 'Full deployment with support.' }
                ],
                active: true
            },
            {
                title: 'Voice Broadcast (OBD)',
                slug: 'voice-broadcast',
                category: 'Cloud Telephony Services',
                icon: 'Activity',
                heroDesc: 'Reach thousands instantly with automated voice calls.',
                fullDesc: 'Premium voice broadcasting service for marketing campaigns, alerts, and mass communication at scale.',
                detailedInfo: 'High-quality voice delivery with real-time analytics and a 99.9% delivery rate.\n\nPerfect for political campaigns, banking alerts, and promotional outreach.',
                whyChooseUs: ['10,000+ calls per minute', 'Hindi & regional language support', 'Real-time delivery reports', 'TRAI compliant'],
                features: [
                    { title: 'Mass Messaging', desc: 'Send 10,000+ calls per minute.', icon: 'Zap' },
                    { title: 'IVR Integration', desc: 'Interactive voice response systems.', icon: 'Activity' },
                    { title: 'DTMF Input', desc: 'Capture user keypad responses.', icon: 'Hash' }
                ],
                process: [
                    { title: 'Setup', desc: 'Recording and list management.' },
                    { title: 'Scheduling', desc: 'Time-based campaign planning.' },
                    { title: 'Promotion', desc: 'Live campaign execution.' },
                    { title: 'Launch', desc: 'Instant mass transmission.' }
                ],
                active: true
            },
            {
                title: 'Promotional SMS',
                slug: 'promotional-sms',
                category: 'Mobility Services',
                icon: 'MessageSquare',
                heroDesc: 'Bulk SMS marketing at lightning speed.',
                fullDesc: 'Deliver promotional messages to millions of opted-in users across India with industry-leading delivery rates.',
                detailedInfo: 'Reach your target audience with powerful bulk SMS campaigns. Supports Unicode, Flash SMS, and scheduled delivery for maximum impact.',
                whyChooseUs: ['DLT registered sender IDs', 'Real-time delivery reports', 'Affordable pricing', 'API integration available'],
                features: [
                    { title: 'Bulk Delivery', desc: 'Send to millions in minutes.', icon: 'Zap' },
                    { title: 'Scheduling', desc: 'Time-targeted message delivery.', icon: 'Clock' },
                    { title: 'Analytics', desc: 'Track open and delivery rates.', icon: 'Activity' }
                ],
                process: [
                    { title: 'Registration', desc: 'DLT template approval.' },
                    { title: 'Upload', desc: 'Contact list upload.' },
                    { title: 'Schedule', desc: 'Set timing and content.' },
                    { title: 'Launch', desc: 'Campaign goes live.' }
                ],
                active: true
            },
            {
                title: 'WhatsApp Business API',
                slug: 'whatsapp-api',
                category: 'WhatsApp Services',
                icon: 'MessageCircle',
                heroDesc: 'Official WhatsApp API for enterprise communication.',
                fullDesc: 'Connect with customers on the world\'s most popular messaging platform using the verified WhatsApp Business API.',
                detailedInfo: 'Send transactional alerts, OTPs, promotional messages all via official WhatsApp channels. Green tick verification included.',
                whyChooseUs: ['Official Meta Business Partner', 'Green tick verification', 'Rich media support', '24/7 chatbot automation'],
                features: [
                    { title: 'Verified Green Tick', desc: 'Official business verification.', icon: 'CheckCircle' },
                    { title: 'Template Messages', desc: 'Pre-approved message formats.', icon: 'FileText' },
                    { title: 'Media Support', desc: 'Images, videos, documents.', icon: 'Image' }
                ],
                process: [
                    { title: 'Verification', desc: 'Business account setup.' },
                    { title: 'Template Approval', desc: 'WhatsApp message templates.' },
                    { title: 'Integration', desc: 'API connection to your CRM.' },
                    { title: 'Go Live', desc: 'Start messaging customers.' }
                ],
                active: true
            },
            {
                title: 'HR Management System',
                slug: 'hr-management',
                category: 'Application',
                icon: 'Users',
                heroDesc: 'Automate your entire employee lifecycle.',
                fullDesc: 'From onboarding to payroll and performance management, our HRMS streamlines every HR function for modern businesses.',
                detailedInfo: 'A complete HR solution trusted by 200+ companies. Covers recruitment, attendance, leave, payroll, and appraisals in one dashboard.',
                whyChooseUs: ['Biometric integration', 'Auto-payroll generation', 'Compliance management', 'Mobile app for employees'],
                features: [
                    { title: 'Payroll Engine', desc: 'Auto-calculate salary, TDS, PF, ESI.', icon: 'Calculator' },
                    { title: 'Leave Management', desc: 'Online leave apply and approval.', icon: 'Calendar' },
                    { title: 'Performance KPIs', desc: 'Goal tracking and appraisal system.', icon: 'TrendingUp' }
                ],
                process: [
                    { title: 'Audit', desc: 'HR process assessment.' },
                    { title: 'Configuration', desc: 'Department and role setup.' },
                    { title: 'Data Migration', desc: 'Employee data import.' },
                    { title: 'Training', desc: 'Staff onboarding and go-live.' }
                ],
                active: true
            }
        ];

        for (const product of products) {
            await axios.post('http://localhost:5000/api/content/products', product);
            console.log(`Seeded product: ${product.title}`);
        }

        console.log('Seed successful!');
    } catch (error) {
        console.error('Seed failed:', error.response ? error.response.data : error.message);
    }
};

seedData();
