function getData() {
  // alert("Hi");
  var formData = new FormData();
  formData.append(
    "csrfmiddlewaretoken",
    $("input[name=csrfmiddlewaretoken]").val()
  );
  formData.append("action", "getData");

  $.ajax({
    url: "/get_join_us/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        let j = i + 1;
        let lclDelete = "";

        $("#tableData").append(
          "<tr><td>" +
            j +
            "</td><td style='display: none;'>" +
            response[i].id +
            "</td><td>" +
            response[i].mobile +
            "</td><td><div class='d-flex' style='justify-content: space-evenly;'><a href='javascript:void(0);' id='edit_row' title='View/Edit' data-toggle='modal' data-target='#edit_modal'  class='text-primary' onClick='getRowsUpdate();'>Edit</a><a href='javascript:void(0);' title='Delete' data-toggle='modal' data-target='#delete_modal' class='text-danger' id='delete_row' onClick='getRowsDelete();'>Delete</a></div></td></tr>"
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
