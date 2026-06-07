
///グローバル変数//////////////////////////
let inputField=document.getElementById("inputField");
let addButton=document.getElementById("addButton");
let taskList=document.getElementById("taskList");

let uncompletedList=[];
// let dropDown=document.getElementById("priority");
let sort_button=document.getElementById("sort");
let wholeContainer=document.querySelector(".wholeContainer");
let isThereTheHeader=false;
//completed tasklist↓↓//////
let visual_completed_ul=document.createElement("ul");
        // visual_completed_ul.classList.add("completed");
let completedList=[];
let completed_index=null;
let span_text=null;
let isThereCompletedList=false;
let former_index=null;
let current_index=null;

let clicked_index=null;

let uncompletedListContainer=document.querySelector(".uncompletedListContainer");
let completedListContainer=document.querySelector(".completedListContainer");
completedListContainer.classList.add("completedListContainer");
//ヘッダー生成↓↓
let completed_header =document.createElement("div");
completed_header.innerHTML="完了したタスク";
completed_header.classList.add("header");


let radio_buttons=Array.from(document.querySelectorAll("input[type='radio']"));



let yes_button=document.querySelector(".yes");
let no_button=document.querySelector(".no");
let reset_window=document.querySelector(".resetWindow");
let reset_open_button=document.querySelector(".reset");


function do_the_sequence(){
        //追加ボタンアニメーション///////
    addButton.classList.add('addButtonPushed');
    setTimeout(() => {
    addButton.classList.remove('addButtonPushed');
  }, 100); // matches your 0.1s-ish transition



        uncompletedListContainer.appendChild(taskList);

        let taskText=inputField.value.trim();
        if(!taskText){                  
        window.alert("タスクを入力してください！");
        }else{
        ///li/////////////////////////////
        let li =document.createElement("li");
        let span=document.createElement("span");
        li.classList.add("smoothGrowing");
          li.addEventListener('animationend', () => {
        li.classList.remove('smoothGrowing');
        });
        taskList.prepend(li);
        li.appendChild(span);
        //レシーブアニメーション/////
        // li.classList.add('receivingInCompletedList');
        // li.addEventListener('animationend', () => {
        // li.classList.remove('receivingInCompletedList');
        
        // })
                

        


        span.textContent=taskText;

        //ラジオボタンの値を取得↓↓/////
        let chosen_radio_button_value=document.querySelector("input[type='radio']:checked").value;

        ///配列に追加(プリペンド)///////////////
        uncompletedList.unshift({taskName:taskText,completed:false,priority:Number(chosen_radio_button_value),index:uncompletedList.length+1,id:Date.now()});
        console.log(uncompletedList);
        //liにdataset.idを追加↓↓//////////////
        li.dataset.id=uncompletedList[0].id;
        let id =Number(uncompletedList[0].id);

        //localStorageへ保存///////
        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
        console.log("chosen_radio.value is..."+chosen_radio_button_value);
        console.log(localStorage.getItem("savedUncompletedList"));
        
        let priorityValue=Number(chosen_radio_button_value);

        if(priorityValue===1){
                li.classList.add("priority1");
        }else if(priorityValue===2){
                li.classList.add("priority2");
        }else { 
                li.classList.add("priority3");
        }

///チェックボックス/////////


createCheckBox(li,span,id);

///編集ボタン/////////////

createEditButton(li,span,id);


       ///削除ボタン////////////////

createDeleteButton(li,id);


}

inputField.value="";
// chosen_radio_button_value="2";
// radio_buttons[1].checked=true;
inputField.removeAttribute("class");
inputField.classList.add("priority2");
        }


