"use client";
import Image from "next/image";
import Link from "next/link";

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-background/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={resource.image || "/images/resource-placeholder.jpg"}
          alt={resource.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
        <p className="text-muted mb-4">{resource.description}</p>
        <div className="flex flex-col space-y-2">
          {resource.links?.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-accent hover:text-accent/90 transition-colors flex items-center"
            >
              <span className="mr-2">→</span>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard; 