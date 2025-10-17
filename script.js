const userInput = document.getElementById('user-input');
const canvas = document.getElementById('canvas');
const heads = document.querySelectorAll('.editor-head');
const imageInput = document.getElementById('user-image');
const preferWidth = document.getElementById('width');
const preferHeight = document.getElementById('height');
const downloadBtn = document.getElementById('downloadBtn');
const downloadFormat = document.getElementById('downloadFormat');
const dotStyle = document.getElementById('dot-style');
const dotColor = document.getElementById('dot-color');

dotColor.addEventListener('input', () => qrCode.update({
   dotsOptions: {
      color: dotColor.value,
   }
}));

let selectedImage = null;
let selectedImageDataUrl = null;

heads.forEach(head => {
   head.addEventListener('click', () => {
      const targetId = head.getAttribute('data-target');
      const targetDiv = document.getElementById(targetId);

      if (targetDiv) {
         targetDiv.classList.toggle('hidden');
      }
   });
});

const qrCode = new QRCodeStyling({
   width: 300,
   height: 300,
   type: "canvas",
   data: userInput.value,
   image: selectedImageDataUrl,
   dotsOptions: {
      color: "#001014",
      type: dotStyle.value,
   },
   backgroundOptions: {
      color: "#ffffff",
   },
   imageOptions: {
      crossOrigin: "anonymous",
      margin: 20
   },
   qrOptions: {
      typeNumber: 0,
      mode: '',
      errorCorrectionLevel: 'Q'
   }
});
qrCode.append(canvas);

dotStyle.addEventListener('input', () => qrCode.update({
   dotsOptions: {
      type: dotStyle.value,
   }
}));


userInput.addEventListener('input', () => qrCode.update({
   data: userInput.value,
}));

preferWidth.addEventListener('input', () => qrCode.update({
   width: preferWidth.value,
}));

preferHeight.addEventListener('input', () => qrCode.update({
   height: preferHeight.value,
}));

imageInput.addEventListener('change', validateFile);

document.getElementById('remove-image').addEventListener('click', () => {
   console.log('button click')
   imageInput.value = '';
   selectedImage = null;
   selectedImageDataUrl = null;
   qrCode.update({
      image: selectedImageDataUrl
   });
})

downloadBtn.addEventListener('click', () => {
   const format = downloadFormat.value;
   qrCode.download({ name: `QR Code Generator ${Math.floor(Math.random() * 10) + 1}`, extension: format });
})


function validateFile() {
   const maxSizeMB = 5;
   const maxSizeBytes = maxSizeMB * 1024 * 1024;

   if (imageInput.files.length === 0) {
      alert('Please select an image file.');
      return;
   }
   if (imageInput.files.length > 1) {
      alert('Only one file can be uploaded.');
      imageInput.value = '';
      return;
   }

   const file = imageInput.files[0];

   if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (e.g., JPG, PNG, GIF).');
      imageInput.value = '';
      return;
   }

   if (file.size > maxSizeBytes) {
      alert(`File size exceeds ${maxSizeMB}MB limit. Please select a smaller file.`);
      imageInput.value = '';
      return;
   }

   selectedImage = file;

   const reader = new FileReader();
   reader.onload = function (event) {
      const selectedImageDataUrl = event.target.result;

      qrCode.update({
         image: selectedImageDataUrl
      });
   };

   reader.onerror = function () {
      alert('Error reading file. Please try again.');
      imageInput.value = '';
      selectedImage = null;
      selectedImageDataUrl = null;
   };

   reader.readAsDataURL(file);
}