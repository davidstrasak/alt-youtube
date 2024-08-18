# An alternative YouTube app

Where you can filter out the channels that interest you

## How to start:

### .env file

You will need to create an .env file and insert this code:

```bash
YT_API_KEY= your api key from google for developers (just google youtube api key)
DATABASE_URL="file:./prisma/dev.db"
```

### Prisma initialization

Prisma is a database used for storing the YouTube channels. You will need to initialize it by running:

```bash
npx prisma generate
```

If the database is not working, try:

```bash
npx prisma migrate dev
npx prisma migrate deploy
```

## How to use this app:

If the database is working, then you're in!

You can now add any channels to the database clicking the UPDATE THE LIST OF CHANNELS button or going to the /db route.

There you will need a name of the channel (that's just for your recognition), channel ID (this is important) and some one tag you can set.

You can get the channel ID by:

- go to the YouTube channel's page
- click "more" on the channel description
- scroll down
- click share
- copy the ID of the channel and paste it into the app

Now when you click the "Fetch the video data" button, it will download the links for all latest videos from your channels and store them inside the /files folder in the .json format.

Be sure to host this somewhere so you don't have to run Node.js every time you want to use this app. I am currently on this step, so if you need some help on how to do so, ask Google Gemini.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
