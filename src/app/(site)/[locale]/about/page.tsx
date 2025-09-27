import { Project } from "@/interface";
import { PageProps } from "@/interface";
import projects from "@/content/projects.json";
import AboutSection from "@/components/site/aboutSection";

export const dynamic = "error";

const aboutContent = {
    subtitleEN: "Design & Creation",
    subtitleVI: "Thiết kế & Kiến tạo",
    sectionsEN: [
        {
            heading: "Design Philosophy",
            body: "I believe in the *balance* between *aesthetics* and *practicality*. Design isn't just about creating beauty; it's about solving problems with *subtlety* and *sustainability*. I focus heavily on utilizing *natural light* and *tactile materials* to create spaces with depth and emotion. This philosophy is clearly reflected in projects like *Tanphong House*.",
        },
        {
            heading: "Experience & Expertise",
            body: "With *8 years* of experience in architecture and interior design, I've been involved in diverse projects ranging from *residential homes* to *high-end commercial spaces*. I possess deep expertise in blending *classical elements* (like Baroque details) with modern *minimalist* styles, resulting in unique and timeless environments.",

        }
    ],
    sectionsVI: [
        {
            heading: "Triết lý Thiết kế",
            body: "Tôi tin vào sự *cân bằng* giữa tính *thẩm mỹ* và tính *thực tiễn*. Thiết kế không chỉ là tạo ra vẻ đẹp, mà còn là giải quyết vấn đề một cách *tinh tế* và *bền vững*. Tôi đặc biệt chú trọng đến việc sử dụng *ánh sáng tự nhiên* và vật liệu *chạm tay* để tạo ra không gian có chiều sâu và cảm xúc. Triết lý này được thể hiện rõ ràng trong các dự án như *Tanphong House*."
        },
        {
            heading: "Kinh nghiệm & Chuyên môn",
            body: "Với *8 năm* kinh nghiệm trong lĩnh vực kiến trúc và nội thất, tôi đã tham gia vào nhiều dự án đa dạng từ *nhà ở dân dụng* đến *không gian thương mại* cao cấp. Tôi có kinh nghiệm sâu sắc trong việc kết hợp các yếu tố *cổ điển* (như chi tiết Baroque) với phong cách *tối giản* hiện đại, tạo ra những không gian độc đáo và không bị lỗi thời."

        }
    ]
};

export async function generateStaticParams() {
    const locales = ["en", "vi"] as const;
    return locales.flatMap((locale) =>
        (projects as Project[]).map((p) => ({ locale, slug: p.slug }))
    );
}

export default async function AboutPage({ params }: PageProps) {
    const { locale, slug } = await params;
    const data = locale === 'vi' ? aboutContent.sectionsVI : aboutContent.sectionsEN;
    return (
        // Nền trắng tinh khiết, padding rộng cho khoảng trắng
        <div className="pt-24 pb-20 bg-white min-h-screen">
            <div className="max-w-6xl mx-auto px-4 md:px-8">

                {/* Tiêu đề phụ (Subtitle) - Serif, cỡ lớn, nhấn mạnh sự Trang nhã */}
                <h1 className="text-6xl md:text-8xl text-gray-900 font-extrabold mb-4">
                    {locale === 'vi' ? aboutContent.subtitleVI : aboutContent.subtitleEN}
                </h1>

                {/* Section Nội dung chi tiết */}
                {data.map((section, idx) => (
                    <AboutSection
                        key={slug + '_' + idx}
                        heading={section.heading}
                        body={section.body!}
                    />
                ))}

            </div>
        </div>
    );
}
