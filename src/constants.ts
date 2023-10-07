require("dotenv").config();

const appName: string = process.env.NEXT_PUBLIC_APP_TITLE || "Cannstagram";
const network = process.env.NEXT_PUBLIC_NETWORK || "mainnet";
const proxyContractAddress =
  process.env.NEXT_PUBLIC_PROXY_MINTER_CONTRACT_ADDRESS ||
  "1.minsta.mintbus.near";
const tokenContractAddress =
  process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "cannsta.mintbase1.near";

const mintbaseBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://mintbase.xyz";

const mintbaseWalletUrl =
  process.env.NEXT_PUBLIC_MINTBASE_WALLET_URL ||
  "https://wallet.mintbase.xyz";

const twitterText =
  process.env.NEXT_PUBLIC_TWITTER ||
  "Own%20and%20trade%20social%20%2posts%20on%20%23Cannsta%20%40OpenCann%20%40NEARProtocol%0a";

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
