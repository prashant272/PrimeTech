import React from 'react';
import SEO from '../components/SEO';
import ITHero from '../components/it/ITHero';
import ITStats from '../components/it/ITStats';
import ITFeatures from '../components/it/ITFeatures';
import ITServices from '../components/it/ITServices';
import ITTestimonials from '../components/it/ITTestimonials';
import ITTrustedBy from '../components/it/ITTrustedBy';
import ITCaseStudies from '../components/it/ITCaseStudies';
import ITProcess from '../components/it/ITProcess';
import ITPricing from '../components/it/ITPricing';
import ITFAQ from '../components/it/ITFAQ';
import ITBlogPreview from '../components/it/ITBlogPreview';
import ITCTA from '../components/it/ITCTA';
import ITCertifications from '../components/it/ITCertifications';
import ITWhatsAppButton from '../components/it/ITWhatsAppButton';
const ITHome = () => {
    return (
        <div className="relative min-h-screen text-white">
            <SEO
                title="Prime Impact | Best IT Company & Software Development Services"
                description="Prime Impact IT Solutions delivers business-changing software solutions. Hire the best web, app, and AI developers from Prime Impact for fast delivery."
                keywords="Prime Impact, Prime Impact Solutions, Prime Impact IT Solutions, Best IT company"
            />
            <ITHero />
            <ITStats />
            <ITCertifications />
            <ITTrustedBy />
            <ITFeatures />
            <ITServices />
            <ITCaseStudies />
            <ITProcess />
            <ITPricing />
            <ITTestimonials />
            <ITBlogPreview />
            <ITFAQ />
            <ITCTA />
            <ITWhatsAppButton />
        </div>
    );
};

export default ITHome;
