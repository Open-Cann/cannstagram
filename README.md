# Cannsta

This repository hosts the primary codebase for the [Cannsta App](https://cannsta.co), originally created and developed by [@microchipgnu](https://github.com/microchipgnu) as [Minsta](https://github.com/Mintbase/minsta/). 

## Demo

Check out the live demo here: [Cannsta demo](https://cannsta.co/).

![Cannstagram logo](https://i.ibb.co/71GdjnT/thumbnail.png)

![How it works](https://pbs.twimg.com/media/F7ZwH1RagAAuyls?format=png&name=small)

![Rewards](https://pbs.twimg.com/media/F7ZwNGea4AAq8fz?format=png&name=small)

## 🎭 Introducing Masks! 🎭

_**Masks, and all features described in this section were created during the Encode x Near Horizon Hackathon.**_

Do you want to use Cannsta or Minsta, but prefer to stay anon? 🕵️ We gotchu.

With [Masks](https://www.cannsta.co/camera), you can select from any of our preloaded images to cover your face when capturing a selfie.

Just click the "Use a Mask" button on the camera preview page to cycle through preloaded images and see how they look on you. If you don't like the Masks we've created, you can even pass through a link to an external image to use any image you want as a Mask.

#### **Technical background**

Masks was created by developing the `overlayMask()` function in the `camera.tsx` component, then pairing `overlayMask()` with a `useEffect` to introduce a countdown timer. The timer has dual functionality in allowing users to back out of a large array of preloaded Masks without having to cycle the entire way through; while also serving as a countdown timer for users that want to strike a pose while wearing thier Mask.

We then abstracted part of `overlayMask()` function to a helper component, `overlayMask.tsx`, and added a proxy server component for local deployment using Express.js and `node-fetch` (`proxy-server.js`) in the main project folder.

To enable saving a composite images required further updates to `camera.tsx` to add an HTML canvas element and CORS support (also installing `cors 2.8.5`). The CORS support and proxy server were required to combine the camera preview with the Mask overlay image into a flat, one-layer `.png` file that was not a "tainted canvas" (violates same-origin policy, images from a different origin than the script). 

In fixing this bug, we were able to expand the functionality of Masks to allow users to pass in the URL of any image and wear it as thier Mask. The flexibility of using any images in the preloaded array of Masks, along with enabling users to use any Mask they wan, creates a new way for community forks of Minsta to drive engagement.

#### **Files Created and/or Modified Substantially**
1. [camera.tsx](https://github.com/Open-Cann/cannstagram/blob/main/src/components/pages/camera.tsx)
2. [OverlayMask.tsx](https://github.com/Open-Cann/cannstagram/blob/main/src/components/OverlayMask.tsx)
3. [MaskModal.tsx](https://github.com/Open-Cann/cannstagram/blob/main/src/components/MaskModal.tsx)
4. [MaskModal.css](https://github.com/Open-Cann/cannstagram/blob/main/src/components/MaskModal.css)
5. [proxy-server.js](https://github.com/Open-Cann/cannstagram/blob/main/proxy-server.js)
6. [webpack.config.js](https://github.com/Open-Cann/cannstagram/blob/main/webpack.config.js)
7. [README.md](https://github.com/Open-Cann/cannstagram/blob/main/README.md)

#### **Known Issues**
1. Can't apply custom Masks. Encountering problems with handling "node:" URIs, specifically for core Node.js modules like "buffer," "fs," "https," "http," and "net.".
2. Mask composites don't save to capture. Composite is not created correctly.
3. Multiple issues began when transitioning from a local proxy server to serverless routing using Webpack & Vercel.


## How To Contribute

**To Do List:**
- [ ] Enable users to list posts on [Mintbase](https://mintbase.xyz) and [OpenCann](https://www.opencann.net/)
  - [ ] standardize & automate pricing for querying "post" type based on
     - [ ] size of data stored (Mb)
     - [ ] post content (hashtags, mentions, etc)
     - [ ] post analytics (views, likes, etc)
     - [ ] publisher analytics (follower count, account age, etc)    
- [ ] [Barter posts](https://near.org/harrydhillon.near/widget/NFTSwap.NFT-Trade)
- [ ] Stream royalties directly to creators
- [ ] Like button
- [ ] Follow button
- [ ] Post captions
   - [ ] auto-add #CANNSTA to every post
- [ ] Post comments
- [ ] Profile page
   - [ ] User analytics
- [ ] Improve feed UI to be more like Twitter & IG
- [ ] Camera filters (as NFTs) - frames, colors, emoji masks
- [ ] Reels
- [ ] Stories
- [ ] dms
- [ ] Integrate posts as a fileformat type in [Hyperfiles](https://github.com/flowscience/hyperfiles)
- [ ] Issue [Hypercerts](https://github.com/open-cann/hypercerts-on-bos) to all users and store in [Token bound accounts](https://eips.ethereum.org/EIPS/eip-6551)
      - Additional references: [Future Primitive](https://medium.com/future-primitive/tldr-nfts-have-their-own-wallets-try-it-here-http-tokenbound-org-6fac135a1f9d) and [CoinMonks](https://medium.com/coinmonks/erc-6551-token-bound-accounts-daa56fbd3769)


**Run on localhost:**

1. Clone the repository.
2. If you don't have `pnpm` installed, run:

   ```bash
   npm install -g pnpm
   ```
   
3. Then, install the required dependencies:

     ```bash
     pnpm install
     ```

4. The proxy server can be initiated by running `node proxy-server.js` in a separate terminal.

## Environment Variables

Refer to **.env** for the environment variables used in this project. 

If you don't set up a `.env` file or environment variables with your provider, the project will retrieve values from the following files:

1. For CSS generation during build: `generate-css.js`
2. For configuration variables: `src/constants.ts`
3. For fallback metadata and text values: `src/fallback.ts`

## Local Development

To run the project locally, use:

  ```bash
  pnpm dev
  ```

## Updating Environment Variables

### Running Locally

If you're running your project locally, follow these steps to update your environment variables:

1. Save your changes in the `.env` file.
2. Run `pnpm dev` again to apply the updated environment variables.
3. Reload the page to reflect the changes.

### Deployed on Vercel

If you have deployed your project on Vercel, follow these steps to update your environment variables:

1. Log in to your Vercel account.
2. Navigate to the project settings for your deployed app.
3. Update the environment variables in the Vercel dashboard.
4. Trigger a redeployment of your app to apply the changes.

By following these steps, you can ensure that your project uses the updated environment variables.


