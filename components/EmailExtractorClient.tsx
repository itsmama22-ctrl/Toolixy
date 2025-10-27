'use client';

import React, { useState, useCallback } from 'react';
import { Mail, Download, Copy, ExternalLink, AlertCircle, CheckCircle, Loader2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import type { EmailExtractionResult } from '@/types';
import { copyToClipboard, isValidUrl, extractDomain } from '@/lib/utils';
import { trackEmailExtraction, trackToolUsage, trackFileDownload, trackError } from '@/lib/analytics';

interface EmailExtractorClientProps {}

export default function EmailExtractorClient({}: EmailExtractorClientProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmailExtractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      extractEmails();
    }
  };

  const copyToClipboardHandler = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success('Copied to clipboard!');
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  // Client-side email extraction using CORS proxy
  const extractEmails = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      toast.error('Please enter a URL');
      return;
    }
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      toast.error('Please enter a valid URL');
      return;
    }

    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      // Use CORS proxy to bypass CORS restrictions
      // Try multiple proxies for better reliability
      const proxies = [
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
        `https://cors-anywhere.herokuapp.com/${url}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
      ];

      let response;
      let htmlContent = '';
      
      for (const proxyUrl of proxies) {
        try {
          response = await fetch(proxyUrl);
          if (response.ok) {
            if (proxyUrl.includes('allorigins.win')) {
              const data = await response.json();
              htmlContent = data.contents;
            } else {
              htmlContent = await response.text();
            }
            break;
          }
        } catch (err) {
          console.warn(`Proxy ${proxyUrl} failed:`, err);
          continue;
        }
      }

      if (!htmlContent) {
        throw new Error('Failed to fetch the webpage. Please try a different URL or check if the website is accessible.');
      }

      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      // Remove script and style elements
      const scripts = doc.querySelectorAll('script, style, noscript');
      scripts.forEach(el => el.remove());

      // Get all text content
      const textContent = doc.body.textContent || '';
      
      // Extract emails using improved regex
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const emails = textContent.match(emailRegex) || [];

      // Filter out common false positives and validate emails
      const filteredEmails = emails
        .filter(email => {
          const lowerEmail = email.toLowerCase();
          return !lowerEmail.includes('example.com') && 
                 !lowerEmail.includes('test.com') &&
                 !lowerEmail.includes('domain.com') &&
                 !lowerEmail.includes('your-email') &&
                 !lowerEmail.includes('email@') &&
                 !lowerEmail.includes('noreply') &&
                 !lowerEmail.includes('no-reply') &&
                 !lowerEmail.includes('donotreply') &&
                 !lowerEmail.includes('do-not-reply') &&
                 lowerEmail.length > 5 &&
                 lowerEmail.includes('@') &&
                 lowerEmail.split('@').length === 2;
        })
        .map(email => email.trim())
        .filter((email, index, arr) => arr.indexOf(email) === index) // Remove duplicates
        .sort();

      // Also extract emails from mailto links
      const mailtoLinks = doc.querySelectorAll('a[href^="mailto:"]');
      const linkEmails: string[] = [];
      mailtoLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          const email = href.replace('mailto:', '').split('?')[0];
          if (email && email.includes('@')) {
            linkEmails.push(email.trim());
          }
        }
      });

      // Combine and deduplicate
      const combinedEmails = [...filteredEmails, ...linkEmails];
      const allEmails = Array.from(new Set(combinedEmails)).sort();

      // Extract metadata
      const title = doc.querySelector('title')?.textContent || extractDomain(url);
      const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';

      const extractionResult: EmailExtractionResult = {
        id: Math.random().toString(36).substr(2, 9),
        url,
        emails: allEmails,
        extractedAt: new Date(),
        status: 'success',
      };

          setResult(extractionResult);
          
          // Track extraction success
          trackEmailExtraction(url, allEmails.length, true);
          trackToolUsage('email_extractor', 'extraction_completed', {
            email_count: allEmails.length,
            url: url
          });
          
          if (allEmails.length === 0) {
            toast('No emails found on this page. Try a different website.', {
              icon: 'ℹ️',
              duration: 4000,
            });
            trackToolUsage('email_extractor', 'no_emails_found', { url: url });
          } else {
            toast.success(`Found ${allEmails.length} email${allEmails.length !== 1 ? 's' : ''}!`);
          }
      
        } catch (err) {
          console.error('Email extraction error:', err);
          setError(err instanceof Error ? err.message : 'An unexpected error occurred');
          toast.error(err instanceof Error ? err.message : 'An unexpected error occurred');
          
          // Track extraction error
          trackError('email_extraction_error', err instanceof Error ? err.message : 'Unknown error', 'email_extractor');
          trackEmailExtraction(url, 0, false);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const downloadCSV = () => {
    if (!result) return;

    const csvData = result.emails.map(email => ({ email }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const fileName = `${extractDomain(result.url)}-emails.csv`;
    saveAs(blob, fileName);
    
    // Track download
    trackFileDownload(fileName, 'csv', 'email_extractor');
    trackToolUsage('email_extractor', 'download_csv', { email_count: result.emails.length });
    
    toast.success('CSV downloaded!');
  };

  const downloadTxt = () => {
    if (!result) return;

    const txtData = result.emails.join('\n');
    const blob = new Blob([txtData], { type: 'text/plain;charset=utf-8;' });
    const fileName = `${extractDomain(result.url)}-emails.txt`;
    saveAs(blob, fileName);
    
    // Track download
    trackFileDownload(fileName, 'txt', 'email_extractor');
    trackToolUsage('email_extractor', 'download_txt', { email_count: result.emails.length });
    
    toast.success('TXT downloaded!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <Mail className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Email Extractor</h1>
        <p className="text-lg text-gray-600">
          Extract email addresses from any website quickly and accurately. Perfect for lead generation and market research.
        </p>
      </div>


      {/* Input Form */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Website URL</h2>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://example.com"
            className="input-field flex-1"
            disabled={isLoading}
          />
          <button
            onClick={extractEmails}
            disabled={isLoading || !url.trim()}
            className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Extracting...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Extract Emails
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="flex items-center text-red-600 mt-4 space-x-2">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Results Display */}
      {result && (
        <div className="card animate-fade-in">
          {/* Success Header */}
          <div className="flex items-start space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-green-800 font-medium">
                Successfully extracted {result.emails.length} email{result.emails.length !== 1 ? 's' : ''} from{' '}
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green-700"
                >
                  {extractDomain(result.url)}
                </a>
              </p>
              <p className="text-green-700 text-sm mt-1">
                Page: {result.url}
              </p>
            </div>
          </div>

          {/* Export Options */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={downloadCSV} className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download CSV</span>
            </button>
            <button onClick={downloadTxt} className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download TXT</span>
            </button>
            <button
              onClick={() => copyToClipboardHandler(result.emails.join('\n'))}
              className="btn-ghost flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy All</span>
            </button>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Page</span>
            </a>
          </div>

          {/* Email List */}
          {result.emails.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900">Extracted Emails</h3>
              <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                {result.emails.map((email, index) => (
                  <div key={index} className="email-list-item flex items-center justify-between">
                    <span className="font-mono text-sm text-gray-700">{email}</span>
                    <button
                      onClick={() => copyToClipboardHandler(email)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy email"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Features Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Why Use Our Email Extractor?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3 card">
            <Mail className="w-6 h-6 text-primary-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Accurate Extraction</h3>
              <p className="text-sm text-gray-600">Our advanced algorithms ensure high accuracy in email identification.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 card">
            <Download className="w-6 h-6 text-primary-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Multiple Export Formats</h3>
              <p className="text-sm text-gray-600">Export your leads to CSV or TXT for easy integration with other tools.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 card">
            <Copy className="w-6 h-6 text-primary-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Duplicate Removal</h3>
              <p className="text-sm text-gray-600">Automatically cleans your list by removing duplicate email addresses.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 card">
            <Shield className="w-6 h-6 text-primary-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Privacy Focused</h3>
              <p className="text-sm text-gray-600">We prioritize your privacy; no data is stored on our servers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
