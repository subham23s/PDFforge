# ⚡ PDFforge — Convert Anything to PDF

A fast, lightweight, and private document-to-PDF converter built with **Flask** and **Python**.
No signup. No cloud uploads. Everything runs locally on your machine.

---

## 🚀 Features

- 📄 Convert multiple file formats to PDF in one click
- 🖼️ Image support — PNG, JPG, JPEG, GIF, BMP, WEBP, TIFF
- 📝 Document support — TXT, DOCX, XLSX, CSV, HTML, Markdown
- 📦 Batch conversion — upload multiple files at once
- 🔒 100% local — your files never leave your machine
- 🌐 Auto-opens in browser when you run it

---

## 📁 Project Structure

```
PDFforge/
├── app.py                  # Flask backend + conversion logic
├── templates/
│   └── index.html          # Frontend HTML
├── static/
│   ├── style.css           # Styling
│   └── main.js             # Frontend JavaScript
├── requirements.txt        # Dependencies
└── .gitignore
```

---

## 🛠️ Setup & Installation

**1. Clone the repository**
```bash
git clone https://github.com/subham23s/PDFforge.git
cd PDFforge
```

**2. Create and activate virtual environment**
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux / Mac
source venv/bin/activate
```

**3. Install dependencies**
```bash
pip install -r requirements.txt
```

**4. Run the app**
```bash
python app.py
```

The browser will **automatically open** at `http://127.0.0.1:5050`

---

## 📦 Supported Formats

| Format | Type |
|--------|------|
| `.txt` | Plain Text |
| `.md` | Markdown |
| `.html` / `.htm` | Web Page |
| `.docx` | Word Document |
| `.xlsx` | Excel Spreadsheet |
| `.csv` | CSV Data |
| `.png` / `.jpg` / `.jpeg` | Images |
| `.gif` / `.bmp` / `.webp` / `.tiff` | Images |
| `.pdf` | PDF (passthrough) |

---

## 🧰 Tech Stack

- **Backend** — Python, Flask
- **PDF Generation** — ReportLab
- **Document Parsing** — python-docx, openpyxl
- **Image Processing** — Pillow
- **Frontend** — HTML, CSS, Vanilla JavaScript

---

## 👤 Author

**Subham Mishra**  
B.Tech CSE (AI/ML) — Centurion University of Technology and Management  
[LinkedIn](https://linkedin.com/in/subhammishra23) · [GitHub](https://github.com/subham23s)
