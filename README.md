## angular-ios-actionsheet
iOS7+ style actionsheet service for angular

### Install
```shell
bower install angular-ios-actionsheet
```

### Usage
1. include `angular-ios-aleretview.js` and `angular-ios-actionsheet.css` in you html
2. include `angular-ios-actionsheet` in you angular dependencies
3. inject `iosActionSheet` in you angular app

### Option
Array.&lt;buttonObject | Array.&lt;buttonObject>>

buttonObject keys:

- text, string
- color, boolean
- bold, boolean
- disable, boolean
- label, boolean
- onClick, function, a data object which contains index, parentIndex and button will be passed in

    an example of buttonObject
    ```js
    {
        text: 'button',
        color: true,
        bold: true,
        disable: false,
        label: false,
        onClick: function(data){
            // data.index
            // data.parentIndex
            // data.button
        }
    }
    ```

when label or disable is true, the button can't be clicked

### License
MIT
