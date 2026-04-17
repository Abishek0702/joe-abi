import emailjs from '@emailjs/browser';

// ============================================================
// EmailJS Configuration
// ============================================================
// 1. Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
// 2. Create an Email Service (Gmail, Outlook, etc.) -> copy SERVICE_ID
// 3. Create an Email Template with these variables:
//      {{to_email}}     - recipient email
//      {{love_quote}}   - the romantic quote
//      {{image_url}}    - gallery image URL
//      {{image_tag}}    - gallery image tag/caption
//      {{timestamp}}    - when the memory was created
//      {{message}}      - personal message
//
//    Sample template HTML:
//    <div style="font-family:'Georgia',serif;max-width:600px;margin:0 auto;background:linear-gradient(135deg,#fce4ec,#f8bbd0);padding:40px;border-radius:20px;">
//      <h1 style="text-align:center;color:#c2185b;font-size:28px;">Your Valentine Memory</h1>
//      <div style="text-align:center;margin:20px 0;">
//        <img src="{{image_url}}" alt="{{image_tag}}" style="width:300px;border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,0.15);" />
//        <p style="color:#e91e63;font-size:14px;margin-top:8px;">{{image_tag}}</p>
//      </div>
//      <blockquote style="font-style:italic;color:#880e4f;font-size:18px;text-align:center;border-left:4px solid #f48fb1;padding:12px 20px;margin:20px 0;background:white;border-radius:8px;">
//        "{{love_quote}}"
//      </blockquote>
//      <p style="color:#6d4c41;text-align:center;font-size:16px;">{{message}}</p>
//      <p style="color:#9e9e9e;text-align:center;font-size:12px;margin-top:30px;">Sent with love on {{timestamp}}</p>
//    </div>
//
// 4. Copy the TEMPLATE_ID
// 5. Go to Account -> API Keys -> copy PUBLIC_KEY
// 6. Replace the values below:
// ============================================================

const EMAILJS_SERVICE_ID = 'service_isdgn3e';
const EMAILJS_TEMPLATE_ID = 'template_71g25to';
const EMAILJS_PUBLIC_KEY = 'ELHlIG-Bi_epdpOOV';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Send a valentine memory email
 * @param {Object} params
 * @param {string} params.toEmail - recipient email address
 * @param {string} params.loveQuote - the last displayed love quote
 * @param {string} params.imageUrl - selected gallery image URL
 * @param {string} params.imageTag - selected gallery image tag
 * @param {string} params.message - optional personal message
 * @returns {Promise}
 */
export async function sendValentineEmail({
  toEmail,
  message = 'You are my forever valentine.',
}) {
  const templateParams = {
    to_email: toEmail,
    love_quote: 'Our love is beautiful, nama kadaisi vara ipadiye happy ah irupom',
    image_url: '/images/WhatsApp Image 2026-04-16 at 7.28.51 PM.jpeg',
    image_tag: '#OurLove',
    timestamp: new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    message,
  };

  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
}
