# Cannsta

This repository hosts the primary codebase for the [Cannsta App](https://cannsta.co), originally created and developed by [@microchipgnu](https://github.com/microchipgnu) as [Minsta](https://github.com/Mintbase/minsta/). 

## Demo

Check out the live demo here: [Cannsta demo](https://cannsta.co/).

![Cannstagram logo](https://i.ibb.co/71GdjnT/thumbnail.png)

![How it works](https://pbs.twimg.com/media/F7ZwH1RagAAuyls?format=png&name=small)

![Rewards](https://pbs.twimg.com/media/F7ZwNGea4AAq8fz?format=png&name=small)

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
         
- [ ] Reels
- [ ] Stories
- [ ] dms


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


