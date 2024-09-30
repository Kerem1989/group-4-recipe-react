export default function Hero() {
    return (
<section class="bg-gray-200 dark:bg-gray-900">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-black">Recept som berikar din matlagning</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Varje recept är noggrant utformat för att ge dig en unik och minnesvärd matupplevelse. Med enkla steg och noga utvalda ingredienser skapar du måltider som imponerar och smakar fantastiskt.

Vill du ta matlagningen till nästa nivå? Bläddra ner för att hitta inspiration från våra kvalitetsrecept och ge dig själv en smakfull upplevelse!</p>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="assets/food.jpg" alt="mockup"></img>
        </div>                
    </div>
</section>
    );
}