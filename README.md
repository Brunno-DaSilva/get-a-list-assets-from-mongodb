# Get a List Assets From MongoDB 🔥

<br />
<div style="border-left: 2px solid #3182CE; background:#E2E8F0; padding: 0.8rem;" >
<span >
💡 <b>Information</b>: This script serves as a demonstration of the problem-solving tasks encountered in my role as a software engineer.

</span>

<br />
</div>

<br />

<br />
</div>

## Overview: 👻

This script retrieves a list of assets from a MongoDB database and generates a TypeScript file containing the data array. The data array is named `ASSETS_FROM_MONGO`. This script allows specifying the number of records to retrieve and the number of records to skip in the MongoDB query.

## Script Breakdown ✍🏽

This script connects to a MongoDB database, retrieves a list of assets based on specified criteria, and exports the data as a TypeScript array.

1. **Imports and Constants:**

   - The script imports necessary modules and types from external files.
   - It imports `MongoClient` and `Db` from MongoDB to establish a connection.
   - Constant values like `ENV_NAME`, `MONGO_CONNECTION_STRING`, and others are imported from `constants.ts`.
   - Logger-related functions such as `setLogFile`, `writeError`, and `writeDataAsIs` are imported from `logger/logger.ts`.

2. **Command and Description:**

   - `command` and `desc` variables provide a brief description of the script's purpose.

3. **Database Initialization:**

   - The script initializes a MongoDB database named `events_db`.

4. **Command Builder:**

   - The `builder` function defines command line options using `yargs`.

5. **Main Handler Function:**

   - The `handler` function is the main entry point of the script.
   - It sets up logging configurations based on the environment.
   - It connects to the MongoDB database using the provided connection string.
   - Retrieves a list of assets based on specified criteria using the `getListOfAssets` function.
   - Converts the retrieved assets into a string format and writes them to a TypeScript file named `assets-array.ts`.
   - Handles errors and exits the process with status code 0.

6. **Function to Retrieve Assets:**
   - The `getListOfAssets` function queries the MongoDB collection named `denorm_vendor_asset_records`.
   - It applies aggregation pipeline stages to filter and project the desired fields.
   - The function returns an array of assets, converted to the `Asset` type.

This script provides a flexible way to retrieve assets from MongoDB and export them into a TypeScript file for further processing or analysis.
<br />

<div style="border-left: 2px solid #3182CE; background:#E2E8F0; padding: 0.8rem;" >
<span >
💡 <b>Information</b>: This script can be modify to import data into a csv or other file formats.

</span>

<br />
</div>

<br />

<br />
</div>

<br/>

<a style="background: #06191a; color: #fff; padding: 0.6rem; text-decoration:none;" href="#">Back to top ↑ </a>

<br/>
