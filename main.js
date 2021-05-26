img="";
status="";
objects=[];
function preload(){
    img=loadImage('https://i.postimg.cc/633PjKdx/living-room.jpg');
}
function setup(){
    canvas=createCanvas(380,400);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd').modelLoaded;
    document.getElementById("status").innerHTML="Status:Object Detected";
    video=createCapture(VIDEO);
    video.size(380,400);
    video.hide();
}
function draw(){
    image(video,0,0,380,400);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Object Detected";
            document.getElementById("Number_of_objects").innerHTML="Number of objects: "+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
}
function modelLoaded(){
    console.log("Coco SSD Boom!");
    status=true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}
console.log(objects);