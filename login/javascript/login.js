// declaring all the variables 

const documentClasses = {
  viewPasswordElement: document.querySelector(`.jsViewPassword`),
  passwordElement: document.querySelector(`.jsPasswordInput`),
  nameElement: document.querySelector(`.jsNameInput`),
  titleElement: document.querySelector(`.jsMainText`),
  actionButton: document.querySelector(`.jsLoginButton`),
  transformButton: document.querySelector(`.jsIHaveAccount`),
  accountNameTitle: document.querySelector(`.jsAccountText`),
  mainDiv: document.querySelector(`.jsMainDiv`),
};

const accountsList = [
  {accountName: `Refa`, accountPassword: `shushi123sus`},
  {accountName: `big`, accountPassword: `guy`},
];
let currentAccount = null;
let pageMode = `signup`;

// --------------

const viewPassword = function() {
  if (documentClasses.passwordElement.type === `password`) {
    documentClasses.passwordElement.type = `text`;
  }
  else {
    documentClasses.passwordElement.type = `password`;
  }
}


const mainAction = function(name, password) {
  if (pageMode === `signup`) {
    signUpAction(name, password);
  }
  else if (pageMode === `login`) {
    loginAction(name, password);
  }
  else {
    logoutAction()
  }
}


const signUpAction = function(name, password) {
  if (name.value.length < 3) {
    alert(`Name is too short`);
  }
  else if (password.value.length < 5) {
    alert(`Password is too short`);
  }
  else if (name.value.length > 24) {
    alert(`Name is too long`);
  }
  else if (password.value.length > 24) {
    alert(`Password is too long`);
  }
  else {
    accountsList.push({accountName: name.value, accountPassword: password.value});
    currentAccount = accountsList[accountsList.length - 1];
    pageMode = `loggedin`;
    loggedInMode();
  }
  name.value = ``;
  password.value = ``;
}


const transformPage = function() {
  if (pageMode === `signup`) {
    pageMode = `login`;
    documentClasses.actionButton.textContent = 'Log in';
    documentClasses.transformButton.textContent = `I don't have an account`;
    documentClasses.titleElement.textContent = `Login form - Log in`;
    documentClasses.actionButton.classList.replace("signup", "login");
    documentClasses.transformButton.classList.replace("signup", "login");
    documentClasses.mainDiv.style = `box-shadow: 0 0 30px rgba(240, 79, 79, 0.404);`   
  }
  else if (pageMode === `login`) {
    pageMode = `signup`;
    documentClasses.actionButton.textContent = `Sign up`;  
    documentClasses.transformButton.textContent = `I have an account`;
    documentClasses.titleElement.textContent = `Login form - Sign up`;  
    documentClasses.actionButton.classList.replace("login", "signup");
    documentClasses.transformButton.classList.replace("login", "signup");
    documentClasses.mainDiv.style = `box-shadow: 0 0 30px rgba(16, 166, 185, 0.404);`
  }
  else {
    pageMode = `signup`;
    currentAccount = null;
    documentClasses.nameElement.style = `display: block;`;
    documentClasses.passwordElement.style = `display: block;`;
    documentClasses.transformButton.style = `display: block;`;
    documentClasses.viewPasswordElement.style = `display: block;`;
    documentClasses.accountNameTitle.classList.toggle(`loggedin`)
    documentClasses.mainDiv.style = `box-shadow: 0 0 30px rgba(240, 79, 79, 0.404);`
    documentClasses.titleElement.textContent = `Login form - Log in`;  
    documentClasses.actionButton.textContent = `Log in`;  
  }
}


const loginAction = function(name, password) {
  for (let i = 0; i < accountsList.length; i++) {
    if (name.value === accountsList[i].accountName && password.value === accountsList[i].accountPassword) {
      currentAccount = accountsList[i];
      loggedInMode()
    }
  }

  name.value = ``;
  password.value = ``;
}


const loggedInMode = function() {
  documentClasses.nameElement.style = `display: none;`;
  documentClasses.passwordElement.style = `display: none;`;
  documentClasses.transformButton.style = `display: none;`;
  documentClasses.viewPasswordElement.style = `display: none;`;
  documentClasses.actionButton.textContent = `Log out`;
  documentClasses.titleElement.textContent = `Logged in as:`;
  documentClasses.accountNameTitle.classList.toggle(`loggedin`);
  documentClasses.accountNameTitle.textContent = `${currentAccount.accountName}`;
  documentClasses.mainDiv.style = `box-shadow: 0 0 30px rgba(16, 79, 79, 0.404);`
  pageMode = `loggedin`
}


const logoutAction = function() {
  transformPage()
}

const imageAddAction = function() {
  if (fileInput.files && fileInput.files[0]) {
    let reader = new FileReader();
  
    // Read the selected file as a Data URL
    reader.readAsDataURL(fileInput.files[0]);
  
    reader.onload = function(event) {
      // Store the loaded image data URL in a variable
      let imageDataURL = event.target.result;
  
      // Do something with the imageDataURL, for example, display it in an image element
      let imageElement = document.createElement('img');
      imageElement.src = imageDataURL;
      document.body.appendChild(imageElement);
  
      // Now you have the image data URL stored in the variable imageDataURL
      console.log('Image loaded successfully:', imageDataURL);
    };
  } else {
    console.error('No file selected.');
  }
}

