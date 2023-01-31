const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getTask = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'TaskTable',
    Key: {
      id,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    const task = result.Item;
    
    if (!task) {
      return {
        statusCode: 404,
        body: ({ error: 'Task not found.' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(task),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch task.' }),
    };
  }
};

module.exports = {
  getTask
}