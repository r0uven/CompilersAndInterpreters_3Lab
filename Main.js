const Expression = document.getElementById("Expression");
let FirstBracket = undefined
let SecondBracket = undefined
let ObjectForTree = new ObjectMoi();
let ExpressionTemp =[];
const ArifmeticAlphabet = '*/-+'
let LeftDrawpointX;
let RightDrawpointX = [];
let LeftDrawpointY = 45;
let RightDrawpointY = []
let Level = 0

function FindBrackets(){
    FirstBracket = undefined
    SecondBracket = undefined
    for (let i = 0; i < ExpressionTemp.length; i++) {
        if(ExpressionTemp[i]==')')
        {
            SecondBracket =i;
            while(ExpressionTemp[i]!='(')
            {
                i--;
            }
            FirstBracket = i;
            return;
        }
    }
}

function ObjectFormation(){
    FindBrackets()
    IndexOfObject = undefined
    let ObjectFormationOut = new ObjectMoi()
    if(FirstBracket != undefined && SecondBracket != undefined)// Если скобки есть
    {
        for (let i = 0; i < ArifmeticAlphabet.length; i=i+2) {
            for (let j = FirstBracket+1; j < SecondBracket; j++) {
                if(ArifmeticAlphabet[i]==ExpressionTemp[j]||ArifmeticAlphabet[i+1]==ExpressionTemp[j]){
                    if(SecondBracket-FirstBracket-1!=3)
                    {
                        ObjectFormationOut.LeftIdentificator = ExpressionTemp[j-1];//Удаление операций типа a+b, a*b и т.д. 
                        ObjectFormationOut.ArifmeticOperation = ExpressionTemp[j];
                        ObjectFormationOut.RightIdentificator = ExpressionTemp[j+1];
                        switch(true)
                        {
                            case  typeof(ExpressionTemp[j-1]) != "string" && typeof(ExpressionTemp[j+1]) != "string":
                                ObjectFormationOut.StringOfState = ExpressionTemp[j-1].StringOfState + ExpressionTemp[j] + ExpressionTemp[j+1].StringOfState;
                                break;
                            case  typeof(ExpressionTemp[j-1]) != "string" && typeof(ExpressionTemp[j+1]) == "string":
                                ObjectFormationOut.StringOfState = ExpressionTemp[j-1].StringOfState + ExpressionTemp[j] + ExpressionTemp[j+1];
                                break;
                            case  typeof(ExpressionTemp[j-1]) == "string" && typeof(ExpressionTemp[j+1]) != "string":
                                ObjectFormationOut.StringOfState = ExpressionTemp[j-1] + ExpressionTemp[j] + ExpressionTemp[j+1].StringOfState;
                                break;
                            case  typeof(ExpressionTemp[j-1]) == "string" && typeof(ExpressionTemp[j+1]) == "string":
                                ObjectFormationOut.StringOfState = ExpressionTemp[j-1] + ExpressionTemp[j] + ExpressionTemp[j+1];
                                break;
                        }
                        IndexOfObject = j-1;
                        ExpressionTemp[j-1] = ObjectFormationOut
                        ExpressionTemp.splice(j, 2)
                        SecondBracket -= 2
                    }
                    else
                    {
                        ObjectFormationOut.LeftIdentificator = ExpressionTemp[FirstBracket+1]; //Удаение скобки
                        ObjectFormationOut.ArifmeticOperation = ExpressionTemp[FirstBracket+2];
                        ObjectFormationOut.RightIdentificator = ExpressionTemp[FirstBracket+3];
                        
                        switch(true)
                        {
                            case  typeof(ExpressionTemp[FirstBracket+1]) != "string" && typeof(ExpressionTemp[FirstBracket+3]) != "string":
                                ObjectFormationOut.StringOfState = "(" + ExpressionTemp[FirstBracket+1].StringOfState + ExpressionTemp[FirstBracket+2] + ExpressionTemp[FirstBracket+3].StringOfState +")";
                                break;
                            case  typeof(ExpressionTemp[FirstBracket+1]) != "string" && typeof(ExpressionTemp[FirstBracket+3]) == "string":
                                ObjectFormationOut.StringOfState = "(" + ExpressionTemp[FirstBracket+1].StringOfState + ExpressionTemp[FirstBracket+3] + ExpressionTemp[FirstBracket+3] +")";
                                break;
                            case  typeof(ExpressionTemp[FirstBracket+1]) == "string" && typeof(ExpressionTemp[FirstBracket+3]) != "string":
                                ObjectFormationOut.StringOfState = "(" + ExpressionTemp[FirstBracket+1] + ExpressionTemp[FirstBracket+2] + ExpressionTemp[FirstBracket+3].StringOfState +")";
                                break;
                            case  typeof(ExpressionTemp[FirstBracket+1]) == "string" && typeof(ExpressionTemp[FirstBracket+3]) == "string":
                                ObjectFormationOut.StringOfState = "(" + ExpressionTemp[FirstBracket+1] + ExpressionTemp[FirstBracket+2] + ExpressionTemp[FirstBracket+3] +")";
                                break;
                        }
                        ExpressionTemp[FirstBracket] = ObjectFormationOut
                        ExpressionTemp.splice(FirstBracket+1, 4)
                    }
                    return;
                }
            }
        }
    }
    else{   //Если скобки не оказалось
        for (let i = 0; i < ArifmeticAlphabet.length; i=i+2) {
            for (let j = 0; j < ExpressionTemp.length; j++) {
                if(ArifmeticAlphabet[i]==ExpressionTemp[j]||ArifmeticAlphabet[i+1]==ExpressionTemp[j]){
                    ObjectFormationOut.LeftIdentificator = ExpressionTemp[j-1];
                    ObjectFormationOut.ArifmeticOperation = ExpressionTemp[j];
                    ObjectFormationOut.RightIdentificator = ExpressionTemp[j+1];
                    switch(true)
                    {
                        case  typeof(ExpressionTemp[j-1]) != "string" && typeof(ExpressionTemp[j+1]) != "string":
                            ObjectFormationOut.StringOfState =ExpressionTemp[j-1].StringOfState + ExpressionTemp[j] + ExpressionTemp[j+1].StringOfState;
                            break;
                        case  typeof(ExpressionTemp[j-1]) != "string" && typeof(ExpressionTemp[j+1]) == "string":
                            ObjectFormationOut.StringOfState =ExpressionTemp[j-1].StringOfState + ExpressionTemp[j] + ExpressionTemp[j+1];
                            break;
                        case  typeof(ExpressionTemp[j-1]) == "string" && typeof(ExpressionTemp[j+1]) != "string":
                            ObjectFormationOut.StringOfState = ExpressionTemp[j-1] + ExpressionTemp[j] + ExpressionTemp[j+1].StringOfState;
                            break;
                        case  typeof(ExpressionTemp[j-1]) == "string" && typeof(ExpressionTemp[j+1]) == "string":
                            ObjectFormationOut.StringOfState = ExpressionTemp[j-1] + ExpressionTemp[j] + ExpressionTemp[j+1];
                            break;
                    }
                    IndexOfObject = j-1;
                    ExpressionTemp[j-1] = ObjectFormationOut
                    ExpressionTemp.splice(j, 2)
                    return;
                }
            }
        }
    }
}

