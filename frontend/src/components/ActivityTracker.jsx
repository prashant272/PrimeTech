import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';

const ActivityTracker = () => {
    const location = useLocation();

    // Track Page Views & Return Visits
    useEffect(() => {
        const leadId = getValidLeadId();
        
        // If it's a returning user, log a return event once per session
        const sessionStarted = sessionStorage.getItem('session_started');
        if (leadId && !sessionStarted) {
            const log = {
                action: `Returned to Site`,
                path: location.pathname,
                timestamp: new Date().toISOString()
            };
            saveLog(log);
            sessionStorage.setItem('session_started', 'true');
        }

        const log = {
            action: `Page View: ${location.pathname}`,
            path: location.pathname,
            timestamp: new Date().toISOString()
        };
        saveLog(log);
    }, [location]);

    // Track Clicks
    useEffect(() => {
        const handleClick = (e) => {
            const target = e.target.closest('button, a');
            if (target) {
                const text = target.innerText?.trim() || target.getAttribute('aria-label') || 'unnamed element';
                if (text && text.length < 100) {
                    const log = {
                        action: `Clicked: ${text}`,
                        path: window.location.pathname,
                        timestamp: new Date().toISOString()
                    };
                    saveLog(log);
                }
            }
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    // Helper to get Lead ID only if it hasn't expired (30 days)
    const getValidLeadId = () => {
        const leadData = localStorage.getItem('captured_lead_data');
        if (!leadData) return null;

        const { id, expiry } = JSON.parse(leadData);
        if (new Date().getTime() > expiry) {
            localStorage.removeItem('captured_lead_data');
            localStorage.removeItem('lead_submitted'); // Allow popup again after 30 days
            return null;
        }
        return id;
    };

    const saveLog = async (log) => {
        const leadId = getValidLeadId();
        
        if (leadId) {
            try {
                await api.patch(`/leads/${leadId}/activity`, log);
            } catch (err) {
                console.error('Failed to sync live activity:', err);
            }
        } else {
            // Store locally in localStorage (instead of sessionStorage) so it persists until they fill the form
            const logs = JSON.parse(localStorage.getItem('pending_activity_logs') || '[]');
            const updatedLogs = [...logs, log].slice(-50);
            localStorage.setItem('pending_activity_logs', JSON.stringify(updatedLogs));
        }
    };

    return null;
};

export default ActivityTracker;
