var amqp = require("amqplib/callback_api");

var i = 0;
setInterval(function () {
  if (i < 10) {
    sendData(i);
    i = i + 1;
  }
}, 300);

function sendData(i) {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = "hello";
      var msg = `message number ${i} sent`;

      channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(msg),{persistent: true});
      console.log(`message number ${i} sent`);
    });

    setTimeout(function () {
      connection.close();
    }, 500);
  });
}
