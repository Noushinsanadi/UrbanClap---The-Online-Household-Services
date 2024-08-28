function getData() {
  // alert("Hi");
  var formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getData");

  $.ajax({
    url: "/get_professional_bookings/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        let j = i + 1;
        $("#tableData").append(
          "<tr><td>" +
            j +
            "</td><td style='display: none;'>" +
            response[i].or_id +
            "</td><td>" +
            response[i].or_name +
            "</td><td>" +
            response[i].or_email +
            "</td><td>" +
            response[i].or_mobile +
            "</td><td>" +
            response[i].or_service_name +
            "</td><td>" +
            response[i].or_total_amount +
            "</td><td>" +
            response[i].or_date +
            "</td><td>" +
            response[i].or_time +
            "</td><td>" +
            response[i].or_address +
            "</td><td>" +
            response[i].or_transaction_id +
            "</td><td>" +
            response[i].or_is_completed +
            "</td><td><a href=" +
            response[i].or_location +
            ' target="_blank">Navigate</a></td><td><div class="d-flex" style="justify-content: space-evenly;"><a href="javascript:void(0);" id="edit_row" title="Update" data-toggle="modal" data-target="#edit_modal" class="text-primary" onClick="getRowsUpdate();">Update</a></div></td></tr>'
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

$(document).on("click", "#btn_update", function () {
  let formData = new FormData();
  formData.append("selStatus1", $("#selStatus1").val());
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
    url: "/update_booking_status/",
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
    let currentRow = $(this).closest("tr");
    let lclID = currentRow.find("td:eq(1)").text();
    $("#edit_id").val(lclID);
  });
}
