# sammy chatbot 🎀

a chatbot of sammy for her sister. chaos ensues.

## deploy to vercel

1. go to vercel.com and sign up with your github account
2. click "Add New Project"
3. upload this folder or connect your github repo
4. add your environment variable:
   - key: `ANTHROPIC_API_KEY`
   - value: your claude api key (get it from console.anthropic.com)
5. click Deploy!
6. vercel gives you a free URL like `sammy-chatbot.vercel.app` — send that to your sister 🙂

## files
- `public/index.html` — the whole frontend
- `api/chat.js` — serverless function that calls claude (keeps your api key safe)
- `vercel.json` — tells vercel how to run everything
- `public/sammy.png` — add your cutout photo here!

## note
add your `sammy.png` photo to the `public/` folder before deploying!