function ObjectMoi(Left, Arifm, Right, State){
    this.LeftIdentificator = Left;
    this.ArifmeticOperation = Arifm;
    this.RightIdentificator = Right;
    this.StringOfState = State;
}


function draw(Expression, ArifmeticOperation, NextLeftStatePosition, NextRightStatePosition,  DrawPointX, DrawPointY, IsLeaf = false) {
    let canvas = document.getElementById('Tree');
    if (canvas.getContext){
        let ctx = canvas.getContext('2d');
        ctx.font = "25px serif";
        LeftX = DrawPointX
        LeftY = DrawPointY
        RightX = DrawPointX
        RightY = DrawPointY
        ctx.beginPath();
        let NextLeftText = ctx.measureText(NextLeftStatePosition)
        let NextRightText = ctx.measureText(NextRightStatePosition)
        let text = ctx.measureText(Expression)
        ctx.fillText(Expression, DrawPointX, DrawPointY)
        if(!IsLeaf)
        {
            ctx.fillText(ArifmeticOperation, DrawPointX + text.width/2-6, DrawPointY+128)
            Level++
            ctx.moveTo(LeftX+text.width/8,LeftY+10);
            LeftX = LeftX-40
            LeftDrawpointX = LeftX - NextLeftText.width/2
            LeftY = LeftY+105
            LeftDrawpointY = LeftY + 20
            ctx.lineTo(LeftX,LeftY);
    
            ctx.moveTo(RightX+text.width-text.width/8,RightY+10);
            RightX = RightX+text.width+40
            RightDrawpointX[Level] = RightX - NextRightText.width/2
            RightY = RightY+105
            RightDrawpointY[Level] = RightY + 20
            ctx.lineTo(RightX,RightY);
    
            ctx.stroke();
        }
    }
}

