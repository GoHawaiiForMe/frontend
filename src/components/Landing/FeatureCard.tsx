import Image from "next/image";

interface FeatureCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export default function FeatureCard({ imageUrl, title, description }: FeatureCardProps) {
  return (
    <div className="hover:shadow-3xl group rounded-2xl bg-white/95 p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          width={400}
          height={300}
          alt={title}
          className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-gray-800">{title}</h3>
      <p className="mt-3 text-lg leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}
