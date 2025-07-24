import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    100: "#3E7BFA",
                    200: "#6698FA",
                },
                dark: {
                    100: "#28293D",
                    200: "#555770",
                    300: "#8F90A6",
                    400: "#C7C9D9",
                },
                light: {
                    50: "#E4E4EB",
                    100: "#EBEBF0",
                    200: "#F2F2F5",
                    300: "#FAFAFC",
                    400: "#FFFFFF",
                },
                grey: {
                    400: "#7B8794",
                },
            },
        },
    },

    plugins: [forms],
};