function ObjectDischarge(Obj, NextLeftState, NextRightState, CenterOfStateX, CenterOfStateY){

    switch(true)
    {
        case typeof(NextLeftState) != "string" && typeof(NextRightState) != "string":
            draw(Obj.StringOfState, Obj.ArifmeticOperation, NextLeftState.StringOfState, NextRightState.StringOfState, CenterOfStateX, CenterOfStateY)
            break;
        case typeof(NextLeftState) == "string" && typeof(NextRightState) != "string":
            draw(Obj.StringOfState, Obj.ArifmeticOperation, NextLeftState, NextRightState.StringOfState, CenterOfStateX, CenterOfStateY)
            break;
        case typeof(NextLeftState) != "string" && typeof(NextRightState) == "string":
            draw(Obj.StringOfState, Obj.ArifmeticOperation, NextLeftState.StringOfState, NextRightState, CenterOfStateX, CenterOfStateY)
            break;
        case typeof(NextLeftState) == "string" && typeof(NextRightState) == "string":
            draw(Obj.StringOfState, Obj.ArifmeticOperation, NextLeftState, NextRightState, CenterOfStateX, CenterOfStateY)
            break;
    }
    

    if(typeof(Obj.LeftIdentificator) != "string"){
        ObjectDischarge(Obj.LeftIdentificator, Obj.LeftIdentificator.LeftIdentificator, Obj.LeftIdentificator.RightIdentificator, LeftDrawpointX, LeftDrawpointY)
    }
    else{
        draw(Obj.LeftIdentificator, Obj.ArifmeticOperation, undefined, undefined, LeftDrawpointX, LeftDrawpointY, true)
    }
    if(typeof(Obj.RightIdentificator) != "string"){
        ObjectDischarge(Obj.RightIdentificator, Obj.RightIdentificator.LeftIdentificator, Obj.RightIdentificator.RightIdentificator, RightDrawpointX[Level], RightDrawpointY[Level])
    }
    else{
        draw(Obj.RightIdentificator, Obj.ArifmeticOperation, undefined, undefined, RightDrawpointX[Level], RightDrawpointY[Level], true)
    }
    Level--
    return
}


document.querySelector("#Process").onclick = function(){
    let canvas = document.getElementById('Tree');
    canvas.width = window.innerWidth - 300;
    canvas.height = window.innerHeight;
    LeftDrawpointX = canvas.width/2;
    
    // // Event handler to resize the canvas when the document view is changed
    // window.addEventListener('resize', resizeCanvas, false);
    
    // function resizeCanvas() {
    //     canvas.width = window.innerWidth - 300;
    //     canvas.height = window.innerHeight;
    //     // Redraw everything after resizing the window
    //     drawStuff(); 
    // }
    // resizeCanvas();
    
    if(ExpressionTemp.length == 0)
    {
        ExpressionTemp = Expression.value;
        ExpressionTemp = ExpressionTemp.replaceAll(' ', '')
        ExpressionTemp = ExpressionTemp.replaceAll('⋅', '*')
        ExpressionTemp = ExpressionTemp.replaceAll(':', '/')
        ExpressionTemp = ExpressionTemp.replaceAll('−', '-')
        Expression.value = ExpressionTemp
        ExpressionTemp = Array.from(ExpressionTemp);
    }
    while (ExpressionTemp.length !=1) {
        if(ExpressionTemp.length ==3)
        {
            ObjectForTree.LeftIdentificator = ExpressionTemp[0]
            ObjectForTree.ArifmeticOperation = ExpressionTemp[1]
            ObjectForTree.RightIdentificator = ExpressionTemp[2]
            ObjectForTree.StringOfState = Expression.value;
            ExpressionTemp.length = 1;
        }
        else
        {
            ObjectFormation()
        }
    }
    ObjectDischarge(ObjectForTree, ObjectForTree.LeftIdentificator, ObjectForTree.RightIdentificator, LeftDrawpointX, LeftDrawpointY)
}