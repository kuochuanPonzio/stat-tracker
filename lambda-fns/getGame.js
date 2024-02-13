const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = (event, context, callback) => {
  
  const eventParams = event.queryStringParameters;
  const tableName = eventParams.tableName;
  const keyName = eventParams.keyName;
  const keyType = eventParams.keyType;
  const value = eventParams.value;
  
  const params = {
    TableName: tableName,
    Key: {
      keyName: { keyType : value },
    },
  };
  
  console.log(params)
  
  ddb.getItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      callback(null, makeResponse(data));
    }
  });
  
};

function makeResponse(data){
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
