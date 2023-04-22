//External
const {
    CreateTableCommand
} = require("@aws-sdk/client-dynamodb");
//Helpers
const {
    dynamoDBClient
} = require("../dynamoDBClient");

// Set the parameters
const params = {
  AttributeDefinitions: [
    {
      AttributeName: "Season", //ATTRIBUTE_NAME_1
      AttributeType: "N", //ATTRIBUTE_TYPE
    },
    {
      AttributeName: "Episode", //ATTRIBUTE_NAME_2
      AttributeType: "N", //ATTRIBUTE_TYPE
    },
  ],
  KeySchema: [
    {
      AttributeName: "Season", //ATTRIBUTE_NAME_1
      KeyType: "HASH",
    },
    {
      AttributeName: "Episode", //ATTRIBUTE_NAME_2
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "TEST_TABLE", //TABLE_NAME
  StreamSpecification: {
    StreamEnabled: false,
  },
};

const createTable = async (params) => {
  try {
    let dynamo = await dynamoDBClient();

    const data = await dynamo.send(new CreateTableCommand(params));
    console.log("Table Estadicticas Climaticas Created", data);
    return data;
  } catch (error) {
    console.log(`Error in createTable(), caused by ${{error}}`);
    console.error(error.stack);
  }
};

createTable(params);



module.exports = {
    createTable
}
