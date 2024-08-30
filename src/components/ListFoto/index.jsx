import Image from "next/image";
import Link from "next/link";

const ListFoto = ({ api }) => {

    return (
        <div className="px-3 py-3 columns-2 sm:columns-3 md:columns-5 lg:columns-6 gap-x-3">
            {api.data.map((foto, index) => (
                <div key={index} className="w-full h-auto mb-3 relative rounded-2xl overflow-hidden">
                    <Link href={`/foto/${foto.id}`}>
                        <div className="w-full h-auto">
                            <Image className="w-full hover:brightness-50" src={foto.image} alt={`gambar ${foto.title}`} width={1500} height={1500} />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ListFoto;
