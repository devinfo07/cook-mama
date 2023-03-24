const firebaseConfig = {
    apiKey: "AIzaSyBCyCEekg383zQD36aJEtmLq1stuQnOqM4",
    authDomain: "login-306cc.firebaseapp.com",
    databaseURL: "https://login-306cc-default-rtdb.firebaseio.com",
    projectId: "login-306cc",
    storageBucket: "login-306cc.appspot.com",
    messagingSenderId: "981064884120",
    appId: "1:981064884120:web:88dea9e75870cb9c84d5ed"
  };

  // initialize firebase
firebase.initializeApp(firebaseConfig);
  
  // Initialize variables
const auth = firebase.auth()
const database = firebase.database()


  // Set database variable

/*
  
 function save() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var username = document.getElementById('username').value
    var say_something = document.getElementById('say_something').value
    var favourite_food = document.getElementById('favourite_food').value
    userid= emailid.substring(0, emailid.length-10);
    database.ref('users/' +  userid).set({
      email : email,
      password : password,
      username : username,
      say_something : say_something,
      favourite_food : favourite_food
    })
  
    alert('Saved')
  }

  function get(gmail) {
    userid= gmail.substring(0, gmail.length-10);
    
    var user_ref = database.ref('users/' + userid)
    user_ref.on('value', function(snapshot) {
      var data = snapshot.val()
  
      alert(data.age)
      alert(data.country)
      
  
    })
  
  }
  
  function update() {
    var username = document.getElementById('username').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
  
    var updates = {
      email : email,
      password : password
    }
  
    database.ref('users/' + username).update(updates)
  
    alert('updated')
  }
  
  function remove() {
    var username = document.getElementById('username').value
  
    database.ref('users/' + username).remove()
  
    alert('deleted')
  }*/

function add_contact(){
    firebase.auth().onAuthStateChanged((user)=>{

            gmail=user.email
            mobile1 = document.getElementById('mobile1').value;
            mobile2 = document.getElementById('mobile2').value;
            mobile3 = document.getElementById('mobile3').value;
            mobile4 = document.getElementById('mobile4').value;
            mobile5 = document.getElementById('mobile5').value;

            if (mobile1=="" && mobile2=="" && mobile3=="" && mobile4=="" && mobile5==""){alert("Enter alteast one email !");return;}
            
            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var details = {
                mobile1:mobile1,
                mobile2:mobile2,
                mobile3:mobile3,
                mobile4:mobile4,
                mobile5:mobile5
            }

            // Push to Firebase Database
            database_ref.child('emergency/' + gmail.substring(0, gmail.length-10)).set(details)
            
            // DOne
            alert('User Created!!')
            window.location.reload();
            return
          })

  }
function deliveremail() {
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
          location.replace("index.html");return;
      }else{

          gmail=user.email

          var user_ref = database.ref('emergency/' + gmail.substring(0, gmail.length-10))
          var user_name = database.ref('users/' + gmail.substring(0, gmail.length-10))
          user_name.on('value', function(snapshot) {
            var userinfo = snapshot.val()
            userid=userinfo.username})

          user_ref.on('value', function(snapshot) {
            var data = snapshot.val()
            if(data==null){
              alert("There is no one in your contact list! Add your close ones email address to continue.");
              window.location.reload();
              return;}
            
            const elink=[data.mobile1,data.mobile2,data.mobile3,data.mobile4,data.mobile5]
            let c=0

            for (let i = 0; i < 5; i++) {
              if(elink[i]!=""){
                          
                          c=c+1;
                          Email.send({
                            Host : "smtp.elasticemail.com",
                            Username : "21l112@psgtech.ac.in",
                            Password : "8E82165A652065018AD443CCCF375D438331",
                            To : elink[i],
                            From : "cringenoobies@gmail.com",
                            Subject : "Preg-Mama | Emergency",
                            Body : "Hello,\nMrs."+userid+" seems to be in a emergency situation.Please contact her or take actions as soon as possible.\n\nTeam Preg-mama"
                        }).then(
                        message => console.log(message)
                        );
                        
                      }
            }
            if(c>0){alert("Message Sent");window.location.reload();}
            
          
        
                  })
                  
          }
              })
              }

