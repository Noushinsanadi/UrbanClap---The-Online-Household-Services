function validateEmail(paramEmailID) {
  let filter = /^[0-9a-z.]+\@[a-z0-9]+\.[a-zA-z0-9]{2,4}$/;

  if (filter.test(paramEmailID)) {
    return true;
  } else {
    return false;
  }
}
localStorage.clear();

lclDelay = 500;
$("#send").click(function (e) {
  // Retrieve the email from localStorage
  let storedEmail = localStorage.getItem("email");

  // Check if the email exists in localStorage
  if (storedEmail) {
  } else {
    if (!validateEmail($("#txtMsg").val())) {
      alert("Please enter email to proceed");
      $("#txtMsg").focus();
      return false;
    } else {
      localStorage.setItem("email", $("#txtMsg").val());
      $("#txtMsg").val("");
      setTimeout(() => {
        $("#txtMsg").attr("placeholder", "Type Your Message");
        $(".chat-messages").append(
          '<div class="message-container d-flex flex-row justify-content-end mb-4"><div class="message-bubble p-3 bg-light rounded-3" style="text-align: left !important;">Thank you for email, Proceed with your queries</div></div>'
        );

        $(".chat-messages").append(
          '<div class="message-container d-flex flex-row justify-content-end mb-4"><div class="message-bubble p-3 bg-light rounded-3" style="text-align: left !important;">Heyy!How can I help you?</div></div>'
        );
      }, lclDelay);
      return false;
    }
  }
  //verification
  if ($("#txtMsg").val().trim().length < 1) {
    alert("Please Enter Message to Start Chat");
    $("#txtMsg").focus();
    return false;
  }

  $(".chat-messages").append(
    '<div class=" d-flex flex-row justify-content-end mb-4" style="justify-content: flex-end !important;"><div class="message-bubble outgoing p-3 bg-primary rounded-3 text-white">' +
      $("#txtMsg").val() +
      "</div></div>"
  );

  let formData = new FormData();
  formData.append("txtMsg", $("#txtMsg").val());
  formData.append("userEmail", storedEmail);

  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "add");

  $.ajax({
    url: "/start_chat/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (res) {
      setTimeout(() => {
        $("#txtMsg").val("");
        $(".chat-messages").append(
          '<div class="message-container d-flex flex-row justify-content-end mb-4"><div class="message-bubble text-left p-3 bg-light rounded-3" style="text-align: left !important;">' +
            res +
            "</div></div>"
        );
        let chatMessagesDiv = $(".chat-messages");
        chatMessagesDiv.scrollTop(chatMessagesDiv[0].scrollHeight);
      }, lclDelay);
    },
  });
});

let navLinks = document.getElementById("navLinks");
function showMenu() {
  navLinks.style.right = "0";
}
function hideMenu() {
  navLinks.style.right = "-200px";
}

function addMessage(text, isUser) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", isUser ? "user" : "bot");
  messageDiv.textContent = text;
  // document.querySelector(".chat-messages").appendChild(messageDiv);
}

function handleUserInput() {
  const inputField = document.querySelector(".form-control");
  const userMessage = inputField.value.trim();

  if (userMessage !== "") {
    addMessage(userMessage, true);
    inputField.value = "";
  }
}

document
  .querySelector(".btn-success")
  .addEventListener("click", handleUserInput);

// document
//   .querySelector(".form-control")
//   .addEventListener("keypress", function (e) {
//     if (e.key === "Enter") {
//       handleUserInput();
//     }
//   });

$(".btn-close").click(function () {
  localStorage.clear();
  $(".chat-messages").text("");
});

$("#txtMsg").keypress(function (event) {
  if (event.key === "Enter") {
    let storedEmail = localStorage.getItem("email");

    // Check if the email exists in localStorage
    if (storedEmail) {
      console.log("Stored email:", storedEmail);
    } else {
      if (!validateEmail($("#txtMsg").val())) {
        alert("Please enter email to proceed");
        $("#txtMsg").focus();
        return false;
      } else {
        localStorage.setItem("email", $("#txtMsg").val());
        setTimeout(() => {
          $("#txtMsg").attr("placeholder", "Type Your Message");
          $(".chat-messages").append(
            '<div class="message-container"><div class="message-bubble text-left" style="text-align: left !important;">Thank you for email, Proceed with your queries</div></div>'
          );
          $(".chat-messages").append(
            '<div class="message-container"><div class="message-bubble text-left" style="text-align: left !important;">Heyy!How can I help you?</div></div>'
          );
        }, lclDelay);

        $("#txtMsg").val("");
        return false;
      }
    }
    //verification
    if ($("#txtMsg").val().trim().length < 1) {
      alert("Please Enter Message to Start Chat");
      $("#txtMsg").focus();
      return false;
    }

    $(".chat-messages").append(
      '<div class="message-container" style="justify-content: flex-end !important;"><div class="message-bubble outgoing">' +
        $("#txtMsg").val() +
        "</div></div>"
    );

    let formData = new FormData();
    formData.append("txtMsg", $("#txtMsg").val());
    formData.append("userEmail", storedEmail);

    formData.append(
      "csrfmiddlewaretoken",
      $("input[name=csrfmiddlewaretoken]").val()
    );
    formData.append("action", "add");

    $.ajax({
      url: "/start_chat/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (res) {
        setTimeout(() => {
          $(".chat-messages").append(
            '<div class="message-container"><div class="message-bubble text-left" style="text-align: left !important;">' +
              res +
              "</div></div>"
          );

          let chatMessagesDiv = $(".chat-messages");
          chatMessagesDiv.scrollTop(chatMessagesDiv[0].scrollHeight);
        }, lclDelay);
        $("#txtMsg").val("");
      },
    });
  }
});
