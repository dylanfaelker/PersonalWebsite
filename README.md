<!-- ABOUT THE PROJECT -->
# About The Project

This website is meant to showcase my past projects and act as a resource for anyone potentially looking to hire me.

The website can be found at [dylanfaelker.com](https://www.dylanfaelker.com/)


### Built With

* [React.js](https://reactjs.org/)
  * Redux
  * MUI
* Firebase




# Roadmap

See the [open issues](https://github.com/dylanfaelker/PersonalWebsite/issues) for a list of features and fixes I would like to add to the website. I originally made this website when I was first learning computer science in university and didn't know any web development techniques. As such many parts of this website are poorly made and far from my current skill set. I am actively working on updating things, but this website isn't a major priority for me. Feel free to add any bugs you find.




# App Layout

```
root    
│
├───public
│   │   [standard public react folder]
│   
└───src
    ├───assets
    │   │   [visual assets stored in src]
    │
    ├───components
    │   ├───common
    │   │   │   [common components]
    │   │
    │   ├───[folders containing components for each page]
    │   └───...
    │
    ├───hooks
    │   │   [custom hooks]
    │
    ├───pages
    │   │   [file for each page]
    │
    ├───redux
    │   ├───slice
    │   │   │   [redux slices]
    │   │
    │   │   store.js [redux store]
    │
    │   index.js [what is mounted into index.js <root> object, also contains site wrapper objects]
    │   App.js [base for all visual react components, also contains routing logic]
    │   Theme.js [where MUI theme is set]
```

# Making Changes

## Getting started

Clone repository and make a new branch

Open and command prompt and navigate to the local repo

Run `npm install` to install packages

Run `npm start` to start development server on localhost:3000

## Publishing changes

Makes commits to branch for developing

Open PR from dev branch to `main`

Wait for netlify to create a deploy of the new site

Review the deploy and make sure the site preview behaves as expected

Merge PR into `main`



# Contact

Dylan Faelker - [linkedin](https://www.linkedin.com/in/dylanfaelker/) - faelkerd@gmail.com

Project Link: [github.com/dylpykill/PersonalWebsite](https://github.com/dylpykill/PersonalWebsite)

