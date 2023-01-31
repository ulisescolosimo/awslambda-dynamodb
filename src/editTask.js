const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const editTask = async (event) => {
  const { id } = event.pathParameters;
  const { title, description } = JSON.stringify(event.body);

  const params = {
    TableName: 'TaskTable',
    Key: {
      id,
    },
    UpdateExpression: 'set title = :t, description = :d',
    ExpressionAttributeValues: {
      ':t': title,
      ':d': description,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ task: result.Attributes }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not edit task.' }),
    };
  }
};

module.exports = {
  editTask
}
