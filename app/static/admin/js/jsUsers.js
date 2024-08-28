function getData() {
  // alert("Hi");
  var formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getData");

  $.ajax({
    url: "/get_admin_users/",
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
            response[i].rg_id +
            "</td><td>" +
            response[i].rg_name +
            "</td><td>" +
            response[i].rg_mobile +
            "</td><td>" +
            response[i].rg_email +
            "</td></tr>"
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
