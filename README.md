# React + Vite Recipe App for Swedish traditional dishes

This project is a recipe application built with React and Vite. It allows users to browse, search, and view details of various recipes (in Swedish). The app also includes features for filtering recipes by categories and preparation time, as well as leaving comments and ratings.

## Project Structure

### `src/App.jsx`
This is the main entry point of the application. It sets up the routing for the app using `react-router-dom` and includes the `Header` and `Categories` components.

### `src/components/Header.jsx`
This component renders the header of the application, including the navigation links and the mobile menu. It uses `@headlessui/react` for the dialog and popover components.

### `src/components/asidecategories.jsx`
This component contains the sidebar with dropdown lists for filtering recipes by categories and preparation time. It fetches the categories and time options from the API and updates the state based on user selections.

### `src/components/recipedetails.jsx`
This component displays the details of a selected recipe, including its title, description, ingredients, instructions, and user comments. It also allows users to leave comments and rate the recipe.

### `src/components/hero.jsx`
This component renders the hero section of the application, including a search input for filtering recipes by title or ingredients. It uses a background image and an overlay for better readability.

### `src/components/header.jsx`
This component renders a simple header with a logo and navigation links. It includes a mobile menu button that toggles the visibility of the menu.

## Collaboration
This is a collaboration project of following contributors: Kerem Bjälvenäs Tazedal (Kerem1989), Homan Aghajani (HomanAgh), Emelie Lind and Dmitry Khalizov (DmitryKhalizov)

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Kerem1989/group-4-recipe-react.git