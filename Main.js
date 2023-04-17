const Expression = document.getElementById("Expression");
let FirstBracket = undefined
let SecondBracket = undefined
let ObjectForTree = new ObjectMoi();
let ExpressionTemp =[];
const ArifmeticAlphabet = '*/-+'


function LeftOrRight(LeftOperator,RightOperator){
    if(ExpressionTemp[LeftOperator]=="*"||ExpressionTemp[LeftOperator]=="/")
    {
        return 1;//правый
    }
    else if(ExpressionTemp[LeftOperator]=="-"||ExpressionTemp[LeftOperator]=="+" && ExpressionTemp[RightOperator]=="/"||ExpressionTemp[RightOperator]=="*")
    {
        let test1 = ExpressionTemp[LeftOperator]=="-"||ExpressionTemp[LeftOperator]=="+" 
        let test2 = ExpressionTemp[RightOperator]=="/"||ExpressionTemp[RightOperator]=="*"
        let test3 = test1 && test2
        return 2;//левый
    }
    else if(ExpressionTemp[LeftOperator] == "(")
    {
        return 3;//левый
    }
    else
    {
        return 4 // Всегда правый
    }
}

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
        for (let i = 0; i < ArifmeticAlphabet.length; i+2) {
            for (let j = FirstBracket+1; j < SecondBracket; j++) {
                if(ArifmeticAlphabet[i]==ExpressionTemp[j]||ArifmeticAlphabet[i+1]==ExpressionTemp[j]){
                    ObjectFormationOut.LeftIdentificator = ExpressionTemp[j-1];//Удаление операций типа a+b, a*b и т.д. 
                    ObjectFormationOut.ArifmeticOperation = ExpressionTemp[j];
                    ObjectFormationOut.RightIdentificator = ExpressionTemp[j+1];
                    i = 5;
                    if(SecondBracket-FirstBracket!=3)
                    {
                        IndexOfObject = j-1;
                        ExpressionTemp[j-1] = ObjectFormationOut
                        ExpressionTemp.splice(j, 2)
                        SecondBracket -= 2
                        switch(LeftOrRight(j-2,j+2))
                        {
                            case 1:
                                ObjectForTree.RightIdentificator = ObjectFormationOut;
                                break;
                            case 2:
                                ObjectForTree.LeftIdentificator = ObjectFormationOut;
                                break;
                            case 3:
                                ObjectForTree.LeftIdentificator = ObjectFormationOut;
                                break;
                            case 4:
                                ObjectForTree.RightIdentificator = ObjectFormationOut;
                                break;
                        }
                    }
                    else
                    {
                        ObjectFormationOut.LeftIdentificator = ExpressionTemp[FirstBracket+1]; //Удаение скобки
                        ObjectFormationOut.ArifmeticOperation = ExpressionTemp[FirstBracket+2];
                        ObjectFormationOut.RightIdentificator = ExpressionTemp[FirstBracket+3];
                        ExpressionTemp[FirstBracket] = ObjectFormationOut
                        ExpressionTemp.splice(FirstBracket+1, 4)//
                        switch(LeftOrRight(FirstBracket-1,SecondBracket+1))
                        {
                            case 1:
                                ObjectForTree.RightIdentificator = ObjectFormationOut;
                                break;
                            case 2:
                                ObjectForTree.LeftIdentificator = ObjectFormationOut;
                                break;
                            case 3:
                                ObjectForTree.LeftIdentificator = ObjectFormationOut;
                                break;
                            case 4:
                                ObjectForTree.RightIdentificator = ObjectFormationOut;
                                break;
                        }
                    }
                }
            }
        }
        
    }
    else{   //Если скобки не оказалось
        for (let i = 0; i < ArifmeticAlphabet.length; i+2) {
            for (let j = 0; j < ExpressionTemp.length; j++) {
                if(ArifmeticAlphabet[i]==ExpressionTemp[j]||ArifmeticAlphabet[i+1]==ExpressionTemp[j]){
                    ObjectFormationOut.LeftIdentificator = ExpressionTemp[j-1];
                    ObjectFormationOut.ArifmeticOperation = ExpressionTemp[j];
                    ObjectFormationOut.RightIdentificator = ExpressionTemp[j+1];
                    i = 5;
                    IndexOfObject = j-1;
                    ExpressionTemp[j-1] = ObjectFormationOut
                    ExpressionTemp.splice(j, 2)
                    switch(LeftOrRight(j-2,j+2))
                    {
                        case 1:
                            ObjectForTree.RightIdentificator = ObjectFormationOut;
                            break;
                        case 2:
                            ObjectForTree.LeftIdentificator = ObjectFormationOut;
                            break;
                        case 3:
                            ObjectForTree.LeftIdentificator = ObjectFormationOut;
                            break;
                        case 4:
                            ObjectForTree.RightIdentificator = ObjectFormationOut;
                            break;
                    }
                }
            }
        }
    }
}

function ObjectMoi(Left, Arifm, Right){
    this.LeftIdentificator = Left;
    this.ArifmeticOperation = Arifm;
    this.RightIdentificator = Right;
    // this.Str = ObjectMoi()
}

document.querySelector("#Process").onclick = function(){
    if(ExpressionTemp.length == 0)
    {
        ExpressionTemp = Expression.value;
        ExpressionTemp = ExpressionTemp.replaceAll(' ', '')
        ExpressionTemp = ExpressionTemp.replaceAll('⋅', '*')
        ExpressionTemp = ExpressionTemp.replaceAll(':', '/')
        ExpressionTemp = ExpressionTemp.replaceAll('−', '-')
        ExpressionTemp = Array.from(ExpressionTemp);
    }
    while (ExpressionTemp.length !=1) {
        ObjectFormation()
    }
    
    //console.log(kas.Str)
}