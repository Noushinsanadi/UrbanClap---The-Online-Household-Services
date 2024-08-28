function validateEmail(paramEmailID) {
  var filter = /^[0-9a-z.]+\@[a-z0-9]+\.[a-zA-z0-9]{2,4}$/;

  if (filter.test(paramEmailID)) {
    return true;
  } else {
    return false;
  }
}

// alert("Hello");

$("#btn_add").click(function (e) {
  //verification
  if ($("#selService").val().trim().length < 1) {
    alert("Please Select Service");
    $("#selService").focus();
    return false;
  }

  if ($("#selProfessional").val().trim().length < 1) {
    alert("Please Select Professional");
    $("#selProfessional").focus();
    return false;
  }

  if ($("#txtPrice").val().trim().length < 1) {
    alert("Please Enter Price");
    $("#txtPrice").focus();
    return false;
  }

  if ($("#txtDetails").val().trim().length < 1) {
    alert("Please Enter Details");
    $("#txtDetails").focus();
    return false;
  }

  if ($("#txtImage").val().trim() == "") {
    alert("Please Select Image");
    $("#txtImage").focus();
    return false;
  }

  // database
  let formData = new FormData();
  let lclFile = document.getElementById("txtImage");
  lclImage = lclFile.files[0];
  formData.append("selService", $("#selService").val());
  formData.append("selProfessional", $("#selProfessional").val());
  formData.append("txtPrice", $("#txtPrice").val());
  formData.append("txtDetails", $("#txtDetails").val());
  formData.append("txtImage", lclImage);
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
    url: "/service_professional_details/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (result) {
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
function getProfessionalData() {
  let formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getProfessionalData");

  $.ajax({
    url: "/service_professional_details/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      for (let i = 0; i < response.length; i++) {
        $("#selProfessional").append(
          "<option value='" +
            response[i].ap_id +
            "'>" +
            response[i].ap_name +
            "</option>"
        );
      }
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {},
  });
}

getProfessionalData();

function getServiceData() {
  let formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getServiceData");

  $.ajax({
    url: "/service_professional_details/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      for (let i = 0; i < response.length; i++) {
        $("#selService").append(
          "<option value='" +
            response[i].sv_name +
            "'>" +
            response[i].sv_name +
            "</option>"
        );
      }
    },
    error: function (request, error) {
      console.error(error);
    },
    complete: function () {},
  });
}

getServiceData();

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

  if ($("#txtPrice1").val().trim().length < 1) {
    alert("Please Enter Price");
    $("#txtPrice1").focus();
    return false;
  }

  if ($("#txtDetails1").val().trim().length < 1) {
    alert("Please Enter Details");
    $("#txtDetails1").focus();
    return false;
  }

  let formData = new FormData();
  formData.append("txtName1", $("#txtName1").val());
  formData.append("txtMobileNo1", $("#txtMobileNo1").val());
  formData.append("txtEmail1", $("#txtEmail1").val());
  formData.append("txtPrice1", $("#txtPrice1").val());
  formData.append("txtDetails1", $("#txtDetails1").val());
  formData.append("id", $("#edit_id").val());
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "update");

  // var table = $("#dataTables-example").DataTable();

  $.ajax({
    beforeSend: function () {
      $(".btn .spinner-border").show();
      $("#btn_update").attr("disabled", true);
    },
    url: "/service_professional_details/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (res) {
      alert("Details Updated Succesfully");
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
    var lclMobileNo = currentRow.find("td:eq(3)").text();
    var lclEmail = currentRow.find("td:eq(4)").text();
    var lclPrice = currentRow.find("td:eq(6)").text();
    var lclDetails = currentRow.find("td:eq(7)").text();

    // alert(lclName);
    $("#txtName1").val(lclName);
    $("#txtMobileNo1").val(lclMobileNo);
    $("#txtEmail1").val(lclEmail);
    $("#txtPrice1").val(lclPrice);
    $("#txtDetails1").val(lclDetails);
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
    url: "/service_professional_details/",
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
    let currentRow = $(this).closest("tr");
    let lclID = currentRow.find("td:eq(1)").text();
    $("#delete_id").val(lclID);
  });
}

function getData() {
  // alert("Hi");
  var formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getData");

  $.ajax({
    url: "/service_professional_details/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      $("#tableData").empty();
      for (let i = 0; i < response.length; i++) {
        let j = i + 1;
        let lclDelete = "";
        // if (i !== 0) {
        lclDelete =
          '<a href="javascript:void(0);" title="Delete" data-toggle="modal" data-target="#delete_modal" class="text-danger" id="delete_row" onClick="getRowsDelete();">Delete</a>';
        // }

        let img = response[i].ab_image.substring(3);

        $("#tableData").append(
          "<tr><td>" +
            j +
            '</td><td style="display: none;">' +
            response[i].ab_id +
            "</td><td>" +
            response[i].ab_name +
            "</td><td>" +
            response[i].ab_mobile +
            "</td><td>" +
            response[i].ab_email +
            "</td><td>" +
            response[i].ab_service_name +
            "</td><td>" +
            response[i].ab_price +
            "</td><td>" +
            response[i].ab_details +
            "</td><td><img src =" +
            img +
            ' height="100"></td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="View/Edit" data-toggle="modal" data-target="#edit_modal"  class="text-primary" onClick="getRowsUpdate();">Edit</a>' +
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

getData();
