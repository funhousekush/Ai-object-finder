status = "";
value = "";
function preload(){}

function setup()
{
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(300, 300);
}
function start()
{
    objectdetection = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("statuss").innerHTML = "Status : Detecting objects";
    value = document.getElementById("Texty_inputty").value;
}
function modelLoaded()
{
    console.log("model Has loaded");
    status = true;
}
function draw()
{
    image(video, 0 , 0 , 300, 300);
}