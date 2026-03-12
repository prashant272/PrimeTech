import { 
    Globe, 
    ShieldCheck, 
    Calendar, 
    Clock, 
    CheckCircle2, 
    FileText, 
    Users, 
    Zap,
    Briefcase,
    Plane,
    HeartPulse,
    Map,
    Lock
} from 'lucide-react';

export const visaData = {
    'uk-visa': {
        title: 'United Kingdom Visa',
        heroDesc: 'Your gateway to the UK - fast, reliable, and expert visa assistance.',
        bgImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1950&q=80',
        fullDesc: 'The UK Standard Visitor visa allows you to visit the UK for leisure, business, or to see family. Our expert team ensures your application meets all Home Office requirements for a high success rate.',
        detailedInfo: 'Whether you are traveling for a vacation, business meeting, or short-term study, we provide comprehensive guidance on documentation, financial evidence, and sponsorship requirements.',
        whyChooseUs: [
            '98% Success rate for Standard Visitor Visas.',
            'Expert review of financial and property documents.',
            'End-to-end guidance on VFS Global appointment booking.',
            'Assistance with cover letters and sponsorship forms.',
            'Fast-track and priority service guidance.'
        ],
        types: [
            { type: 'Standard Visitor', duration: '6 Months', fee: '₹12,500*', processing: '15 Working Days' },
            { type: 'Long-term (2 Years)', duration: '2 Years', fee: '₹48,000*', processing: '15 Working Days' },
            { type: 'Business Visitor', duration: '6 Months', fee: '₹12,500*', processing: '15 Working Days' }
        ],
        documents: [
            'Current Passport with at least 6 months validity.',
            'Bank statements for the last 6 months.',
            'Proof of earnings (Salary Slips/ITR).',
            'Travel itinerary and accommodation details.',
            'Cover letter detailing the purpose of visit.'
        ],
        process: [
            { title: 'Profile Assessment', desc: 'Evaluating your travel history and financial stability.' },
            { title: 'Doc Preparation', desc: 'Expert help with cover letters and form filling.' },
            { title: 'Appointment', desc: 'Scheduling biometrics at VFS Global centers.' },
            { title: 'Visa Decision', desc: 'Tracking application until passport delivery.' }
        ],
        features: [
            { title: 'Expert Review', desc: 'Manual check of every document.', icon: ShieldCheck },
            { title: 'Fast Processing', desc: 'Guidance on priority applications.', icon: Zap },
            { title: 'Document Prep', desc: 'Professional cover letter assistance.', icon: FileText },
            { title: 'VFS Support', desc: 'Help with biometrics scheduling.', icon: Users },
            { title: 'Global Reach', desc: 'Support for all UK visa categories.', icon: Globe },
            { title: '24/7 Support', desc: 'Dedicated visa consultants.', icon: Plane }
        ]
    },
    'australia-visa': {
        title: 'Australia Visa',
        heroDesc: 'Experience the Land Down Under with seamless visa processing.',
        bgImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1950&q=80',
        fullDesc: 'Apply for the subclass 600 Visitor visa for tourism or business. Australia offers a fully digital visa process, and we make it error-free for you.',
        detailedInfo: 'Australia visitor visas are generally issued as eVisas. They require strong evidence of your intent to return to your home country. We help you build a solid profile.',
        whyChooseUs: [
            'Completely paperless digital application support.',
            'Specialization in subclass 600 & 400 visas.',
            'Detailed guidance on "Genuine Temporary Entrant" criteria.',
            'Health insurance and medical checkup guidance.',
            'Assistance for family and sponsored visitor streams.'
        ],
        types: [
            { type: 'Tourist Stream', duration: '3, 6, or 12 Months', fee: '₹14,200*', processing: '20-30 Days' },
            { type: 'Business Stream', duration: 'Up to 3 Months', fee: '₹14,200*', processing: '15-20 Days' }
        ],
        documents: [
            'Scanned copy of Passport (all pages).',
            'National ID (Aadhar/PAN/Voter ID).',
            'Recent passport-size photograph.',
            'Employment evidence (Leave letter/Payslips).',
            'Comprehensive travel plan.'
        ],
        process: [
            { title: 'Online Setup', desc: 'Creating ImmiAccount and initial data entry.' },
            { title: 'Doc Upload', desc: 'Uploading high-quality scanned evidence.' },
            { title: 'Biometrics', desc: 'Scheduling VFS Australian Biometrics Collection.' },
            { title: 'Grant Letter', desc: 'Receiving the digital visa grant notification.' }
        ],
        features: [
            { title: 'Digital Process', desc: '100% online application handling.', icon: Zap },
            { title: 'GTE Check', desc: 'Expert profile auditing for approvals.', icon: ShieldCheck },
            { title: 'Family Stream', desc: 'Support for sponsored relatives.', icon: Users },
            { title: 'Health Guide', desc: 'Assistance with medical requirements.', icon: HeartPulse || CheckCircle2 },
            { title: 'Real-time Track', desc: 'ImmiAccount status monitoring.', icon: Clock },
            { title: 'Business Visa', desc: 'Short-term professional visit support.', icon: Briefcase }
        ]
    },
    'dubai-visa': {
        title: 'Dubai (UAE) Visa',
        heroDesc: 'Explore the City of Gold with instant Dubai eVisa services.',
        bgImage: '../dubai.jpg',
        fullDesc: 'Quick and easy Dubai visitor visas for tourism and transit. No physical documents required - apply with just a passport copy and photo.',
        detailedInfo: 'UAE offers 30-day and 60-day tourist visas. We provide express processing that gets your visa approved in as little as 24-48 hours.',
        whyChooseUs: [
            'Express processing within 24-48 hours.',
            'Minimal documentation required (Passport & Photo only).',
            'No security deposit for major nationalities.',
            'OK to Board (OTB) assistance for all airlines.',
            'Extension support within UAE.'
        ],
        types: [
            { type: '30 Days Tourist', duration: '30 Days', fee: '₹6,500*', processing: '2-3 Days' },
            { type: '60 Days Tourist', duration: '60 Days', fee: '₹12,500*', processing: '3-4 Days' },
            { type: 'Express Visa', duration: '30 Days', fee: '₹9,000*', processing: '24 Hours' }
        ],
        documents: [
            'Clear Scanned copy of Passport (Front & Back).',
            'Passport-size photo with white background.',
            'Confirmed return flight tickets.',
            'Hotel booking or relative\'s residence proof.'
        ],
        process: [
            { title: 'Instant Upload', desc: 'Send docs via WhatsApp or Web.' },
            { title: 'Verification', desc: 'Our team checks for clarity and validity.' },
            { title: 'Submission', desc: 'Lodging application with UAE Immigration.' },
            { title: 'eVisa Delivery', desc: 'Visa sent directly to your Email/WhatsApp.' }
        ],
        features: [
            { title: 'Instant Approval', desc: 'Fastest UAE processing in the market.', icon: Zap },
            { title: 'Minimal Docs', desc: 'Only passport and photo needed.', icon: FileText },
            { title: 'OK to Board', desc: 'Mandatory airline clearance included.', icon: Plane },
            { title: '24/7 Help', desc: 'Dubai-based support team.', icon: Users },
            { title: 'Transparent', desc: 'No hidden fees or deposits.', icon: ShieldCheck },
            { title: 'Extensions', desc: 'Support for staying longer in UAE.', icon: Clock }
        ]
    },
    'schengen-visa': {
        title: 'Schengen Visa',
        heroDesc: 'Travel across 29 European countries with a single visa.',
        bgImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1950&q=80',
        fullDesc: 'Access France, Germany, Switzerland, Italy, and more. We help you choose the right embassy and prepare a fool-proof itinerary.',
        detailedInfo: 'The Schengen visa allows for travel within the Schengen Area for up to 90 days. Choosing the right "Entry Country" is crucial for approval.',
        whyChooseUs: [
            'Choosing the easiest embassy based on your profile.',
            'Detailed day-to-day tourist itinerary planning.',
            'Help with verifiable flight and hotel bookings.',
            'Travel insurance with required €30,000 coverage.',
            'Mock interview preparation for VFS sessions.'
        ],
        types: [
            { type: 'Tourist Visa', duration: '90 Days', fee: '₹10,500*', processing: '15-20 Days' },
            { type: 'Business Visa', duration: '90 Days', fee: '₹10,500*', processing: '10-15 Days' }
        ],
        documents: [
            'Valid Passport (not older than 10 years).',
            'Schengen-spec photos (35x45mm).',
            'Bank statements (3 months) with bank seal.',
            'No Objection Certificate (NOC) from employer.',
            'Detailed cover letter and travel insurance.'
        ],
        process: [
            { title: 'Slot Hunting', desc: 'Finding elusive VFS/BLS appointment slots.' },
            { title: 'File Prep', desc: 'Organizing documents in embassy sequence.' },
            { title: 'Interview', desc: 'Preparation for appointment questions.' },
            { title: 'Decision', desc: 'Collection of passport from mission.' }
        ],
        features: [
            { title: 'Euro Travel', desc: 'One visa for 29 countries.', icon: Globe },
            { title: 'Insurance', desc: 'Mandatory €30k coverage support.', icon: ShieldCheck },
            { title: 'Slot Booking', desc: 'Priority appointment slot finding.', icon: Calendar },
            { title: 'Itinerary Plan', desc: 'Custom holiday planning included.', icon: Map || FileText },
            { title: 'Expert Advice', desc: 'Which country to apply from.', icon: Briefcase },
            { title: 'Business Sync', desc: 'Support for corporate delegates.', icon: Users }
        ]
    },
    'singapore-visa': {
        title: 'Singapore Visa',
        heroDesc: 'Hassle-free Singapore eVisa for tourism and business.',
        bgImage: 'https://images.unsplash.com/photo-1525625239513-94c9475c90f1?auto=format&fit=crop&w=1950&q=80',
        fullDesc: 'Singapore visas for Indian passport holders are issued as e-Visas through authorized agents. We ensure your application is perfect for quick approval.',
        detailedInfo: 'Singapore visitor visas are usually valid for 2 years with multiple entries. Each stay can be up to 30 days.',
        whyChooseUs: [
            'Authorized processing with high approval rates.',
            'Detailed guidance on Form 14A filling.',
            'Support for level 1 and level 2 assessment countries.',
            'Help with invitation letters (V39A) if required.',
            'Fast processing within 3-5 working days.'
        ],
        types: [
            { type: 'Tourist eVisa', duration: 'Up to 2 Years', fee: '₹2,500*', processing: '3-4 Days' },
            { type: 'Business eVisa', duration: 'Up to 2 Years', fee: '₹2,500*', processing: '3-4 Days' }
        ],
        documents: [
            'Passport copy (Front & Back).',
            'Schengen-spec photos (35x45mm, matte finish).',
            'Confirmed flight tickets.',
            'Employment proof or ITR.',
            'Form 14A duly signed.'
        ],
        process: [
            { title: 'Doc Collection', desc: 'Digital or physical submission of papers.' },
            { title: 'Verification', desc: 'Strict check on photo and form specs.' },
            { title: 'Lodgement', desc: 'Submitting to the High Commission.' },
            { title: 'e-Visa Grant', desc: 'Digital visa copy sent to your email.' }
        ],
        features: [
            { title: 'Multi Entry', desc: 'Usually 2-year multiple entry grant.', icon: Globe },
            { title: 'Quick Turnaround', desc: 'Approval in as little as 3 days.', icon: Zap },
            { title: 'Expert Filling', desc: 'Zero-error Form 14A assistance.', icon: FileText },
            { title: 'Agent Support', desc: 'Direct coordination with High Commission.', icon: Users },
            { title: 'Transparent', desc: 'No hidden agent commissions.', icon: ShieldCheck },
            { title: 'Secure', desc: 'Safe handling of sensitive documents.', icon: Lock || ShieldCheck }
        ]
    },
    'vietnam-evisa': {
        title: 'Vietnam Visa',
        heroDesc: 'Explore the beauty of Vietnam with instant eVisas.',
        bgImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1950&q=80',
        fullDesc: 'Vietnam eVisas are available for 80 countries. We provide express services that get you traveling in no time.',
        detailedInfo: 'Vietnam has recently updated its visa policy, now offering 90-day multiple entry eVisas.',
        whyChooseUs: [
            '100% online application process.',
            'Express approval within 24 hours available.',
            'Support for all major entry gates (Airports/Seaports).',
            'No physical documents needed.',
            'Assistance with entry/exit forms.'
        ],
        types: [
            { type: 'Tourist eVisa', duration: '90 Days', fee: '₹3,500*', processing: '3 Days' },
            { type: 'Express eVisa', duration: '90 Days', fee: '₹5,500*', processing: '24 Hours' }
        ],
        documents: [
            'Passport copy (valid for 6 months).',
            'Recent portrait photo in color.',
            'Arrival and Departure dates.',
            'Entry and Exit ports details.'
        ],
        process: [
            { title: 'Online Form', desc: 'Quick data entry of travel details.' },
            { title: 'Payment', desc: 'Secure payment of government fees.' },
            { title: 'Processing', desc: 'Monitoring the Immigration Department.' },
            { title: 'Visa Sent', desc: 'Download your eVisa via link.' }
        ],
        features: [
            { title: 'Digital Only', desc: 'No embassy visits required.', icon: Zap },
            { title: 'Stay Longer', desc: 'Up to 90 days stay allowed.', icon: Clock },
            { title: 'Entry Flex', icon: Plane, desc: 'Valid for major international airports.' },
            { title: 'Easy Apply', desc: 'Just passport and photo required.', icon: FileText },
            { title: 'Support', desc: '24/7 travel assistance.', icon: Users },
            { title: 'Reliable', desc: 'Government-direct processing.', icon: ShieldCheck }
        ]
    },
    'malaysia-visa': {
        title: 'Malaysia Visa',
        heroDesc: 'Apply for Malaysia eNTRI/eVISA for a quick tropical getaway.',
        bgImage: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1950&q=80',
        fullDesc: 'Malaysia offers easy online visas for Indian tourists. Whether it is for a short visit or a longer stay, we handle the documentation for you.',
        detailedInfo: 'Malaysia eVISA is generally valid for 3 months with a single or multiple entry facility.',
        whyChooseUs: [
            'Instant eNTRI processing (if available).',
            'Support for 30-day multiple entry eVISA.',
            'Help with confirmed returned ticket requirements.',
            'Accommodation and financial proof audit.',
            'Dedicated support for family groups.'
        ],
        types: [
            { type: 'Tourist eVISA', duration: '30 Days', fee: '₹3,800*', processing: '2-3 Days' },
            { type: 'Business eVISA', duration: '30 Days', fee: '₹4,500*', processing: '2-3 Days' }
        ],
        documents: [
            'Passport copy (clear scan).',
            'Passport-size photo (Studio quality).',
            'Confirmed flight tickets (Return).',
            'Hotel booking confirmation.',
            'Birth certificate for minors.'
        ],
        process: [
            { title: 'Upload Docs', desc: 'Securely send your passport and photo.' },
            { title: 'Drafting', desc: 'Our team fills the official Malaysia eVISA portal.' },
            { title: 'Payment', desc: 'Processing of visa and service fees.' },
            { title: 'Grant', desc: 'Receive your PDF visa grant via mail.' }
        ],
        features: [
            { title: 'Quick Grant', desc: 'Get your visa in 48 hours.', icon: Zap },
            { title: 'Group Support', desc: 'Easy handling for family trips.', icon: Users },
            { title: 'Paperless', desc: 'No physical submission needed.', icon: FileText },
            { title: 'Entry/Exit', desc: 'Support for all official checkpoints.', icon: Plane },
            { title: 'Success Rate', desc: '99% approval for valid profiles.', icon: ShieldCheck },
            { title: 'Consultancy', desc: 'Expert travel advice included.', icon: Globe }
        ]
    },
    'us-visa': {
        title: 'United States (US) Visa',
        heroDesc: 'Expert guidance for B1/B2 visitor visa applications.',
        bgImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1950&q=80',
        fullDesc: 'The US B1/B2 visa process is complex and requires a meticulous DS-160 and interview prep. Our consultants guide you every step of the way.',
        detailedInfo: 'US Visitor visas are typically granted for 10 years for Indian nationals, allowing multiple entries.',
        whyChooseUs: [
            'Expert review of DS-160 application form.',
            'Mock interview sessions with former travelers.',
            'Help with elusive appointment slot booking.',
            'In-depth financial and ties assessment.',
            'Support for B1 (Business) and B2 (Tourism) categories.'
        ],
        types: [
            { type: 'B1/B2 Visitor', duration: '10 Years', fee: '₹15,500*', processing: 'Based on Interview' }
        ],
        documents: [
            'Current and old Passports.',
            'Appointment confirmation page.',
            'DS-160 confirmation page.',
            'Proof of income/Employment.',
            'Family and property documents for ties.'
        ],
        process: [
            { title: 'DS-160 Filling', desc: 'Meticulous data entry for the primary form.' },
            { title: 'Fee Payment', desc: 'MRV fee payment and receipt generation.' },
            { title: 'Slot Booking', desc: 'Scheduling biometrics and consular interview.' },
            { title: 'Interview Prep', desc: 'Mock sessions for a confident face-to-face.' }
        ],
        features: [
            { title: 'Long Validity', desc: 'Usually granted for 10 years.', icon: Calendar },
            { title: 'Multi Entry', desc: 'Unlimited entries during validity.', icon: Globe },
            { title: 'Interview Kit', desc: 'Meticulous preparation for the visa officer.', icon: Users },
            { title: 'DS-160 Audit', desc: 'Triple check of your application form.', icon: ShieldCheck },
            { title: 'Slot Hunting', desc: 'Priority assistance for early dates.', icon: Clock },
            { title: 'Support', desc: 'Consultant available at every step.', icon: Zap }
        ]
    }
};
