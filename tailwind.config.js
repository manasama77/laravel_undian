/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            boxShadow: {
                undian: "0px 4px 30px rgba(0, 0, 0, 0.1)",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                roboto: ["Roboto", "sans-serif"],
            },
            backgroundImage: {
                undian: "url('../images/page-bg.png')",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
