# Teachable Machine Rock Paper Scissors

### Year: 2024

## Overview

This project was created for a Python Machine Learning camp I taught at [theCoderSchool](https://www.thecoderschool.com/), and allows you to play rock, paper, scissors against the randomly-selecting computer through the webcam. Simply make the rock, paper, or scissors hand gesture in front of your webcam, and a trained machine learning model will recognize your selection. Then press the play button to run a turn of the game. The model (`model.json` + weight files) was trained using [Teachable Machine's](https://teachablemachine.withgoogle.com/) image classifier. Students were able to take many images of themselves doing the hand signs for rock, paper, and scissors, and experiment with what lighting, positions, and other modifications gave the most accurate results.

## Demo

[Click here to try](https://connorstratton.github.io/AI_RPS/)

## Project structure

```text
AI_RPS/
├── model/
│   ├── model.json          # Teachable Machine model architecture
│   ├── metadata.json       # class labels
│   └── weights.bin         # trained model weights
├── images/
│   ├── aiHand.jpg          # default display image
│   ├── rockHand.jpg        # rock hand image
│   ├── paperHand.jpg       # paper hand image
│   └── scissorsHand.jpg    # scissors hand image
├── home.js                 # webcam setup, prediction loop, and game logic
├── style.css               # page styling
├── index.html              # main page
├── main.py                 # Flask setup (see notes on original structure)
└── README.md               # project info
```

## Setup if downloading

Since everything runs client-side, no installation is required.

1. Clone the repo
```bash
git clone https://github.com/connorstratton/AI_RPS.git
cd AI_RPS
```
2. Serve the folder locally (needed for the webcam/model fetch to work — opening `index.html` directly can cause browser restrictions)
```bash
python -m http.server 8000
```
3. Visit `http://localhost:8000` and click Start

## Notes on original structure

This project originally ran through a small Flask app (`main.py`) that just rendered the template and served static files — there was no actual server-side logic involved, so it was converted to a fully static site to run on GitHub Pages instead of requiring a running Python process.