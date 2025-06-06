# Move-n-Stuff

## Overview
Move-n-stuff is a convenience application that allows users to effectively move their belongings from one place to another without losing track of items. Unlike moving companies who don’t properly organize your stuff, our product lets the user arrange their items in ways that work for them, and know where everything is without needing to unpack.

**Try it Out:** https://www.move-n-stuff.com/
## Getting Started
1. Clone the repository:
   ```
   git clone https://github.com/move-in-stuff-org/move-n-stuff.git
   ```
2. Navigate into the project folder:
    ```
    cd move-n-stuff
    ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create the following `.env` files:
   1. Inside `/packages/backend/` create a file named `.env` with the following variables:
       ```
       MONGO_URI=your-mongo-uri
       TOKEN_SECRET=token-secret-here
       ```
   2. Inside `/packages/frontend/` create a file named `.env` with the following variable:
      ```
      VITE_API_BASE_URL="http://localhost:8000"
      ```

5. Run the application via one of the following options:
    1. Singular terminal (backend and frontend development mode in one):
      ```
      npm run dev
      ```
    2. Split terminals (backend and frontend development mode separate)
       - Terminal 1:
         ```
         npm run dev:back
         ```
       - Terminal 2:
         ```
         npm run dev:front
         ```
    3. Production mode (backend and frontend in one terminal):
       ```
       npm start
       ```

## Style Guide
For style we did the following:
- Installed Prettier VS Code extension, using its default settings. In VS Code settings we set "Prettier - Code formatter" as the default formatter under "Editor: Default Formatter", as well as turning on "Editor: Format On Save"
- For linting we used es-lint
- Both the above exist in the project and can be ran with the following:
  - Prettier:
    ```
    npm run format
    ```
  - ESLint:
    ```
    npm run lint
    ```

## Team Members
- Carson Olander - GitHub: [@colander21](https://github.com/colander21)
- Hunter Lathery - GitHub: [@hlathery](https://github.com/hlathery)
- Ozcar Cayetano - GitHub: [@OzcarC](https://github.com/OzcarC)
- Antony Tartakovskiy - GitHub: [@AntonyCalPoly](https://github.com/AntonyCalPoly)
