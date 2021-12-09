//this code is written in Lambda function in AWS console

//postUser
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  const { id, userName, message } = event;
  const params = {
    TableName: "Users",
    Item: {
      id: id,
      userName: userName,
      message: message,
    },
  };

  try {
    const data = await docClient.put(params).promise();

    return {
      message: "user added!",
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (err) {
    return { error: err };
  }
};

//getUsers
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "Users",
};

async function listItems() {
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await listItems();
    const res = {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: data, // body must be returned as a string
    };
    return res;
  } catch (err) {
    return { error: err };
  }
};

//getUser
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  try {
    const data = await docClient
      .get({
        TableName: "Users",
        Key: {
          id: event.pathParameters.id,
        },
      })
      .promise();
    // here's the object we need to return
    const res = {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data), // body must be returned as a string
    };

    context.succeed(res);
  } catch (err) {
    return { error: err };
  }
};

//deleteUser
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  try {
    const data = await docClient
      .delete({
        TableName: "Users",
        Key: {
          id: event.pathParameters.id,
          //id: "2"
        },
      })
      .promise();
    // here's the object we need to return
    const res = {
      message: "user deleted",
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data), // body must be returned as a string
    };

    context.succeed(res);
  } catch (err) {
    return { error: err };
  }
};

//updateUser
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  const { newName, newMessage, id } = event;

  //const { newName, newMessage} =  {  "newName": "yu", "newMessage": "hii" }

  const params = {
    TableName: "Users",
    Key: {
      id: id,
      //id:"1"
    },
    UpdateExpression: "set userName= :na,message= :ma",
    ExpressionAttributeValues: {
      ":na": newName,
      ":ma": newMessage,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await docClient.update(params).promise();
    // here's the object we need to return
    const res = {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data), // body must be returned as a string
    };

    context.succeed(res);
  } catch (err) {
    return { error: err };
  }
};
