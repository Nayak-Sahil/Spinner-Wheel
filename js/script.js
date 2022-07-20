let selPlayGameBtn = document.getElementById("playBtn");

let selPopUpWindow = document.getElementById("spnWheelPopUpWindow");

let offersArr = ["20% off Amazon", "50rs cashback", "10% discount", "1000rs won", "1,00,000Lakh won", "Nothing", "another chanse", "1kg Gold"]

let selSpinnerWheelWrapper = document.getElementById("spinnerWheelWrapper");

// before we rotate the spinner wheel we fetch right location of wheel
// select right Location part of spinner wheel
var selRghtSpnWheelLoct;


// ----- for open the pop up window:
selPlayGameBtn.addEventListener("click", ()=>{
    let selGamerName = document.getElementById("playerNamer").value.trim();

    if(selGamerName.length != 0){
        selPopUpWindow.classList.add("show-pop-up-window-wrapper");
        console.log(selGamerName, selGamerName.length)

        let selPlayerTag = document.getElementById("playerName");

        selPlayerTag.innerHTML = selGamerName;

        // let's create the spinner triangle ---->
        let selSpinnerWheelWrapper = document.getElementById("spinnerWheelWrapper");

        // offerIndex for offersArray
        let offerIndex = 0;

        let degreeAngle = 0;
        for(let i=1; i<=8; i++){
            let triaShapeElem = document.createElement("div");
            triaShapeElem.className = `tria-${i}`;
            triaShapeElem.id = `tria${1}`;

            triaShapeElem.setAttribute("degree", degreeAngle);

            let creOfferPTag = document.createElement("p");
            creOfferPTag.style.transform = "rotate(270deg)";
            creOfferPTag.style.letterSpacing = "1.3px";
            creOfferPTag.id = i;
            if(creOfferPTag.id % 2 == 0){
                creOfferPTag.style.color = "white";
            }else{
                creOfferPTag.style.color = "var(--descrp)";
            }
            creOfferPTag.style.fontWeight = "bold";
            creOfferPTag.style.fontSize = "15px";

            creOfferPTag.innerHTML = offersArr[offerIndex];

            triaShapeElem.appendChild(creOfferPTag);
            selSpinnerWheelWrapper.appendChild(triaShapeElem);

            offerIndex++;
            degreeAngle += 45;
        }
    }
    selRghtSpnWheelLoct =  selSpinnerWheelWrapper.getBoundingClientRect().right;
    console.warn(selRghtSpnWheelLoct, selSpinnerWheelWrapper.getBoundingClientRect());
})

// for close the pop up window:

let selClosePopUpBtn = document.getElementById("closeBtn");

selClosePopUpBtn.addEventListener("click", ()=>{
    selPopUpWindow.classList.remove("show-pop-up-window-wrapper");
});


console.log(selRghtSpnWheelLoct, selSpinnerWheelWrapper.getBoundingClientRect().right);

// let's spin the wheel
let selSpnStartBtn = document.getElementById('spnBtnStart');


