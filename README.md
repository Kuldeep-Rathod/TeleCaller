# TeleCaller - Open Source Telecalling CRM

TeleCaller is an open-source telecalling CRM designed to streamline contact management and follow-ups. It consists of a **frontend (TeleCaller)** built with React and a **backend (TeleBackend)** using Node.js and Express.

## 📂 Project Structure

```
TeleCaller/       # Frontend (React + Vite)
TeleBackend/      # Backend (Node.js + Express)
```

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Kuldeep-Rathod/TeleCaller.git
cd TeleCaller
```

### 2️⃣ Install Dependencies

#### Frontend (TeleCaller)

```sh
cd TeleCaller
npm install
```

#### Backend (TeleBackend)

```sh
cd TeleBackend
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file inside **TeleBackend/** and add:

```
PORT=4000
GOOGLE_SCRIPT_URL=<YOUR_GOOGLE_SCRIPT_URL>
```

Create a `.env` file inside **TeleCaller/** and add:

```
VITE_GOOGLE_SHEET_NAME=testing
VITE_GOOGLE_SHEET_ID=<YOUR_SHEET_ID>
VITE_GOOGLE_API_KEY=<YOUR_API_KEY>
VITE_PROXY_SERVER=http://localhost:4000/proxy
```

### 4️⃣ Run the Project

#### Start Backend Server

```sh
cd TeleBackend
npm run dev  # Runs server with nodemon
```

#### Start Frontend

```sh
cd TeleCaller
npm run dev  # Runs React app
```

## 📡 Deployment

### Backend Deployment (Render)

1. Push code to GitHub.
2. Create a new **Web Service** on [Render](https://render.com/).
3. Set the **Build Command:**
   ```sh
   npm install
   ```
4. Set the **Start Command:**
   ```sh
   npm start
   ```
5. Add environment variables in Render settings.
6. Deploy!

### Frontend Deployment (Vercel/Netlify)

#### Vercel:

```sh
npm install -g vercel
vercel
```

#### Netlify:

```sh
npm install -g netlify-cli
netlify deploy
```

## 📜 Google Apps Script (Backend)

Use this script in **Google Apps Script** to connect the Google Sheet:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById("<YOUR_SHEET_ID>").getSheetByName("testing");
    const data = JSON.parse(e.postData.contents);
    const id = data.id;
    const values = sheet.getDataRange().getValues();
    let foundRow = -1;

    for (let i = 1; i < values.length; i++) {
        if (values[i][0] == id) {
            foundRow = i + 1;
            break;
        }
    }

    if (foundRow !== -1) {
        sheet.getRange(foundRow, 5).setValue(data.description);
        sheet.getRange(foundRow, 6).setValue(data.dateTime);
        return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Entry updated successfully" })).setMimeType(ContentService.MimeType.JSON);
    } else {
        return ContentService.createTextOutput(JSON.stringify({ success: false, message: "ID not found in the sheet" })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 📊 Google Sheet Format

| ID | Name  | Contact      | Email                                      | Description | DateTime             |
| -- | ----- | ------------ | ------------------------------------------ | ----------- | -------------------- |
| 1  | John  | +91123123123 | [john@email.com](mailto\:john@email.com)   | Testing     | 2025-03-01T10:22:07Z |
| 2  | Alice | +91999807463 | [alice@email.com](mailto\:alice@email.com) | Hello Alice | 2025-03-01T10:25:43Z |
| 3  | Bob   | +91123123123 | [bob@email.com](mailto\:bob@email.com)     | Follow-up   | 2025-03-22T09:30:00Z |

## 🛠 Technologies Used

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, Google Apps Script
- **Database:** Google Sheets

## 📩 Contributing

Contributions are welcome! Feel free to fork, modify, and submit PRs.

## 📄 License

This project is open-source and available under the **MIT License**.



