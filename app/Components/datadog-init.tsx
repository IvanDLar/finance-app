// Necessary if using App Router to ensure this file runs on the client
"use client";

import { datadogRum } from "@datadog/browser-rum";

datadogRum.init({
    applicationId: 'c4395742-f57d-4dfa-8ca9-ea0f2f8915c1',
    clientToken: 'pub5072aeabd1d82a91499fcef7d9225235',
    site: 'datadoghq.com',
    service:'finance-front-end',
    env: 'prod',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 90,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",
    // Specify URLs to propagate trace headers for connection between RUM and backend trace
    allowedTracingUrls: [
    { match: "https://example.com/api/", propagatorTypes: ["tracecontext"] },
    ],
});

export default function DatadogInit() {
    // Render nothing - this component is only included so that the init code
    // above will run client-side
    return null;
}