function contactmail(){

    firebase.auth().onAuthStateChanged((user)=>{
    gmail=user.email;

    const msg = document.getElementById('w3lMessage').value;
    if(msg==""){alert("Please type your message !");return;}
    else{
    var user_name = database.ref('users/' + gmail.substring(0, gmail.length-10))
    user_name.on('value', function(snapshot) {
    var userinfo = snapshot.val()
    userid=userinfo.username})
    alert("hi")
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "21l112@psgtech.ac.in",
      Password : "8E82165A652065018AD443CCCF375D438331",
      To : '21l112@psgtech.ac.in',
      From : '21l112@psgtech.ac.in',
      Subject : "Cook-Mama | Contact",
      Body : "From mail:"+gmail+"        Message:    \n"+msg
  }).then(
    alert("Your message has been sent! We'll reply to your email shortly.")
  );}

    })
}

function logout(){
  firebase.auth().signOut().then(function() {

    alert('Signed Out');
    location.replace("../login.html")
    return
  }, function(error) {
    alert('Sign Out Error'+error);
  });
}
function food1(){

  firebase.auth().onAuthStateChanged((user)=>{
  gmail=user.email;
  
  const msg = "Green salad";
  if(msg==""){alert("Please type your message !");return;}
  else{
    var user_name = database.ref('users/' + gmail.substring(0, gmail.length-10))
    user_name.on('value', function(snapshot) {
    var userinfo = snapshot.val()
    userid=userinfo.username})

    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "anileshbenjamin@gmail.com",
      Password : "C1C496AE4B897A34B2489D7CADCAF4C0F730",
      To : '21l112@psgtech.ac.in',
      From : '21l112@psgtech.ac.in',
      Subject : "Cook-Mama | Contact",
      Body : "From mail:"+gmail+"        Message:    \n"+msg
  }).then(
    alert("Your message has been sent! We'll reply to your email shortly.")
  );}
  
  })
  }
  function food2(){

    firebase.auth().onAuthStateChanged((user)=>{
    gmail=user.email;
    
    const msg = "Green salad";
    if(msg==""){alert("Please type your message !");return;}
    else{
      var user_name = database.ref('users/' + gmail.substring(0, gmail.length-10))
      user_name.on('value', function(snapshot) {
      var userinfo = snapshot.val()
      userid=userinfo.username})

      Email.send({
        Host : "smtp.elasticemail.com",
        Username : "anileshbenjamin@gmail.com",
        Password : "C1C496AE4B897A34B2489D7CADCAF4C0F730",
        To : '21l112@psgtech.ac.in',
        From : '21l112@psgtech.ac.in',
        Subject : "Cook-Mama | Contact",
        Body : "From mail:"+gmail+"        Message:    \n"+msg
    }).then(
      alert("Your message has been sent! We'll reply to your email shortly.")
    );}
    
    })
    }
    function food3(){

      firebase.auth().onAuthStateChanged((user)=>{
      gmail=user.email;
      
      const msg = "Green salad";
      if(msg==""){alert("Please type your message !");return;}
      else{
        var user_name = database.ref('users/' + gmail.substring(0, gmail.length-10))
        user_name.on('value', function(snapshot) {
        var userinfo = snapshot.val()
        userid=userinfo.username})
  
        Email.send({
          Host : "smtp.elasticemail.com",
          Username : "anileshbenjamin@gmail.com",
          Password : "C1C496AE4B897A34B2489D7CADCAF4C0F730",
          To : '21l112@psgtech.ac.in',
          From : '21l112@psgtech.ac.in',
          Subject : "Cook-Mama | Contact",
          Body : "From mail:"+gmail+"        Message:    \n"+msg
      }).then(
        alert("Your message has been sent! We'll reply to your email shortly.")
      );}
      
      })
      }
