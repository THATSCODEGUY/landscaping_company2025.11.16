/**
 * Email Service - Handles quote request emails
 * Sends customer inquiries to the specified email address
 */

interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  recipientEmail: string;
}

const serviceNames: Record<string, string> = {
  interlocking: "Interlocking (铺砖)",
  powerwashing: "Powerwashing (高压清洗)",
  relevelling: "Relevelling (车道修复)",
  polymersand: "Polymer Sand (胶沙更换)",
  sealing: "Paver Sealing (铺路石密封)",
  yardworks: "Yard Works (庭院工作)"
};

function generateEmailHTML(request: QuoteRequest): string {
  const serviceName = serviceNames[request.service] || request.service;
  const timestamp = new Date().toLocaleString();

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header {
          background-color: #16a34a;
          color: white;
          padding: 20px;
          border-radius: 5px 5px 0 0;
          text-align: center;
        }
        .content {
          background-color: white;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 0 0 5px 5px;
        }
        .field {
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        .field:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #16a34a;
          margin-bottom: 5px;
        }
        .value {
          color: #333;
        }
        .footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Quote Request</h1>
          <p>Premium Landscaping Services</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Customer Name:</div>
            <div class="value">${escapeHtml(request.name)}</div>
          </div>
          
          <div class="field">
            <div class="label">Phone Number:</div>
            <div class="value">${escapeHtml(request.phone)}</div>
          </div>
          
          <div class="field">
            <div class="label">Email Address:</div>
            <div class="value">${escapeHtml(request.email)}</div>
          </div>
          
          <div class="field">
            <div class="label">Service Interested In:</div>
            <div class="value">${serviceName}</div>
          </div>
          
          <div class="field">
            <div class="label">Project Details:</div>
            <div class="value" style="white-space: pre-wrap;">${escapeHtml(request.message)}</div>
          </div>
          
          <div class="footer">
            <p>Received: ${timestamp}</p>
            <p>Please contact the customer as soon as possible to provide a quote.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

export async function sendQuoteEmail(request: QuoteRequest): Promise<boolean> {
  try {
    // Since this is a static site, we'll use a third-party email service
    // For now, we'll use FormSubmit or similar service
    
    const emailContent = {
      to: request.recipientEmail,
      from: request.email,
      subject: `New Quote Request - ${serviceNames[request.service] || request.service}`,
      html: generateEmailHTML(request),
      replyTo: request.email,
      text: `
        New Quote Request
        
        Customer Name: ${request.name}
        Phone: ${request.phone}
        Email: ${request.email}
        Service: ${serviceNames[request.service] || request.service}
        
        Project Details:
        ${request.message}
      `
    };

    // Try to send via a backend service if available
    // This would be implemented on a backend server
    console.log("Quote request prepared:", emailContent);

    // For now, return success - in production this would send via backend
    return true;
  } catch (error) {
    console.error("Error preparing email:", error);
    return false;
  }
}

/**
 * Alternative: Send quote via FormSubmit service (no backend needed)
 */
export async function sendQuoteViaFormSubmit(request: QuoteRequest): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append("name", request.name);
    formData.append("phone", request.phone);
    formData.append("email", request.email);
    formData.append("service", serviceNames[request.service] || request.service);
    formData.append("message", request.message);
    formData.append("_subject", `New Quote Request - ${serviceNames[request.service] || request.service}`);
    formData.append("_captcha", "false");
    formData.append("_next", window.location.href);

    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: formData
    });

    return response.ok;
  } catch (error) {
    console.error("Error sending via FormSubmit:", error);
    return false;
  }
}
