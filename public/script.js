let socket =io()

let security=1;


function encrypt(data)
{let ans="";
  for(let i=0;i<data.length;i++)
  {
     if(data[i]>='a' && data[i]<'z')
      {ans+= data[i].toUpperCase()
      }
     else if(data[i]>='A' && data[i]<='Z')
     {
         ans+=data[i].toLowerCase()
     }
     else
     {
         ans+=data[i];
     }
     
  }
  return ans;
}

function et(temp)
{
    let ans="";
  for(let i=0;i<temp.length;i++)
  {
     if(temp[i]>='A' && temp[i]<'Z')
      {ans+= temp[i].toLowerCase()
      }
     else if(temp[i]>='a' && temp[i]<='z')
     {
         ans+=temp[i].toUpperCase()
     }
     else
     {
         ans+=temp[i];
     }
     
  }
  return ans;
}




$('#clear').click(()=>[

    $('#list').empty()
])









$('#loginbox').show()
$('#chatbox').hide()

$('#startbtn').click(()=>{

    socket.emit('start',{
        username: $('#uname').val(),
        password:$('#pass').val()
    })

})

socket.on('f',()=>{
    window.alert('wrong password')
})

socket.on('logged_in',()=>{
    document.getElementById("loginbox").style.visibility="COLLAPSE"
   // $('#loginbox').hide()
$('#chatbox').show()
})





$('#sendbtn').click(()=>{

let ans=$('#inpmsg').val()
ans=btoa(ans)

console.log('the base64 is',ans)


let data=encrypt(ans)


socket.emit('msgsend',{
    to:$('#rname').val(),
    message:data//$('#inpmsg').val()
})
/*let p=document.createElement('li')
p.innerText=data

let b=document.createElement('button')
b.innerText='encrypt'


function chan(){
    let data=p.innerText;
    data=et(data);
    data=atob(data)

    console.log(data)
    p.innerText=data;
}

b.setAttribute('onclick','chan();'); // for FF
   b.onclick = function() {chan();}; // for IE


$('#list').append(p).append(b)*/

})




socket.on('msent',(data)=>{

    let n= data.code;
    console.log('the code coming is ',data.code)
    let inp1=document.createElement('input')
    inp1.setAttribute("id","i")
    inp1.style.marginLeft="433px";


    let p=document.createElement('div')
    p.innerText=data.m
    p.style.textAlign="right";
    p.setAttribute("id","dee")


let b=document.createElement('button')
b.innerText='encrypt';
b.setAttribute("class","btn btn-primary")


let d=document.createElement('button')
d.innerText='Delete';
b.setAttribute("class","btn btn-primary")


function change3(){

    p.remove()
    inp1.remove()
    b.remove()
    d.remove()
}




d.setAttribute('onclick','change3();'); // for FF
   d.onclick = function() {change3();}; // for IE
d.setAttribute("class","btn btn-outline-primary")

function chan(){
    //inp1.style.marginLeft="403px";
   
let k=document.getElementById('i').value
  console.log('the value of inp1 is ',k)
  if(n==k)
  {

    let data=p.innerText;
    data=et(data);
    data=atob(data)

    console.log(data)

    p.innerText=data;
    
    p.style.textAlign="right";
    b.remove()
    inp1.remove()
    d.style.marginLeft="696px"
    
    
  }
}

b.setAttribute('onclick','chan();'); // for FF
   b.onclick = function() {chan();}; // for IE


$('#list').append(p).append(inp1).append(b).append(d)




})













socket.on('msgrevert',(data)=>{


  





    let btn=document.createElement('button')
    btn.innerText="button"
    btn.setAttribute("id","pb")
    btn.setAttribute("type","submit")
    btn.setAttribute("class","btn btn-primary")
   btn.setAttribute('onclick','change();'); // for FF
   btn.onclick = function() {change();}; // for IE


   






  let a=data.senderid
  console.log(a)



   let li=document.createElement('div')
   li.innerText= data.message+'from :' + data.from 

   li.style.textAlign="left"
 

/* let btn=document.createElement('button')
 btn.innerText="button"
 btn.setAttribute("id","pb")
 btn.setAttribute("type","submit")
 */
 let inp=document.createElement('input')
 inp.setAttribute("id","s")
 
 //$('#list').append(inp).append(btn).append(li);



 let d=document.createElement('button')
 d.innerText='Delete';
 d.setAttribute("class","btn btn-outline-primary")
 
 function change3(){
 
     li.remove()
     inp.remove()
     btn.remove()
     d.remove()
 }
 
 
 
 
 d.setAttribute('onclick','change3();'); // for FF
    d.onclick = function() {change3();}; // for IE

function change(){


        let x = document.getElementById('s').value
        console.log(x)
         
    if(a==x){
    
        data.message=et(data.message)
        data.message=atob(data.message)
        li.innerText= data.message + '    from :' + data.from
        btn.remove();
        inp.remove();
}
//btn.remove();
//inp.remove();


    }
    $('#list').append(li).append(inp).append(btn).append(d);
  



 





   // $('#list').append(`<li>
  //  <input type="text" disabled id="showout">
    
   // $('#showout').val()=${data.message} </li>`)
    
    
})

























/*let boombtn=document.getElementById('boom')
boombtn.onclick=function(){
    socket.emit('hello')
}

socket.on('whizz',()=>{
    let div=document.createElement('div');
    div.innerText='whizz'
    document.body.appendChild(div)
})*/


//we have learned few things from our boom and whizz that is for making a call
//socket.emit('name of call')is used and for reciveing and performing something 
//over that call will be done useing socket.on('name of call',()=>{})