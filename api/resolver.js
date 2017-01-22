module.exports = function(req, res) {
  console.log('req.body', req.body)
  var data = JSON.parse(req.body.params);
  if (!data) {
    res.status(403 /* Unauthorized */ ).send('Invalid params');
    return;
  }

  var combinedCode = "";

  for(var i = 0; i < data['classes'].length; i++) {
      combinedCode += "<Start Class>\n";
      combinedCode += data['classes'][i];
      combinedCode += "\n";
      combinedCode += "<End Class>\n";
  }
  var formatted_result = data.result.replace(/(?:\r\n|\r|\n)/g, '<br />');
  var html = '<p style="font-size: medium">'+formatted_result+'</p>' + '<form action="http://compilx.com/compile" id="send-code" method="POST" name="send-code">' +

      '<textarea type="text" id="edit" name="edit" style="width: 300px; height: 200px;" hidden>'+combinedCode+'</textarea>' +
      '<br>' +
      '<input type="submit" class="btn btn-primary" id="run" value="Run Code Sent"/>' +
      '<br>' +
      '</form>';
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
};