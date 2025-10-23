import { PageProps } from "@/interface";
import projects from "@/content/projects.json";
import Image from "next/image";

export const dynamic = "error";

const aboutContent = {
    subtitleEN: "Ngo Dinh Tai",
    subtitleVI: "Ngô Đình Tài",
    descriptionEN: [
        `Dinh Tai is a young designer of the new creative generation of Vietnam. With a modern aesthetic mindset and a passion for exploring beauty in living spaces, he sees design as a journey connecting art, culture and human emotions.`,
        `During his time living and studying abroad, especially in Milan - the capital of world design and fashion - Tai had the opportunity to work at two architectural firms, Tito Canella and Guardini Ciuffreda Studio. These valuable experiences helped him broaden his professional perspective, practice creative thinking and learn how to approach space according to international standards.`,
        `Thanks to the cultural exchange between Asia and Europe, Dinh Tai has formed a sophisticated design style, balancing aesthetics and functionality. In each project, he always focuses on bringing spaces with souls - where beauty, comfort and emotions coexist harmoniously. With the spirit of constant creativity and the desire for sustainable development, Dinh Tai Studio wishes to contribute to the Vietnamese design industry with works of lasting value and inspiration for a positive life.`,
    ],
    descriptionVI: [
        `Đình Tài là một nhà thiết kế trẻ thuộc thế hệ sáng tạo mới của Việt Nam. Với tư duy thẩm mỹ hiện đại cùng niềm đam mê khám phá vẻ đẹp trong không gian sống, anh xem thiết kế là hành trình kết nối giữa nghệ thuật, văn hoá và cảm xúc con người.`,
        `Trong thời gian sinh sống và học tập tại nước ngoài, đặc biệt là tại Milan – thủ đô của thiết kế và thời trang thế giới – Tài đã có cơ hội làm việc tại hai công ty kiến trúc Tito Canella và Guardini Ciuffreda Studio. Những trải nghiệm quý giá này giúp anh mở rộng góc nhìn chuyên môn, rèn luyện tư duy sáng tạo và học hỏi cách tiếp cận không gian theo tiêu chuẩn quốc tế.`,
        `Nhờ sự giao thoa văn hoá giữa châu Á và châu Âu, Đình Tài hình thành phong cách thiết kế tinh tế, cân bằng giữa thẩm mỹ và công năng. Trong mỗi dự án, anh luôn chú trọng mang đến những không gian có linh hồn – nơi vẻ đẹp, sự tiện nghi và cảm xúc cùng tồn tại hài hòa. Với tinh thần sáng tạo không ngừng và khát vọng phát triển bền vững, Đình Tài Studio mong muốn được đóng góp cho ngành thiết kế Việt Nam những công trình mang giá trị lâu dài và truyền cảm hứng sống tích cực.`,
    ],
};

export async function generateStaticParams() {
    const locales = ["en", "vi"] as const;
    return locales.flatMap((locale) =>
        projects.map((p) => ({ locale, slug: p.slug }))
    );
}

export default async function AboutPage({ params }: PageProps) {
    const { locale } = await params;
    const subtitle =
        locale === "vi" ? aboutContent.subtitleVI : aboutContent.subtitleEN;
    const description =
        locale === "vi" ? aboutContent.descriptionVI : aboutContent.descriptionEN;

    return (
        <div className="bg-white min-h-screen flex flex-col items-center px-6 md:px-20 py-16">
            {/* Header */}
            <div className="w-full text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-3">
                    {subtitle}
                </h1>
                <div className="h-[3px] w-24 mx-auto bg-gray-900 rounded-full opacity-60"></div>
            </div>

            {/* Content */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="flex justify-center">
                    <div className="relative w-64 h-64 md:w-[500px] md:h-[380px] group">
                        <Image
                            src="/assets/profile.png"
                            alt={subtitle}
                            fill
                            className="object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col space-y-6 text-gray-700 text-lg leading-relaxed">
                    {description.map((para, idx) => (
                        <p
                            key={idx}
                            className="transition-opacity duration-700 hover:opacity-90 font-medium"
                        >
                            {para}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
