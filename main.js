status = "";
object=[];
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
    if(status != "")
    {
        objectdetection.detect(video, gotresults);
        for(i=0; i<object.length; i++)
        {
            document.getElementById("statuss").innerHTML = "Objects Detected"
            percent = floor(object[i].confidence * 100);
            object_name = text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            fill(255, 0, 109);
            noFill();
            stroke(255, 0, 109);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label == value)
            {
                video.stop();
                objectdetection.detect(gotresults);
                document.getElementById("detected").innerHTML = value + " Is found";
                synth = window.speechSynthesis;
                var utter_this = new SpeechSynthesisUtterance("Object mentioned found");
                synth.speak(utter_this);
            }
            else
            {
                video.stop();
                objectdetection.detect(gotresults);
                document.getElementById("detected").innerHTML = value + " Is not found";
                synth = window.speechSynthesis;
                var utter_this = new SpeechSynthesisUtterance("Object mentioned not found");
                synth.speak(utter_this);
            }
        }
    }
}
function gotresults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        object = results;
    }
}