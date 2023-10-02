require("dotenv").config();

const appName: string = process.env.NEXT_PUBLIC_APP_TITLE || "Cannsta";
const network = process.env.NEXT_PUBLIC_NETWORK || "mainnet";
const proxyContractAddress =
  process.env.NEXT_PUBLIC_PROXY_MINTER_CONTRACT_ADDRESS ||
  "1.minsta.mintbus.near";
const tokenContractAddress =
  process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "cansta.mintbase1.near";

const mintbaseBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://mintbase.xyz";

const mintbaseWalletUrl =
  process.env.NEXT_PUBLIC_MINTBASE_WALLET_URL ||
  "https://wallet.mintbase.xyz";

const twitterText =
  process.env.NEXT_PUBLIC_TWITTER ||
  "Own and trade social posts on Cannsta";

export const constants = {
  appName,
  proxyContractAddress,
  tokenContractAddress,
  network,
  mintbaseBaseUrl,
  mintbaseWalletUrl,
  twitterText,
  isClosed: process.env.NEXT_PUBLIC_MINTING_CLOSED === "true" || false,
  showRewards: process.env.NEXT_PUBLIC_SHOW_REWARDS === "true" || false,
};
