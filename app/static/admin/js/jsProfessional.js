function validateEmail(paramEmailID) {
  var filter = /^[0-9a-z.]+\@[a-z0-9]+\.[a-zA-z0-9]{2,4}$/;

  if (filter.test(paramEmailID)) {
    return true;
  } else {
    return false;
  }
}

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

function alphaOnly(event) {
  let key = event.which ? event.which : event.keyCode;
  return (
    (key >= 65 && key <= 90) ||
    key == 8 ||
    (event.charCode >= 97 && event.charCode <= 122) ||
    event.charCode == 32
  );
}

// alert("Hello");

$("#btn_add").click(function (e) {
  //verification
  if ($("#txtName").val().trim().length < 1) {
    alert("Please Enter Name");
    $("#txtName").focus();
    return false;
  }

  if ($("#txtMobileNo").val().trim().length < 10) {
    alert("Please Enter Correct Mobile Number");
    $("#txtMobileNo").focus();
    return false;
  }

  if ($("#txtEmail").val().trim().length < 1) {
    alert("Please Enter Email");
    $("#txtEmail").focus();
    return false;
  }

  if (!validateEmail($("#txtEmail").val())) {
    alert("Please Enter Valid Email");
    $("#txtEmail").focus();
    return false;
  }

  if ($("#txtPassword").val().trim().length < 1) {
    alert("Please Enter Password");
    $("#txtPassword").focus();
    return false;
  }

  // database
  let formData = new FormData();

  formData.append("txtName", $("#txtName").val());
  formData.append("txtMobileNo", $("#txtMobileNo").val());
  formData.append("txtEmail", $("#txtEmail").val());
  formData.append("txtPassword", $("#txtPassword").val());
  formData.append("txtRole", "Professional");
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "add");

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_add").attr("disabled", true);
    },
    url: "/addProfessional/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (res) {
      if (res == "10") {
        alert("Details already Exist");
        return false;
      }
      alert("Details Added Successfully");
      location.reload();
      table.ajax.reload();
      $("#add_modal").modal("hide");
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {
      $(".btn .spinner-border").hide();
      $("#btn_add").attr("disabled", false);
    },
  });
});

// data fetching (display into admin dashboard )
function getAdminData() {
  // alert("Hi");
  var formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getData");

  $.ajax({
    url: "/addProfessional/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      $("#tableData").empty();
      for (let i = 0; i < response.length; i++) {
        let j = i + 1;
        let lclDelete =
          '<a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();">Delete</a>';

        $("#tableData").append(
          "<tr><td>" +
            j +
            '</td><td style="display: none;">' +
            response[i].ap_id +
            "</td><td>" +
            response[i].ap_name +
            "</td><td>" +
            response[i].ap_mobile +
            "</td><td>" +
            response[i].ap_email +
            "</td><td>" +
            response[i].ap_role +
            '</td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="View/Edit" data-toggle="modal" data-target="#edit_modal"  class="text-primary" onClick="getRowsUpdate();">Edit</a>' +
            lclDelete +
            "</div></td></tr>"
        );
      }
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {},
  });
}

// Edit data
//Edit modal submit click
$(document).on("click", "#btn_update", function () {
  // alert("hi");

  if ($("#txtName1").val().trim().length < 1) {
    alert("Please Enter Name");
    $("#txtName1").focus();
    return false;
  }

  if ($("#txtMobileNo1").val().trim().length < 10) {
    alert("Please Enter Correct Mobile Number");
    $("#txtMobileNo1").focus();
    return false;
  }

  if ($("#txtEmail1").val().trim().length < 1) {
    alert("Please Enter Email");
    $("#txtEmail1").focus();
    return false;
  }

  let formData = new FormData();
  formData.append("txtName1", $("#txtName1").val());
  formData.append("txtMobileNo1", $("#txtMobileNo1").val());
  formData.append("txtEmail1", $("#txtEmail1").val());
  formData.append("id", $("#edit_id").val());
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "update");

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_update").attr("disabled", true);
    },
    url: "/addProfessional/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      alert(" Details Updated Succesfully");
      location.reload();
      table.ajax.reload();
      $("#edit_modal").modal("hide");
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {
      $(".btn .spinner-border").hide();
      $("#btn_update").attr("disabled", false);
    },
  });
});

function getRowsUpdate() {
  $("#tableData tr").click(function () {
    var currentRow = $(this).closest("tr");
    var lclID = currentRow.find("td:eq(1)").text();
    var lclName = currentRow.find("td:eq(2)").text();
    var lclNumber = currentRow.find("td:eq(3)").text();
    var lclEmail = currentRow.find("td:eq(4)").text();
    var lclRole = currentRow.find("td:eq(5)").text();

    // alert(lclName);
    $("#txtName1").val(lclName);
    $("#txtMobileNo1").val(lclNumber);
    $("#txtEmail1").val(lclEmail);
    $("#txtRole1").val(lclRole);
    $("#edit_id").val(lclID);
  });
}
// Delete
$(document).on("click", "#btn_delete", function () {
  // alert("hi");
  var formData = new FormData();
  formData.append("id", $("#delete_id").val());
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "delete");

  // var table = $("#dataTables-example").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_update").attr("disabled", true);
    },
    url: "/addProfessional/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
      alert(" Details deleted Succesfully");
      location.reload();
      table.ajax.reload();
      $("#edit_modal").modal("hide");
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {
      $(".btn .spinner-border").hide();
      $("#btn_update").attr("disabled", false);
    },
  });
});

function getRowsDelete() {
  $("#tableData tr").click(function () {
    var currentRow = $(this).closest("tr");
    var lclID = currentRow.find("td:eq(1)").text();
    // alert(lclID);
    $("#delete_id").val(lclID);
  });
}

getAdminData();