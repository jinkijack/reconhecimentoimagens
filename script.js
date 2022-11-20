function previewImage() {
    var image = document.querySelector("input[name=image]").files[0];
    var preview = document.querySelector("img");
    var reader = new FileReader();
    reader.onloadend = () => {
      preview.src = reader.result;
    };

    if (image) {
      reader.readAsDataURL(image);
      console.log(image);
      document.getElementById("location-src").innerText = image.name;
    } else {
      preview.src = "";
    }
  }
  function useWebcam() {
    camera_on = !camera_on;

    if (camera_on) {
        init();
        document.getElementById("webcam").innerHTML = "Close Webcam";
    }
    else {
        stopWebcam();
        document.getElementById("webcam").innerHTML = "Start Webcam";
    }
}

async function stopWebcam() {
    await webcam.stop();
    document.getElementById("webcam-container").removeChild(webcam.canvas);
    labelContainer.removeChild(newlabel);
}
  // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/BKhZTiYFL/";

    let model, webcam, labelContainer, maxPredictions,canvas,camera_on = false,newlabel;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        predict();
        document.getElementById("location-src").innerText = "Clique aqui para enviar a figura";
    }

    async function loop() {
        await predict();
    }

    // run the webcam image through the image model
    async function predict() {

        const predictions = await model.predict(
            document.getElementById("preview")
          );
          
          //busca o maior valor probabilistico da classificação de uma imagem
          var max = predictions.reduce(function (prev, current) {
            return prev.probability > current.probability ? prev : current;
          });

          document.getElementById("label-container").innerHTML = max.className;
          console.log(max.className);
    }