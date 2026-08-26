export default function CategorySection() {

    const categories = [

        {
            title:"Masculino",
            image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"
        },

        {
            title:"Feminino",
            image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800"
        },

        {
            title:"Jaquetas",
            image:"https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800"
        },

        {
            title:"Calçados",
            image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
        }

    ];

    return(

        <section className="max-w-7xl mx-auto py-24 px-8">

            <div className="mb-12">

                <h2 className="text-4xl font-black">

                    Compre por Categoria

                </h2>

                <p className="text-gray-500 mt-3">

                    Escolha seu estilo favorito.

                </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                {

                    categories.map(category=>(

                        <div

                            key={category.title}

                            className="
                            group
                            relative
                            overflow-hidden
                            rounded-3xl
                            cursor-pointer
                            h-96
                            "

                        >

                            <img

                                src={category.image}

                                alt={category.title}

                                className="
                                w-full
                                h-full
                                object-cover
                                group-hover:scale-110
                                duration-500
                                "

                            />

                            <div
                                className="
                                absolute
                                inset-0
                                bg-black/30
                                flex
                                items-end
                                p-8
                                "
                            >

                                <h3
                                    className="
                                    text-white
                                    text-3xl
                                    font-bold
                                    "
                                >

                                    {category.title}

                                </h3>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    )

}