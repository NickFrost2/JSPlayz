const text = document.getElementById('text');
const canvas = document.getElementById('canvas');
const btn = document.getElementById('button');
const heads = document.querySelectorAll('.section-head');


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
   data: text.value,
   image: "../../assets/images/JSPlayz_Logo.png",
   dotsOptions: {
      color: "#001014",
      type: "classy",
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

text.addEventListener('input', update);

function update() {
   qrCode.update({
      data: text.value
   });
   console.log(text.value)
}

update();