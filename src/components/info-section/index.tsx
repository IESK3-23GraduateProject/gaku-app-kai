import React from "react";
import { useStore } from "@nanostores/react";
import {
  getFilteredItems,
  searchQuery,
  selectedCategory,
  sortOption,
} from "@/lib/newsSearchStore";

interface NewsItem {
  student_news_id: number;
  title: string;
  news_category_name: string;
  news_contents: string;
  author_name: string;
  is_public: boolean;
  high_priority: boolean;
  publish_at: string;
  created_at: string;
  updated_at: string;
  read_at: string;
  is_read: boolean;
}

interface InfoSectionProps {
  items: NewsItem[];
}

const InfoSection: React.FC<InfoSectionProps> = ({ items }) => {
  const filteredItems = getFilteredItems(items);
  const query = useStore(searchQuery);
  const category = useStore(selectedCategory);
  const sort = useStore(sortOption);

  // Map category to TailwindCSS background classes
  const getCategoryClass = (category: string) => {
    switch (category) {
      case "学校からの連絡":
        return "bg-red-200 text-red-800";
      case "担任からの連絡":
        return "bg-blue-200 text-blue-800";
      case "キャリアセンターより":
        return "bg-green-200 text-green-800";
      case "学校行事":
        return "bg-yellow-200 text-yellow-800";
      case "図書館からの連絡":
        return "bg-purple-200 text-purple-800";
      case "事務局からの連絡":
        return "bg-orange-200 text-orange-800";
      case "クラブ・サークル":
        return "bg-pink-200 text-pink-800";
      case "その他":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Truncate content preview based on language (words for English, characters for Japanese)
  const truncateContent = (content: string) => {
    if (content.includes(" ")) {
      const words = content.split(" ");
      return words.length > 50 ? words.slice(0, 50).join(" ") + "..." : content;
    }
    return content.length > 150 ? content.slice(0, 150) + "..." : content;
  };

  // Format publish_at to "YYYY年MM月DD日 + に投稿"
  const formatDate = (publishAt: string) => {
    const date = new Date(publishAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}年${month}月${day}日`;
  };

  return (
    <>
      <div className="py-4">
        <p className="text-sm text-red-400">
          Showing {filteredItems.length} results for query:{" "}
          <strong>{query}</strong>, category:{" "}
          <strong>{category || "All"}</strong>, sort by: <strong>{sort}</strong>
        </p>
      </div>
      <ol className="grid -mx-2 sm:-mx-4 py-4 lg:py-6 lg:pb-20 grid-cols-1 max-w-screen-xl">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li
              key={item.student_news_id}
              className="col-span-10 px-2 sm:px-4 [&_a]:last:border-none border-b"
            >
              <a
                href={`/news/${item.student_news_id}`}
                className="group flex flex-col lg:flex-row w-full py-2 sm:py-4"
              >
                <div className="flex-1 lg:pr-4">
                  <h3 className="text-lg font-semibold group-hover:underline leading-snug">
                    {!item.is_read && (
                      <div className="relative inline-block mr-2 align-middle">
                        {/* Ping Effect */}
                        {/* <span className="absolute inset-0 flex h-3 w-3 rounded-full bg-green-500 opacity-75 "></span> */}
                        {/* Circle */}
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                      </div>
                    )}
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 hidden lg:block">
                    {truncateContent(item.news_contents)}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 lg:mt-0 lg:justify-end">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryClass(
                      item.news_category_name
                    )}`}
                  >
                    {item.news_category_name}
                  </span>
                  {item.high_priority && (
                    <span className="text-red-600 font-bold text-base">必須</span>
                  )}
                  <span className="text-sm text-gray-500">
                    {formatDate(item.publish_at)}
                  </span>
                </div>
              </a>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </ol>
    </>
  );
};

export default InfoSection;
