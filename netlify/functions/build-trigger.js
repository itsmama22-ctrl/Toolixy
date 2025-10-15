/**
 * Netlify Function to trigger builds via webhook
 * This function can be called by external cron services to trigger new builds
 * when blog posts should be published based on their publishDate
 */
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Verify the request is authorized
    const authHeader = event.headers.authorization || event.headers.Authorization;
    const expectedSecret = process.env.CRON_SECRET;
    
    if (!expectedSecret) {
      console.error('CRON_SECRET environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Server configuration error',
        }),
      };
    }

    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Unauthorized',
        }),
      };
    }

    // Get the build hook URL from environment variables
    const buildHookUrl = process.env.NETLIFY_BUILD_HOOK;
    
    if (!buildHookUrl) {
      console.error('NETLIFY_BUILD_HOOK environment variable not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Build hook URL not configured',
        }),
      };
    }

    // Trigger the Netlify build
    const response = await fetch(buildHookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trigger_title: 'Scheduled blog post publish',
        trigger_branch: 'main',
      }),
    });

    if (!response.ok) {
      throw new Error(`Build trigger failed: ${response.status} ${response.statusText}`);
    }

    const buildData = await response.json();
    
    console.log('Build triggered successfully:', buildData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Build triggered successfully',
        buildId: buildData.id,
        buildUrl: buildData.url,
        timestamp: new Date().toISOString(),
      }),
    };

  } catch (error) {
    console.error('Error triggering build:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to trigger build',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      }),
    };
  }
};
