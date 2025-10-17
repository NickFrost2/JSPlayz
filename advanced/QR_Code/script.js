document.addEventListener('DOMContentLoaded', () => {

   const userInput = document.getElementById('user-input');
   const canvas = document.getElementById('canvas');
   const heads = document.querySelectorAll('.editor-head');
   const imageInput = document.getElementById('user-image');
   const preferWidth = document.getElementById('width');
   const preferHeight = document.getElementById('height');
   const downloadBtn = document.getElementById('downloadBtn');
   const downloadFormat = document.getElementById('downloadFormat');

   const dotStyle = document.getElementById('dot-style');
   const dotSingleColor = document.getElementById('dotSingleColor');

   const cornerSquareStyle = document.getElementById('cornerSquare-style');
   const cornerSquareSingleColor = document.getElementById('cornerSquareSingleColor');

   const cornerDotStyle = document.getElementById('cornerDotStyle');
   const cornerDotSingleColor = document.getElementById('cornerDotSingleColor');

   const backgroundStyle = document.getElementById('backgroundStyle');
   const backgroundSingleColor = document.getElementById('backgroundSingleColor');

   dotSingleColor.addEventListener('input', () => {
      qrCode.update({
         dotsOptions: {
            gradient: {
               type: "linear",
               rotation: 0,
               colorStops: [
                  {
                     offset: 0, color: dotSingleColor.value,
                  },
                  { offset: 1, color: dotSingleColor.value, }
               ]
            }
         }
      })
   })

   cornerSquareSingleColor.addEventListener('input', () => {
      qrCode.update({
         cornersSquareOptions: {
            // color: dotSingleColor.value,
            gradient: {
               type: "linear",
               rotation: 0,
               colorStops: [
                  {
                     offset: 0, color: cornerSquareSingleColor.value,
                  },
                  { offset: 1, color: cornerSquareSingleColor.value, }
               ]
            }
         }
      })
   })

   cornerDotSingleColor.addEventListener('input', () => {
      qrCode.update({
         cornersDotOptions: {
            gradient: {
               type: "linear",
               rotation: 0,
               colorStops: [
                  {
                     offset: 0, color: cornerDotSingleColor.value,
                  },
                  { offset: 1, color: cornerDotSingleColor.value, }
               ]
            }
         }
      })
   })

   backgroundSingleColor.addEventListener('input', () => {
      qrCode.update({
         backgroundOptions: {
            gradient: {
               type: "linear",
               rotation: 0,
               colorStops: [
                  {
                     offset: 0, color: backgroundSingleColor.value,
                  },
                  { offset: 1, color: backgroundSingleColor.value, }
               ]
            }
         }
      })
   })

   const dotColorType = document.getElementById('dotColorType');
   dotColorType.addEventListener('change', () => toggle("dot"));

   const cornerSquareColorType = document.getElementById('cornerSquareColorType');
   cornerSquareColorType.addEventListener('change', () => toggle("cornerSquare"));

   const cornerDotColorType = document.getElementById('cornerDotColorType');
   cornerDotColorType.addEventListener('change', () => toggle("cornerDot"));

   const backgroundColorType = document.getElementById('backgroundColorType');
   backgroundColorType.addEventListener('change', () => toggle("background"));

   const dotGradientColorContainer = document.getElementById('dotGradientColorContainer');
   const dotGradientColorInput = dotGradientColorContainer.querySelectorAll('input');

   const cornerSquareGradientColorContainer = document.getElementById('cornerSquareGradientColorContainer');
   const cornerSquareGradientColorInput = cornerSquareGradientColorContainer.querySelectorAll('input');

   const cornerDotGradientColorContainer = document.getElementById('cornerDotGradientColorContainer');
   const cornerDotGradientColorInput = cornerDotGradientColorContainer.querySelectorAll('input');

   const backgroundGradientColorContainer = document.getElementById('backgroundGradientColorContainer');
   const backgroundGradientColorInput = backgroundGradientColorContainer.querySelectorAll('input');

   dotGradientColorInput.forEach(input => {
      input.addEventListener('input', () => {
         generateGradient('dot')
      })
   })

   cornerSquareGradientColorInput.forEach(input => {
      input.addEventListener('input', () => {
         generateGradient('cornerSquare')
      })
   })

   cornerDotGradientColorInput.forEach(input => {
      input.addEventListener('input', () => {
         generateGradient('cornerDot')
      })
   })

   backgroundGradientColorInput.forEach(input => {
      input.addEventListener('input', () => {
         generateGradient('background')
      })
   })

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
   function generateGradient(mode) {
      const container = document.getElementById(`${mode}GradientColorContainer`);
      const selectedMode = container.querySelector(`input[name="${mode}GradientType"]:checked`).value;
      const rotation = container.querySelector(`#${mode}Rotation`).value;
      const color1 = container.querySelector(`#${mode}FromGradientColor`).value;
      const color2 = container.querySelector(`#${mode}ToGradientColor`).value;

      const QRChange = container.dataset.option;

      const background = {
         type: selectedMode,
         rotation: parseInt(rotation) || 0,
         colorStops: [
            {
               offset: 0, color: color1
            },
            { offset: 1, color: color2 }
         ]
      }

      const updateObject = {};

      updateObject[QRChange] = {
         gradient: background
      };

      qrCode.update(updateObject);
   }

   function toggle(mode) {
      console.log('it click');
      const selectedOption = document.getElementById(`${mode}ColorType`).value;
      const singleColorContainer = document.getElementById(`${mode}SingleColorContainer`);
      const gradientColorContainer = document.getElementById(`${mode}GradientColorContainer`);

      if (selectedOption === `${mode}Single`) {
         singleColorContainer.classList.remove('hidden');
         gradientColorContainer.classList.add('hidden');
      }
      if (selectedOption === `${mode}Gradient`) {
         singleColorContainer.classList.add('hidden');
         gradientColorContainer.classList.remove('hidden');
      }
   };

   const qrCode = new QRCodeStyling({
      width: preferWidth.value,
      height: preferHeight.value,
      type: "canvas",
      data: userInput.value,
      margin: 50,
      image: selectedImageDataUrl,
      dotsOptions: {
         type: dotStyle.value,
         // color: dotSingleColor.value,
         gradient: {
            type: "linear",
            rotation: 0,
            colorStops: [
               {
                  offset: 0, color: dotSingleColor.value
               },
               { offset: 1, color: dotSingleColor.value }
            ]
         }
      },
      backgroundOptions: {
         color: "#ffffff",
         // gradient: {
         //    type: "radial",
         //    rotation: 0,
         //    colorStops: [
         //       {
         //          offset: 0, color: 'blue'
         //       },
         //       { offset: 1, color: 'red' }
         //    ]
         // }
      },
      imageOptions: {
         crossOrigin: "anonymous",
         margin: 20,
         hideBackgroundDots: true,
         imageSize: 0.25,
      },
      qrOptions: {
         typeNumber: 0,
         errorCorrectionLevel: 'Q'
      },
      cornersSquareOptions: {
         // type: undefined,
         gradient: {
            type: "linear",
            rotation: 0,
            colorStops: [
               {
                  offset: 0, color: dotSingleColor.value
               },
               { offset: 1, color: dotSingleColor.value }
            ]
         },
         cornersDotOptions: {
            // type: undefined,
            // color: "#ff0000ff",
            // gradient: {
            //    type: "radial",
            //    rotation: 0,
            //    colorStops: [
            //       {
            //          offset: 0, color: 'blue'
            //       },
            //       { offset: 1, color: 'red' }
            //    ]
            // }
         }
      }
   });

   qrCode.append(canvas);

   dotStyle.addEventListener('input', () => qrCode.update({
      dotsOptions: {
         type: dotStyle.value,
      }
   }));

   cornerSquareStyle.addEventListener('input', function cornerSquareStyleUpdate() {
      let style;
      if (cornerSquareStyle.value === 'none') {
         style = undefined;
      }

      else {
         style = cornerSquareStyle.value;
      }
      qrCode.update({
         cornersSquareOptions: {
            type: style,
         }
      })
   });

   cornerDotStyle.addEventListener('input', function cornerDotStyleUpdate() {
      let style;
      if (cornerDotStyle.value === 'none') {
         style = undefined;
      }

      else {
         style = cornerDotStyle.value;
      }
      qrCode.update({
         cornersDotOptions: {
            type: style,
         }
      })
   });

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

})