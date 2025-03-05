## Get started
1. Install Node
   [Download it here](https://nodejs.org/en/download)

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```

   if you cannot connect to the app (or you are using uni wifi) you may want to use the following command instead:
   ```
    npx expo start --tunnel
   ```

4. Go to the Visual Studio press CTRL+Shift+P (Or ⌘+Shift+P on Mac).

Choose "TypeScript: Select a TypeScript Version...".

Choose "Use workspace Version" .

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo



This project uses [file-based routing](https://docs.expo.dev/router/introduction).


# Other useful links

- React tutorial. Do give this one a read, it goes over how react works. Do keep in mind that it uses regular React and not React Native. Regular React uses html, while React Native forces you to use its components. https://react.dev/learn

- React Native tutorial. I haven't checked this one, but it is also probably worth reading through. https://reactnative.dev/docs/getting-started

- Expo guide. Expo is a set of tools and libraries for developing react native apps. We will be using it for things like debugging, hot reload, and possibly the user interface. It also provides a bunch of useful libraries we might use in the future. Also haven't read through it yet, but is also probably worth reading https://docs.expo.dev/tutorial/introduction/

- React documentation. Should contain descriptions of react hooks and some other features. https://react.dev/reference/react/hooks

- React native documentation. Contains descriptions of all the built-in components we will use. https://reactnative.dev/docs/components-and-apis

- Expo documentation. https://docs.expo.dev/versions/latest/
