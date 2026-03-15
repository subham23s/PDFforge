const dropZone    = document.getElementById('drop-zone');
const fileInput   = document.getElementById('file-input');
const fileList    = document.getElementById('file-list');
const convertBtn  = document.getElementById('convert-btn');
const progressWrap = document.getElementById('progress-wrap');
const progressBar  = document.getElementById('progress-bar');

let files = [];

const ALLOWED = ['txt','md','html','htm','png','jpg','jpeg','gif','bmp','webp','tiff','docx','xlsx','csv','pdf'];

function formatSize(bytes) {
  if (bytes < 1024)             return bytes + ' B';
  if (bytes < 1024 * 1024)      return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getExt(name) {
  return name.split('.').pop().toUpperCase();
}

function addFiles(newFiles) {
  for (const f of newFiles) {
    const ext = f.name.split('.').pop().toLowerCase();
    if (!ALLOWED.includes(ext)) {
      alert(`File type .${ext} is not supported.`);
      continue;
    }
    files.push({ file: f, status: 'pending', url: null, id: Date.now() + Math.random() });
  }
  renderList();
  convertBtn.disabled = files.length === 0;
}

function renderList() {
  fileList.innerHTML = '';
  files.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = `file-item ${item.status}`;
    div.id = `item-${item.id}`;

    let statusHtml = '';
    if (item.status === 'pending') {
      statusHtml = `<span class="file-status pending">⏳ Ready</span>`;
    } else if (item.status === 'processing') {
      statusHtml = `<span class="file-status processing"><span class="spinner"></span> Converting...</span>`;
    } else if (item.status === 'success') {
      const pdfName = item.file.name.replace(/\.[^.]+$/, '') + '.pdf';
      statusHtml = `<a class="download-btn" href="${item.url}" download="${pdfName}">⬇ Download PDF</a>`;
    } else if (item.status === 'error') {
      statusHtml = `<span class="file-status error">✗ ${item.error || 'Failed'}</span>`;
    }

    div.innerHTML = `
      <div class="file-ext">${getExt(item.file.name)}</div>
      <div class="file-info">
        <div class="file-name">${item.file.name}</div>
        <div class="file-meta">${formatSize(item.file.size)}</div>
      </div>
      ${statusHtml}
      <button class="remove-btn" onclick="removeFile(${i})">×</button>
    `;
    fileList.appendChild(div);
  });
}

function removeFile(idx) {
  files.splice(idx, 1);
  renderList();
  convertBtn.disabled = files.length === 0;
}

async function convertAll() {
  convertBtn.disabled = true;
  progressWrap.style.display = 'block';
  let done = 0;

  for (let i = 0; i < files.length; i++) {
    if (files[i].status === 'success') { done++; continue; }
    files[i].status = 'processing';
    renderList();

    try {
      const fd = new FormData();
      fd.append('file', files[i].file);
      const res = await fetch('/convert', { method: 'POST', body: fd });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Server error');
      }
      const blob = await res.blob();
      files[i].url = URL.createObjectURL(blob);
      files[i].status = 'success';
    } catch (e) {
      files[i].status = 'error';
      files[i].error = e.message;
    }

    done++;
    progressBar.style.width = (done / files.length * 100) + '%';
    renderList();
  }

  convertBtn.disabled = false;
  convertBtn.textContent = '✓ All Done — Convert More?';
}

// Drag & Drop
dropZone.addEventListener('dragover',  e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', ()  => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  addFiles([...e.dataTransfer.files]);
});
dropZone.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') fileInput.click();
});
fileInput.addEventListener('change', () => {
  addFiles([...fileInput.files]);
  fileInput.value = '';
});