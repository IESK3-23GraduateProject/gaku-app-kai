import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { newsItems, fetchNewsItems, subscribeToRealtimeUpdates } from "@/lib/newsStore";
import {
    getFilteredItems,
    searchQuery,
    selectedCategory,
    sortOption,
} from "@/lib/newsSearchStore";

interface InfoSectionProps {
    initialItems: any[]; // Adjust the type if needed for stricter typing
}

const InfoSection: React.FC<InfoSectionProps> = ({ initialItems }) => {
    const items = useStore(newsItems);
    const query = useStore(searchQuery);
    const category = useStore(selectedCategory);
    const sort = useStore(sortOption);

    // Trigger data fetching and realtime subscription on mount
    useEffect(() => {
        // Initialize the store with initial items
        newsItems.set(initialItems);

        // Subscribe to realtime updates
        const subscription = subscribeToRealtimeUpdates();

        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, [initialItems]);

    // Get filtered items based on search, category, and sort
    const filteredItems = getFilteredItems(items);

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

    // Format publish_at to "YYYY年MM月DD日 + に投稿"
    const formatDate = (publishAt: string) => {
        const date = new Date(publishAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}年${month}月${day}日`;
    };

    return (
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
                                {!item.is_read && (
                                    <div className="absolute w-3 h-3 bg-sky-500 rounded-full mt-1.5 left-1 border border-white dark:border-stone-900 dark:bg-stone-700">
                                        <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-50"></span>
                                    </div>
                                )}
                                <h3 className="text-lg font-semibold group-hover:underline leading-snug">
                                    {item.title}
                                </h3>
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
    );
};

export default InfoSection;
