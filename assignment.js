let domReady = (function () {

  const domAnimal = {
    titleA: '.animal_name',
    imageA: '.animal_image-container',
    paragraphA: '.animal_paragraph',
    paragraphAC: '.animal_paragraph-continuation'
  };

  let animalArr = animals_data.category;

  const manipulateTemp = {
    valueSet: function (classHTML, valueData) {
      document.querySelector(classHTML).textContent = valueData;
    },
    cloneTemp: function (tempSelector) {
      let temp = document.querySelector(tempSelector).content;
      return temp.cloneNode(true);
    },
    cloneSecondary: function (cloneSec, animal) {
      cloneSec.querySelector(domAnimal.titleA).textContent = animal.name;
      cloneSec.querySelector(domAnimal.imageA).dataset.img1 = animal.image1;
      cloneSec.querySelector(domAnimal.imageA).style.backgroundImage = "url(\"" + animal.image1 + "\")";
      cloneSec.querySelector(domAnimal.imageA).dataset.img2 = animal.image2;
      let description = animal.description;
      cloneSec.querySelector(domAnimal.paragraphA).textContent = description.substring(0, 160) + "...";
      cloneSec.querySelector(domAnimal.paragraphAC).textContent = description.substring(160, description.length);
      return cloneSec;
    }
  };

  animalArr.forEach(species => {
    let clone = manipulateTemp.cloneTemp("#animal-class");
    clone.querySelector(".animal-class_name").textContent = species.name;

    let animals = species.animals;
    animals.forEach(animal => {
      let cloneSec = manipulateTemp.cloneTemp("#animal");
      cloneSec = manipulateTemp.cloneSecondary(cloneSec, animal);
      clone.querySelector(".animal-class_container").appendChild(cloneSec);
    })

    document.querySelector(".main_animals-container").appendChild(clone);
  })

  return 1;
})();

if (domReady == true) {


  let eventController = (function () {
    let assignEvent = {
      assignClick: function (selector, func) {
        let array = document.querySelectorAll(selector);

        array.forEach(el => {
          el.addEventListener("click", func);
        })
      }
    }

    return assignEvent;
  })();

  function assignEvents(arraySelectors, arrayFunctions) {
    for (let i = 0; i < arraySelectors.length; i++) {
      eventController.assignClick(arraySelectors[i], arrayFunctions[i]);
    }
  }

  assignEvents([".animal_paragraph", ".animal_left-arrow", ".animal_right-arrow"], [seeMore, moveLeft, moveRight]);

  function seeMore() {
    if (event.target.dataset.trigger === "false") {
      event.target.dataset.trigger = "true";
      let text1 = event.target.textContent;
      text1 = text1.substring(0, 160);
      let text2 = event.target.parentElement.querySelector(".animal_paragraph-continuation").textContent;
      event.target.textContent = text1 + text2;
    } else {
      event.target.dataset.trigger = "false";
      let text1 = event.target.textContent;
      event.target.textContent = text1.substring(0, 160) + "...";
    }
  }

  function moveLeft() {
    let image = event.target.parentElement.querySelector(".animal_image-container");
    image.style.backgroundImage = "url(\"" + image.dataset.img1 + "\")";
  }

  function moveRight() {
    let image = event.target.parentElement.querySelector(".animal_image-container");
    image.style.backgroundImage = "url(\"" + image.dataset.img2 + "\")";
  }
}