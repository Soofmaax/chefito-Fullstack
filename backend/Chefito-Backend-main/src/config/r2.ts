import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID;
const secretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY;
const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;
const bucketUrl = process.env.CLOUDFLARE_BUCKET_URL;

// Validate URL format
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Check if R2 is configured with valid URLs
const isR2Configured = accessKeyId && secretAccessKey && bucketName && bucketUrl && isValidUrl(bucketUrl);

let r2: AWS.S3 | null = null;

if (isR2Configured) {
  // Configure AWS SDK for Cloudflare R2
  r2 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    endpoint: bucketUrl,
    region: 'auto',
    signatureVersion: 'v4',
  });
} else {
  if (bucketUrl && !isValidUrl(bucketUrl)) {
    console.warn('⚠️  CLOUDFLARE_BUCKET_URL is invalid. Please set a valid R2 endpoint URL in your .env file (e.g., https://your-account-id.r2.cloudflarestorage.com)');
  } else {
    console.warn('⚠️  Cloudflare R2 not configured. Recipe storage will be simulated.');
  }
}

export const r2Config = {
  client: r2,
  bucketName: bucketName || 'chefito-recipes',
  bucketUrl: bucketUrl || '',
  isConfigured: isR2Configured,
};

export default r2;