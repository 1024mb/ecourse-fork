<p style="align-items: center">
    <img src="https://i.ibb.co/Sx7YmY6/ecourse.jpg" alt="eCourse - My Courses" />
</p>

eCourse is a self-hosted SPA designed to simplify course creation and management, some of the features include:

- ability to create video and text based content
- ability to assign courses to users
- ability to track users progress

## Tech Stack

**UI Framework** - [Vue 3](https://vuejs.org/)

**CSS** - [TailwindCSS 4](https://tailwindcss.com/)

**Icons** - [Iconify](https://iconify.design/)

**Backend** - [PocketBase](https://pocketbase.io/)

## Getting Started

Get started by running the project locally, simply follow these steps:

1. Clone/download the repo

2. Grab the PocketBase executable for your OS from: https://pocketbase.io/docs/ and drop it at the root of the `pb`
   folder.

3. Start the PocketBase server

    ```bash
    cd pb
    ./pocketbase serve
    ```

4. Start the Vite server

    ```bash
    cd ui
    npm install && npm run dev
    ```

## Customization

App name, logo, and colors can be customized using the `customize.json` file.

## Deployment

One neat thing about PocketBase is that it can also serve our static frontend assets. to do that simply follow these
steps:

1. Build a production-ready bundle

    ```bash
    cd ui
    npm run build
    ```

2. Copy the contents of the `dist` folder over to `pb_public`

## Feedback & Suggestions

Feel free to open an issue/PR if you find any bugs or want to request new features.

## License

Licensed under the AGPLv3 License
