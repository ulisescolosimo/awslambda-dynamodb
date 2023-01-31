const AWS = require("aws-sdk");
const { v4 } = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const addTask = async (event) => {
  const { title, description } = JSON.stringify(event.body);
  const id = v4();

  const params = {
    TableName: "TaskTable",
    Item: {
      id,
      title,
      description,
    },
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Task added successfully.",
        task: params.Item,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not add task." }),
    };
  }
};

module.exports = {
  addTask
}