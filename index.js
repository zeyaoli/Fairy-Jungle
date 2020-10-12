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
    // console.log(item.querySelector("circle"));
    item.querySelector("circle").style.stroke = ``;
    item.querySelector("circle").style.strokeWidth = ``;
  });
}

// toggle that applies to fairies or decorations
function toggleMultipleItems(e) {
  // const optionValue = e.srcElement.innerHTML.toLowerCase();
  const optionValue = e.target.id;
  const category = e.target.classList[1];
  // console.log(e.srcElement);
  //   console.log(e.srcElement.classList[1]);
  // console.log(e.target.querySelector("circle"));
  const imgItem = document.getElementById(`${category}-${optionValue}`);
  if (!imgItem.classList.contains("display")) {
    imgItem.classList.add("display");
    render();
    e.target.querySelector("circle").style.stroke = `${darkPurpleColor}`;
    e.target.querySelector("circle").style.strokeWidth = `3`;

    // console.log(document.getElementById(`fairy-${optionValue}`));
  } else {
    imgItem.classList.remove("display");
    e.target.querySelector("circle").style.stroke = ``;
    e.target.querySelector("circle").style.strokeWidth = ``;
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
    item.querySelector("circle").style.stroke = ``;
    item.querySelector("circle").style.strokeWidth = ``;
  });
}
//toggle single asset - if an asset gets selected, remove the rest from the same category
function toggleSingleItem(e) {
  // const optionValue = e.srcElement.innerHTML.toLowerCase();
  const optionValue = e.target.id;
  const category = e.target.classList[1];
  // console.log(e.target);
  const imgItem = document.getElementById(`${category}-${optionValue}`);
  const imgRock = document.getElementById("rock");
  //   console.log(imgItem);

  if (!imgItem.classList.contains("display")) {
    removeCategoryImg(category);
    imgItem.classList.add("display");
    imgRock.classList.remove("default");
    render();
    e.target.querySelector("circle").style.stroke = `${darkPurpleColor}`;
    e.target.querySelector("circle").style.strokeWidth = `3`;
  } else {
    removeCategoryImg(category);
    imgItem.classList.remove("display");
    imgRock.classList.add("default");
    render();
    e.target.querySelector("circle").style.stroke = ``;
    e.target.querySelector("circle").style.strokeWidth = ``;
  }
  // console.log(imgItem);
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
