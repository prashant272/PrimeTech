import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// IT Company imports
import ITNavbar from './components/it/ITNavbar';
import ITFooter from './components/it/ITFooter';
import ITHome from './pages/ITHome';
import ITAbout from './pages/ITAbout';
import ITContact from './pages/ITContact';
import ITServicesPage from './pages/ITServicesPage';
import ITServiceDetail from './pages/ITServiceDetail';
import ITProductDetail from './pages/ITProductDetail';
import VisaDetail from './pages/VisaDetail';
import ITCaseStudyDetail from './pages/ITCaseStudyDetail';
import ITBlogDetail from './pages/ITBlogDetail';
import ITBlogList from './pages/ITBlogList';
import ITCareers from './pages/ITCareers';
import ITBackground3D from './components/it/ITBackground3D';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Section */}
        <Route path="/prime-admin" element={<AdminLogin />} />
        <Route path="/prime-admin/dashboard" element={<AdminDashboard />} />

        {/* IT Company Website — DEFAULT at root / */}
        <Route path="*" element={
          <div className="relative min-h-screen text-white font-sans overflow-x-hidden bg-[#070b14]">
            <ITBackground3D />
            <div className="relative z-10 flex flex-col min-h-screen">
              <ITNavbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<ITHome />} />
                  <Route path="/services" element={<ITServicesPage />} />
                  <Route path="/services/:serviceId" element={<ITServiceDetail />} />
                  <Route path="/products/:productId" element={<ITProductDetail />} />
                  <Route path="/visa/:visaSlug" element={<VisaDetail />} />
                  <Route path="/case-studies/:slug" element={<ITCaseStudyDetail />} />
                  <Route path="/blog" element={<ITBlogList />} />
                  <Route path="/blog/:slug" element={<ITBlogDetail />} />
                  <Route path="/careers" element={<ITCareers />} />
                  <Route path="/about" element={<ITAbout />} />
                  <Route path="/contact" element={<ITContact />} />
                </Routes>
              </main>
              <ITFooter />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
