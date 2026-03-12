import { Smartphone, Cloud, MessageSquare, AppWindow, Shield, Zap, Target, Layout, Settings, LineChart, ShoppingCart, Brain, CheckCircle2, BarChart3, Clock, Lock, Globe, Users, Headphones, Rocket, Vote, Building2, PhoneCall, Mic2, FileText, Share2, Server, Database, Camera } from 'lucide-react';

export const productData = {
    'promotional-sms': {
        title: 'Promotional SMS',
        icon: Smartphone,
        heroDesc: 'Boost your sales with targeted SMS marketing.',
        fullDesc: 'Bulk SMS is one of the most effective ways to reach your customers directly. Our Promotional SMS service help you to reach thousands of potential customers in a single click with high delivery rates.',
        detailedInfo: `In recent times, Promotional SMS Services have gained massive popularity. These calls are highly effective and are used by various companies, firms, and NGOs. Our Promotional SMS service is designed to help you reach your target audience in the most efficient way possible.\n\nPromotional SMS services are offered by various firms, but we stand out by providing a reliable and cost-effective platform. Our gateway is optimized for high-speed delivery, ensuring your marketing messages reach users at the right time.\n\nWhether you are a startup or an established enterprise, our promotional SMS platform provides the tools you need to create, manage, and track your campaigns with ease.`,
        whyChooseUs: [
            '98% Open rate within minutes of delivery.',
            'Targeted marketing to reach the right audience.',
            'Cost-effective solution with massive ROI potential.',
            'Direct reach without internet dependency.',
            'Real-time tracking and delivery reports.'
        ],
        features: [
            { title: 'Bulk SMS', desc: 'Send thousands in a single click.', icon: Target },
            { title: 'Custom ID', desc: 'Build trust with your own sender name.', icon: Shield },
            { title: 'Scheduling', desc: 'Predictive timing for highest open rates.', icon: Clock },
            { title: 'Analytics', desc: 'Real-time delivery and click analytics.', icon: BarChart3 },
            { title: 'Global Reach', desc: 'Reach customers across the globe.', icon: Globe },
            { title: 'Support', desc: '24/7 dedicated support for campaigns.', icon: Headphones }
        ],
        process: [
            { title: 'Campaign Setup', desc: 'Define audience and content.' },
            { title: 'Data Filtering', desc: 'Clean contact list for maximum ROI.' },
            { title: 'Scheduling', desc: 'Predictive timing for highest open rates.' },
            { title: 'Tracking', desc: 'Real-time delivery reports.' }
        ],
        impact: ['Instant engagement', 'Direct mobile reach', 'Low cost conversion', 'Branded communication']
    },
    'transactional-sms': {
        title: 'Transactional SMS',
        icon: Shield,
        heroDesc: 'Reliable delivery for your critical alerts.',
        fullDesc: 'Ensure your customers receive important updates, OTPs, and transaction alerts instantly. Our robust gateway guarantees high availability and priority routing.',
        detailedInfo: `Transactional SMS services are essential for any business providing time-sensitive information. Whether it is an OTP, a booking confirmation, or a system alert, our platform ensures your message reaches the recipient in seconds.\n\nUnlike promotional SMS, transactional SMS can be delivered 24/7 to all numbers including DND. This makes it the ideal choice for businesses that value reliability and speed above all else.\n\nOur platform integrates seamlessly with your existing applications via robust APIs.`,
        whyChooseUs: [
            'Sub-5 second delivery for critical alerts.',
            '24/7 Priority routing through dedicated gateways.',
            'Full compliance with DLT standards.',
            'Automatic failover for zero message loss.',
            'Detailed logs for every transaction.'
        ],
        features: [
            { title: 'Instant OTP', desc: 'Deliver codes in seconds.', icon: Zap },
            { title: 'API Integration', desc: 'Robust REST APIs for system connection.', icon: Settings },
            { title: 'High Uptime', desc: '99.9% uptime for critical alerts.', icon: Shield },
            { title: 'DND Delivery', desc: 'Bypass filters for legitimate transactions.', icon: Lock },
            { title: 'Secure Gateway', desc: 'Enterprise-grade encryption.', icon: Shield },
            { title: 'Smart Routing', desc: 'Dynamic path for fastest delivery.', icon: Rocket }
        ],
        process: [
            { title: 'API Sync', desc: 'Seamless system connection.' },
            { title: 'DLT Approval', desc: 'Quick processing for templates.' },
            { title: 'Priority Route', desc: 'Dedicated channels for speed.' },
            { title: 'Failover', desc: 'Automatic switching for reliability.' }
        ],
        impact: ['Instant delivery', '24/7 Availability', 'DLT Compliance', 'Secure encryption']
    },
    'otp-sms': {
        title: 'Otp SMS',
        icon: Zap,
        heroDesc: 'Secure authentication in seconds.',
        fullDesc: 'The fastest path to verify your users. Our high-priority OTP gateway ensures codes reach users before they expire.',
        detailedInfo: `In the digital era, security starts with verification. Our OTP SMS service provides the most reliable way to authenticate users during registration and transactions.\n\nOur specialized OTP routes are prioritized over all other traffic, ensuring codes reach users even during peak hours. With sub-second latency, we help reduce user drop-offs.`,
        whyChooseUs: [
            'Highest delivery success ratio.',
            'Low-latency gateway for instant delivery.',
            'Global coverage across all major networks.',
            'Advanced anti-fraud protection.',
            'Easy backend tech integration.'
        ],
        features: [
            { title: 'Fast Delivery', desc: 'Priority routing for sub-second arrival.', icon: Rocket },
            { title: 'Global REACH', desc: 'Deliver codes to 200+ countries.', icon: Globe },
            { title: 'API Driven', desc: 'Simple API triggers for auth flow.', icon: Settings },
            { title: 'Security', desc: 'Zero-knowledge encryption for codes.', icon: Lock },
            { title: 'Retry Logic', desc: 'Intelligent retries for failed delivery.', icon: Clock },
            { title: 'Report Log', desc: 'Metrics to track verification rates.', icon: BarChart3 }
        ],
        process: [
            { title: 'Swift API', desc: 'Low-latency triggers.' },
            { title: 'Global Path', desc: 'Deliver to any network.' },
            { title: 'Route Optimization', desc: 'Dynamic selection for speed.' },
            { title: 'Reporting', desc: 'Logs for success metrics.' }
        ],
        impact: ['Sub-second speed', 'Highest success ratio', 'Anti-fraud protection', 'Better retention']
    },
    'rcs-messaging': {
        title: 'RCS Messaging Services',
        icon: MessageSquare,
        heroDesc: 'Next-gen interactive mobile messaging.',
        fullDesc: 'Upgrade your communication with RCS. Send images, videos, maps, and interactive buttons directly to the native messaging app.',
        detailedInfo: `RCS is the future of mobile messaging. Branded headers, verified checkboxes, and interactive buttons make your messages look professional and interactive.\n\nWith RCS, you can guide users through complex journeys inside their messaging app without requiring an app download.`,
        whyChooseUs: [
            'Branded and verified profiles for trust.',
            'Interactive messaging with clickable buttons.',
            'Rich media: video, audio, and documents.',
            'Deep analytics with interaction tracking.',
            'Fallback to standard SMS for 100% reach.'
        ],
        features: [
            { title: 'Rich Media', desc: 'Send images and file carousels.', icon: Layout },
            { title: 'Verified Badge', desc: 'Stand out with branded identity.', icon: Shield },
            { title: 'Action Buttons', desc: 'Include interactive "Call/URL" buttons.', icon: Target },
            { title: 'Smart Track', desc: 'Track read and button interactions.', icon: BarChart3 },
            { title: 'Branding', desc: 'Full custom branding window.', icon: Layout },
            { title: 'Scalable API', desc: 'Connect to your CRM easily.', icon: Cloud }
        ],
        process: [
            { title: 'Content Design', desc: 'Visual messaging carousels.' },
            { title: 'Brand Setup', desc: 'Verified identity registration.' },
            { title: 'Flow Build', desc: 'Interactive automated journeys.' },
            { title: 'Launch', desc: 'Scale across supported devices.' }
        ],
        impact: ['10x Engagement', 'Interactive experience', 'Stronger trust', 'Rich media reach']
    },
    'sms-campaign': {
        title: 'SMS Campaign',
        icon: Target,
        heroDesc: 'Strategic outreach for massive impact.',
        fullDesc: 'End-to-end management of your SMS marketing strategy. We help you segment through data and execute campaigns that drive results.',
        detailedInfo: 'Our SMS Campaign service is built for large-scale marketing with precision. We combine data analytics with high-speed delivery to ensure your message hits the mark.',
        whyChooseUs: [
            'Strategic planning for campaign ROI.',
            'Advanced user segmentation tools.',
            'High-volume throughput capacity.',
            'Detailed performance analytics.',
            'Dedicated success manager support.'
        ],
        features: [
            { title: 'Segmentation', desc: 'Targeting based on demographics.', icon: Users },
            { title: 'Deep Data', desc: 'Analyze delivery and click rates.', icon: BarChart3 },
            { title: 'High Speed', desc: 'Deliver to millions in minutes.', icon: Rocket },
            { title: 'Personalized', desc: 'Custom content for engagement.', icon: MessageSquare },
            { title: 'Compliance', desc: 'DLT and template approval support.', icon: Shield },
            { title: 'A/B Test', desc: 'Test content to optimize ROI.', icon: Target }
        ],
        process: [
            { title: 'Goal Setting', desc: 'Define campaign objectives.' },
            { title: 'Segmentation', desc: 'Targeting right users.' },
            { title: 'Deployment', desc: 'High-speed delivery execution.' },
            { title: 'Analysis', desc: 'Optimization for future campaigns.' }
        ],
        impact: ['Massive reach', 'Personalized touch', 'Better recall', 'High ROI']
    },
    'election-campaign': {
        title: 'Election Campaign',
        icon: Vote,
        heroDesc: 'Win the election with data-driven outreach.',
        fullDesc: 'Specialized political campaign solutions using SMS, Voice, and WhatsApp. Reach voters directly with your manifesto and live updates.',
        detailedInfo: 'In modern politics, winning depends on effective communication. Our Election Campaign service provides a robust platform for political parties and candidates to reach their constituency. From automated voice calls in candidates\' own voice to localized SMS alerts, we provide the ultimate toolkit for voter engagement.',
        whyChooseUs: [
            'Targeted outreach based on constituency data.',
            'Voice calls in candidates\' own voice for personal touch.',
            'Zero-latency delivery for urgent manifesto updates.',
            'Massive scale: reach millions of voters simultaneously.',
            'Full regulatory and legal compliance for campaigning.'
        ],
        features: [
            { title: 'Voice Message', desc: 'Send candidate audio to every voter.', icon: Mic2 },
            { title: 'Bulk Alerts', desc: ' constituency-wide SMS manifesto delivery.', icon: Smartphone },
            { title: 'Live Update', desc: 'Breaking news and rally announcements.', icon: Zap },
            { title: 'Voter Segment', desc: 'Target users based on location data.', icon: Users },
            { title: 'Feedback', desc: 'Collect voter opinions via DTMF/Polls.', icon: Target },
            { title: 'Dashboard', desc: 'Real-time outreach performance tracking.', icon: BarChart3 }
        ],
        process: [
            { title: 'Data Mapping', desc: 'Constituency-wise audience segmentation.' },
            { title: 'Content Creation', desc: 'Recording voice and drafting manifesto SMS.' },
            { title: 'Simultaneous Blast', desc: 'Reaching all voters at peak hours.' },
            { title: 'Interaction', desc: 'Capturing voter feedback and callbacks.' }
        ],
        impact: ['Direct voter reach', 'Improved candidate recall', 'Rapid update delivery', 'Better voter turn-out']
    },
    'real-estate-campaign': {
        title: 'Real-Estate Campaign',
        icon: Building2,
        heroDesc: 'Sell properties faster with targeted leads.',
        fullDesc: 'Premium lead generation and buyer outreach for real estate projects. High-quality SMS and WhatsApp marketing designed for property sales.',
        detailedInfo: 'Real estate is all about the right timing and the right buyer. Our specialized Real-Estate Campaign service helps developers and brokers reach potential investors with high-quality brochures, site-visit invites, and price alerts. We focus on lead quality and conversion tracking to ensure your property sells faster.',
        whyChooseUs: [
            'High-quality lead generation through targeted SMS.',
            'Interactive WhatsApp profiles for property catalogs.',
            'Automatic site-visit reminders for potential buyers.',
            'Deep analytics to track buyer interest and clicks.',
            'Direct connect: Instant callback for interested leads.'
        ],
        features: [
            { title: 'Lead Gen', desc: 'Capture interest through targeted SMS.', icon: Target },
            { title: 'Virtual Tour', desc: 'Share site visit videos via WhatsApp.', icon: Layout },
            { title: 'Price Alerts', desc: 'Notify investors of exclusive offers.', icon: Zap },
            { title: 'Visit Manager', desc: 'Automated site visit scheduling alerts.', icon: Clock },
            { title: 'CRM Sync', desc: 'Direct push of leads to your sales team.', icon: Share2 },
            { title: 'Feedback', desc: 'Analyze buyer feedback on property specs.', icon: MessageSquare }
        ],
        process: [
            { title: 'Audience Prep', desc: 'Filtering high-potential investor data.' },
            { title: 'Campaign Blast', desc: 'Sending rich brochures and offers.' },
            { title: 'Lead Capture', desc: 'Nurturing interest via WhatsApp/SMS.' },
            { title: 'Sales Connect', desc: 'Handing over hot leads to sales team.' }
        ],
        impact: ['Higher property inquiries', 'Faster property turn-around', 'Quality investor leads', 'Professional brand image']
    },
    'voice-broadcast': {
        title: 'Voice Broadcast (OBD)',
        icon: Mic2,
        heroDesc: 'Listen to your message. Reach everyone.',
        fullDesc: 'Automated Outbound Dialing allows you to send pre-recorded voice messages to millions of users simultaneously.',
        detailedInfo: 'Voice broadcasting is a powerful tool for massive communication. Whether for alerts, surveys, or political outreach, our Outbound Dialing (OBD) platform delivers high-quality audio to any mobile or landline number.',
        whyChooseUs: [
            'Natural human touch with professional audio.',
            'Reach users without smartphone/internet.',
            'Automated retry for unanswered calls.',
            'Capture input via DTMF keypad interactions.',
            'Detailed call duration and engagement reports.'
        ],
        features: [
            { title: 'Auto-Dialer', desc: 'Simultaneous calls to thousands.', icon: Cloud },
            { title: 'DTMF Input', desc: 'Collect responses via phone keypad.', icon: Smartphone },
            { title: 'TTS', desc: 'Convert text to natural voice.', icon: MessageSquare },
            { title: 'Logs', desc: 'Track duration and connection rates.', icon: BarChart3 },
            { title: 'Global', desc: 'Call across any network network.', icon: Globe },
            { title: 'Priority', desc: 'Dedicated circuits for alerts.', icon: Shield }
        ],
        process: [
            { title: 'Audio Prep', desc: 'Recording or text-to-voice conversion.' },
            { title: 'Scheduling', desc: 'Optimizing call windows for higher pickup.' },
            { title: 'Execution', desc: 'Massive outbound calling blast.' },
            { title: 'Reporting', desc: 'Engagement and response analytics.' }
        ],
        impact: ['Personal voice touch', 'Offline outreach', 'Scalable awareness', 'Interaction logs']
    },
    'voice-dtmf': {
        title: 'Voice DTMF',
        icon: PhoneCall,
        heroDesc: 'Interactive voice response with keypad input.',
        fullDesc: 'Empower your customers to interact with your system via their phone keypad. Ideal for feedback, surveys, and automated routing.',
        detailedInfo: 'Voice DTMF (Dual-Tone Multi-Frequency) technology allows users to communicate with your automated system by pressing numbers on their phone. This transforms a simple broadcast into an interactive tool for lead qualification, opinion polling, and information retrieval.',
        whyChooseUs: [
            'Convert passive listeners into active participants.',
            'Instant lead qualification through numeric input.',
            'Detailed logs of every keypress for analysis.',
            'Scalable: handles thousands of responses simultaneously.',
            'Easy integration with webhooks and databases.'
        ],
        features: [
            { title: 'Keypad Input', desc: 'Capture user selection (0-9).', icon: Smartphone },
            { title: 'Live Update', desc: 'Push interaction data in real-time.', icon: Share2 },
            { title: 'Routing', desc: 'Branch call flows based on input.', icon: Layout },
            { title: 'Surveys', desc: 'Automated polling with numeric rating.', icon: Target },
            { title: 'Webhook', desc: 'Sync data with your CRM instantly.', icon: Settings },
            { title: 'Scalability', desc: 'Process millions of inputs/day.', icon: Rocket }
        ],
        process: [
            { title: 'Bot Flow', desc: 'Designing the numeric menu system.' },
            { title: 'Deployment', desc: 'Broadcast with interactive menu.' },
            { title: 'Data Sync', desc: 'Real-time webhook triggers to CRM.' },
            { title: 'Review', desc: 'Analyzing interaction drop-offs.' }
        ],
        impact: ['Actionable data capture', 'Automated qualification', 'Lower support cost', 'Higher engagement']
    },
    'click-to-call': {
        title: 'Click to Call',
        icon: PhoneCall,
        heroDesc: 'Bridge the gap between web and voice.',
        fullDesc: 'Allow website visitors to request an instant callback with a single click. Connect your sales team to interested leads in seconds.',
        detailedInfo: 'Click-to-Call is the ultimate conversion tool for websites. When a user enters their number, our system automatically calls your sales rep first, then connects them to the user. This ensures zero wait time for the customer and maximum efficiency for your sales team.',
        whyChooseUs: [
            'Instant lead response: connect in < 30 seconds.',
            'Zero friction for users—no typing, just talking.',
            'Record and monitor every sales interaction.',
            'Increase website conversion by up to 40%.',
            'Time-restricted calling to match office hours.'
        ],
        features: [
            { title: 'Instant Bridge', desc: 'Connect rep and user instantly.', icon: Zap },
            { title: 'Recording', desc: 'Review every conversation for quality.', icon: Mic2 },
            { title: 'Agent Panels', desc: 'Dedicated interface for your team.', icon: Layout },
            { title: 'Global', desc: 'Works across all countries and networks.', icon: Globe },
            { title: 'Schedule', desc: 'Allow users to book a future call.', icon: Clock },
            { title: 'API', desc: 'Easily add to any button or form.', icon: Settings }
        ],
        process: [
            { title: 'Widget Setup', desc: 'Add request form to your website.' },
            { title: 'Call Bridge', desc: 'Automated system dialing both parties.' },
            { title: 'Voice Connect', desc: 'Instant live conversation starts.' },
            { title: 'Log & Record', desc: 'Session data stored in your panel.' }
        ],
        impact: ['40% higher conversion', 'Zero lead wait time', 'Complete call tracking', 'Modern user experience']
    },
    'otp-on-call': {
        title: 'OTP on Call',
        icon: PhoneCall,
        heroDesc: 'Voice-based verification for 100% reach.',
        fullDesc: 'Verify users through voice calls. A reliable alternative when SMS delivery fails or for users with landlines.',
        detailedInfo: 'Sometimes SMS can be unreliable due to network congestion or DND filters. OTP on Call solves this by delivering authentication codes through a phone call. The system calls the user and speaks the code, ensuring 100% verification success regardless of mobile network issues.',
        whyChooseUs: [
            'Extremely high delivery success compared to SMS.',
            'Safe from SMS-spoofing and phishing attacks.',
            'Supports landlines and people with vision impairment.',
            'Global reach on any telephony network.',
            'Customizable voice (Human or synthesized AI).'
        ],
        features: [
            { title: 'Voice Delivery', desc: 'Speaking authentication codes clearly.', icon: Mic2 },
            { title: 'Global Coverage', desc: 'Verify users in any country.', icon: Globe },
            { title: 'High Priority', desc: 'Dedicated lines for time-sensitive auth.', icon: Shield },
            { title: 'Retry System', desc: 'Auto-retry if user misses the call.', icon: Clock },
            { title: 'Security', desc: 'Secure voice-auth tokens.', icon: Lock },
            { title: 'Multilingual', desc: 'Speak codes in user\'s local language.', icon: MessageSquare }
        ],
        process: [
            { title: 'Request Trigger', desc: 'App notifies system of auth need.' },
            { title: 'Outbound Dial', desc: 'System calls user number instantly.' },
            { title: 'Voice Speak', desc: 'AI speaks the unique security code.' },
            { title: 'Verify', desc: 'User enters code on your platform.' }
        ],
        impact: ['100% Delivery success', 'Enhanced security Layer', 'Global reach accessibility', 'Lower user drop-off']
    },
    'ivr-tollfree': {
        title: 'IVR/ Tollfree',
        icon: Headphones,
        heroDesc: 'Professional multi-level voice menu.',
        fullDesc: 'Set up a professional welcome greeting and multi-level menu for your business. Route calls to the right department automatically.',
        detailedInfo: 'An IVR (Interactive Voice Response) system gives your business a professional corporate image. Our solution includes Toll-Free numbers, multi-level menus ("Press 1 for Sales"), and intelligent routing to mobile or SIP phones, ensuring you never miss a business inquiry.',
        whyChooseUs: [
            'Enterprise-level corporate image for small startups.',
            '24/7 Automated customer self-service.',
            'Reduce staff workload with automated routing.',
            'Real-time call data and missed call alerts.',
            'Scalable: upgrade flows as your business grows.'
        ],
        features: [
            { title: 'Multi-Level', desc: 'Complex menu trees for departments.', icon: Layout },
            { title: 'Cloud Routing', desc: 'Redirect calls to any phone/device.', icon: Cloud },
            { title: 'Custom GREET', desc: 'Professional voice introduction.', icon: Mic2 },
            { title: 'Toll-Free', desc: 'Free calling for your customers.', icon: PhoneCall },
            { title: 'Queue Manager', desc: 'Manage hold times and music.', icon: Clock },
            { title: 'API Integration', desc: 'Sync data with your support software.', icon: Settings }
        ],
        process: [
            { title: 'Menu Design', desc: 'Mapping user routing paths.' },
            { title: 'Number Link', desc: 'Provisioning Toll-free or Virtual IDs.' },
            { title: 'Setup', desc: 'Building logic in the cloud panel.' },
            { title: 'Launch', desc: 'Handling live customer inquiries.' }
        ],
        impact: ['Corporate brand image', 'Zero missed opportunities', 'Lower support staff cost', 'Better customer journey']
    },
    'missed-call-alert': {
        title: 'Missed Call Alert',
        icon: Smartphone,
        heroDesc: 'Free lead generation for your customers.',
        fullDesc: 'Allow users to engage with your brand by simply giving a missed call. Ideal for sign-ups, voting, and information requests.',
        detailedInfo: 'Missed Call Alert is a highly popular engagement tool. Since the call is free for the user, it leads to massive participation. Once the user gives a missed call, the system automatically disconnects and triggers an SMS or callback, capturing a high-quality lead.',
        whyChooseUs: [
            'Zero cost for users—massive engagement rates.',
            'Instant lead generation: capture number on dial.',
            'Automatic SMS confirmation for every call.',
            'Unlimited concurrent calls: no busy lines.',
            'User-friendly panel for verification and data.'
        ],
        features: [
            { title: 'Zero Cost', desc: 'Free for users to show interest.', icon: Target },
            { title: 'Auto SMS', desc: 'Instant reply to every missed call.', icon: MessageSquare },
            { title: 'Lead Capture', desc: 'Store every number in your DB.', icon: Database },
            { title: 'Webhooks', desc: 'Notify your system in real-time.', icon: Zap },
            { title: 'Voting', desc: 'Perfect for polls and competitions.', icon: Vote },
            { title: 'Global TID', desc: 'Virtual numbers for any region.', icon: Globe }
        ],
        process: [
            { title: 'Number Pick', desc: 'Choose a dedicated missed-call ID.' },
            { title: 'Rule Set', desc: 'Defined what happens after the call.' },
            { title: 'Blast SMS', desc: 'Automated thank-you message design.' },
            { title: 'Live Sync', desc: 'Capture leads in your marketing dashboard.' }
        ],
        impact: ['Highest participation rate', 'Zero user friction', 'Quality verified data', 'Instant engagement']
    },
    'long-short-code': {
        title: 'Long/Short Code',
        icon: Smartphone,
        heroDesc: 'Two-way communication for mobile users.',
        fullDesc: 'Allow users to pull information or subscribe to services by sending a keyword to a short (5-digit) or long (10-digit) mobile number.',
        detailedInfo: 'Two-way SMS services via Long and Short codes empower your users to interact with your business. Whether it is "SMS HELP to 5XXXX" or a specialized contest, these codes allow for seamless data exchange between your server and your customers\' mobile devices.',
        whyChooseUs: [
            'Easy to remember 5-digit short codes for branding.',
            'Affordable 10-digit long codes for global use.',
            'Keyword-based routing for different departments.',
            'High-volume capacity for interactive campaigns.',
            'Real-time automated responses to user queries.'
        ],
        features: [
            { title: 'Keywords', desc: 'Custom triggers like JOIN, START, WEB.', icon: Target },
            { title: 'Inbound Sync', desc: 'Receive messages directly to your app.', icon: Share2 },
            { title: 'Auto-Reply', desc: 'Instant response based on keywords.', icon: MessageSquare },
            { title: 'Short Code', desc: '56161 style premium branding.', icon: Shield },
            { title: 'Long Code', desc: 'Standard mobile-style global IDs.', icon: Smartphone },
            { title: 'Reports', desc: 'Track every inbound interaction.', icon: BarChart3 }
        ],
        process: [
            { title: 'Code Allocation', desc: 'Picking a short or long ID.' },
            { title: 'Keyword Mapping', desc: 'Linking words to specific actions.' },
            { title: 'App Link', desc: 'Setting up webhooks for inbound data.' },
            { title: 'Interaction', desc: 'Managing two-way user sessions.' }
        ],
        impact: ['Two-way user engagement', 'Easy information pull', 'Memorable brand codes', 'Automated data capture']
    },
    'whatsapp-api': {
        title: 'WhatsApp Official API',
        icon: MessageSquare,
        heroDesc: 'Scale your communication with the Official WhatsApp Business API.',
        fullDesc: 'Connect with your customers on the world\'s most popular messaging app using an official, enterprise-grade API. Send notifications, provide support, and drive sales.',
        detailedInfo: 'The Official WhatsApp Business API (WABA) is designed for medium and large businesses that need to send messages at scale. Unlike the standard app, it allows for multi-user access, high-volume notifications, and deep integration with your CRM and automated workflows.',
        whyChooseUs: [
            'Official Green Badge verification support.',
            'Connect with 2 billion+ users globally.',
            'High delivery and open rates (up to 98%).',
            'Full end-to-end encryption for security.',
            'Developer-friendly REST API for any platform.'
        ],
        features: [
            { title: 'Official API', desc: 'Secure and direct Meta integration.', icon: Shield },
            { title: 'Global Coverage', desc: 'Reach customers in 180+ countries.', icon: Globe },
            { title: 'Template Msg', desc: 'Pre-approved business notifications.', icon: FileText },
            { title: 'CRM Sync', desc: 'Push data to your favorite tools.', icon: Settings },
            { title: 'High Volume', desc: 'Send millions of messages reliably.', icon: Rocket },
            { title: 'Interactive', desc: 'List menus and call-to-action buttons.', icon: Target }
        ],
        process: [
            { title: 'Onboarding', desc: 'Meta Business Manager verification.' },
            { title: 'API Setup', desc: 'Generating keys and endpoint config.' },
            { title: 'Template Reg', desc: 'Designing and approving notifications.' },
            { title: 'Live Blast', desc: 'Scaling official business outreach.' }
        ],
        impact: ['Highest trust score', 'Maximum open rates', 'Secure business data', 'Official brand status']
    },
    'whatsapp-business': {
        title: 'WhatsApp Business SMS',
        icon: MessageSquare,
        heroDesc: 'Engage on the world\'s most popular platform.',
        fullDesc: 'Go beyond SMS with WhatsApp Business API. Send rich media messages, provide automated support via chatbots, and build verified business profiles.',
        detailedInfo: `WhatsApp is where your customers are. Our WhatsApp Business solution allows you to communicate with your audience on their favorite platform, offering a personal and high-trust experience.\n\nFrom automated customer support chatbots to rich marketing notifications with one-click buttons, WhatsApp API provides a versatile toolkit for modern businesses.`,
        whyChooseUs: [
            'Verified Green Badge for brand trust.',
            'High reply rates and two-way chat.',
            'End-to-end encrypted messaging.',
            'Rich catalog and payment integrations.',
            'AI chatbots for 24/7 support.'
        ],
        features: [
            { title: 'Verified Badge', desc: 'Build authority with a green badge.', icon: Shield },
            { title: 'Rich Content', desc: 'Share catalogs and PDFs easily.', icon: Layout },
            { title: 'Chatbot AI', desc: 'Automate 80% of your queries.', icon: Brain },
            { title: 'Multi-Agent', desc: 'Shared inbox for your entire team.', icon: Users },
            { title: 'Marketing', desc: 'Send high-impact notifications.', icon: MessageSquare },
            { title: 'CRM Sync', desc: 'Connect with your business tools.', icon: Settings }
        ],
        process: [
            { title: 'API Onboarding', desc: 'Getting number verified.' },
            { title: 'Templates', desc: 'Designing pre-approved messages.' },
            { title: 'Automation', desc: 'Building FAQs and bots.' },
            { title: 'Support Desk', desc: 'Scalable multi-user inbox.' }
        ],
        impact: ['Green Badge trust', 'High read/reply rates', 'Rich media options', 'Encrypted security']
    },
    'whatsapp-chatbot': {
        title: 'WhatsApp Chatbot',
        icon: Brain,
        heroDesc: '24/7 Intelligent automation on WhatsApp.',
        fullDesc: 'Automate your customer service and sales journeys with AI-powered chatbots. Resolve queries instantly and capture leads while you sleep.',
        detailedInfo: 'Our WhatsApp Chatbot solution combines NLP (Natural Language Processing) with automation to provide a human-like experience. It can handle FAQs, book appointments, collect documents, and even process payments within the WhatsApp window.',
        whyChooseUs: [
            'Reduce support ticket volume by up to 80%.',
            'Instant responses for higher customer satisfaction.',
            'Multi-lingual support for global audiences.',
            'Easy no-code bot builder interface.',
            'Seamless handover to human agents if needed.'
        ],
        features: [
            { title: 'NLP Engine', desc: 'Train bot on your own business data.', icon: Brain },
            { title: 'Auto-reply', desc: 'Keyword based instant responses.', icon: Zap },
            { title: 'Lead Gen', desc: 'Collect user data via chat flows.', icon: Target },
            { title: 'Agent Handoff', desc: 'Transfer complex cases to live support.', icon: Users },
            { title: 'Media Support', desc: 'Send/Receive images and documents.', icon: Layout },
            { title: 'Logs', desc: 'Detailed interaction and drop-off maps.', icon: BarChart3 }
        ],
        process: [
            { title: 'Bot Training', desc: 'Defining FAQs and conversation flow.' },
            { title: 'Logic Build', desc: 'Setting up API and database hooks.' },
            { title: 'Test Lab', desc: 'Validating bot responses for accuracy.' },
            { title: 'Deployment', desc: 'Live interaction with real users.' }
        ],
        impact: ['80% Ticket reduction', '24/7 Sales availability', 'Improved CSAT score', 'Lower support overhead']
    },
    'whatsapp-marketing': {
        title: 'WhatsApp Marketing',
        icon: Target,
        heroDesc: 'High-conversion marketing campaigns.',
        fullDesc: 'Reach your target audience with rich media marketing campaigns on WhatsApp. Drive 10x more engagement than traditional email or SMS.',
        detailedInfo: 'WhatsApp Marketing allows businesses to send personalized offers, newsletters, and arrival alerts with high-quality images and videos. With a 90% read rate, it is the most powerful weapon in your digital marketing arsenal.',
        whyChooseUs: [
            'Targeted broadcasting to opt-in lists.',
            'Rich mediaSupport: Video, PDF, and Carousels.',
            'Interactive buttons for one-click conversion.',
            'Real-time read and click tracking analytics.',
            'A/B testing for message optimization.'
        ],
        features: [
            { title: 'Broadcasting', desc: 'Send bulk updates to thousands.', icon: Rocket },
            { title: 'Rich Media', desc: 'Images, videos, and catalogs.', icon: Layout },
            { title: 'Smart CTA', desc: 'Quick-reply and URL buttons.', icon: MessageSquare },
            { title: 'Segmentation', desc: 'Targeting based on user tags.', icon: Users },
            { title: 'Analytics', desc: 'Detailed read and click metrics.', icon: BarChart3 },
            { title: 'Scheduling', desc: 'Plan campaigns for peak timing.', icon: Clock }
        ],
        process: [
            { title: 'Creative Design', desc: 'Crafting high-impact visuals.' },
            { title: 'Data Segment', desc: 'Filtering audience for relevance.' },
            { title: 'Blast Send', desc: 'High-speed campaign execution.' },
            { title: 'Track ROI', desc: 'Analyzing conversions and clicks.' }
        ],
        impact: ['10x More engagement', 'Higher sales conversion', 'Personalized touch', 'Direct user feedback']
    },
    'gps-tracking': {
        title: 'GPS Tracking System',
        icon: Target,
        heroDesc: 'Real-time visibility for your mobile assets.',
        fullDesc: 'A comprehensive fleet and asset tracking solution providing real-time location, speed monitoring, and geofencing alerts. Keep your assets secure 24/7.',
        detailedInfo: 'Our GPS Tracking System is an enterprise-grade platform designed for fleet owners, logistics companies, and individuals. It combines high-precision GPS hardware compatibility with a powerful cloud dashboard to provide historical route playback, fuel monitoring, and engine-cut-off features.',
        whyChooseUs: [
            'Real-time live tracking with < 10 second refresh.',
            'Precision geofencing and instant entry/exit alerts.',
            'Detailed fuel consumption and speed limit reports.',
            'Historical route playback up to 90 days.',
            'Mobile app support with SOS and anti-theft alerts.'
        ],
        features: [
            { title: 'Live Map', desc: 'Real-time positioning on Google Maps.', icon: Globe },
            { title: 'Geofence', desc: 'Safe-zone alerts for restricted areas.', icon: Shield },
            { title: 'Analytics', desc: 'Detailed idling and mileage reports.', icon: BarChart3 },
            { title: 'Fuel Monitor', desc: 'Track fuel levels and detect theft.', icon: Zap },
            { title: 'Anti-Theft', desc: 'Remote engine immobilizer support.', icon: Lock },
            { title: 'API Sync', desc: 'Link tracking with your ERP/Logistics.', icon: Share2 }
        ],
        process: [
            { title: 'Device Link', desc: 'Syncing tracking hardware with cloud.' },
            { title: 'Map Setup', desc: 'Defining routes and geofence zones.' },
            { title: 'Deployment', desc: 'Installing devices in vehicles/assets.' },
            { title: 'Monitoring', desc: 'Live visibility on web and mobile.' }
        ],
        impact: ['Zero asset loss', '20% Fuel cost savings', 'Improved driver accountability', 'Enhanced safety']
    },
    'transport-management': {
        title: 'Transport Management System',
        icon: Rocket,
        heroDesc: 'Optimized logistics, smarter deliveries.',
        fullDesc: 'Manage your entire transport operation from booking to delivery. Automate route planning, dispatch, and driver settlements.',
        detailedInfo: 'Our Transport Management System (TMS) is built to handle the complexities of modern logistics. It manages truck bookings, load balancing, route optimization, and digital proof-of-delivery, ensuring your transport business runs with maximum profit and minimum delay.',
        whyChooseUs: [
            'Automated load and route optimization.',
            'Digital LR (Lorry Receipt) and billing management.',
            'Integrated driver mobile app for delivery proof.',
            'Real-time transit tracking and customer alerts.',
            'Detailed profit/loss analysis per trip.'
        ],
        features: [
            { title: 'Dispatch', desc: 'Automated trip and driver assignment.', icon: Users },
            { title: 'Route Opt', desc: 'AI-driven path for lowest fuel cost.', icon: Target },
            { title: 'Digital POD', desc: 'Photo/Sign capture for delivery proof.', icon: Camera },
            { title: 'Billing', desc: 'Automated invoice and TDS calculation.', icon: ShoppingCart },
            { title: 'Maintenance', desc: 'Vehicle health and service alerts.', icon: Settings },
            { title: 'Dashboard', desc: 'Birds-eye view of all ongoing trips.', icon: Layout }
        ],
        process: [
            { title: 'Flow Design', desc: 'Mapping your specific booking cycle.' },
            { title: 'Driver Load', desc: 'Onboarding vehicles and fleet data.' },
            { title: 'Training', desc: 'Handover to dispatch and accounts team.' },
            { title: 'Scaling', desc: 'Optimizing trips for higher margins.' }
        ],
        impact: ['30% Faster delivery', 'Reduced operational costs', 'Transparent billing', 'Paperless logbooks']
    },
    'gym-management': {
        title: 'Gym Management System',
        icon: Zap,
        heroDesc: 'Unleash your fitness business potential.',
        fullDesc: 'A powerful tool for gym owners to manage memberships, attendance, payments, and diet plans. Keep your members motivated and your business growing.',
        detailedInfo: 'Fitness management requires tracking recurring goals. Our Gym Management System handles membership renewals, automated payment reminders, biometric attendance, and personalized workout/diet plans, allowing you to focus on training while we handle the admin.',
        whyChooseUs: [
            'Automated membership renewal SMS alerts.',
            'Integrated biometric and RFID attendance.',
            'Secure online payment and POS support.',
            'Instructor and personal trainer schedule manager.',
            'Member mobile app for workout tracking.'
        ],
        features: [
            { title: 'Member Portal', desc: 'Track progress and plan renewals.', icon: Users },
            { title: 'Billing', desc: 'Auto-invoice and recurring payments.', icon: ShoppingCart },
            { title: 'Workout Pro', desc: 'Digital diet and exercise templates.', icon: Layout },
            { title: 'Attendance', desc: 'Sync with biometric entry systems.', icon: Clock },
            { title: 'Marketing', desc: 'Send offers and rewards via SMS.', icon: MessageSquare },
            { title: 'Analytics', desc: 'Track retention and revenue growth.', icon: BarChart3 }
        ],
        process: [
            { title: 'Member Upload', desc: 'Importing active client base.' },
            { title: 'Plan Setup', desc: 'Defining membership tiers and costs.' },
            { title: 'Integration', desc: 'Linking biometric and SMS gateways.' },
            { title: 'Launch', desc: 'Seamless automated billing start.' }
        ],
        impact: ['Higher member retention', 'Zero payment leaks', 'Organized scheduling', 'Professional brand image']
    },
    'ecommerce-platform': {
        title: 'E-commerce Platform',
        icon: ShoppingCart,
        heroDesc: 'Your store, your rules, global reach.',
        fullDesc: 'A robust, scalable online store solution with integrated payments, inventory management, and marketing tools. Sell anything, anywhere.',
        detailedInfo: 'Our E-commerce Platform is an all-in-one solution for retailers and brands. It includes a high-performance frontend, a powerful admin dashboard for inventory, and seamless integration with payment gateways and shipping providers like Shiprocket.',
        whyChooseUs: [
            'SEO-optimized, lightning-fast store frontend.',
            'Multi-currency and global payment support.',
            'Advanced inventory and warehouse tracking.',
            'Built-in abandoned cart recovery tools.',
            'Rich analytics for sales and customer behavior.'
        ],
        features: [
            { title: 'Catalog Pro', desc: 'Manage thousands of SKUs easily.', icon: Layout },
            { title: 'Payments', desc: 'Secure Razarpay/PayU integration.', icon: Shield },
            { title: 'Shipping', desc: 'Automated courier labels and tracking.', icon: Share2 },
            { title: 'Promotions', desc: 'Coupon codes and flash sale manager.', icon: Target },
            { title: 'CRM Sync', desc: 'Track customer lifetime value (LTV).', icon: Users },
            { title: 'Security', desc: 'PCI-DSS compliant secure checkout.', icon: Lock }
        ],
        process: [
            { title: 'Design', desc: 'Customizing store theme and UI.' },
            { title: 'Product Load', desc: 'Adding descriptions and images.' },
            { title: 'Integration', desc: 'Linking payments and logistics.' },
            { title: 'Execution', desc: 'Marketing launch and live sales.' }
        ],
        impact: ['Global sales reach', 'Automated fulfillments', 'Secure transactions', 'Customer brand loyalty']
    },
    'school-management': {
        title: 'School Management System',
        icon: AppWindow,
        heroDesc: 'Complete digital ecosystem for modern education.',
        fullDesc: 'A powerful, all-in-one platform to manage students, faculty, attendance, exams, and fees with ease. Bridge the gap between parents and institutions.',
        detailedInfo: 'Our School Management System (ERP) is designed to automate the diverse operations of educational institutions. From nursery schools to large universities, our platform handles student lifecycles, staff payroll, library management, and real-time parent-teacher communication through a unified dashboard.',
        whyChooseUs: [
            'Automated attendance and timetable management.',
            'Secure and easy online fee collection gateway.',
            'Instant exam result processing and report generation.',
            'Dedicated parent-teacher mobile app integration.',
            'Robust student behavior and academic tracking.'
        ],
        features: [
            { title: 'Student Portal', desc: 'Secure access to marks and attendance.', icon: Users },
            { title: 'Fee Manager', desc: 'Automated billing and online payments.', icon: ShoppingCart },
            { title: 'Exam Engine', desc: 'Online tests and offline result processing.', icon: Target },
            { title: 'Library Pro', desc: 'Digital tracking of book issues and returns.', icon: Database },
            { title: 'Staff Payroll', desc: 'Biometric integration and salary slips.', icon: Lock },
            { title: 'Smart App', desc: 'Real-time notifications for parents.', icon: Smartphone }
        ],
        process: [
            { title: 'Data Migration', desc: 'Transferring existing student records.' },
            { title: 'Config', desc: 'Setting up classes, subjects, and fees.' },
            { title: 'Training', desc: 'Workshop for teachers and admin staff.' },
            { title: 'Go Live', desc: 'Full-scale deployment for the new session.' }
        ],
        impact: ['70% Reduced paperwork', 'Better parent engagement', 'Error-free accounting', 'Centralized data access']
    },
    'hospital-management': {
        title: 'Hospital Management System',
        icon: Shield,
        heroDesc: 'Efficiency in healthcare, excellence in care.',
        fullDesc: 'Streamline patient registration, billing, lab reports, and pharmacy records. A secure, HIPAA-compliant solution for clinics and hospitals.',
        detailedInfo: 'Healthcare needs precision. Our Hospital Management System (HMS) provides a digital backbone for medical facilities. It manages doctor schedules, patient EMR (Electronic Medical Records), operation theater bookings, and automated billing, ensuring medical professionals can focus on lives, not documents.',
        whyChooseUs: [
            'Secure EMR (Electronic Medical Records) storage.',
            'Integrated laboratory and pharmacy modules.',
            'Efficient OPD/IPD appointment management.',
            'Real-time inventory and medicine tracking.',
            'Detailed financial and surgical performance logs.'
        ],
        features: [
            { title: 'Patient Hub', desc: '360-degree view of medical history.', icon: Users },
            { title: 'Billing Desk', desc: 'Insurance claims and instant invoices.', icon: ShoppingCart },
            { title: 'Lab Connect', desc: 'Direct upload of diagnostic reports.', icon: Share2 },
            { title: 'Pharmacy Sync', desc: 'Inventory tracking for medications.', icon: Lock },
            { title: 'Doctor Panel', desc: 'Digital prescription and schedule manager.', icon: Layout },
            { title: 'Security', desc: 'HIPAA compliant data encryption.', icon: Shield }
        ],
        process: [
            { title: 'Module Select', desc: 'Picking relevant clinics/hospital tools.' },
            { title: 'EMR Setup', desc: 'Structuring medical record templates.' },
            { title: 'Staff Sync', desc: 'Role-based access for nurses and doctors.' },
            { title: 'Live OPD', desc: 'Starting digital patient journeys.' }
        ],
        impact: ['Faster patient checkout', 'Zero diagnostic errors', 'Secure medical records', 'Optimized resource use']
    },
    'hr-management': {
        title: 'HR Management System',
        icon: Users,
        heroDesc: 'Empower your workforce. Simplify HR.',
        fullDesc: 'Manage attendance, payroll, performance, and recruitment in one place. Build a transparent and productive work culture.',
        detailedInfo: 'People are the core of any business. Our HRMS (Human Resource Management System) automates the entire employee lifecycle—from onboarding and biometric attendance to performance reviews and final settlements, reducing HR workload by 60%.',
        whyChooseUs: [
            'Biometric and Geo-fencing attendance support.',
            'One-click automated payroll and tax calculation.',
            'Transparent performance and KPI tracking.',
            'Employee self-service (ESS) portal for leaves.',
            'Secure document vault for employee files.'
        ],
        features: [
            { title: 'Payroll Pro', desc: 'Error-free automated salary processing.', icon: ShoppingCart },
            { title: 'Auto Attendance', desc: 'Sync with biometric and mobile-checkins.', icon: Clock },
            { title: 'Recruit Engine', desc: 'Applicant tracking and interview flow.', icon: Target },
            { title: 'Performance', desc: 'KPI-based appraisal and feedback.', icon: BarChart3 },
            { title: 'Self-Service', desc: 'Employee leave and document portal.', icon: AppWindow },
            { title: 'Vault', desc: 'Secure cloud for contracts and IDs.', icon: Lock }
        ],
        process: [
            { title: 'HR Audit', desc: 'Mapping existing payroll and leave rules.' },
            { title: 'System Config', desc: 'Setting up hierarchy and departments.' },
            { title: 'Employee Load', desc: 'Bulk uploading staff data safely.' },
            { title: 'Training', desc: 'Helping HR and staff use the portal.' }
        ],
        impact: ['Zero payroll errors', 'Improved staff productivity', 'Transparent leave policy', 'Secure personell data']
    },
    'visa-product': {
        title: 'Visa Product',
        icon: Shield,
        heroDesc: 'Streamlined visa processing solutions.',
        fullDesc: 'Our Visa Product is designed to simplify complex immigration and visa workflows. We provide end-to-end automation for applications, tracking, and documentation.',
        detailedInfo: `Visa processing is often bogged down by paperwork, manual tracking, and complex regulations. Our solution brings digital efficiency to the entire journey for both applicants and processing agencies.\n\nOur platform provides a secure environment for documenting identities, tracking application milestones, and communicating with applicants in real-time.`,
        whyChooseUs: [
            'Faster processing with automated workflow.',
            'Zero manual errors in documentation.',
            'Secure cloud storage for sensitive data.',
            'Real-time status tracking for satisfaction.',
            'Scalable architecture for agencies.'
        ],
        features: [
            { title: 'Digital Forms', desc: 'Capture applicant data easily.', icon: Layout },
            { title: 'Secure Vault', desc: 'Encrypted identity storage.', icon: Lock },
            { title: 'Live Tracking', desc: 'Update on processing milestones.', icon: Clock },
            { title: 'Compliance', desc: 'Automated regulation checks.', icon: Shield },
            { title: 'Comm Layer', desc: 'SMS/Email for applicants.', icon: MessageSquare },
            { title: 'Dashboard', desc: 'View all active cases.', icon: BarChart3 }
        ],
        process: [
            { title: 'Apply', desc: 'Digital forms for data.' },
            { title: 'Storage', desc: 'Secure cloud for identities.' },
            { title: 'Track', desc: 'Real-time updates on milestones.' },
            { title: 'Check', desc: 'Automated compliance verification.' }
        ],
        impact: ['Faster turnaround', 'Zero doc errors', 'Secure travel data', 'Premium experience']
    }
};
