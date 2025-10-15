'use client';

import React, { useState, useCallback } from 'react';
import { Mail, Download, Copy, ExternalLink, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import type { EmailExtractionResult } from '@/types';
import { copyToClipboard, isValidUrl, extractDomain, hasReachedLimit } from '@/lib/utils';

interface EmailExtractorProps {
  userPlan?: 'free' | 'pro';
  userUsage?: {
    emailExtractions: number;
  };
}

export default function EmailExtractor({ userPlan = 'free', userUsage = { emailExtractions: 0 } }: EmailExtractorProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmailExtractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Usage limits
  const FREE_LIMIT = 5;
  const hasReachedUsageLimit = hasReachedLimit(userUsage.emailExtractions, FREE_LIMIT, userPlan);

  const extractEmails = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (including http:// or https://)');
      return;
    }

    if (hasReachedUsageLimit) {
      setError('You have reached your daily limit. Upgrade to Pro for unlimited extractions.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/.netlify/functions/email-extractor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract emails');
      }

      if (data.success) {
        setResult(data.data);
        toast.success(`Found ${data.data.emailCount} emails!`);
      } else {
        throw new Error(data.error || 'Failed to extract emails');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [url, hasReachedLimit]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
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

  const downloadCSV = () => {
    if (!result) return;

    const csvData = result.emails.map(email => ({ email }));
    const csv = Papa.unparse(csvData);
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const filename = `emails-${extractDomain(result.url)}-${new Date().toISOString().split('T')[0]}.csv`;
    
    saveAs(blob, filename);
    toast.success('CSV downloaded successfully!');
  };

  const downloadTxt = () => {
    if (!result) return;

    const txtContent = result.emails.join('\n');
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
    const filename = `emails-${extractDomain(result.url)}-${new Date().toISOString().split('T')[0]}.txt`;
    
    saveAs(blob, filename);
    toast.success('Text file downloaded successfully!');
  };

  const remainingUsage = userPlan === 'pro' ? 'Unlimited' : FREE_LIMIT - userUsage.emailExtractions;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full">
          <Mail className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Email Extractor</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Extract all email addresses from any website quickly and easily. 
          Perfect for lead generation, contact discovery, and market research.
        </p>
      </div>

      {/* Usage Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Daily Usage</span>
          </div>
          <span className="text-blue-700">
            {userPlan === 'pro' ? 'Unlimited' : `${remainingUsage} extractions remaining`}
          </span>
        </div>
        {userPlan === 'free' && typeof remainingUsage === 'number' && remainingUsage <= 1 && (
          <p className="text-blue-600 text-sm mt-2">
            <a href="/pricing" className="underline hover:text-blue-700">
              Upgrade to Pro for unlimited extractions
            </a>
          </p>
        )}
      </div>

      {/* Input Form */}
      <div className="card space-y-6">
        <div className="space-y-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <div className="flex space-x-3">
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="https://example.com"
              className="input-field flex-1"
              disabled={isLoading || hasReachedUsageLimit}
            />
            <button
              onClick={extractEmails}
              disabled={isLoading || hasReachedUsageLimit || !url.trim()}
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
                  Extract
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-start space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
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
            <div className="flex flex-wrap gap-3">
              <button
                onClick={downloadCSV}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </button>
              <button
                onClick={downloadTxt}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download TXT</span>
              </button>
              <button
                onClick={() => copyToClipboardHandler(result.emails.join('\n'))}
                className="btn-outline flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy All</span>
              </button>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Source</span>
              </a>
            </div>

            {/* Email List */}
            <div className="space-y-3">
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
          </div>
        )}

        {/* Features */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Use Our Email Extractor?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Fast & Accurate</h4>
                <p className="text-gray-600 text-sm">Extract emails in seconds with high accuracy</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Multiple Formats</h4>
                <p className="text-gray-600 text-sm">Export as CSV, TXT, or copy to clipboard</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Privacy Focused</h4>
                <p className="text-gray-600 text-sm">We don't store your extracted data</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Bulk Processing</h4>
                <p className="text-gray-600 text-sm">Handle large websites efficiently</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