function createDeleteButton(li,id){
        let delButton=document.createElement("button");
        li.appendChild(delButton);
        delButton.innerHTML="削除";
        delButton.classList.add("li_button");

        delButton.addEventListener("click",(e)=>{//クリックハンドラ設置
                delButton.parentElement.classList.add("smoothDelete");
                //削除アニメーション↓↓////
                delButton.parentElement.addEventListener("animationend",()=>{
        
              
        
        let clicked_index=uncompletedList.findIndex((item)=>{
        return item.id===id
        });
        delButton.parentElement.remove();//liを削除
        console.log("del button clicked!");
        console.log("The clicked index is.."+clicked_index);
        if(clicked_index!==-1){
        uncompletedList.splice(clicked_index,1);//JS配列からアイテムを削除
        console.log("Current JS array")
        console.log(uncompletedList);//アイテムが配列から削除されたことを確認
        
        }
        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList))//localStorageを更新されたJS配列で上書き
        console.log("Current localStorage array");
        console.log(localStorage.getItem("savedUncompletedList"));


        console.log(JSON.parse(localStorage.getItem("savedUncompletedList")));
            
        cleaningItself();
})

})}


 function cleaningItself(){                                           
                                                       if(completedList.length===0){
                                                                completed_header.remove();
                                                                visual_completed_ul.remove();
                                                            };

                                                        if(uncompletedList.length===0){
                                                                taskList.innerHTML="";

                                                        }
                                                            }     



function createCompletedCheckBox(li,span,item,id){
                                let checkBox=document.createElement("input");
                                checkBox.type="checkbox";
                                checkBox.checked=true;
                                checkBox.dataset.id=item.id;
                                checkBox.classList.add("completed_checkBox");
                                li.prepend(checkBox);
                                span.classList.add("completed");
                                //イベントリスナー（アンチェック時）↓↓/////
                                checkBox.addEventListener("change",(e)=>{
                              
                                 
                                                let clicked_checkBox_id=Number(e.target.dataset.id);
                                                span_text=e.target.nextElementSibling.innerText//li のtaskNameを取得
                                                //completedList上のインデックス↓↓////
                                                completed_index= completedList.findIndex((item)=>{
                                                        return item.id===clicked_checkBox_id
                                                })
                                                //uncompletedList（前のリストでの）インデックス↓↓///
                                                former_index=completedList[completed_index].index;
                                                console.log("completed_index is..."+completed_index);        
                                                current_index=uncompletedList.findIndex((item)=>{
                                                        return item.index===former_index
                                                });
                                                console.log("current_index is..."+current_index);
                                                uncompletedList[current_index].completed=false;
                                               
                                                let li= document.createElement("li");
                                                let span=document.createElement("span");
                                                if(completedList[completed_index].priority===1){
                                                li.classList.add("priority1");
                                                }else if(completedList[completed_index].priority===2){
                                                        li.classList.add("priority2");
                                                }else if(completedList[completed_index].priority===3){
                                                        li.classList.add("priority3");
                                                }
                                              

                                                //チェックボックス生成↓↓////
                                                let id=completedList[completed_index].id;
                                                createCheckBox(li,span,id);
                                                li.appendChild(span);
                                                //編集ボタン生成↓↓/////
                                                createEditButton(li,span,id);
                                                //削除ボタン生成↓↓////
                                                createDeleteButton(li,id); 
                                                li.classList.add("smoothGrowing");
                                                li.addEventListener("animationend",()=>{
                                                        li.classList.remove("smoothGrowing");

                                                })
                                                taskList.appendChild(li);


                                                
                                                e.target.parentElement.classList.add("smoothDelete");
                                                e.target.parentElement.addEventListener("animationend",()=>{

                                                e.target.parentElement.remove();//liを視覚的に除去
                                                   completedList.splice(completed_index,1);
                                                localStorage.setItem("savedCompletedList",JSON.stringify(completedList));
                                                console.log("savedCompletedList is...");
                                                console.log(localStorage.getItem("savedCompletedList"));
                                                console.log("completedList is...");
                                                console.log(completedList);
                                                span.innerText=span_text;
                                                

                                               
                                                cleaningItself();


                                                localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList))
                                                },{ once: true })
                                        })
                                }


