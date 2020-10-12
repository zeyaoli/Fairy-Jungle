const canvas = document.getElementById("fairy-canvas");
const ctx = canvas.getContext("2d");

const imgSize = 1600;

let style = getComputedStyle(document.body);
let lightPurpleColor = style.getPropertyValue("--light-purple-color");
let darkPurpleColor = style.getPropertyValue("--dark-purple-color");

function render() {
  ctx.clearRect(0, 0, imgSize, imgSize);
  Array.from(document.getElementsByClassName("fairy-img")).forEach((img) => {
    if (img.classList.contains("default")) {
      img.classList.add("display");
    }
    if (img.classList.contains("display")) {
      ctx.drawImage(img, 0, 0, imgSize, imgSize);
    }
  });
}

function reset() {
  Array.from(document.getElementsByClassName("fairy-img")).forEach((img) => {
    // console.log(img);
    if (img.classList.contains("display")) {
      img.classList.remove("display");
      resetStyle();
    }
    if (img.classList.contains("default")) {
      img.classList.add("display");
    }
  });
  render();
}

function resetStyle() {
  document.querySelectorAll(".option").forEach((item) => {
    item.style.backgroundColor = "";
    item.style.border = "";
  });
}

// toggle that applies to fairies or decorations
function toggleMultipleItems(e) {
  // const optionValue = e.srcElement.innerHTML.toLowerCase();
  const optionValue = e.target.id;
  const category = e.target.classList[1];
  console.log(e.srcElement);
  //   console.log(e.srcElement.classList[1]);
  const imgItem = document.getElementById(`${category}-${optionValue}`);
  if (!imgItem.classList.contains("display")) {
    imgItem.classList.add("display");
    render();
    e.srcElement.style.backgroundColor = lightPurpleColor;
    e.srcElement.style.border = `3px solid ${darkPurpleColor}`;

    // console.log(document.getElementById(`fairy-${optionValue}`));
  } else {
    imgItem.classList.remove("display");
    e.srcElement.style.backgroundColor = "";
    e.srcElement.style.border = ``;
    render();
  }
  //   console.log(document.getElementById(`${category}-${optionValue}`));
}
// replace the item with another one
function removeCategoryImg(category) {
  document.querySelectorAll(`img.${category}`).forEach((item) => {
    // console.log(item);
    item.classList.remove("display");
  });

  document.querySelectorAll(`.option.${category}`).forEach((item) => {
    item.style.backgroundColor = "";
    item.style.border = "";
  });
}
//toggle single asset - if an asset gets selected, remove the rest from the same category
function toggleSingleItem(e) {
  // const optionValue = e.srcElement.innerHTML.toLowerCase();
  const optionValue = e.target.id;
  const category = e.target.classList[1];
  console.log(e.target);
  const imgItem = document.getElementById(`${category}-${optionValue}`);
  //   console.log(imgItem);

  if (!imgItem.classList.contains("display")) {
    removeCategoryImg(category);
    imgItem.classList.add("display");
    render();
    e.srcElement.style.backgroundColor = lightPurpleColor;
    e.srcElement.style.border = `3px solid ${darkPurpleColor}`;
  } else {
    removeCategoryImg(category);
    imgItem.classList.remove("display");
    render();
    e.srcElement.style.backgroundColor = "";
    e.srcElement.style.border = "";
  }
  console.log(imgItem);
}

// Save Image
var save = document.getElementById("saveimage");
save.addEventListener("click", function () {
  canvas.toBlob(function (blob) {
    saveAs(blob, "fairy-jungle.png");
  });
});

document.querySelectorAll(".option.multi").forEach((item) => {
  item.addEventListener("click", toggleMultipleItems);
});

document.querySelectorAll(".option.single").forEach((item) => {
  item.addEventListener("click", toggleSingleItem);
});

document.getElementById("reset").addEventListener("click", reset);

window.addEventListener("load", render);
