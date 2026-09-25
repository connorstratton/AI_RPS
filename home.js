    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "./model/";

    let model, webcam, labelContainer, maxPredictions;
    let wins = 0;
    let losses = 0;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(300, 300, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("computer-choice").style.marginLeft = "75px";

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }

        document.getElementById("start-button").outerHTML = '<button id="new-button" type="button" class="ourButton" onclick="play()">Play</button>'
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);

        let tempPrediction;
        let tempMaxNum = 0;
        let tempIndex

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;

            if (prediction[i].probability > tempMaxNum){  
                tempMaxNum = prediction[i].probability;
                tempPrediction = classPrediction;
                tempIndex = i;
            }
        }

        labelContainer.childNodes[tempIndex].innerHTML = `<b>${tempPrediction}</b>`
        
    }

    async function play(){
        webcam.pause();
        const prediction = await model.predict(webcam.canvas);


        let max = 0;
        let maxClass;

        for (let k = 0; k < maxPredictions; k++)
        {
            if (prediction[k].probability > max)
            {
                max = prediction[k].probability.toFixed(2);
                maxClass = prediction[k].className;
            }
        }

        rps(maxClass)

        document.getElementById("record").innerHTML = `Record: ${wins}-${losses}`;

        webcam.play();
    }

    async function rps(selection)
    {
        let compChoiceInt = Math.floor(Math.random() * 3);
        let compChoice;

        switch (compChoiceInt){
            case 0:
                compChoice = "Rock";
                document.getElementById("computer-choice").src = rockHand;
                document.getElementById("computer-choice").style.marginLeft = "75px";
                break;
            case 1:
                compChoice = "Paper";
                document.getElementById("computer-choice").src = paperHand;
                document.getElementById("computer-choice").style.marginLeft = "75px";
                break;
            default:
                compChoice = "Scissors";
                document.getElementById("computer-choice").src = scissorsHand;
                document.getElementById("computer-choice").style.marginLeft = "75px";
                break;
        }

        if (selection === compChoice)
        {
            document.getElementById("bg").style.backgroundColor = "white";
            document.getElementById("results").innerHTML = `<br>Round Result:<br><h2 class="tie">TIE</h2><br>You - <b>${selection}</b><br>Computer - <b>${compChoice}</b><br>`;
        }
        else if ((selection === "Rock" && compChoiceInt == 2) || (selection === "Paper" && compChoiceInt == 0) || (selection === "Scissors" && compChoiceInt == 1))
        {
            wins++;
            document.getElementById("results").innerHTML = `<br>Round Result:<br><h2 class="win">WIN</h2><br>You - <b>${selection}</b><br>Computer - <b>${compChoice}</b><br>`;
            document.getElementById("bg").style.backgroundColor = "#b9ffb3";
        }
        else{
            losses++;
            document.getElementById("bg").style.backgroundColor = "#f7afabff";
            document.getElementById("results").innerHTML = `<br>Round Result:<br><h2 class="loss">LOSS</h2><br>You - <b>${selection}</b><br>Computer - <b>${compChoice}</b><br>`;
        }
    }
