const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getTaskList = async () => {
  const params = {
    TableName: 'TaskTable',
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ tasks: result.Items }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve tasks.' }),
    };
  }
};

module.exports = {
  getTaskList
}