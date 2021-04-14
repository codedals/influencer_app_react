# Instagram Influencer Metrics for Chrome
This is a chrome extension which allows users to see various metrics for IG users.

## Features

- Top Mentions
- Interaction Counts
- Top Followers
- Breakdown of tags for all posts
- Filter post by tag

## Installation

```
git clone app_name
```
Go to `app_name` directory run

```
yarn install
```
Now build the extension using
```
yarn build
```
You will see a `build` folder generated inside `[PROJECT_HOME]`

## Adding React app extension to Chrome

In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

Now click on the `LOAD UNPACKED` and browse to `[PROJECT_HOME]\build` ,This will install the React app as a Chrome extension.