selSpnStartBtn.addEventListener("click", ()=>{

    let selSpinnerWheelWrapper = document.getElementById("spinnerWheelWrapper");

    selSpinnerWheelWrapper.removeAttribute("style");

    let creAngleArr = [90, 135, 180, 225, 270, 315, 360, 405, 450, 495, 540, 585];

    let rightAngleIndex = Math.floor((Math.random() * (parseInt(creAngleArr.length)))); // here (parseInt(creAngleArr.length)) for safty i used parseInt although there is no chance in string but though.

    // we can change the duration of spinning time.
    // from this following array
    let transitionArr = [1, 2, 3, 5, 4];

    let takeDiffSecond = Math.floor((Math.random() * (parseInt(transitionArr.length)))); // here (parseInt(transitionArr.length)) for safty i used parseInt

    let finalSecond;

    if(creAngleArr[rightAngleIndex] < 145){
        finalSecond = 2;
    }else{
        finalSecond = transitionArr[takeDiffSecond];
    }
    selSpinnerWheelWrapper.style.transition = `${finalSecond}s cubic-bezier(0.39, 0.58, 0.57, 1) 0s`;

    selSpinnerWheelWrapper.style.transform = `rotate(${creAngleArr[rightAngleIndex] + 360}deg)`;

    console.log(rightAngleIndex, selSpinnerWheelWrapper.style.transform, creAngleArr[rightAngleIndex]);

    // change the color of pointer
    let selPointerOfSpn = document.getElementById("pointerSpn");
    selPointerOfSpn.removeAttribute("style");
    selPointerOfSpn.style.animation = "";
    selPointerOfSpn.style.animation = "colorChange 2s ease-in-out";

    console.log(selRghtSpnWheelLoct);

    /* --------------- This is the actual calculation of finding the right portion of spinner wheel
    
        here, 5 is used because our angle is accurate with increment 45degree and our pointer of spinner is always will be stop at fixed point of triangle portion (almost nearest center).

        we override the value of selRghtSpnWheelLoct varible 

    */ 
    selRghtSpnWheelLoct =  selSpinnerWheelWrapper.getBoundingClientRect().right - 5;


    setTimeout(() => {
        let allTriaElemArr = Array.from(selSpinnerWheelWrapper.children);

        console.warn(selPointerOfSpn.getBoundingClientRect(), finalSecond, allTriaElemArr);

        let probabElemArr = [];
        let addElemIndex = 0;
        allTriaElemArr.forEach(element => {
            if(element.getBoundingClientRect().right >= selRghtSpnWheelLoct && element.getBoundingClientRect().right <= selPointerOfSpn.getBoundingClientRect().right && element.getBoundingClientRect().top <= selPointerOfSpn.getBoundingClientRect().top && element.getBoundingClientRect().bottom >= selPointerOfSpn.getBoundingClientRect().bottom){
                console.error(element.getBoundingClientRect().right, element, selRghtSpnWheelLoct);

                probabElemArr.splice(addElemIndex, 0, element)

                addElemIndex ++;
            }
        });
        console.log(probabElemArr);
        let selSpunTriaElem = findMinBottomTri(...probabElemArr);
        console.log(selSpunTriaElem);

        // now open the winner popup window
        let selWinnerPopUpWindow = document.getElementById("wonPopUpWindow");

        let winnerPopUpCloseBtn = document.getElementById("closeWonPop");

        winnerPopUpCloseBtn.addEventListener("click", ()=>{
            selWinnerPopUpWindow.classList.remove("show-won-pop-up-window");
        })

        let selWinnerResPrt = document.getElementById("winnerWrapperComp");
        let selWinnerMsgPrt = document.getElementById("winnerMsgPrt");
        setTimeout(() => {
            selWinnerPopUpWindow.classList.add("show-won-pop-up-window");
            console.warn("text", selSpunTriaElem.children[0].innerHTML)
            switch(selSpunTriaElem.children[0].innerHTML){
                case "1000rs won":
                    selWinnerResPrt.innerHTML = ` <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                    <lord-icon
                        src="https://cdn.lordicon.com/qnlcdeqi.json"
                        trigger="loop"
                        style="width:75px;height:75px">
                    </lord-icon>`;
                    selWinnerMsgPrt.innerHTML = "Congrat! You Won 1000Rs.";
                    break;

                case "1,00,000Lakh won":
                    selWinnerResPrt.innerHTML = ` <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                    <lord-icon
                        src="https://cdn.lordicon.com/gkstbnbz.json"
                        trigger="loop"
                        style="width:75px;height:75px">
                    </lord-icon>`;
                    selWinnerMsgPrt.innerHTML = "Congrat! You Won 1,00,000 Lakh.";
                    break;

                case "Nothing":
                    selWinnerResPrt.innerHTML = ` <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                    <lord-icon
                        src="https://cdn.lordicon.com/gzcbkoye.json"
                        trigger="loop"
                        style="width:75px;height:75px">
                    </lord-icon>`;
                    selWinnerMsgPrt.innerHTML = "Sorry, Bad Luck!";
                    break;

                case "another chanse":
                    selWinnerResPrt.innerHTML = ` <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                    <lord-icon
                        src="https://cdn.lordicon.com/ufhkbmmj.json"
                        trigger="loop"
                        colors="primary:#404040,secondary:#9ce5f4"
                        style="width:75px;height:75px">
                    </lord-icon>`;
                    selWinnerMsgPrt.innerHTML = "You will get an another chance!";
                    break;

                case "1kg Gold":
                    selWinnerResPrt.innerHTML = ` <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                    <lord-icon
                        src="https://cdn.lordicon.com/qmcsqnle.json"
                        trigger="loop"
                        style="width:75px;height:75px">
                    </lord-icon>`;
                    selWinnerMsgPrt.innerHTML = "Congrats! You won 1Kg Gold Coin!";
                    break;

                case "20% off Amazon":
                     selWinnerResPrt.innerHTML = ` <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                     <lord-icon
                         src="https://cdn.lordicon.com/ggihhudh.json"
                         trigger="loop"
                         style="width:75px;height:75px">
                     </lord-icon>`;
                    selWinnerMsgPrt.innerHTML = "Congrats! You will get 20% Off in Amazon Shopping App.";
                    break;

                case "50rs cashback":
                     selWinnerResPrt.innerHTML = ` <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                     <lord-icon
                         src="https://cdn.lordicon.com/zjjfergw.json"
                         trigger="loop"
                         style="width:75px;height:75px">
                     </lord-icon>`;
                    selWinnerMsgPrt.innerHTML = "Congrats! You will get 50rs.";
                    break;

                case "10% discount":
                     selWinnerResPrt.innerHTML = ` <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                     <lord-icon
                         src="https://cdn.lordicon.com/trxrghhv.json"
                         trigger="loop"
                         style="width:75px;height:75px">
                     </lord-icon>`;
                    selWinnerMsgPrt.innerHTML = "Congrats! You get an 10% discount on any Shopping app!";
                    break;

                default:
                    console.log("default called");
            }
        }, 1000);

    }, finalSecond + "000");
})

function findMinBottomTri(elem1, elem2, elem3){
    // this return those element whose has nearest to spinner pointer.
    if(parseInt(elem1.getBoundingClientRect().width) == parseInt(elem2.getBoundingClientRect().width)){
        return elem3;
    }else if(parseInt(elem1.getBoundingClientRect().width) == parseInt(elem3.getBoundingClientRect().width)){
        return elem2;
    }else{
        return elem1;
    }
}
