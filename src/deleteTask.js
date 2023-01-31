const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const deleteTask = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'TaskTable',
    Key: {
      id,
    },
  };

  try {
    await dynamoDb.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Task deleted successfully.' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete task.' }),
    };
  }
};

module.exports = {
  deleteTask
}