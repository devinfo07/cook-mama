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




// Set up our register function
function register () {
  // Get all our input fields
  username = document.getElementById('name').value;
  emailid = document.getElementById('email').value;
  phn = document.getElementById('phone').value;
  plot = document.getElementById('plot').value;
  city = document.getElementById('city').value;
  state = document.getElementById('state').value;
  country = document.getElementById('country').value;
  pincode = document.getElementById('pincode').value;
  password = document.getElementById('password').value;
  cpassowrd = document.getElementById('cpassword').value;
  userid= emailid.substring(0, emailid.length-10);
  if (validate_field(username) == false || validate_field(emailid) == false || validate_field(phn) == false || validate_field(password) == false || validate_field(cpassowrd) == false || validate_field(country) == false || validate_field(plot) == false || validate_field(city) == false || validate_field(state) == false || validate_field(pincode) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
  if(validate_password(password)){
      alert("Password should be atleast 6 characters!")
      return
  }
  if(password!=cpassowrd){
      alert("Password doesn't match !")
      return
  }
  if (validate_email(emailid) == false)
   {
      alert('Invalid Email Address !')
      return
      // Don't continue running the code
    }
  if (phn.length<10){
    alert("Please enter valid mobile number!");
    return
  }

 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(emailid, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser
    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      emailid : emailid,
      username : username,
      phn:phn,
      plot:plot,
      city:city,
      state:state,
      country:country,
      pincode:pincode,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + emailid.substring(0, emailid.length-10)).set(user_data)

    // DOne
    alert('User Created!!')


    alert('user logged in successfully');
			
		firebase.auth().onAuthStateChanged((user)=>{
				if(user){
					location.replace("service.html")
				}
				})
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}





// Validate Functions
function validate_email(email) {
    
  if(email.slice(-10)=='@gmail.com'){
    // Email is good

    return true
  } 
  else {

    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password.length < 6) {
    return true
  } 
  else {
    return false
  }
}

function validate_field(field) {

  if(field.length==0){
      return false}
  else {
    return true
  }
}
