let classifier;
let pred;

function setup() {
  canvas = createCanvas(400,400);
  background(128);

  classifier = ml5.imageClassifier('MobileNet', modelReady);

  canvas.drop(loadImgCanvas);

  pred = select("#prediction")

  container = select("#container");

  container.dragOver(activate);
  container.dragLeave(deactivate);

  container.drop(load_img, deactivate);
}

function modelReady() {
    console.log("Modelo Pronto.");
    select('#prediction').html('Modelo carregado! Pronto para classificar imagens.');
  }
  

function activate() {
  container.style('background-color', "#888")
}

function deactivate() {
  container.style('background-color', "#fff")
}

function load_img(file) {
    if (file.type === 'image') {
      createP(`${file.name} (${file.size} bytes)`);
      let img = createImg(file.data);
      img.size(200, 200);
    } else {
      createP("Formato incompatível. Por favor, arraste uma imagem.");
    }
  }
  

function loadImgCanvas(file) {
    loadImage(file.data, (img) => {
      resizeCanvas(500, img.height * 500 / img.width);
      image(img, 0, 0, width, height);
      // predict
      classifier.classify(img, classifierResult);
    });
  }

  function classifierResult(err, result) {
    if (err) {
      console.error("Erro ao classificar imagem:", err);
    } else {
      console.log(result);
      pred.html(`${result[0].label} - ${(result[0].confidence * 100).toFixed(2)}%`);
    }
  }
  