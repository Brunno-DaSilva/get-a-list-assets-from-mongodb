export type Asset = {
  AssetID: string;
  CustomerID: string;
  VendorContract: {
    AssetContractCode: string;
  };
  AssetContract: {
    EndDate: string;
  };
};
