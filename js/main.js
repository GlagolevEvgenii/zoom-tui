
const dateSelectElement = document.getElementById('date__select');
const zoomImages = document.querySelectorAll('.zoom__img');
let magnifiedImage = document.querySelector(".large__img");
const originalImage = document.querySelector(".zoom__img");
let originalImageWidth = originalImage.width;
let originalImageHeight = originalImage.height;

dateSelectElement.addEventListener('change', function() {
  const selectedDate = dateSelectElement.value;

  zoomImages.forEach((image) => {
    if (image.getAttribute('data-id') === selectedDate) {
      const zoomUrl = image.getAttribute('src').split("\\")
      image.style.display = 'block';
      magnifiedImage.style.background = `url(images/${zoomUrl[zoomUrl.length-1]}) no-repeat #ffffff`
    } else {
      image.style.display = 'none';
    }
  });
});


document.getElementById("zoom").addEventListener(
  "mousemove",
  function (e) {
    const magnifiedImageStyle = magnifiedImage.style;
    const mouseX = e.pageX - this.offsetLeft;
    const mouseY = e.pageY - this.offsetTop;
    let xPercent = (mouseX / originalImageWidth) * 100;
    let yPercent = (mouseY / originalImageHeight) * 100;

    if (mouseX > 0.01 * originalImageWidth) {
      xPercent += 0.15 * xPercent;
    }

    if (mouseY >= 0.01 * originalImageHeight) {
      yPercent += 0.15 * yPercent;
    }

    magnifiedImageStyle.backgroundPositionX = xPercent - 9 + "%";
    magnifiedImageStyle.backgroundPositionY = yPercent - 9 + "%";
    magnifiedImageStyle.left = mouseX - 69 + "px";
    magnifiedImageStyle.top = mouseY - 69 + "px";

    // Устанавливаем opacity в 1 при движении мыши
    magnifiedImageStyle.opacity = 1;
  },
  false
);

document.getElementById("zoom").addEventListener(
  "mouseout",
  function () {
    const magnifiedImageStyle = magnifiedImage.style;
    magnifiedImageStyle.opacity = 0;
  },
  false
);
