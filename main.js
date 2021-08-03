prediction1="";
prediction2="";
Webcam.set({
    width:350,height:350,image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">';
    });
}

console.log("ml5_version: ",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ItsvVeoa6/model.json",model_loaded());

function model_loaded(){
    console.log("model_loaded");
}

function speak(){
    var synth=window.SpeechSynthesis;
    speak_data1="First Predicton is : "+prediction1;
    speak_data2="and Second Predicton is : "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
if(error){
    console.error(error);    
}
else{
    console.log(results);
    document.getElementById("result-emotion-name").innerHTML=results[0].label;
    document.getElementById("result-emotion-name-2").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
if(results[0].label=="happy"){
    document.getElementById("update-emoji").innerHTML="&#128522";
} 
if(results[0].label=="sad"){
    document.getElementById("update-emoji").innerHTML="&#128532";
} 
if(results[0].label=="angry"){
    document.getElementById("update-emoji").innerHTML="&#128548";
} 
if(results[1].label=="happy"){
    document.getElementById("update-emoji-2").innerHTML="&#128522";
} 
if(results[1].label=="sad"){
    document.getElementById("update-emoji-2").innerHTML="&#128532";
} 
if(results[1].label=="angry"){
    document.getElementById("update-emoji-2").innerHTML="&#128548";
} 
}
}