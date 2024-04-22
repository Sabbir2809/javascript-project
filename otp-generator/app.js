let generatedOTP;
const optExpireElement = document.getElementById("otp-expires-id");

// expire otp
function expireOTP() {
  const totalTime = 30000;
  const interval = 1000;

  let seconds = totalTime / interval;

  const intervalId = setInterval(() => {
    optExpireElement.innerText = `OTP will expire in ${seconds} seconds`;
    seconds = seconds - 1;
  }, interval);

  setTimeout(() => {
    optExpireElement.innerText = "OTP Expired!";
    clearInterval(intervalId);
    generateOTP();
  }, totalTime);
}

// tackle otp
function tackleOTPBoxes() {
  const boxes = document.getElementById("otp-box-list-id");

  boxes.addEventListener("input", function (e) {
    const target = e.target;
    const value = target.value;

    if (isNaN(value)) {
      return (target.value = "");
    }

    const nextElement = target.nextElementSibling;
    if (nextElement) {
      nextElement.focus();
    }

    validateOTP();
  });
}

// generate otp
function generateOTP() {
  generatedOTP = Math.floor(1000 + Math.random() * 9000);
  const otpElement = document.getElementById("generated-otp-id");

  otpElement.innerText = `Your OTP: ${generatedOTP}`;
  expireOTP();
}

// validate otp
function validateOTP() {
  let typedNumber = "";

  const boxListElement = document.getElementById("otp-box-list-id");

  [...boxListElement.children].forEach((element) => {
    typedNumber = typedNumber + element.value;
  });

  const result = generatedOTP === parseInt(typedNumber, 10);

  const resultElement = document.getElementById("result-id");

  if (result) {
    resultElement.innerText = "OTP has been Validate Successfully";
    resultElement.classList.add("success");
    resultElement.classList.remove("invalid");
    resultElement.classList.remove("invalid");
    optExpireElement.remove();
  } else {
    resultElement.classList.add("invalid");
    resultElement.classList.remove("success");
    resultElement.innerText = "OTP is Invalidate";
  }
}

function init() {
  tackleOTPBoxes();
  setTimeout(generateOTP, 2000);
}
init();
