var firebaseConfig = {
    apiKey: "AIzaSyAsqjreo74U2_G1BaDJgo8mcjcHn_-U-W0",
    authDomain: "myapp-87545.firebaseapp.com",
    projectId: "myapp-87545",
    storageBucket: "myapp-87545.appspot.com",
    messagingSenderId: "781148574413",
    appId: "1:781148574413:web:3f281a82cbd4038992cf84"
  };
  firebase.initializeApp(firebaseConfig);
  var ref=firebase.database().ref().child("Students")
    function add(){
     let count=100;
    let k;
     ref.on('child_added',(snap)=>{
        if(snap.exists()){
        count++;
        k=snap.val().id
        }
        console.log(count+"--")
    })
    console.log(k+" "+count)
    let ids=100
    if(count==100)
        ids=100
    else
        ids=k+1
    var uname=document.getElementById("name").value
    var email=document.getElementById("email").value
    console.log(uname)
    if(uname=="" || email=="")
        alert("Fields cannot be Empty!!")
    else{
    ref.child(ids).set({
        id:ids,
        name:uname,
        email:email
    });
    document.getElementById("email").value="";
    document.getElementById("name").value="";
    loadUsers();
    }
}
function loadUsers(){
    document.getElementById("studentList").innerHTML=""
    let table=document.createElement("table");
    table.align="center";
    table.border="1";
     table.className="table-striped"
     let row=table.insertRow(-1)
    row.style.color="black"
    row.style.background="lightblue";
    row.style.fontSize="20px";
    row.align="center"
    sid=row.insertCell(-1);
    sname=row.insertCell(-1);
    email=row.insertCell(-1);
   operations=row.insertCell(-1);
     sid.innerHTML="EMPID"
   sname.innerHTML="NAME";
   sname.style.padding="10"
   sid.style.padding="10"
   email.innerHTML="DESIGNATION";
   operations.innerHTML="ACTION";
   ref.on('child_added',(snap)=>{
     row2=table.insertRow(-1)
    sid2=row2.insertCell(-1)
    sname2=row2.insertCell(-1)
    email2=row2.insertCell(-1)
    sid2.innerHTML=snap.val().id
    sname2.innerHTML=snap.val().name
    email2.innerHTML=snap.val().email
    operations2=row2.insertCell(-1)
    sid2.style.padding="10"
    sname2.style.padding="10"
    email2.style.padding="10"
    operations2.style.padding="10"
    let btnEdit=document.createElement("button");
    btnEdit.innerHTML="EDIT"
     btnEdit.className="btn btn-success"
    btnEdit.style.marginRight="10px";
    btnEdit.setAttribute("data-toggle","modal")
    btnEdit.setAttribute("data-target","#myModal")
     btnEdit.addEventListener("click",function(){
        document.getElementById("id").value=snap.val().id
        document.getElementById("username").value=snap.val().name
        document.getElementById("emailId").value=snap.val().email
    })
    let btnDel=document.createElement("button");
    btnDel.innerHTML="DEL"
    btnDel.className="btn btn-danger"
    btnDel.addEventListener("click",function(){
            deleteStudent(snap.val().id)
    })
     operations2.appendChild(btnEdit);
    operations2.appendChild(btnDel);
    })
    userlist=document.getElementById("studentList")
    userlist.append(table)
}
function editStudent(){
    var id=document.getElementById("id").value
    var uname=document.getElementById("username").value
    var email=document.getElementById("emailId").value
    ref.child(id).update({
        name:uname,
        email:email
    });
    loadUsers();
}
function deleteStudent(delId) {
    if (confirm('Are you sure to delete this record ?')) {
         console.log(delId);
         ref.child(delId).remove();
         loadUsers();
     }
}