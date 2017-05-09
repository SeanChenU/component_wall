# Component Wall
A visual management tool for React/ React Native components.

# WARNING: Still under construction

# Example

> Add comments with `@cpn-` prefix

<img src="https://www.evernote.com/l/AGx-aXG8-7FAk7qwEh85shTaZi9A2vx9SrkB/image.png" alt="Screenshot">

> Result

<img src="http://i.imgur.com/cWCDXhP.png" alt="Screenshot">

# Why?
As the React/ React Native project getting larger, the components will soon become unmanageble. Usually requires developer spend extra hours on document. So we came up a more automatic way to manage them.

The component wall shows:

1. name of the components class
2. screenshots 
3. description
4. tag

# Usage (For now)

## Set your project dir path
> Change path at line 13 in `index.js`


## Add these  in component .js file

By adding the following comments with `@cpn-` to your component .js file, it will automatically display on Component Wall.

> Add `// @cpn-scr` for screenshot of component

> Add `// @cpn-des` for description of compoent

> Add `// @cpn-tag` for tags of component (underconstruction)

### Start it

> Run `node index.js` in this directory.

> Open `http://localhost:7008`
