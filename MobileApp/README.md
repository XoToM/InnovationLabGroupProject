## Get started
1. Install Node and Android Studio
   
   [Download Node here](https://nodejs.org/en/download)
   
   [Download Android Studio](https://developer.android.com/studio)

   Android studio is required to compile the app for android.

2. Insert the .env file into this folder to add in the api tokens.

3. Install dependencies

      ```bash
         npm install
      ```

4. Plug in your android phone to your computer, and enable USB debugging. To enable USB debugging on your phone go to your phone's settings, open developer settings (hidden by default. Clicking several times on the Build Number in the settings shows this menu) and enable USB debugging.

      If you do not have an Android device, you can use an Android Emulator to run the code. You can install it with the link below. The steps to running the app with the emulator are the same as for running it with a real phone, you just need to make sure the emulator is installed.

      [Android emulator setup](https://docs.expo.dev/workflow/android-studio-emulator/)

5. If you are having problems with the app directly after pulling from a branch you may need to rebuild from scratch. Run the following command:

      ```bash
         npx expo prebuild --clean
      ```

6. Start the app

      ```bash
         npx expo run:android
      ```

7. Go to the Visual Studio press CTRL+Shift+P (Or ⌘+Shift+P on Mac).

   Choose "TypeScript: Select a TypeScript Version...".

   Choose "Use workspace Version" .

# More info

[development build info](https://docs.expo.dev/develop/development-builds/introduction/)
This project uses [file-based routing](https://docs.expo.dev/router/introduction).


# Other useful links

- React tutorial. Do give this one a read, it goes over how react works. Do keep in mind that it uses regular React and not React Native. Regular React uses html, while React Native forces you to use its components. https://react.dev/learn

- React Native tutorial. I haven't checked this one, but it is also probably worth reading through. https://reactnative.dev/docs/getting-started

- Expo guide. Expo is a set of tools and libraries for developing react native apps. We will be using it for things like debugging, hot reload, and possibly the user interface. It also provides a bunch of useful libraries we might use in the future. Also haven't read through it yet, but is also probably worth reading https://docs.expo.dev/tutorial/introduction/

- React documentation. Should contain descriptions of react hooks and some other features. https://react.dev/reference/react/hooks

- React native documentation. Contains descriptions of all the built-in components we will use. https://reactnative.dev/docs/components-and-apis

- Expo documentation. https://docs.expo.dev/versions/latest/