function createCompletedDelButton(li,span,id){
                                let delButton=document.createElement("button");
                                li.appendChild(delButton);
                                delButton.innerHTML="削除";
                                delButton.classList.add("li_button");
                                //クリックハンドラ設置↓↓/////////
                                delButton.addEventListener("click",(e)=>{
                                        delButton.parentElement.classList.add("smoothDelete");
                                        delButton.parentElement.addEventListener("animationend",()=>{
                                        
                                                
                                
                                        let clicked_index=uncompletedList.findIndex((item)=>{
                                        return item.id===id
                                        });
                                        let clicked_index2=completedList.findIndex((item)=>{
                                        return item.id===id
                                        });
                                        console.log("[CD]del button clicked!");
                                        console.log("[CD]The clicked index2 is.."+clicked_index2);
                                        
                                        if(clicked_index!==-1 &&clicked_index2!==-1){
                                        uncompletedList.splice(clicked_index,1);//uncompletedListからアイテムを削除
                                        console.log("uncompletedList")
                                        console.log(uncompletedList);//アイテムがuncompletedListから削除されたことを確認
                                        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList))//localStorageを更新されたJS配列で上書き
                                        console.log("Current localStorage array");
                                        console.log(localStorage.getItem("savedUncompletedList"));
                                        
                                        completedList.splice(clicked_index2,1);//completedListからアイテムを削除

                                        localStorage.setItem("savedCompletedList",JSON.stringify(completedList));//completedListをlocalStorageに保存
                                        console.log("savedCompletedList is...");
                                        //savedCompletedListを確認↓↓
                                        console.log(JSON.parse(localStorage.getItem("savedCompletedList")));
                                        delButton.parentElement.remove();//liを視覚的に削除
                                                }
                                        cleaningItself();

                                        });


                                })
                
                        }


function receiveAnimation(li,item){
             

                                //レシーブアニメーション/////
                                   li.classList.add('receivingInCompletedList');
                                li.addEventListener('animationend', () => {
                                li.classList.remove('receivingInCompletedList');
                                },{ once: true })
                                
}





function createCheckBox(li,span,id){
let checkBox=document.createElement("input");
checkBox.type="checkbox";
//チェックボックスにid付与↓↓////
checkBox.dataset.id=id;
li.prepend(checkBox);
        //チェックボックスにイベントリスナー↓↓/////
        checkBox.addEventListener("change",(e)=>{  
                span.classList.toggle("completed");
                let clicked_checkBox_id=Number(e.target.dataset.id);
                console.log("clicked_checkBox_id"+clicked_checkBox_id);

                clicked_index=uncompletedList.findIndex((item)=>{
                return item.id===clicked_checkBox_id
                });
                console.log("clicked_index is..."+clicked_index);
                //uncompletedListを更新↓↓
                uncompletedList[clicked_index].completed=!uncompletedList[clicked_index].completed?true:false;
                console.log("uncompletedList[clicked?index] is...");
                console.log(uncompletedList[clicked_index]);
                //localStorageへuncompletedListを保存↓↓
                localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
                console.log("uncompletedList is...");
                console.log(uncompletedList);
                //↓completedList生成
                completedList=uncompletedList.filter((item)=>{
                        return item.completed
                });
                console.log("completedList is...");
                console.log(completedList);
                //localStorageへcompletedListを保存↓↓
                localStorage.setItem("savedCompletedList",JSON.stringify(completedList));
                if(completedList.length>0){
                        
                        completedListContainer.prepend(completed_header);
                        

                        if(!isThereTheHeader){
                        completedListContainer.prepend(completed_header);
                        isThereTheHeader=true;
                        }
                         visual_completed_ul.innerHTML="";
                        completedList.forEach((item)=>{
                              
                               
                                
                               
                               
                                let li=document.createElement("li");
                                li.dataset.id=item.id;
                                let span=document.createElement("span");
                                span.innerHTML=item.taskName;
                                li.classList.add("borderTransparent");
                                if(Number(e.target.dataset.id)===item.id){
                                //スムーズアニメーション↓↓////
                                li.classList.add("smoothGrowing");
                                li.addEventListener('animationend', () => {
                                li.classList.remove('smoothGrowing');
                                });
                                }

                                 completedListContainer.appendChild(visual_completed_ul);
                                visual_completed_ul.appendChild(li);
                                li.appendChild(span);
                                
                    

                                //退去アニメーション/////
                                e.target.parentElement.classList.add('taskCompleted');
                                e.target.parentElement.addEventListener('animationend', () => {
                                e.target.parentElement.classList.remove('taskCompleted');
                                e.target.parentElement.remove();  //視覚的にuncompletedListから除去
                                })

                                //レシーブアニメーション/////
                                       if(item.index===uncompletedList[clicked_index].index){
                                receiveAnimation(li,item);
                                       }
                                //チェックボックス生成/////////
                                createCompletedCheckBox(li,span,item);
                                
                                //空ボタン生成////////////////
                                createEmptyButton(li)


                                //削除ボタン生成/////////////
                                createCompletedDelButton(li,span,item.id);
                                


                                




                        });
                       


    }else if(completedList.length===0){
        completed_header.remove();

    }

})

                
}

