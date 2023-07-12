var mainDiv = document.getElementById("mainDiv");
var text, color1, update;

document.getElementById("btn1").onclick = function(){
      var select = document.getElementById("select1").value;
      var color= document.getElementById("favcolor").value;
      var content = document.getElementById("content").value;
      var context = document.createElement(select);
      

      context.innerHTML = content;
      context.style.color = color;

      document.body.appendChild(context);
      document.getElementById("content").value  = "";
      document.getElementById("favcolor").value= '#000000';
      document.getElementById("select1").value ="h1";

        color.value = color;
    
        context.onclick = function(){
            document.body.removeChild(mainDiv);
            var edit = document.createElement("button");
            var delete1 = document.createElement("button");
            
      
            document.body.appendChild(edit);
            document.body.appendChild(delete1);
      
            edit.innerHTML = "EDIT";
            delete1.innerHTML = "DELETE";
            edit.onclick = function(){

                text = document.createElement("textarea");
                document.body.appendChild(text);
                color1= document.createElement("input");
                color1.setAttribute("type","color");
                document.body.appendChild(color1);
                color1.value=color;
                text.innerHTML =content;
                update = document.createElement("button");
                document.body.appendChild(update);
                update.innerHTML = "UPDATE";
    
                update.onclick = function(){
                    var updatedText = text.value;
                    context.innerHTML = updatedText;
                    var updatedColor=color1.value;
                    context.style.color = updatedColor;
                }
            }
            delete1.onclick = function(){
                document.body.removeChild(context);
                document.body.appendChild(mainDiv);
                document.body.removeChild(edit);
                document.body.removeChild(delete1);
                document.body.removeChild(color1);
                document.body.removeChild(text);
                document.body.removeChild(update);
                
                
                
            }
        }
        
     };