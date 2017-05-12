# Component Wall
A visual management tool for React/ React Native components.

## Still in Beta

# Example

> Add comments with `@cpn-` prefix in your component .js file

<img src="https://www.evernote.com/l/AGx-aXG8-7FAk7qwEh85shTaZi9A2vx9SrkB/image.png" alt="Screenshot">

> Result

<img src="https://www.evernote.com/l/AGzS1sWcwPZIIbg9z0npqrcXxHH1zbGyOP4B/image.png" alt="Screenshot">

# Why?
As the React/ React Native project getting larger, the components will soon become unmanageble. Usually requires developer spend extra hours on document. So we came up a more automatic way to manage them.

The component wall shows:

1. name of the components class
2. screenshots 
3. description
4. tag

# Usage (For now)

## Add these in component .js file

By adding the following comments with `@cpn-` to your component .js file, it will automatically display on Component Wall.

> Add `// @cpn-scr` for **screenshot** of component

> Add `// @cpn-des` for **description** of compoent

> Add `// @cpn-tag` for **tags** of component (underconstruction)

> Note: for screenshot links, we use [Evernote Skitch](https://evernote.com/intl/zh-tw/skitch/). It's a great tool for screenshots and notation. Also it can upload image to its cloud and generate link for it. Press `cmd + shift + 5` to start clipping screenshot and press `cmd + /` to copy the image link. Make sure you select the 'Direct Image URL' option for image link copy.

### Start it

> Go to your project root directory and run `cpnwall`

> Open `http://localhost:7008`

### For more
If you have any idea or thoughts, feel free to say hi <sean@appar.com.tw>