function createEditButton(li,span,id){
let editButton=document.createElement("button");
li.appendChild(editButton);
        editButton.innerHTML="編集";
        editButton.classList.add("li_button");
let input_to_be_swapped=document.createElement("input");
editButton.addEventListener("click",(e)=>{//クリックハンドラ設置
        console.log("edit button clicked!");
        let clicked_li_text=e.target.previousElementSibling.innerHTML
        console.log("clicked_li_text =...");
        console.log(clicked_li_text);
        let clicked_index=uncompletedList.findIndex((item)=>{
        return item.id===id
        });
        let clicked_li_span=e.target.previousElementSibling;
        input_to_be_swapped.value=clicked_li_text;
        clicked_li_span.replaceWith(input_to_be_swapped);
        

        let set_button=document.createElement("button");
        set_button.innerHTML="決定";
        set_button.addEventListener("click",(e)=>{
                let edited_value=input_to_be_swapped.value;
                clicked_li_span.innerHTML=edited_value;
                console.log("e.target.previousElementSibling is..."+e.target.previousElementSibling);
                e.target.previousElementSibling.replaceWith(clicked_li_span);
                set_button.replaceWith(editButton);
                uncompletedList[clicked_index].taskName=edited_value;
                localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
                console.log("current JSON is...");
                console.log(JSON.parse(localStorage.getItem("savedUncompletedList")));
        })

        editButton.replaceWith(set_button);

        console.log("The clicked index is.."+clicked_index);
        console.log("Current JS array")
        console.log(uncompletedList);//アイテムが配列から削除されたことを確認
        console.log("Current localStorage array");
        console.log(localStorage.getItem("savedUncompletedList"));


        console.log(JSON.parse(localStorage.getItem("savedUncompletedList")));
            
})}


radio_buttons.forEach((item)=>{

        item.addEventListener("change",(e)=>{
                inputField.removeAttribute("class");

        if(e.target.value==="1"){

                inputField.classList.add("priority1");
        }else if(e.target.value==="2"){

                inputField.classList.add("priority2")
        }else{
                inputField.classList.add("priority3")
        }

                
        })

})



function createEmptyButton(li){

             let emptyButton=document.createElement("button");
                                li.appendChild(emptyButton);
                                emptyButton.innerHTML="削除";
                                emptyButton.classList.add("li_button");
                                emptyButton.classList.add("visibilityHidden");

}



///Enterキーイベントリスナー//////////

window.addEventListener("keydown",(e)=>{
if(e.key=="Enter" && document.activeElement===inputField){
        do_the_sequence();
}
})




///整列ボタン//////////////////////

sort_button.addEventListener("click",()=>{
        uncompletedList.sort((a,b) =>{ return a.priority - b.priority});
        console.log("sort button clicked!");
        console.log(uncompletedList);
        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
        console.log(localStorage.getItem("savedUncompletedList"));
        taskList.innerHTML="";
        restoreState();
})






