<!-- ABOUT THE PROJECT -->
# About The Project

This website is meant to showcase my past projects and act as a resource for anyone potentially looking to hire me.

The website can be found at [dylanfaelker.com](https://www.dylanfaelker.com/)


### Built With

* [React.js](https://reactjs.org/)
  * Redux
  * MUI
* Flask (https://github.com/dylanfaelker/Abbott-Chess-Engine)




# Roadmap

See the [open issues](https://github.com/dylanfaelker/PersonalWebsite/issues) for a list of features and fixes I would like to add to the website. I originally made this website when I was first learning computer science in university and didn't know any web development techniques. As such many parts of this website are poorly made and far from my current skill set. I am actively working on updating things, but this website isn't a major priority for me. Feel free to add any bugs you find.




# App Layout

```
root
|
+---public
|   [standard React public folder]
|
\---src
    +---commonAssets
    |   +---fonts
    |   +---icons
    |   \---pdfs
    |
    +---commonComponents
    |   [shared UI used across features]
    |
    +---commonHooks
    |   [shared hooks used across features]
    |
    +---redux
    |   +---slice
    |   \---store.js
    |
    +---home
    +---chess
    +---stockPortfolio
    \---worldExplorer
        [each feature follows the same general structure]
        +---assets      [feature-specific static files]
        +---components  [feature-specific UI components]
        +---data        [feature-specific JSON/content]
        +---domain      [business logic/helpers when needed]
        +---hooks       [feature-specific hooks when needed]
        +---index.js    [feature entry point]
        \---*Page.js    [top-level page component]

    App.js     [top-level app component and routing]
    index.js   [application entry point and global wrappers]
    Theme.js   [MUI theme configuration]
```



# Contact

Dylan Faelker - [linkedin](https://www.linkedin.com/in/dylanfaelker/)

Project Link: [github.com/dylpykill/PersonalWebsite](https://github.com/dylpykill/PersonalWebsite)
