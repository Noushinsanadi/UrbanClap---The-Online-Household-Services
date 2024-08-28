function getData() {
  // alert("Hi");
  var formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getData");

  $.ajax({
    url: "/get_admin_bookings/",
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
            "</td><td><a href=" +
            response[i].or_location +
            " target='_blank'>Navigate</a></td></tr>"
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
