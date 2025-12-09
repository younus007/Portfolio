# Google Sheets Contact Form Integration Setup

## 📋 Overview
Your contact form is configured to send data to Google Sheets. Follow these steps to set up the integration.

## 🚀 Setup Instructions

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Portfolio Contact Form Responses"
4. Add these column headers in row 1:
   - A1: `TIMESTAMP`
   - B1: `NAME`
   - C1: `EMAIL`
   - D1: `SUBJECT`
   - E1: `MESSAGE`

### Step 2: Create Google Apps Script
1. In your Google Sheet, go to `Extensions` → `Apps Script`
2. Replace the default code with this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = e.parameter;
  
  // Add new row with form data
  sheet.appendRow([
    data.TIMESTAMP,
    data.NAME,
    data.EMAIL,
    data.SUBJECT,
    data.MESSAGE
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Save the script (Ctrl+S)
4. Click `Deploy` → `New Deployment`
5. Choose type: `Web app`
6. Set execute as: `Me`
7. Set access: `Anyone`
8. Click `Deploy`
9. Copy the Web App URL

### Step 3: Update Your Website
1. Open `script.js`
2. Find this line:
   ```javascript
   const scriptURL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE` with your actual Web App URL

## 📊 Where to Find Your Data

### Google Sheets Dashboard
- **Location**: Your Google Sheet will contain all form submissions
- **Columns**: Timestamp, Name, Email, Subject, Message
- **Real-time**: New submissions appear immediately
- **Export**: You can download as Excel, CSV, or PDF

### Data Structure
Each form submission creates a new row with:
- **Timestamp**: When the form was submitted
- **Name**: User's full name
- **Email**: User's email address
- **Subject**: Message subject line
- **Message**: Full message content

## 🔧 Alternative Options

### Option 1: Email Integration
If you prefer email notifications, you can modify the Apps Script to send emails:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = e.parameter;
  
  // Add to sheet
  sheet.appendRow([data.TIMESTAMP, data.NAME, data.EMAIL, data.SUBJECT, data.MESSAGE]);
  
  // Send email notification
  MailApp.sendEmail({
    to: 'cyounus212@gmail.com',
    subject: 'New Portfolio Contact: ' + data.SUBJECT,
    body: `New message from ${data.NAME} (${data.EMAIL}):\n\n${data.MESSAGE}`
  });
  
  return ContentService.createTextOutput(JSON.stringify({result: "success"}));
}
```

### Option 2: Webhook Integration
You can also integrate with services like:
- **Zapier**: Connect to 5000+ apps
- **Netlify Forms**: Built-in form handling
- **Formspree**: Simple form backend service

## 🛡️ Security Notes
- The Google Apps Script runs under your Google account
- Form data is stored in your private Google Sheet
- Only you have access to the responses
- Consider adding spam protection for production use

## 📞 Current Status
- ✅ Form is ready and styled
- ⚠️ Google Sheets integration needs configuration
- 📧 Fallback: Users can email you directly at cyounus212@gmail.com
