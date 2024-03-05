/**
 * Get Assets a list of assets from mongoDB
 *  - This script will create a `.ts` file inside the `data` folder
 *  - The data will display as an array of objects `ASSETS_FROM_MONGO`
 *  - Limit: How many records to retrieve from mongodb
 *  - Skip: How many records would skip from mongodb, default 0;
 * Bruno DaSilva
 */

import { Db, MongoClient } from "mongodb";
import type { Asset } from "./data.types";
import { ENV_NAME, MONGO_CONNECTION_STRING } from "./constants";
import { setLogFile, writeError, writeDataAsIs } from "./logger/logger";
export const command = "get.assets.list";
export const desc =
  "This script gets a list of assets and creates an array inside of data repository";

const EVENTS_DB = "events_db";

let eventsDB: Db;

const alwaysRunMutation: boolean = true;

export function builder(yargs) {
  return yargs.usage(command).help().wrap(null).argv;
}

export async function handler() {
  let logFolderName = "data/get-a-list-assets-from-mongodb";
  setLogFile(`${logFolderName}/${ENV_NAME}/assets-array.ts`);

  if (!alwaysRunMutation) {
    logFolderName = logFolderName + "-dry-run";
  }

  const mongoConnectionString = MONGO_CONNECTION_STRING;

  if (!mongoConnectionString) {
    throw Error(
      "Must configure Mongo Connection String. Format: mongodb://user:password@host:port. i.e. mongodb://userName:p@ss@127.0.0.1:27000"
    );
  }

  const client = await MongoClient.connect(mongoConnectionString);

  eventsDB = client.db(EVENTS_DB);

  try {
    let limit = 65000;
    let skip = 0;
    const listOfAssets = await getListOfAssets(limit, skip);
    const logAssets = listOfAssets.map((asset) => {
      return JSON.stringify(asset);
    });

    writeDataAsIs(
      `export const ASSETS_FROM_MONGO = [${logAssets.join(", ")}];`
    );
  } catch (error) {
    if (error) {
      writeError(`ERROR: ${JSON.stringify(error)}`);
    }
  } finally {
    process.exit(0);
  }
}

const getListOfAssets = async (
  limit: number,
  skip: number
): Promise<Array<Asset>> => {
  const filter = [
    {
      $match: {
        "Meta.EntityName": "Asset",
        "Data.VendorContract": { $exists: true, $type: "array" },
      },
    },
    {
      $project: {
        "Data.AssetID": 1,
        "Data.CustomerID": 1,
        "Data.VendorContract.AssetContractCode": 1,
        "Data.AssetContract.EndDate": 1,
        _id: 0,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const listOfAssets = await eventsDB
    .collection<any>("denorm_vendor_asset_records")
    .aggregate(filter)
    .toArray();

  return listOfAssets
    .map((asset: any) => {
      return asset.Data;
    })
    .filter(Boolean) as Array<Asset>;
};
