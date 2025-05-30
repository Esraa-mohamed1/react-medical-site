"use client";
import Image from "next/image";
import Link from "next/link";

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-background/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={article.image || "/images/article-placeholder.jpg"}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        <p className="text-muted mb-4">{article.summary}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted">{article.date}</span>
          <Link
            href={`/articles/${article.id}`}
            className="text-accent hover:text-accent/90 transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard; 