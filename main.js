song ="";
rightWristX=0;
scoreleftWrist=0;
scorerightWrist=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600 , 500);
    canvas.position(458,200);

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Posenet is successfully intialized")
}

function gotPoses(results){
    if (results.length>0)
    {
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("Score of right wrist"+scorerightWrist)
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("Score of left wrist = " + scoreleftWrist)
        console.log(results);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right Wrist X =" +rightWristX+"& right Wrist Y"+rightWristY);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left Wrist X =" +leftWristX+"& left Wrist Y"+leftWristY);
    }
}

function draw() {
    image(video, 0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scorerightWrist>0.2)
    {
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100 )
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        else if(rightWristY>100 && rightWristY<=200 )
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }

        else if(rightWristY>200 && rightWristY<=300 )
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightWristY>300 && rightWristY<=400 )
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }

        else if(rightWristY>400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }

        
    }
    if(scoreleftWrist>0.2)
    {

    circle(leftWristX , leftWristY , 20);
    InNumberleftWristY= Number(leftWristY);
    removeDecimal=floor(InNumberleftWristY);
    volume=removeDecimal/500;
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume);
    }
}

function Play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
    document.getElementById("lab").innerHTML = "Song is now playing";
}