///タスク追加ボタン///////////////
addButton.addEventListener("click",()=>{
        
        do_the_sequence();


})


///セーブデータ復元////////////
restoreState()

function restoreState(){
let savedUncomp=localStorage.getItem("savedUncompletedList");
let savedComp=localStorage.getItem("savedCompletedList");


let restoredUncompletedListData=savedUncomp?JSON.parse(savedUncomp): [];//JSON.parseでJS配列に変換
let restoredCompletedListData=savedComp?JSON.parse(savedComp):[];







        uncompletedList=restoredUncompletedListData;//JS配列にrestoredUncompletedListDataを入れる　じゃないとリフレッシュすると空になってしまう
        completedList=restoredCompletedListData;
        console.log("uncompletedList=");
        console.log(uncompletedList);
         console.log("completedList=");
        console.log(completedList);
       
        cleaningItself()
       
       //uncompletedListを復元////////////////////
        restoredUncompletedListData.forEach((item,i)=>{
        if(item.completed){
                return
        }


        let id=item.id
        ///li////////////////////   
        let li=document.createElement("li");
        li.dataset.id=item.id;
        let span=document.createElement("span");
        span.textContent=item.taskName;
        li.appendChild(span);
        taskList.appendChild(li);
        if(item.priority===1){
                li.classList.add("priority1");
        }else if(item.priority===2){
                li.classList.add("priority2");
        }else{
                li.classList.add("priority3");
        };

        ///編集ボタン生成/////////////

        createEditButton(li,span,id);




        ///削除ボタン生成//////////
        createDeleteButton(li,id);


      ///チェックボックス生成////////
      
        createCheckBox(li,span,id);


        })

      


        //completedListを復元//////////

        //     もし復元したcompletedリストにアイテムが存在したら
          if(restoredCompletedListData.length>0 && !isThereTheHeader){
                        
                        

                
                      
                   
                        completedListContainer.prepend(completed_header);
                        //ヘッダーが存在する　にtrueをセット
                        isThereTheHeader=true;  
                        console.log("debug A")
                        
                }else if(restoredCompletedListData.length>0 && isThereTheHeader){
                         console.log("debug B")
                        return
                }
                else if(restoredCompletedListData.length===0){
                         console.log("debug C")
                        completed_header.remove();
                        isThereTheHeader=false;
                }else{
                        //ヘッダーを設置
                        completedListContainer.prepend(completed_header);
                        //ヘッダーが存在する　にtrueをセット
                        isThereTheHeader=true;  
                        console.log("debug A")

                }


        restoredCompletedListData.forEach((item,i)=>{

                        let id=item.id
                        let li=document.createElement("li");
                        li.dataset.id=id
                        let span=document.createElement("span");
                        span.innerHTML=item.taskName;
                                completedListContainer.appendChild(visual_completed_ul);
                        visual_completed_ul.appendChild(li);
                        li.appendChild(span);
                        li.classList.add("borderTransparent");
               
                        //チェックボックスを生成/////////////
                        createCompletedCheckBox(li,span,item,id);

                        //空ボタン生成////////////////
                        createEmptyButton(li)


                        //削除ボタンを生成//////////////////
                        createCompletedDelButton(li,span,id);








        })

}




function reset_option(){
reset_window.classList.remove("hide");
reset_window.classList.add("show");
reset_open_button.classList.add("hide");
yes_button.addEventListener("click",()=>{
uncompletedList=[];
localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
completedList=[];
localStorage.setItem("savedCompletedList",JSON.stringify(completedList));

restoreState();

reset_window.classList.add("hide");
reset_open_button.classList.remove("hide");

},{ once: true })


no_button.addEventListener("click",()=>{
reset_window.classList.add("hide");
reset_open_button.classList.remove("hide");
reset_open_button.classList.add("show");
},{ once: true });

}

reset_open_button.addEventListener("click",()=>{

reset_option()



});


